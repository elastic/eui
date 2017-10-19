'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _services = require('../../services');

var _confirm_modal = require('./confirm_modal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onConfirm = void 0;
var onCancel = void 0;

beforeEach(function () {
  onConfirm = _sinon2.default.spy();
  onCancel = _sinon2.default.spy();
});

test('renders KuiConfirmModal', function () {
  var component = (0, _enzyme.render)(_react2.default.createElement(
    _confirm_modal.KuiConfirmModal,
    _extends({
      title: 'A confirmation modal',
      onCancel: function onCancel() {},
      onConfirm: onConfirm,
      cancelButtonText: 'Cancel Button Text',
      confirmButtonText: 'Confirm Button Text'
    }, _required_props.requiredProps),
    'This is a confirmation modal example'
  ));
  expect(component).toMatchSnapshot();
});

test('onConfirm', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
    onCancel: onCancel,
    onConfirm: onConfirm
  }));
  component.find('[data-test-subj="confirmModalConfirmButton"]').simulate('click');
  _sinon2.default.assert.calledOnce(onConfirm);
  _sinon2.default.assert.notCalled(onCancel);
});

describe('onCancel', function () {
  test('triggerd by click', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
      onCancel: onCancel,
      onConfirm: onConfirm
    }));
    component.find('[data-test-subj="confirmModalCancelButton"]').simulate('click');
    _sinon2.default.assert.notCalled(onConfirm);
    _sinon2.default.assert.calledOnce(onCancel);
  });

  test('triggered by esc key', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
      onCancel: onCancel,
      onConfirm: onConfirm,
      'data-test-subj': 'modal'
    }));
    component.find('[data-test-subj="modal"]').simulate('keydown', { keyCode: _services.keyCodes.ESCAPE });
    _sinon2.default.assert.notCalled(onConfirm);
    _sinon2.default.assert.calledOnce(onCancel);
  });
});

describe('defaultFocusedButton', function () {
  test('is cancel', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
      onCancel: onCancel,
      defaultFocusedButton: _confirm_modal.CANCEL_BUTTON
    }));
    var button = component.find('[data-test-subj="confirmModalCancelButton"]').getDOMNode();
    expect(document.activeElement).toEqual(button);
  });

  test('is confirm', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
      onCancel: onCancel,
      defaultFocusedButton: _confirm_modal.CONFIRM_BUTTON
    }));
    var button = component.find('[data-test-subj="confirmModalConfirmButton"]').getDOMNode();
    expect(document.activeElement).toEqual(button);
  });

  test('when not given gives focus to the modal', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
      onCancel: onCancel
    }));
    expect(document.activeElement).toEqual(component.getDOMNode().firstChild);
  });
});