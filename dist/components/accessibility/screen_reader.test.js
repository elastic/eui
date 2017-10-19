'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _screen_reader = require('./screen_reader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiScreenReaderOnly', function () {
  describe('adds an accessibility class to a child element', function () {
    test('when used with no props', function () {
      var $paragraph = (0, _enzyme.render)(_react2.default.createElement(
        _screen_reader.KuiScreenReaderOnly,
        null,
        _react2.default.createElement(
          'p',
          null,
          'This paragraph is not visibile to sighted users but will be read by screenreaders.'
        )
      ));

      expect($paragraph).toMatchSnapshot();
    });
    test('and combines other classNames (foo, bar) given as props on the child', function () {
      var $paragraph = (0, _enzyme.render)(_react2.default.createElement(
        _screen_reader.KuiScreenReaderOnly,
        null,
        _react2.default.createElement(
          'p',
          { className: 'foo bar' },
          'This paragraph is not visibile to sighted users but will be read by screenreaders.'
        )
      ));

      expect($paragraph).toMatchSnapshot();
    });
  });
});