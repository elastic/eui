import React from 'react';
import { mount, render } from 'enzyme';

import { findTestSubject, requiredProps } from '../../test';
import { keyCodes } from '../../services';

import {
  CANCEL_BUTTON,
  CONFIRM_BUTTON,
  EuiConfirmModal,
} from './confirm_modal';

let onConfirm: jest.Mock;
let onCancel: jest.Mock;

beforeEach(() => {
  onConfirm = jest.fn();
  onCancel = jest.fn();
});

describe('EuiConfirmModal', () => {
  test('renders EuiConfirmModal', () => {
    const component = render(
      <EuiConfirmModal
        title="A confirmation modal"
        onCancel={() => {}}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        {...requiredProps}>
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
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(0);
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
    expect(onConfirm).toHaveBeenCalledTimes(0);
    expect(onCancel).toHaveBeenCalledTimes(0);
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
      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(onCancel).toHaveBeenCalledTimes(1);
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

      findTestSubject(component, 'modal').simulate('keydown', {
        keyCode: keyCodes.ESCAPE,
      });
      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(onCancel).toHaveBeenCalledTimes(1);
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
        const button = findTestSubject(
          component,
          'confirmModalCancelButton'
        ).getDOMNode();
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
        const button = findTestSubject(
          component,
          'confirmModalConfirmButton'
        ).getDOMNode();
        expect(document.activeElement).toEqual(button);
        done();
      });
    });
  });
});
