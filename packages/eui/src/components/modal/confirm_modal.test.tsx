/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test/rtl';

import { requiredProps } from '../../test';
import { keys } from '../../services';
import { shouldRenderCustomStyles } from '../../test/internal';

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
  shouldRenderCustomStyles(
    <EuiConfirmModal title="Test" onCancel={() => {}}>
      children
    </EuiConfirmModal>,
    { childProps: ['titleProps'] }
  );

  test('renders EuiConfirmModal', () => {
    const { container } = render(
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
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders EuiConfirmModal without EuiModalBody, if empty', () => {
    const { baseElement } = render(
      <EuiConfirmModal
        title="A confirmation modal"
        onCancel={() => {}}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        {...requiredProps}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });

  test('onConfirm', () => {
    const { getByTestSubject } = render(
      <EuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
      />
    );

    fireEvent.click(getByTestSubject('confirmModalConfirmButton'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(0);
  });

  test('isLoading', () => {
    const { getByTestSubject } = render(
      <EuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        isLoading
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
      />
    );

    fireEvent.click(getByTestSubject('confirmModalConfirmButton'));
    expect(onConfirm).toHaveBeenCalledTimes(0);
  });

  test('onConfirm can be disabled', () => {
    const { getByTestSubject } = render(
      <EuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        confirmButtonDisabled={true}
      />
    );

    fireEvent.click(getByTestSubject('confirmModalConfirmButton'));
    expect(onConfirm).toHaveBeenCalledTimes(0);
    expect(onCancel).toHaveBeenCalledTimes(0);
  });

  describe('onCancel', () => {
    test('triggerd by click', () => {
      const { getByTestSubject } = render(
        <EuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
        />
      );

      fireEvent.click(getByTestSubject('confirmModalCancelButton'));
      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test('triggered by esc key', () => {
      const { getByTestSubject } = render(
        <EuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
          data-test-subj="modal"
        />
      );

      fireEvent.keyDown(getByTestSubject('modal'), {
        key: keys.ESCAPE,
      });
      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('defaultFocusedButton', () => {
    test('is cancel', async () => {
      const { getByTestSubject } = render(
        <EuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
          defaultFocusedButton={CANCEL_BUTTON}
        />
      );

      await waitFor(() => {
        const button = getByTestSubject('confirmModalCancelButton');
        expect(document.activeElement).toEqual(button);
      });
    });

    test('is confirm', async () => {
      const { getByTestSubject } = render(
        <EuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
          defaultFocusedButton={CONFIRM_BUTTON}
        />
      );

      await waitFor(() => {
        const button = getByTestSubject('confirmModalConfirmButton');
        expect(document.activeElement).toEqual(button);
      });
    });
  });

  test('titleProps', () => {
    const { baseElement } = render(
      <EuiConfirmModal
        title="A confirmation modal"
        titleProps={{ component: 'div', className: 'titlePropsTest' }}
        onCancel={() => {}}
      />
    );
    const title = baseElement.querySelector('.titlePropsTest');
    expect(title?.tagName.toLowerCase()).toEqual('div');
  });
});
