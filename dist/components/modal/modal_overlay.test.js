'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _modal_overlay = require('./modal_overlay');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiModalOverlay', function () {
  var component = _react2.default.createElement(
    _modal_overlay.KuiModalOverlay,
    _required_props.requiredProps,
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
//# sourceMappingURL=modal_overlay.test.js.map