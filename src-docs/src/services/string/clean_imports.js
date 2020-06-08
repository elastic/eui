export const hasDisplayToggles = code => {
  return /DisplayToggles/.test(code);
};

export const cleanEuiImports = code => {
  return code
    .replace(/(from )'(..\/)+src\/components(\/?';)/, "from '@elastic/eui';")
    .replace(
      /(from )'(..\/)+src\/services(\/?';)/,
      "from '@elastic/eui/lib/services';"
    );
};

export const listExtraDeps = code => {
  return code
    .match(
      // Match anything not directly calling eui (like lib dirs)
      /import(?!.*(elastic\/eui|\.))\s.*?'(@[^.]+?\/)?[^.]+?['\/]/g
    )
    .map(match => match.match(/'(.+)['\/]/)[1])
    .reduce((deps, dep) => {
      // Make sure that we are using the latest version of a dep
      deps[dep] = 'latest';
      return deps;
    }, {});
};
