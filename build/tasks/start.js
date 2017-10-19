const os = require('os');
const chokidar = require('chokidar');
const { debounce } = require('lodash');
const platform = os.platform();
const isPlatformWindows = /^win/.test(platform);

module.exports = function (grunt) {
  grunt.registerTask('start', function () {
    const done = this.async();

    Promise
      .all([
        uiFrameworkWatch(),
        uiFrameworkServerStart()
      ])
      .then(done)
      .catch(err => grunt.log.error(err));

    function uiFrameworkWatch() {
      const debouncedCompile = debounce(() => {
        // Compile the SCSS in a separate process because node-sass throws a fatal error if it fails
        // to compile.
        grunt.util.spawn({
          cmd: isPlatformWindows ? '.\\node_modules\\.bin\\grunt.cmd' : './node_modules/.bin/grunt',
          args: [
            'compileCss',
          ],
        }, (error, result) => {
          if (error) {
            grunt.log.error(result.stdout);
          } else {
            grunt.log.writeln(result);
          }
        });
      }, 400, { leading: true });

      return new Promise(() => {
        debouncedCompile();

        chokidar.watch('src', { ignoreInitial: true }).on('all', (event, path) => {
          grunt.log.writeln(event, path);
          debouncedCompile();
        });
      });
    }

    function uiFrameworkServerStart() {
      const serverCmd = {
        cmd: isPlatformWindows ? '.\\node_modules\\.bin\\webpack-dev-server.cmd' : './node_modules/.bin/webpack-dev-server',
        args: [
          '--config=docs/webpack.config.js',
          '--inline',
          '--content-base=docs/build',
          '--host=0.0.0.0',
          '--port=8020',
        ],
        opts: { stdio: 'inherit' }
      };

      return new Promise((resolve, reject) => {
        grunt.util.spawn(serverCmd, (error, result, code) => {
          if (error || code !== 0) {
            const message = result.stderr || result.stdout;

            grunt.log.error(message);

            return reject();
          }

          grunt.log.writeln(result);

          resolve();
        });

      });
    }

  });
};
