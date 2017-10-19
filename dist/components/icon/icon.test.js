'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _icon = require('./icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiIcon', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_icon.KuiIcon, _extends({ type: 'search' }, _required_props.requiredProps)));

    expect(component).toMatchSnapshot();
  });

  describe('title', function () {
    test('defaults to a humanized version of the type', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_icon.KuiIcon, { type: 'dashboardApp' }));

      expect(component).toMatchSnapshot();
    });

    test('is rendered', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_icon.KuiIcon, { type: 'search', title: 'a custom title' }));

      expect(component).toMatchSnapshot();
    });
  });

  describe('renders size', function () {
    _icon.SIZES.forEach(function (size) {
      test(size, function () {
        var component = (0, _enzyme.render)(_react2.default.createElement(_icon.KuiIcon, { type: 'search', size: size }));

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('renders type', function () {
    _icon.TYPES.forEach(function (type) {
      test(type, function () {
        var component = (0, _enzyme.render)(_react2.default.createElement(_icon.KuiIcon, { type: type }));

        expect(component).toMatchSnapshot();
      });
    });
  });
});