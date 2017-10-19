'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _outside_click_detector = require('./outside_click_detector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiOutsideClickDetector', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _outside_click_detector.KuiOutsideClickDetector,
      { onOutsideClick: function onOutsideClick() {} },
      _react2.default.createElement('div', null)
    ));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=outside_click_detector.test.js.map