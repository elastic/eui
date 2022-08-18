const logicals = require('../../src/global_styling/functions/logicals.json');
const logicalProperties = Object.keys(logicals);

const logicalValues = {
  'text-align: left': 'text-align: start',
  'text-align: right': 'text-align: end',
  // TODO: Consider adding float, clear, & resize as well
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
};

const logicalPropertiesRegex = logicalProperties.join('|');
const logicalValuesRegex = Object.keys(logicalValues).join('|');
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences
const regex = new RegExp(
  `^(?<whitespace>[\\s]*)((?<property>${logicalPropertiesRegex}):)|(?<value>${logicalValuesRegex})`,
  'gm'
);

const logicalsFixMap = { ...logicals, ...logicalValues };

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce using CSS logical properties in our Emotion CSS',
    },
    messages: {
      preferLogicalProperty:
        'Prefer the CSS logical property for {{ property }} - @see src/global_styling/functions/logicals.ts',
      preferLogicalValue:
        'Prefer the CSS logical value for {{ property }} - @see src/global_styling/functions/logicals.ts',
    },
    fixable: 'code',
  },
  create: function (context) {
    return {
      TemplateLiteral(node) {
        const templateContents = node.quasis || [];
        templateContents.forEach((quasi) => {
          const stringLiteral = quasi?.value?.raw;
          if (!stringLiteral) return;

          findOccurrences(regex, stringLiteral).forEach(
            ({ match, lineNumber, column }) => {
              const property = match.groups.property || match.groups.value;
              const whitespace = match.groups.whitespace?.length || 0;

              const lineStart = quasi.loc.start.line + lineNumber;
              const columnStart = column + whitespace;

              context.report({
                loc: {
                  start: {
                    line: lineStart,
                    column: columnStart,
                  },
                  end: {
                    line: lineStart,
                    column: columnStart + property.length,
                  },
                },
                messageId: match.groups.value
                  ? 'preferLogicalValue'
                  : 'preferLogicalProperty',
                data: { property },
                fix: function (fixer) {
                  const literalStart = quasi.range[0] + 1; // Account for backtick
                  const indexStart = literalStart + match.index + whitespace;

                  return fixer.replaceTextRange(
                    [indexStart, indexStart + property.length],
                    logicalsFixMap[property]
                  );
                },
              });
            }
          );
        });
      },
    };
  },
};

/**
 * Regex helpers for finding the location of a property
 * (vs highlighting the entire css`` node)
 *
 * credit to https://stackoverflow.com/a/61725880/4294462
 */

const lineNumberByIndex = (index, string) => {
  const re = /^[\S\s]/gm;
  let line = 0,
    match;
  let lastRowIndex = 0;
  while ((match = re.exec(string))) {
    if (match.index > index) break;
    lastRowIndex = match.index;
    line++;
  }
  return [Math.max(line - 1, 0), lastRowIndex];
};

const findOccurrences = (needle, haystack) => {
  let match;
  const result = [];
  while ((match = needle.exec(haystack))) {
    const pos = lineNumberByIndex(needle.lastIndex, haystack);
    result.push({
      match,
      lineNumber: pos[0],
      column: needle.lastIndex - pos[1] - match[0].length,
    });
  }
  return result;
};
