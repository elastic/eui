'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _header_section_item = require('./header_section_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiHeaderSectionItem', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_header_section_item.KuiHeaderSectionItem, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });

  describe('border', function () {
    test('defaults to left', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_header_section_item.KuiHeaderSectionItem, null));

      expect(component).toMatchSnapshot();
    });

    test('renders right', function () {
      var component = (0, _enzyme.render)(_react2.default.createElement(_header_section_item.KuiHeaderSectionItem, { border: 'right' }));

      expect(component).toMatchSnapshot();
    });
  });
});