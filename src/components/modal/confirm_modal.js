import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { EuiModal } from './modal';
import { EuiModalFooter } from './modal_footer';
import { EuiModalHeader } from './modal_header';
import { EuiModalHeaderTitle } from './modal_header_title';
import { EuiModalBody } from './modal_body';

import {
  EuiButton,
  EuiButtonEmpty,
} from '../button';

import {
  EuiText,
} from '../text';

export const CONFIRM_BUTTON = 'confirm';
export const CANCEL_BUTTON = 'cancel';

const CONFIRM_MODAL_BUTTONS = [
  CONFIRM_BUTTON,
  CANCEL_BUTTON,
];

export class EuiConfirmModal extends Component {
  componentDidMount() {
    // We have to do this instead of using `autoFocus` because React's polyfill for auto-focusing
    // elements conflicts with the focus-trap logic we have on EuiModal.
    const { defaultFocusedButton } = this.props;

    // Wait a beat for the focus-trap to complete, and then set focus to the right button. Check that
    // the buttons exist first, because it's possible the modal has been closed already.
    requestAnimationFrame(() => {
      if (defaultFocusedButton === CANCEL_BUTTON && this.cancelButton) {
        this.cancelButton.focus();
      } else if (defaultFocusedButton === CONFIRM_BUTTON && this.confirmButton) {
        this.confirmButton.focus();
      }
    });
  }

  confirmRef = node => this.confirmButton = node;
  cancelRef = node => this.cancelButton = node;

  render() {
    const {
      children,
      title,
      onCancel,
      onConfirm,
      cancelButtonText,
      confirmButtonText,
      className,
      buttonColor,
      defaultFocusedButton, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classnames('euiModal--confirmation', className);

    let modalTitle;

    if (title) {
      modalTitle = (
        <EuiModalHeader>
          <EuiModalHeaderTitle data-test-subj="confirmModalTitleText">
            {title}
          </EuiModalHeaderTitle>
        </EuiModalHeader>
      );
    }

    let message;

    if (typeof children === 'string') {
      message = <p>{children}</p>;
    } else {
      message = children;
    }

    return (
      <EuiModal
        className={classes}
        onClose={onCancel}
        {...rest}
      >
        {modalTitle}

        <EuiModalBody>
          <EuiText data-test-subj="confirmModalBodyText">
            {message}
          </EuiText>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty
            data-test-subj="confirmModalCancelButton"
            onClick={onCancel}
            buttonRef={this.cancelRef}
          >
            {cancelButtonText}
          </EuiButtonEmpty>

          <EuiButton
            data-test-subj="confirmModalConfirmButton"
            onClick={onConfirm}
            fill
            buttonRef={this.confirmRef}
            color={buttonColor}
          >
            {confirmButtonText}
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }
}

EuiConfirmModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  cancelButtonText: PropTypes.node,
  confirmButtonText: PropTypes.node,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  className: PropTypes.string,
  defaultFocusedButton: PropTypes.oneOf(CONFIRM_MODAL_BUTTONS),
  buttonColor: PropTypes.string,
};

EuiConfirmModal.defaultProps = {
  buttonColor: 'primary',
};
