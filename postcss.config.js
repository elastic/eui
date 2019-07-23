module.exports = {
  plugins: [
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
    require('postcss-inline-svg')({ relative: true, path: __dirname }),
  ],
};
