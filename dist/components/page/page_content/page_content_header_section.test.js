'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _page_content_header_section = require('./page_content_header_section');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiPageContentHeaderSection', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_page_content_header_section.KuiPageContentHeaderSection, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=page_content_header_section.test.js.map