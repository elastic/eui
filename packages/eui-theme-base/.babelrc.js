module.exports = {
  // We need to preserve comments as they are used by webpack for
  // naming chunks during code-splitting. The compression step during
  // bundling will remove them later.
  comments: true,

  presets: [
    [
      '@babel/env',
      {
        // `targets` property set via `.browserslistrc`
        useBuiltIns: process.env.NO_COREJS_POLYFILL ? false : 'usage',
        corejs: !process.env.NO_COREJS_POLYFILL ? '3.6' : undefined,
        modules: process.env.BABEL_MODULES
          ? process.env.BABEL_MODULES === 'false'
            ? false
            : process.env.BABEL_MODULES
          : 'commonjs', // babel's default is commonjs
      },
    ],
    ['@babel/react', { runtime: 'classic' }],
    [
      '@babel/typescript',
      { isTSX: true, allExtensions: true, allowDeclareFields: true },
    ],
  ],
};
