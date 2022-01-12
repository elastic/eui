/**
 * renderJsSource code is responsible for formatting the JavaScript that goes into the DemoJS within the
 * EUI Docs. In addition to formatting the code for the tab, this function also combines EUI imports by
 * searching code.default for all EUI imports, extracting the variables, and combining them at the top of
 * the formatted code.
 */
import { cleanEuiImports } from '../../services';

export const renderJsSourceCode = (code) => {
  let renderedCode = cleanEuiImports(code.default);
  const elasticImports = [];

  // Find all imports that come from '@elastic/eui'
  renderedCode = renderedCode.replace(
    /[\r\n]import\s+\{(?<imports>.+?)\}\s+from\s'@elastic\/eui';[\r\n]/gs,
    (match, imports) => {
      // remove any additional characters from imports
      const namedImports = imports.match(/[a-zA-Z0-9]+/g);
      elasticImports.push(...namedImports);
      return '';
    }
  );
  renderedCode = `import { ${elasticImports.join(', ')} } from '@elastic/eui';
  
${renderedCode}
  `;

  return renderedCode;
};
