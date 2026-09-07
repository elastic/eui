import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  functionDefaultToMessage,
  syncMappingContent,
} from './sync_kibana_i18n.mjs';

const stringToken = (token, defString) => ({
  token,
  defString,
  highlighting: 'string',
});
const codeToken = (token, defString) => ({
  token,
  defString,
  highlighting: 'code',
});

test('converts every function-style default currently emitted by EUI', () => {
  const tokens = JSON.parse(
    fs.readFileSync(
      new URL('../packages/eui/i18ntokens.json', import.meta.url),
      'utf8'
    )
  );
  const functionTokens = [
    ...new Map(
      tokens
        .filter(({ highlighting }) => highlighting === 'code')
        .map((token) => [token.token, token])
    ).values(),
  ];

  assert.ok(functionTokens.length > 0);
  for (const { token, defString } of functionTokens) {
    assert.ok(
      functionDefaultToMessage(defString),
      `${token} should convert to ICU`
    );
  }
});

test('converts both current plural function forms to ICU', () => {
  assert.deepEqual(
    functionDefaultToMessage(
      "({ resultsLength }) => `${resultsLength} result${resultsLength === 1 ? '' : 's'} available`;"
    ),
    {
      defaultMessage:
        '{resultsLength, plural, one {# result} other {# results}} available',
      values: ['resultsLength'],
    }
  );
  assert.deepEqual(
    functionDefaultToMessage(
      "({ interval }) => `${interval} second${interval > 1 ? 's' : ''}`;"
    ),
    {
      defaultMessage: '{interval, plural, one {# second} other {# seconds}}',
      values: ['interval'],
    }
  );
});

test('handles additions, modifications, removals and every supported message shape', () => {
  const oldFunction =
    "({ count }) => `Old ${count} item${count === 1 ? '' : 's'}`;";
  const newFunction =
    "({ count }) => `Found ${count} result${count === 1 ? '' : 's'}`;";
  const oldTokens = [
    stringToken('euiKeep', 'Keep'),
    stringToken('euiModify', 'Old {name}'),
    stringToken('euiRemove', 'Remove'),
    codeToken('euiFunction', oldFunction),
  ];
  const newTokens = [
    stringToken('euiKeep', 'Keep'),
    stringToken('euiModify', 'New {name}'),
    stringToken('euiAdd', "It's\n new"),
    codeToken('euiFunction', newFunction),
  ];
  const mappingContent = `export const mapping = () => {
  return {
    'euiKeep': i18n.translate('core.euiKeep', {
      defaultMessage: 'Keep',
    }),
    // This comment belongs to the modified token and must survive.
    'euiModify': ({ name }: EuiValues) =>
      i18n.translate('core.euiModify', {
        defaultMessage: 'Old {name}',
        values: { name },
        description:
          'Translator description',
      }),
    'euiRemove': i18n.translate('core.euiRemove', {
      // Keep comments even when their token is removed.
      defaultMessage: 'Remove',
    }),
    'euiFunction': ({ count }: EuiValues) =>
      i18n.translate('core.euiFunction', {
        defaultMessage: 'Old',
        values: { count },
      }),
  };
};
`;

  const result = syncMappingContent({ oldTokens, newTokens, mappingContent });

  assert.deepEqual(result.added, ['euiAdd']);
  assert.deepEqual(result.modified, ['euiModify', 'euiFunction']);
  assert.deepEqual(result.removed, ['euiRemove']);
  assert.match(result.content, /defaultMessage: 'New \{name\}'/);
  assert.match(
    result.content,
    /defaultMessage: 'Found \{count, plural, one \{# result\} other \{# results\}\}'/
  );
  assert.match(result.content, /defaultMessage: 'It\\'s new'/);
  assert.match(result.content, /description: 'Translator description'/);
  assert.match(
    result.content,
    /This comment belongs to the modified token and must survive/
  );
  assert.match(
    result.content,
    /Keep comments even when their token is removed/
  );
  assert.doesNotMatch(result.content, /'euiRemove':/);

  const secondRun = syncMappingContent({
    oldTokens,
    newTokens,
    mappingContent: result.content,
  });
  assert.equal(secondRun.content, result.content);
});

test('repairs missing and extra mapping keys even when the token diff is empty', () => {
  const tokens = [stringToken('euiExpected', 'Expected')];
  const mappingContent = `export const mapping = () => {
  return {
    'euiExtra': i18n.translate('core.euiExtra', {
      defaultMessage: 'Extra',
    }),
  };
};
`;

  const result = syncMappingContent({
    oldTokens: tokens,
    newTokens: tokens,
    mappingContent,
  });

  assert.match(result.content, /'euiExpected':/);
  assert.doesNotMatch(result.content, /'euiExtra':/);
});

test('locates mapping entries regardless of indent', () => {
  const tokens = [stringToken('euiKeep', 'Keep')];
  const mappingContent = `export const mapping = () => {
return {
'euiKeep': i18n.translate('core.euiKeep', {
defaultMessage: 'Keep',
}),
};
};
`;

  const result = syncMappingContent({
    oldTokens: tokens,
    newTokens: [stringToken('euiKeep', 'Kept')],
    mappingContent,
  });

  assert.match(result.content, /defaultMessage: 'Kept'/);
});

test('rejects unknown function defaults instead of creating an incomplete mapping', () => {
  const functionToken = codeToken(
    'euiUnknown',
    '({ value }) => formatValue(value);'
  );
  const mappingContent = `export const mapping = () => {
  return {
    'euiExisting': i18n.translate('core.euiExisting', {
      defaultMessage: 'Existing',
    }),
  };
};
`;

  assert.throws(
    () =>
      syncMappingContent({
        oldTokens: [],
        newTokens: [functionToken],
        mappingContent,
      }),
    /Cannot convert function-style default/
  );
});
