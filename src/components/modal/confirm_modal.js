import React from 'react';
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
  EuiText,
} from '..';

export const CONFIRM_BUTTON = 'confirm';
export const CANCEL_BUTTON = 'cancel';

const CONFIRM_MODAL_BUTTONS = [
  CONFIRM_BUTTON,
  CANCEL_BUTTON,
];

export function EuiConfirmModal({
  children,
  title,
  onCancel,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
  className,
  defaultFocusedButton,
  ...rest
}) {
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
          autoFocus={defaultFocusedButton === CANCEL_BUTTON}
          data-test-subj="confirmModalCancelButton"
          onClick={onCancel}
          size="small"
        >
          {cancelButtonText}
        </EuiButtonEmpty>

        <EuiButton
          autoFocus={defaultFocusedButton === CONFIRM_BUTTON}
          data-test-subj="confirmModalConfirmButton"
          onClick={onConfirm}
          size="small"
          fill
        >
          {confirmButtonText}
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
}

EuiConfirmModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  className: PropTypes.string,
  defaultFocusedButton: PropTypes.oneOf(CONFIRM_MODAL_BUTTONS)
};
