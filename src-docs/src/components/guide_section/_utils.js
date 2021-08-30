import { cleanEuiImports } from '../../services';

export const renderJsSourceCode = (code) => {
  let renderedCode = cleanEuiImports(code.default).split('\n');
  const linesWithImport = [];
  // eslint-disable-next-line guard-for-in
  for (const idx in renderedCode) {
    const line = renderedCode[idx];
    if (line.includes('import') && line.includes("from '@elastic/eui';")) {
      linesWithImport.push(line);
      renderedCode[idx] = '';
    }
  }
  if (linesWithImport.length > 1) {
    linesWithImport[0] = linesWithImport[0].replace(
      " } from '@elastic/eui';",
      ','
    );
    for (let i = 1; i < linesWithImport.length - 1; i++) {
      linesWithImport[i] = linesWithImport[i]
        .replace('import {', '')
        .replace(" } from '@elastic/eui';", ',');
    }
    linesWithImport[linesWithImport.length - 1] = linesWithImport[
      linesWithImport.length - 1
    ].replace('import {', '');
  }
  const newImport = linesWithImport.join('');
  renderedCode.unshift(newImport);
  renderedCode = renderedCode.join('\n');
  let len = renderedCode.replace('\n\n\n', '\n\n').length;
  while (len < renderedCode.length) {
    renderedCode = renderedCode.replace('\n\n\n', '\n\n');
    len = renderedCode.replace('\n\n\n', '\n\n').length;
  }

  return renderedCode;
};
