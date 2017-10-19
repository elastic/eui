'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _page_header = require('./page_header');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiPageHeader', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_page_header.KuiPageHeader, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=page_header.test.js.map