'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _loading_kibana = require('./loading_kibana');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiLoadingKibana', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_loading_kibana.KuiLoadingKibana, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=loading_kibana.test.js.map