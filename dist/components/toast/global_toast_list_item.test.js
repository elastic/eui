'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _global_toast_list_item = require('./global_toast_list_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiGlobalToastListItem', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _global_toast_list_item.KuiGlobalToastListItem,
      null,
      _react2.default.createElement(
        'div',
        null,
        'Hi'
      )
    ));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=global_toast_list_item.test.js.map