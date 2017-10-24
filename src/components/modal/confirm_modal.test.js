import React from 'react';
import sinon from 'sinon';
import { mount, render } from 'enzyme';

import { requiredProps } from '../../test/required_props';
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

test('onConfirm', () => {
  const component = mount(<EuiConfirmModal
    onCancel={onCancel}
    onConfirm={onConfirm}
  />);
  component.find('[data-test-subj="confirmModalConfirmButton"]').simulate('click');
  sinon.assert.calledOnce(onConfirm);
  sinon.assert.notCalled(onCancel);
});

describe('onCancel', () => {
  test('triggerd by click', () => {
    const component = mount(<EuiConfirmModal
      onCancel={onCancel}
      onConfirm={onConfirm}
    />);
    component.find('[data-test-subj="confirmModalCancelButton"]').simulate('click');
    sinon.assert.notCalled(onConfirm);
    sinon.assert.calledOnce(onCancel);
  });

  test('triggered by esc key', () => {
    const component = mount(<EuiConfirmModal
      onCancel={onCancel}
      onConfirm={onConfirm}
      data-test-subj="modal"
    />);
    component.find('[data-test-subj="modal"]').simulate('keydown', { keyCode: keyCodes.ESCAPE });
    sinon.assert.notCalled(onConfirm);
    sinon.assert.calledOnce(onCancel);
  });
});

describe('defaultFocusedButton', () => {
  test('is cancel', () => {
    const component = mount(<EuiConfirmModal
      onCancel={onCancel}
      defaultFocusedButton={CANCEL_BUTTON}
    />);
    const button = component.find('[data-test-subj="confirmModalCancelButton"]').getDOMNode();
    expect(document.activeElement).toEqual(button);
  });

  test('is confirm', () => {
    const component = mount(<EuiConfirmModal
      onCancel={onCancel}
      defaultFocusedButton={CONFIRM_BUTTON}
    />);
    const button = component.find('[data-test-subj="confirmModalConfirmButton"]').getDOMNode();
    expect(document.activeElement).toEqual(button);
  });

  test('when not given gives focus to the modal', () => {
    const component = mount(<EuiConfirmModal
      onCancel={onCancel}
    />);
    expect(document.activeElement).toEqual(component.getDOMNode().firstChild);
  });
});
