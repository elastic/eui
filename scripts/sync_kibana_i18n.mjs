import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const TOKEN_LINE_RE = /^    '(eui[^']+)':/;
const MAPPING_CLOSING_RE = /^  \};/;

const readTokenMap = (tokens) => {
  const tokenMap = new Map();

  for (const token of tokens) {
    const previous = tokenMap.get(token.token);
    if (
      previous &&
      (previous.defString !== token.defString ||
        previous.highlighting !== token.highlighting)
    ) {
      throw new Error(`Token '${token.token}' has conflicting defaults`);
    }
    tokenMap.set(token.token, token);
  }

  return tokenMap;
};

const escapeMessage = (message) =>
  message
    .replace(/\s*\r?\n\s*/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\t/g, '\\t')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

/** Converts EUI's two plural suffix forms to ICU. */
export const functionDefaultToMessage = (defString) => {
  const template = /=>\s*`([\s\S]*)`;?\s*$/.exec(defString)?.[1];
  if (!template) return undefined;

  const plural =
    /^(.*?)\$\{(\w+)\} ([A-Za-z]+)\$\{\2\s*(?:===\s*1\s*\?\s*''\s*:\s*'s'|>\s*1\s*\?\s*'s'\s*:\s*'')\}(.*?)$/.exec(
      template
    );
  if (!plural) return undefined;

  const [, prefix, value, singular, suffix] = plural;
  return {
    defaultMessage: `${prefix}{${value}, plural, one {# ${singular}} other {# ${singular}s}}${suffix}`,
    values: [value],
  };
};

const tokenMessage = ({ token, defString, highlighting }) => {
  if (highlighting === 'code') {
    const message = functionDefaultToMessage(defString);
    if (!message) {
      throw new Error(
        `Cannot convert function-style default for '${token}' to an ICU message:\n${defString}`
      );
    }
    return message;
  }

  if (highlighting !== 'string') {
    throw new Error(
      `Unknown i18n default type '${highlighting}' for '${token}'`
    );
  }

  return {
    defaultMessage: defString,
    values: [
      ...new Set(
        [...defString.matchAll(/\{(\w+)\}/g)].map((match) => match[1])
      ),
    ],
  };
};

const isCommentLine = (line) => /^(?:\/\/|\/\*|\*|\*\/)/.test(line.trim());

const parseEntries = (content) => {
  const lines = content.split('\n');
  const starts = [];
  let closing = -1;

  lines.forEach((line, index) => {
    const tokenMatch = TOKEN_LINE_RE.exec(line);
    if (tokenMatch) starts.push({ token: tokenMatch[1], start: index });
    else if (MAPPING_CLOSING_RE.test(line)) closing = index;
  });

  if (closing === -1 || starts.length === 0) {
    throw new Error('Could not locate EUI mapping entries');
  }

  const entries = new Map(
    starts.map(({ token, start }, index) => {
      let end = (starts[index + 1]?.start ?? closing) - 1;
      // Comments between entries belong to the next entry.
      while (end > start && (!lines[end].trim() || isCommentLine(lines[end])))
        end--;
      return [token, { start, end }];
    })
  );

  return { lines, entries, closing };
};

const metadataOf = (lines, { start, end }) => {
  const entry = lines.slice(start, end + 1);
  const comments = entry.filter(isCommentLine);
  const descriptionStart = entry.findIndex((line) =>
    /^\s*description:/.test(line)
  );

  if (descriptionStart === -1) return { comments };

  let description = entry[descriptionStart].trim();
  for (
    let index = descriptionStart + 1;
    index < entry.length && !/,\s*$/.test(description);
    index++
  ) {
    description += ` ${entry[index].trim()}`;
  }

  return { comments, description };
};

const makeEntry = (tokenDefinition, metadata = {}) => {
  const { token } = tokenDefinition;
  const { defaultMessage, values } = tokenMessage(tokenDefinition);
  const message = escapeMessage(defaultMessage);
  const body = [`defaultMessage: '${message}',`, metadata.description].filter(
    Boolean
  );

  const entry = values.length
    ? [
        `    '${token}': ({ ${values.join(', ')} }: EuiValues) =>`,
        `      i18n.translate('core.${token}', {`,
        ...body.map((line) => `        ${line}`),
        `        values: { ${values.join(', ')} },`,
        '      }),',
      ]
    : [
        `    '${token}': i18n.translate('core.${token}', {`,
        ...body.map((line) => `      ${line}`),
        '    }),',
      ];

  return [...(metadata.comments ?? []), ...entry];
};

/** Syncs all token changes while preserving comments and descriptions. */
export const syncMappingContent = ({
  oldTokens,
  newTokens,
  mappingContent,
}) => {
  const oldTokenMap = readTokenMap(oldTokens);
  const newTokenMap = readTokenMap(newTokens);

  // Reject unsupported function forms before changing the mapping.
  for (const tokenDefinition of newTokenMap.values())
    tokenMessage(tokenDefinition);

  const { lines, entries, closing } = parseEntries(mappingContent);

  const changedTokens = [...newTokenMap]
    .filter(([token, definition]) => {
      const previous = oldTokenMap.get(token);
      return (
        !previous ||
        previous.defString !== definition.defString ||
        previous.highlighting !== definition.highlighting
      );
    })
    .map(([token]) => token);

  // Repair key drift as well as changes between package versions.
  const added = [...newTokenMap.keys()].filter((token) => !entries.has(token));
  const removed = [...entries.keys()].filter(
    (token) => !newTokenMap.has(token)
  );
  const modified = [...changedTokens].filter((token) => entries.has(token));

  // Work bottom-up after adding entries so offsets stay valid.
  lines.splice(
    closing,
    0,
    ...added
      .sort((a, b) => a.localeCompare(b))
      .flatMap((token) => makeEntry(newTokenMap.get(token)))
  );

  const operations = [
    ...removed.map((token) => ({
      token,
      replacement: metadataOf(lines, entries.get(token)).comments,
    })),
    ...modified.map((token) => ({
      token,
      replacement: makeEntry(
        newTokenMap.get(token),
        metadataOf(lines, entries.get(token))
      ),
    })),
  ]
    .map(({ token, replacement }) => ({ ...entries.get(token), replacement }))
    .sort((a, b) => b.start - a.start);

  for (const { start, end, replacement } of operations) {
    lines.splice(start, end - start + 1, ...replacement);
  }

  const content = lines.join('\n');
  const finalTokens = new Set(parseEntries(content).entries.keys());
  const missing = [...newTokenMap.keys()].filter(
    (token) => !finalTokens.has(token)
  );
  const extra = [...finalTokens].filter((token) => !newTokenMap.has(token));

  if (missing.length || extra.length) {
    throw new Error(
      `Mapping reconciliation failed; missing: ${
        missing.join(', ') || 'none'
      }; extra: ${extra.join(', ') || 'none'}`
    );
  }

  return { content, added, modified, removed };
};

const main = () => {
  const { values } = parseArgs({
    options: {
      'old-tokens': { type: 'string' },
      'new-tokens': { type: 'string' },
      'mapping-file': { type: 'string' },
    },
  });

  for (const option of ['old-tokens', 'new-tokens', 'mapping-file']) {
    if (!values[option]) throw new Error(`Missing required option --${option}`);
  }

  const oldTokens = JSON.parse(fs.readFileSync(values['old-tokens'], 'utf8'));
  const newTokens = JSON.parse(fs.readFileSync(values['new-tokens'], 'utf8'));
  const mappingContent = fs.readFileSync(values['mapping-file'], 'utf8');
  const result = syncMappingContent({ oldTokens, newTokens, mappingContent });

  if (result.content !== mappingContent) {
    fs.writeFileSync(values['mapping-file'], result.content);
  }

  console.log(
    `Synced ${values['mapping-file']}: +${result.added.length} added, ~${result.modified.length} modified, -${result.removed.length} removed`
  );
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main();
