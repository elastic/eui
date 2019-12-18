const rimraf = require('rimraf');

rimraf.sync('dist');
rimraf.sync('lib');
rimraf.sync('es');
rimraf.sync('kbn-test');
