module.exports = {
  presets: [
    ['@babel/react', { runtime: 'classic' }],
    [
      '@babel/typescript',
      { isTSX: true, allExtensions: true, allowDeclareFields: true },
    ],
    '@emotion/babel-preset-css-prop',
  ],
  plugins: [
    '@babel/proposal-object-rest-spread',
    '@babel/proposal-class-properties',
  ],
  env: {
    cypress_test: {
      plugins: ['istanbul'],
    },
  },
};
