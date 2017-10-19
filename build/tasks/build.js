const os = require('os');
const platform = os.platform();
const isPlatformWindows = /^win/.test(platform);

module.exports = function (grunt) {
  grunt.registerTask('build', function () {
    const done = this.async();

    const serverCmd = {
      cmd: isPlatformWindows ? '.\\node_modules\\.bin\\webpack.cmd' : './node_modules/.bin/webpack',
      args: [
        '-p',
        '--config=docs/webpack.config.js'
      ],
      opts: { stdio: 'inherit' }
    };

    const uiFrameworkServerBuild = new Promise((resolve, reject) => {
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

    uiFrameworkServerBuild
      .then(done)
      .catch(err => grunt.log.error(err));
  });
};
