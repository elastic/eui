/**
 * renderJsSource code is responsible for formatting the JavaScript that goes into the DemoJS within the
 * EUI Docs. In addition to formatting the code for the tab, this function also combines EUI imports by
 * searching code.default for all EUI imports, extracting the variables, and combining them at the top of
 * the formatted code.
 */

import { cleanEuiImports } from '../../services';

export const renderJsSourceCode = (code) => {
  /**
   * Split code by the first template literal backtick, so we don't catch imports
   * being used as part of a code snippet (that aren't actually valid imports).
   * Template literals aren't valid in import statements & eslint ensures our imports
   * are at the top of the file, so this should be a fairly safe assumption to make
   */
  const [codeBeforeFirstTemplateLiteral, ...rest] = code.default.split('`');
  const remainingCode = rest.length
    ? '`' + rest.join('`') // eslint-disable-line prefer-template
    : ''; // If there were no template literals in the snippet, nothing to do here

  // Clean EUI imports
  let renderedCode = cleanEuiImports(codeBeforeFirstTemplateLiteral);

  /**
   * Extract React import (to ensure it's always at the top)
   */
  let reactImport = '';

  renderedCode = renderedCode.replace(
    // import          - import + space
    // (React)?        - optional import `React` prefix - some files (like hooks) do not need it
    // (, )?           - optional comma after React - some files, like tests, only need the main React import
    // ({([^}]+?)})?   - optionally capture anything that isn't a closing brace between the import braces
    //  from 'react';  - ` from 'react';` exactly
    /import (React)?(, )?({([^}]+?)})? from 'react';/,
    (match) => {
      reactImport = match;
      return '';
    }
  );

  /**
   * Combine and clean EUI imports
   */
  const elasticImports = [];

  // Find all imports that come from '@elastic/eui'
  renderedCode = renderedCode.replace(
    // import {                - import / whitespace / opening brace
    // ([^}]+)                 - group together anything that isn't a closing brace
    // } from '@elastic\/eui'; - closing brace / whitespace / from / whitespace / '@elastic/eui';
    // [\r\n]                  - match end of line, so the extra new line is removed via the replace operation
    /import {([^}]+)} from '@elastic\/eui';[\r\n]/g,
    (match, imports) => {
      // \w+\sas\s\w+          - find any group of words that conform to the alias import pattern (`Thing as OtherThing`)
      const remainingImports = imports.replace(/\w+\sas\s\w+/g, (match) => {
        elasticImports.push(match);
        return '';
      });
      // \b\w+\b               - find any other word remaining after aliases have been removed
      const namedImports = remainingImports.match(/\b\w+\b/g);
      if (namedImports) {
        elasticImports.push(...namedImports);
      }
      return '';
    }
  );

  let formattedEuiImports = '';

  if (elasticImports.length) {
    // Determine if imports should be wrapped to new lines based on the import statement length
    const combinedImports = elasticImports.join(', ');
    const singleLineImports = `import { ${combinedImports} } from '@elastic/eui';`;

    if (singleLineImports.length <= 81) {
      formattedEuiImports = singleLineImports;
    } else {
      const lineSeparatedImports = elasticImports.join(',\n  ');
      formattedEuiImports = `import {\n  ${lineSeparatedImports},\n} from '@elastic/eui';`;
    }
  }

  /**
   * Extract remaining non-React/EUI imports
   */
  const remainingImports = [];

  renderedCode = renderedCode.replace(
    // (\/\/.+\n)?                   - optional preceding comments that must be above specific imports, e.g. // @ts-ignore
    // import                        - import + whitespace
    // ([^]+?)                       - capture any characters (including newlines)
    //  from ('[A-Za-z0-9 -_.@/]*';) - ` from 'someLibrary';` - alphanumeric and certain special characters only
    /(\/\/.+\n)?import ([^]+?) from ('[A-Za-z0-9 -_.@/]*';)/g,
    (match) => {
      remainingImports.push(match);
      return '';
    }
  );

  /**
   * Putting it all together
   */
  // Render each import with just 1 newline between them for uniformity
  const renderedImports = [
    reactImport,
    formattedEuiImports,
    ...remainingImports,
  ]
    .filter((stripEmptyImports) => stripEmptyImports)
    .join('\n');
  // Trim starting/ending newlines (but not spaces) in the remaining code
  renderedCode = renderedCode.replace(/^[\r\n]+|[\r\n]+$/g, '');

  return `${renderedImports}\n\n${renderedCode}${remainingCode}`;
};
