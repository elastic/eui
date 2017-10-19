'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _popover = require('./popover');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiPopover', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, _extends({
      button: _react2.default.createElement('button', null),
      closePopover: function closePopover() {}
    }, _required_props.requiredProps)));

    expect(component).toMatchSnapshot();
  });

  test('children is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _popover.KuiPopover,
      {
        button: _react2.default.createElement('button', null),
        closePopover: function closePopover() {}
      },
      'Children'
    ));

    expect(component).toMatchSnapshot();
  });

  describe('anchorPosition', function () {
    test('defaults to center', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
        button: _react2.default.createElement('button', null),
        closePopover: function closePopover() {}
      }));

      expect(component).toMatchSnapshot();
    });

    test('left is rendered', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
        button: _react2.default.createElement('button', null),
        closePopover: function closePopover() {},
        anchorPosition: 'left'
      }));

      expect(component).toMatchSnapshot();
    });

    test('right is rendered', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
        button: _react2.default.createElement('button', null),
        closePopover: function closePopover() {},
        anchorPosition: 'downRight'
      }));

      expect(component).toMatchSnapshot();
    });
  });

  describe('isOpen', function () {
    test('defaults to false', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
        button: _react2.default.createElement('button', null),
        closePopover: function closePopover() {}
      }));

      expect(component).toMatchSnapshot();
    });

    test('renders true', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
        button: _react2.default.createElement('button', null),
        closePopover: function closePopover() {},
        isOpen: true
      }));

      expect(component).toMatchSnapshot();
    });
  });
});
//# sourceMappingURL=popover.test.js.map