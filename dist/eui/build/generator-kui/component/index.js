'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chalk = require('chalk');
var Generator = require('yeoman-generator');
var utils = require('../utils');

module.exports = function (_Generator) {
  _inherits(_class, _Generator);

  function _class(args, options) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));

    _this.fileType = options.fileType;
    return _this;
  }

  _createClass(_class, [{
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      return this.prompt([{
        message: 'What\'s the name of this component? Use snake_case, please.',
        name: 'name',
        type: 'input'
      }, {
        message: 'Where do you want to create this component\'s files?',
        type: 'input',
        name: 'path',
        default: 'src/components',
        store: true
      }, {
        message: 'Does it need its own directory?',
        name: 'shouldMakeDirectory',
        type: 'confirm',
        default: true
      }]).then(function (answers) {
        _this2.config = answers;

        if (!answers.name || !answers.name.trim()) {
          _this2.log.error('Sorry, please run this generator again and provide a component name.');
          process.exit(1);
        }
      });
    }
  }, {
    key: 'writing',
    value: function writing() {
      var _this3 = this;

      var config = this.config;

      var writeComponent = function writeComponent(isStatelessFunction) {
        var componentName = utils.makeComponentName(config.name);
        var cssClassName = utils.lowerCaseFirstLetter(componentName);
        var fileName = config.name;

        var path = utils.addDirectoryToPath(config.path, fileName, config.shouldMakeDirectory);

        var vars = config.vars = {
          componentName: componentName,
          cssClassName: cssClassName,
          fileName: fileName
        };

        var componentPath = config.componentPath = path + '/' + fileName + '.js';
        var testPath = config.testPath = path + '/' + fileName + '.test.js';
        var stylesPath = config.stylesPath = path + '/_' + fileName + '.scss';
        config.stylesImportPath = './_' + fileName + '.scss';

        // If it needs its own directory then it will need a root index file too.
        if (_this3.config.shouldMakeDirectory) {
          _this3.fs.copyTpl(_this3.templatePath('_index.scss'), _this3.destinationPath(path + '/_index.scss'), vars);

          _this3.fs.copyTpl(_this3.templatePath('index.js'), _this3.destinationPath(path + '/index.js'), vars);
        }

        // Create component file.
        _this3.fs.copyTpl(isStatelessFunction ? _this3.templatePath('stateless_function.js') : _this3.templatePath('component.js'), _this3.destinationPath(componentPath), vars);

        // Create component test file.
        _this3.fs.copyTpl(_this3.templatePath('test.js'), _this3.destinationPath(testPath), vars);

        // Create component styles file.
        _this3.fs.copyTpl(_this3.templatePath('_component.scss'), _this3.destinationPath(stylesPath), vars);
      };

      switch (this.fileType) {
        case 'component':
          writeComponent();
          break;

        case 'function':
          writeComponent(true);
          break;
      }
    }
  }, {
    key: 'end',
    value: function end() {
      var _this4 = this;

      var showImportComponentSnippet = function showImportComponentSnippet() {
        var componentName = _this4.config.vars.componentName;
        var componentPath = _this4.config.componentPath;

        _this4.log(chalk.white('\n// Export component (e.. from component\'s index.js).'));
        _this4.log(chalk.magenta('export') + ' {\n' + ('  ' + componentName + ',\n') + ('} ' + chalk.magenta('from') + ' ' + chalk.cyan('\'./' + _this4.config.name + '\'') + ';'));

        _this4.log(chalk.white('\n// Import styles.'));
        _this4.log(chalk.magenta('@import') + ' ' + chalk.cyan('\'' + _this4.config.name + '\'') + ';');

        _this4.log(chalk.white('\n// Import component styles into the root index.scss.'));
        _this4.log(chalk.magenta('@import') + ' ' + chalk.cyan('\'' + _this4.config.name + '/index\'') + ';');
      };

      this.log('------------------------------------------------');
      this.log(chalk.bold('Handy snippets:'));
      switch (this.fileType) {
        case 'component':
          showImportComponentSnippet();
          break;

        case 'function':
          showImportComponentSnippet();
          break;
      }
      this.log('------------------------------------------------');
    }
  }]);

  return _class;
}(Generator);