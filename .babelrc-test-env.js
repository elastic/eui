module.exports = {
  extends: './.babelrc.js',
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-async-to-generator',
  ],
};
