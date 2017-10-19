'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _side_nav_item = require('./side_nav_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiSideNavItem', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _side_nav_item.KuiSideNavItem,
      null,
      _react2.default.createElement('button', _required_props.requiredProps)
    ));

    expect(component).toMatchSnapshot();
  });

  test('preserves child\'s classes', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _side_nav_item.KuiSideNavItem,
      null,
      _react2.default.createElement('button', { className: 'test' })
    ));

    expect(component).toMatchSnapshot();
  });

  describe('isSelected', function () {
    test('defaults to false', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(
        _side_nav_item.KuiSideNavItem,
        null,
        _react2.default.createElement('button', null)
      ));

      expect(component).toMatchSnapshot();
    });

    test('is rendered when specified as true', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(
        _side_nav_item.KuiSideNavItem,
        { isSelected: true },
        _react2.default.createElement('button', null)
      ));

      expect(component).toMatchSnapshot();
    });
  });
});
//# sourceMappingURL=side_nav_item.test.js.map