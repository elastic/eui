'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generator = require('yeoman-generator');

var documentationGenerator = require.resolve('../documentation/index.js');

module.exports = function (_Generator) {
  _inherits(_class, _Generator);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      return this.prompt([{
        message: 'What do you want to create?',
        name: 'fileType',
        type: 'list',
        choices: [{
          name: 'Page',
          value: 'documentation'
        }, {
          name: 'Page demo',
          value: 'demo'
        }]
      }]).then(function (answers) {
        _this2.config = answers;
      });
    }
  }, {
    key: 'writing',
    value: function writing() {
      this.composeWith(documentationGenerator, {
        fileType: this.config.fileType
      });
    }
  }]);

  return _class;
}(Generator);