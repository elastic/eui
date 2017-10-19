'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _modal_header_title = require('./modal_header_title');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiModalHeaderTitle', function () {
  var component = _react2.default.createElement(
    _modal_header_title.KuiModalHeaderTitle,
    _required_props.requiredProps,
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
//# sourceMappingURL=modal_header_title.test.js.map