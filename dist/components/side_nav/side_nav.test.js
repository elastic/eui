'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _side_nav = require('./side_nav');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiSideNav', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_side_nav.KuiSideNav, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });

  describe('isOpenOnMobile', function () {
    test('defaults to false', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_side_nav.KuiSideNav, null));

      expect(component).toMatchSnapshot();
    });

    test('is rendered when specified as true', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_side_nav.KuiSideNav, { isOpenOnMobile: true }));

      expect(component).toMatchSnapshot();
    });
  });
});