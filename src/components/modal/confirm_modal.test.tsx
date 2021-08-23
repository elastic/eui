/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';

import {
  findTestSubject,
  requiredProps,
  takeMountedSnapshot,
} from '../../test';
import { keys } from '../../services';

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
    const component = mount(
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
    expect(
      takeMountedSnapshot(component, { hasArrayOutput: true })
    ).toMatchSnapshot();
  });

  test('renders EuiConfirmModal without EuiModalBody, if empty', () => {
    const component = mount(
      <EuiConfirmModal
        title="A confirmation modal"
        onCancel={() => {}}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        {...requiredProps}
      />
    );
    expect(
      takeMountedSnapshot(component, { hasArrayOutput: true })
    ).toMatchSnapshot();
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

  test('isLoading', () => {
    const component = mount(
      <EuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        isLoading
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
      />
    );

    findTestSubject(component, 'confirmModalConfirmButton').simulate('click');
    expect(onConfirm).toHaveBeenCalledTimes(0);
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
        key: keys.ESCAPE,
      });
      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('defaultFocusedButton', () => {
    test('is cancel', (done) => {
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

    test('is confirm', (done) => {
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
