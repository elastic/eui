'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _modal = require('./modal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiModal', function () {
  var component = _react2.default.createElement(
    _modal.KuiModal,
    _extends({
      onClose: function onClose() {}
    }, _required_props.requiredProps),
    'children'
  );

  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
//# sourceMappingURL=modal.test.js.map