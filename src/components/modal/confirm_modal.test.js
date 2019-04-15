import React from 'react';
import sinon from 'sinon';
import { mount, render } from 'enzyme';

import { findTestSubject, requiredProps } from '../../test';
import { keyCodes } from '../../services';

import {
  CANCEL_BUTTON, CONFIRM_BUTTON, EuiConfirmModal,
} from './confirm_modal';

let onConfirm;
let onCancel;

beforeEach(() => {
  onConfirm = sinon.spy();
  onCancel = sinon.spy();
});

test('renders EuiConfirmModal', () => {
  const component = render(
    <EuiConfirmModal
      title="A confirmation modal"
      onCancel={() => {}}
      onConfirm={onConfirm}
      cancelButtonText="Cancel Button Text"
      confirmButtonText="Confirm Button Text"
      {...requiredProps}
    >
      This is a confirmation modal example
    </EuiConfirmModal>
  );
  expect(component).toMatchSnapshot();
});

test('renders EuiConfirmModal without EuiModalBody, if empty', () => {
  const component = render(
    <EuiConfirmModal
      title="A confirmation modal"
      onCancel={() => {}}
      onConfirm={onConfirm}
      cancelButtonText="Cancel Button Text"
      confirmButtonText="Confirm Button Text"
      {...requiredProps}
    />
  );
  expect(component).toMatchSnapshot();
});

test('onConfirm', () => {
  const component = mount(
    <EuiConfirmModal
      onCancel={onCancel}
      onConfirm={onConfirm}
      cancelButtonText="Cancel Button Text"
      confirmButtonText="Confirm Button Text"
    />
  );

  findTestSubject(component, 'confirmModalConfirmButton').simulate('click');
  sinon.assert.calledOnce(onConfirm);
  sinon.assert.notCalled(onCancel);
});

test('onConfirm can be disabled', () => {
  const component = mount(
    <EuiConfirmModal
      onCancel={onCancel}
      onConfirm={onConfirm}
      cancelButtonText="Cancel Button Text"
      confirmButtonText="Confirm Button Text"
      confirmButtonDisabled={true}
    />
  );

  findTestSubject(component, 'confirmModalConfirmButton').simulate('click');
  sinon.assert.notCalled(onConfirm);
  sinon.assert.notCalled(onCancel);
});

describe('onCancel', () => {
  test('triggerd by click', () => {
    const component = mount(
      <EuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
      />
    );

    findTestSubject(component, 'confirmModalCancelButton').simulate('click');
    sinon.assert.notCalled(onConfirm);
    sinon.assert.calledOnce(onCancel);
  });

  test('triggered by esc key', () => {
    const component = mount(
      <EuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        data-test-subj="modal"
      />
    );

    findTestSubject(component, 'modal').simulate('keydown', { keyCode: keyCodes.ESCAPE });
    sinon.assert.notCalled(onConfirm);
    sinon.assert.calledOnce(onCancel);
  });
});

describe('defaultFocusedButton', () => {
  test('is cancel', done => {
    const component = mount(
      <EuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        defaultFocusedButton={CANCEL_BUTTON}
      />
    );

    // The auto-focus implementation waits a frame before focusing.
    requestAnimationFrame(() => {
      const button = findTestSubject(component, 'confirmModalCancelButton').getDOMNode();
      expect(document.activeElement).toEqual(button);
      done();
    });
  });

  test('is confirm', done => {
    const component = mount(
      <EuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        defaultFocusedButton={CONFIRM_BUTTON}
      />
    );

    // The auto-focus implementation waits a frame before focusing.
    requestAnimationFrame(() => {
      const button = findTestSubject(component, 'confirmModalConfirmButton').getDOMNode();
      expect(document.activeElement).toEqual(button);
      done();
    });
  });
});
