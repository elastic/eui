'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _description_list_title = require('./description_list_title');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiDescriptionListTitle', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_description_list_title.KuiDescriptionListTitle, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });
});