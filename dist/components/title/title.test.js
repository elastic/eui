'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _title = require('./title');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiTitle', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _title.KuiTitle,
      _required_props.requiredProps,
      _react2.default.createElement(
        'h1',
        null,
        'Title'
      )
    ));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=title.test.js.map