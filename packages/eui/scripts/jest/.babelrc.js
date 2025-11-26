module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: { node: 'current' },
      },
    ],
    ['@babel/react', { runtime: 'classic' }],
    '@emotion/babel-preset-css-prop',
    ['@babel/typescript', { isTSX: true, allExtensions: true }],
  ],
};
