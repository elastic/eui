export const hasDisplayToggles = code => {
  return /DisplayToggles/.test(code);
};

export const cleanEuiImports = code => {
  return code
    .replace(/(from )'(..\/)+src\/components(\/?';)/, "from '@elastic/eui';")
    .replace(
      /(from )'(..\/)+src\/services(\/?';)/,
      "from '@elastic/eui/lib/services';"
    )
    .replace(/(from )'(..\/)+src\/components\/.*?';/, "from '@elastic/eui';");
};

export const listExtraDeps = code => {
  return [
    ...code.matchAll(
      // Match anything not directly calling eui (like lib dirs)
      /(import)(?!.*elastic\/eui)\s.*?'(?<import>[^.].*?)'/g
    ),
  ]
    .map(x => x.groups.import)
    .reduce((deps, dep) => {
      // Hack because the docs are locked to a specific version of React Router
      deps[dep] = dep === 'react-router' ? '^3.2.5' : 'latest';
      return deps;
    }, {});
};
