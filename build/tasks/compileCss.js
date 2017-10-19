const sass = require('node-sass');
const postcss = require('postcss');
const postcssConfig = require('../postcss.config');

module.exports = function (grunt) {
  grunt.registerTask('compileCss', function () {
    const done = this.async();

    uiFrameworkCompile()
      .then(done)
      .catch(err => grunt.log.error(err));

    function uiFrameworkCompile() {
      const compileTheme = name => {
        const src = `src/${name}.scss`;
        const dest = `dist/eui_${name}.css`;

        return new Promise(resolve => {
          sass.render({
            file: src,
          }, function (error, result) {
            if (error) {
              grunt.log.error(error);
              return;
            }

            postcss([postcssConfig])
              .process(result.css, { from: src, to: dest })
              .then(result => {
                grunt.file.write(dest, result.css);

                if (result.map) {
                  grunt.file.write(`${dest}.map`, result.map);
                }

                resolve();
              });
          });
        });
      };

      return Promise.all([compileTheme('theme_light'), compileTheme('theme_dark')]);
    }
  });
};
