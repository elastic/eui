'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _tab = require('./tab');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiTab', function () {
  test('renders', function () {
    var component = _react2.default.createElement(
      _tab.KuiTab,
      _extends({ onClick: function onClick() {} }, _required_props.requiredProps),
      'children'
    );
    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  test('renders isSelected', function () {
    var component = _react2.default.createElement(
      _tab.KuiTab,
      _extends({ onClick: function onClick() {}, isSelected: true }, _required_props.requiredProps),
      'children'
    );
    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  describe('Props', function () {
    describe('onClick', function () {
      test('is called when the button is clicked', function () {
        var onClickHandler = _sinon2.default.stub();

        var $button = (0, _enzyme.shallow)(_react2.default.createElement(_tab.KuiTab, { onClick: onClickHandler }));

        $button.simulate('click');

        _sinon2.default.assert.calledOnce(onClickHandler);
      });
    });
  });
});
//# sourceMappingURL=tab.test.js.map