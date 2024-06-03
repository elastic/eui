export const hasDisplayToggles = (code) => {
  return /DisplayToggles/.test(code);
};

export const cleanEuiImports = (code) => {
  let cleanedCode = code;

  // Charts themes have a non-top-level import
  if (code.includes('EUI_CHARTS_THEME_')) {
    cleanedCode = cleanedCode.replace(
      /(from )'(..\/)+src\/themes\/charts\/themes';/g,
      "from '@elastic/eui/dist/eui_charts_theme';"
    );
  }

  // Replace all other relative src imports
  cleanedCode = cleanedCode.replace(
    /(from )'(..\/)+src(\/.*)?';/g,
    "from '@elastic/eui';"
  );
  return cleanedCode;
};

export const listExtraDeps = (code) => {
  return code
    .match(
      // Match anything not directly calling eui (like lib dirs)
      /*
        flags:
          g - find all occurances
          m - multiline, ^ and $ match start and end of lines, not beginning & end of the whole string
          s - dotall, allow . to match newlines
        ^import - start matching at any import at the beginning of a line - `m` flag enters multi-line
        [^;]*? - match anything that isn't the statement-closing semicolon (necessary due to multi-line matching)
        from\s' - anchor to the from[whitespace]' syntax
        (?!@elastic\/eui|\.).*? - match anything inside the quotes as long as it doesn't start with @elastic/eui or .
        '; - end of import source & closing semicolon
      */
      /^import[^;]*?from\s'(?!@elastic\/eui|\.).*?';/gms
    )
    .map((match) => match.match(/'(.+)['\/]/)[1])
    .reduce((deps, dep) => {
      // Make sure that we are using the latest version of a dep
      deps[dep] = 'latest';
      return deps;
    }, {});
};
