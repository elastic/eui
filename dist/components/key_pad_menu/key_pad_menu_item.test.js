'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _required_props = require('../../test/required_props');

var _key_pad_menu_item = require('./key_pad_menu_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiKeyPadMenuItem', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _key_pad_menu_item.KuiKeyPadMenuItem,
      _extends({ label: 'Label' }, _required_props.requiredProps),
      'Icon'
    ));

    expect(component).toMatchSnapshot();
  });

  test('renders href', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _key_pad_menu_item.KuiKeyPadMenuItem,
      { label: 'Label', href: '#' },
      'Icon'
    ));

    expect(component).toMatchSnapshot();
  });
});

describe('KuiKeyPadMenuItemButton', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(
      _key_pad_menu_item.KuiKeyPadMenuItemButton,
      _extends({ label: 'Label' }, _required_props.requiredProps),
      'Icon'
    ));

    expect(component).toMatchSnapshot();
  });

  describe('onClick', function () {
    test('isn\'t called upon instantiation', function () {
      var onClickHandler = _sinon2.default.stub();

      (0, _enzyme.shallow)(_react2.default.createElement(
        _key_pad_menu_item.KuiKeyPadMenuItemButton,
        { label: 'Label', onClick: onClickHandler },
        'Icon'
      ));

      _sinon2.default.assert.notCalled(onClickHandler);
    });

    test('is called when the button is clicked', function () {
      var onClickHandler = _sinon2.default.stub();

      var $button = (0, _enzyme.shallow)(_react2.default.createElement(
        _key_pad_menu_item.KuiKeyPadMenuItemButton,
        { label: 'Label', onClick: onClickHandler },
        'Icon'
      ));

      $button.simulate('click');

      _sinon2.default.assert.calledOnce(onClickHandler);
    });
  });
});