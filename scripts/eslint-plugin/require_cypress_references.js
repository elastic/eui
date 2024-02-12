const CYPRESS_TYPES = '/// <reference types="cypress" />';
const CYPRESS_REAL_EVENT_TYPES =
  '/// <reference types="cypress-real-events" />';
const CYPRESS_CUSTOM_TYPES_REGEX =
  /^\/ <reference types="(\.\.?\/?)+\/cypress\/support" \/>$/;

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce `/// <reference types />` in Cypress files for IDE autocompletion',
    },
    fixable: 'code',
  },
  create: (context) => ({
    Program(program) {
      const fileName = context.getFilename();
      const isCypressTestFile =
        fileName.endsWith('.spec.tsx') || fileName.endsWith('.a11y.tsx');
      const isJestTest = typeof jest !== 'undefined';
      if (!isCypressTestFile && !isJestTest) return;

      const sourceCode = context.getSourceCode();
      const comments = sourceCode.getAllComments();

      let hasCypressTypes,
        hasRealEventTypes,
        hasCustomTypes,
        endOfLicenseComment = { line: 0, range: 0 };

      comments.forEach((node) => {
        const nodeAfterPosition = {
          line: node.loc.end.line + 1,
          range: node.range[1] + 1,
        };
        const nodeBeforePosition = {
          line: node.loc.end.line - 1,
          range: node.range[0] - 1,
        };

        switch (node.value) {
          case CYPRESS_TYPES.substring(2):
            hasCypressTypes = nodeAfterPosition;
            break;
          case CYPRESS_REAL_EVENT_TYPES.substring(2):
            hasRealEventTypes = nodeAfterPosition;
          default:
            if (node.value.match(CYPRESS_CUSTOM_TYPES_REGEX)) {
              hasCustomTypes = nodeBeforePosition;
            }
            if (node.value.includes('Copyright Elasticsearch')) {
              endOfLicenseComment = nodeAfterPosition;
            }
            break;
        }
      });

      let customCypressTypes;
      if (!hasCustomTypes) {
        // Get relative path to Cypress directory
        let relativePaths = '..'; // Default fallback
        try {
          const euiRootDir = fileName.split('eui/');
          const numberOfDirsFromRoot = euiRootDir[1].split('/').length - 1;
          relativePaths = [...Array(numberOfDirsFromRoot)]
            .map(() => '..')
            .join('/');
        } catch {}
        customCypressTypes = `/// <reference types="${relativePaths}/cypress/support" />`;
      }

      // Check if all 3 references are missing
      if (!hasCypressTypes && !hasRealEventTypes && !hasCustomTypes) {
        return context.report({
          message: 'Cypress files should include all /// <reference types>',
          loc: {
            start: { line: endOfLicenseComment.line, column: 0 },
            end: { line: endOfLicenseComment.line, column: 0 },
          },
          fix(fixer) {
            return fixer.replaceTextRange(
              [endOfLicenseComment.range, endOfLicenseComment.range],
              [
                '',
                CYPRESS_TYPES,
                CYPRESS_REAL_EVENT_TYPES,
                customCypressTypes,
                '',
              ].join('\n')
            );
          },
        });
      }

      // Individual checks for each type

      if (!hasCustomTypes) {
        const previousReferenceLine = hasRealEventTypes || hasCypressTypes;
        context.report({
          message:
            'Cypress files should include a reference type to our custom `cypress/support/index.d.ts` types',
          loc: {
            start: { line: previousReferenceLine.line, column: 0 },
            end: { line: previousReferenceLine.line, column: 0 },
          },
          fix(fixer) {
            return fixer.replaceTextRange(
              [previousReferenceLine.range, previousReferenceLine.range],
              customCypressTypes + '\n'
            );
          },
        });
      }

      if (!hasRealEventTypes) {
        const previousReferenceLine = hasCypressTypes || hasCustomTypes;
        context.report({
          message:
            'Cypress files should include /// <reference type="cypress-real-events" />',
          loc: {
            start: { line: previousReferenceLine.line, column: 0 },
            end: { line: previousReferenceLine.line, column: 0 },
          },
          fix(fixer) {
            return fixer.replaceTextRange(
              [previousReferenceLine.range, previousReferenceLine.range],
              CYPRESS_REAL_EVENT_TYPES + '\n'
            );
          },
        });
      }

      if (!hasCypressTypes) {
        context.report({
          message:
            'Cypress files should include /// <reference type="cypress" />',
          loc: {
            start: { line: endOfLicenseComment.line, column: 0 },
            end: { line: endOfLicenseComment.line, column: 0 },
          },
          fix(fixer) {
            return fixer.replaceTextRange(
              [endOfLicenseComment.range, endOfLicenseComment.range],
              '\n' + CYPRESS_TYPES
            );
          },
        });
      }
    },
  }),
};
