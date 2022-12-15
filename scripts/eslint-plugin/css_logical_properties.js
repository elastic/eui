const {
  _shorthands,
  ...logicals
} = require('../../src/global_styling/functions/logicals.json');
const logicalProperties = Object.keys(logicals);
const logicalPropertiesRegex = logicalProperties.join('|');

const logicalValues = {
  'text-align: left': 'text-align: start',
  'text-align: right': 'text-align: end',
  // TODO: Consider adding float, clear, & resize as well
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
};
const logicalValuesRegex = Object.keys(logicalValues).join('|');

// Construct a regex to find shorthands with more than one value
// Shorthands with only 1 value set (applied to all 4 sides) are fine
const logicalShorthandsRegexes = _shorthands.map((property) => {
  const start = `${property}:\\s*`; // e.g. `margin: `
  const interpolatedVar = '\\${[^}]+}'; // e.g. `${euiTheme.something}`
  const staticValue = '[^\\s(!};]'; // e.g. `20px` - any value that doesn't have a space, !keyword, } interpolation, or semicolon
  const value = `(${interpolatedVar}|${staticValue})+`; // Values can be variable or static
  const end = ';'; // Ensure that the match ends with a semicolon

  return `(${start}(${value}\\s+)+${value}${end})`; // Only match multiple values (spaces between values)
});
const logicalShorthandsRegex = logicalShorthandsRegexes.join('|');

// Frankensteining it all together into one horrific regex
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences
const regex = new RegExp(
  `^(?<whitespace>[\\s]*)((?<property>${logicalPropertiesRegex}):)|(?<value>${logicalValuesRegex})|(?<shorthand>${logicalShorthandsRegex})`,
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
      preferLogicalShorthand:
        "Prefer using EUI's `logicalShorthandCSS` utility for shorthands with more than one side - @see src/global_styling/functions/logicals.ts",
    },
    fixable: 'code',
    // NOTE: To disable this lint rule for a single line/property within a css`` block
    // your code must use a comment inside a template literal, e.g.:
    // css`
    //   color: red;
    //   height: 40px; ${/* eslint-disable-line local/css-logical-properties */ ''}
    // `
  },
  create: function (context) {
    return {
      TemplateLiteral(node) {
        const stringLiteral = context.getSourceCode().getText(node);
        const content = stringLiteral.replace(/^`|`$/g, ''); // Strip starting/ending backtick

        findOccurrences(regex, content).forEach(
          ({ match, lineNumber, column }) => {
            const property =
              match.groups.property ||
              match.groups.value ||
              match.groups.shorthand;
            const whitespace = match.groups.whitespace?.length || 0;

            const lineStart = node.loc.start.line + lineNumber;
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
              messageId: match.groups.shorthand
                ? 'preferLogicalShorthand'
                : match.groups.value
                ? 'preferLogicalValue'
                : 'preferLogicalProperty',
              data: { property },
              fix: function (fixer) {
                if (match.groups.shorthand) return false;

                const literalStart = node.range[0] + 1; // Account for stripped backtick
                const indexStart = literalStart + match.index + whitespace;

                return fixer.replaceTextRange(
                  [indexStart, indexStart + property.length],
                  logicalsFixMap[property]
                );
              },
            });
          }
        );
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
