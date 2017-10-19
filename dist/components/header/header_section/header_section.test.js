'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _header_section = require('./header_section');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiHeaderSection', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_header_section.KuiHeaderSection, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });

  describe('side', function () {
    test('defaults to left', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_header_section.KuiHeaderSection, null));

      expect(component).toMatchSnapshot();
    });

    test('renders right', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_header_section.KuiHeaderSection, { side: 'right' }));

      expect(component).toMatchSnapshot();
    });
  });
});