module.exports = {
  extends: '<rootDir>/../../.babelrc.js',
  presets: [
    [
      '@babel/env',
      {
        targets: { node: 'current' },
      },
    ],
  ],
};
