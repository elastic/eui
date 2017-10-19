'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _header_breadcrumb = require('./header_breadcrumb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiHeaderBreadcrumb', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _header_breadcrumb.KuiHeaderBreadcrumb,
      _required_props.requiredProps,
      'content'
    ));

    expect(component).toMatchSnapshot();
  });

  test('href is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_header_breadcrumb.KuiHeaderBreadcrumb, { href: '#' }));

    expect(component).toMatchSnapshot();
  });

  test('isActive is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_header_breadcrumb.KuiHeaderBreadcrumb, { isActive: true }));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=header_breadcrumb.test.js.map