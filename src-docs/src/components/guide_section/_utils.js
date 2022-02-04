/**
 * renderJsSource code is responsible for formatting the JavaScript that goes into the DemoJS within the
 * EUI Docs. In addition to formatting the code for the tab, this function also combines EUI imports by
 * searching code.default for all EUI imports, extracting the variables, and combining them at the top of
 * the formatted code.
 */

import { cleanEuiImports } from '../../services';

export const renderJsSourceCode = (code) => {
  let renderedCode = cleanEuiImports(code.default);

  /* ----- Combine and clean EUI imports ----- */
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

  // determine if imports should be wrapped to new lines based on the import statement length
  if (wrapImportsOnNewLines(elasticImports)) {
    const lineSeparatedImports = elasticImports.join(',\n  ');
    formattedEuiImports = `import {\n  ${lineSeparatedImports},\n} from '@elastic/eui';`;
  } else {
    const combinedImports = elasticImports.join(', ');
    formattedEuiImports = `import { ${combinedImports} } from '@elastic/eui';`;
  }

  // Find any non-EUI imports and join them with new lines between each import for uniformity
  const nonEuiImports = [];

  renderedCode = renderedCode.replace(
    /import\s+([^]+?)\s+from\s+(\'[A-Za-z0-9 _./-]*\'\;)/g,
    (match) => {
      nonEuiImports.push(match);
      return '';
    }
  );

  const formattedNonEuiImports = nonEuiImports.join('\n');

  const fullyFormattedCode = `${formattedEuiImports}\n${formattedNonEuiImports}\n\n${renderedCode.trim()}`;
  console.log(renderedCode);
  return fullyFormattedCode;
};

/**
 * checkForLineWrap is a helper method used to check the line length of import statements before
 * they are separated by new lines. If the statements are under 81 characters in length, they will
 * remain on one line. Otherwise, the imports will be broken into new lines.
 */

const wrapImportsOnNewLines = (importStatement) => {
  const combinedImports = importStatement.join(', ');
  const fullStatement = `import { ${combinedImports} } from '@elastic/eui';`;
  return fullStatement.length > 81 ? true : false;
};
