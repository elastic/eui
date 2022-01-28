/**
 * renderJsSource code is responsible for formatting the JavaScript that goes into the DemoJS within the
 * EUI Docs. In addition to formatting the code for the tab, this function also combines EUI imports by
 * searching code.default for all EUI imports, extracting the variables, and combining them at the top of
 * the formatted code.
 */

import { cleanEuiImports } from '../../services';

export const renderJsSourceCode = (code) => {
  let renderedCode = cleanEuiImports(code.default);

  /* ----- Combine and clean Eui imports ----- */
  let elasticImports = [''];

  // Find all imports that come from '@elastic/eui'
  renderedCode = renderedCode.replace(
    // [\r\n]                       - start of a line
    // import\s+\{                  - import / whitespace / opening brace
    // ([^}]+)                      - group together anything that isn't a closing brace
    // \}\s+from\s+'@elastic\/eui'; - closing brace / whitespace / from / whitespace / '@elastic/eui';
    // [\r\n]                       - match end of line, so the extra new line is removed via the replace operation
    /[\r\n]import\s+\{([^}]+)\}\s+from\s+'@elastic\/eui';/g,
    (match, imports) => {
      // remove any additional characters from imports
      const namedImports = imports.match(/[a-zA-Z0-9]+/g);
      elasticImports.push(...namedImports);
      return '';
    }
  );

  // Remove empty spaces in the array
  elasticImports = elasticImports.filter((ele) => ele);

  let formattedEuiImports = '';
  if (elasticImports.length === 1) {
    // Account for and format Eui import statements that only contain one function/utility
    formattedEuiImports = `import { ${elasticImports} } from '@elastic/eui';`;
  } else {
    formattedEuiImports = `import { \n  ${elasticImports.slice(
      0,
      1
    )}\n  ${elasticImports.slice(1).join(', \n  ')} \n} from '@elastic/eui';`;
  }

  /* ----- Combine and clean non-Eui Imports ----- */
  const nonEuiImports = [];

  // renderedCode at this point will only include non-Eui imports and component code
  renderedCode = renderedCode.replace(
    /import\s+([^]+?)\s+from\s+(\'[A-Za-z0-9 _./-]*\'\;)/g,
    (match, imports) => {
      // Catches import statements that are only pulling in one function/utility. Examples include:
      // import React from 'react';
      // import { fake } from 'faker';
      if (imports.match(/[a-zA-Z0-9]+/g).length === 1) {
        nonEuiImports.push(match);
      } else {
        // Composes and formats import statements with multiple functions/utilities. Examples inlcude
        // import React, { Fragment, useState } from 'react';
        // import { test1, test2 } from 'test-library';
        let composingImport = '';
        const namedImports = imports.match(/[a-zA-Z0-9\{\}]+/g);
        const library = match.match(/from\s\'[A-Za-z0-9_.-]+\';/g);

        namedImports.forEach((ele, index) => {
          if (ele === '{' && index === 0) {
            composingImport += `${ele}\n`;
          } else if (ele === '{' && index !== 0) {
            composingImport += `${ele}\n`;
          } else if (ele === '}') {
            composingImport += `${ele}`;
          } else {
            namedImports[index + 1] === '{'
              ? (composingImport += `${ele},`)
              : (composingImport += `  ${ele},\n`);
          }
        });

        nonEuiImports.push(`import ${composingImport} ${library}`);
      }

      return '';
    }
  );
  const formattedNonEuiImports = nonEuiImports.join('\n');

  // renderedCode at this point will only include the demo component code
  const fullyFormattedCode = `${formattedEuiImports}\n${formattedNonEuiImports}\n\n${renderedCode.trim()}`;

  return fullyFormattedCode;
};
