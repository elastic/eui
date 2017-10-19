'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _tabs = require('./tabs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiTabs', function () {
  test('renders', function () {
    var component = _react2.default.createElement(_tabs.KuiTabs, _required_props.requiredProps);

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });
});