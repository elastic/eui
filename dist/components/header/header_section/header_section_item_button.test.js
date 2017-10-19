'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _required_props = require('../../../test/required_props');

var _header_section_item_button = require('./header_section_item_button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiHeaderSectionItemButton', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_header_section_item_button.KuiHeaderSectionItemButton, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });

  describe('onClick', function () {
    test('isn\'t called upon instantiation', function () {
      var onClickHandler = _sinon2.default.stub();

      (0, _enzyme.shallow)(_react2.default.createElement(_header_section_item_button.KuiHeaderSectionItemButton, { onClick: onClickHandler }));

      _sinon2.default.assert.notCalled(onClickHandler);
    });

    test('is called when the button is clicked', function () {
      var onClickHandler = _sinon2.default.stub();

      var $button = (0, _enzyme.shallow)(_react2.default.createElement(_header_section_item_button.KuiHeaderSectionItemButton, { onClick: onClickHandler }));

      $button.simulate('click');

      _sinon2.default.assert.calledOnce(onClickHandler);
    });
  });
});