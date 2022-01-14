/**
 * renderJsSource code is responsible for formatting the JavaScript that goes into the DemoJS within the
 * EUI Docs. In addition to formatting the code for the tab, this function also combines EUI imports by
 * searching code.default for all EUI imports, extracting the variables, and combining them at the top of
 * the formatted code.
 */
import { cleanEuiImports } from '../../services';

export const renderJsSourceCode = (code) => {
  let renderedCode = cleanEuiImports(code.default);
  const elasticImports = [''];

  // Find all imports that come from '@elastic/eui'
  renderedCode = renderedCode.replace(
    // [\r\n]                       - start of a line
    // import\s+\{                  - import / whitespace / opening brace
    // ([^}]+)                      - group together anything that isn't a closing brace
    // \}\s+from\s+'@elastic\/eui'; - closing brace / whitespace / from / whitespace / '@elastic/eui';
    // [\r\n]                       - match end of line, so the extra new line is removed via the replace operation
    /[\r\n]import\s+\{([^}]+)\}\s+from\s+'@elastic\/eui';[\r\n]/g,
    (match, imports) => {
      // remove any additional characters from imports
      const namedImports = imports.match(/[a-zA-Z0-9]+/g);
      elasticImports.push(...namedImports);
      return '';
    }
  );

  // Separate the first line (import { ) onto it's own line without a ", "
  // Combine all EUI imports with a comma and new line
  renderedCode = `import { ${elasticImports.slice(
    0,
    1
  )}\n${elasticImports.slice(1).join(', \n')} \n} from '@elastic/eui';
${renderedCode}
  `;

  return renderedCode;
};
