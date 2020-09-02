module.exports = {
  plugins: [
    require('autoprefixer')(),
    require('postcss-inline-svg')({ relative: true, path: __dirname }),
  ],
};
