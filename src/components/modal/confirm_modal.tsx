import React, { FunctionComponent, ReactNode, useEffect } from 'react';
import classnames from 'classnames';

import { EuiModal } from './modal';
import { EuiModalFooter } from './modal_footer';
import { EuiModalHeader } from './modal_header';
import { EuiModalHeaderTitle } from './modal_header_title';
import { EuiModalBody } from './modal_body';

import { EuiButton, EuiButtonEmpty } from '../button';

import { EuiText } from '../text';

export interface EuiConfirmModalProps {
  children?: ReactNode;
  title?: ReactNode;
  cancelButtonText?: ReactNode;
  confirmButtonText?: ReactNode;
  onCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  confirmButtonDisabled?: boolean;
  className?: string;
  defaultFocusedButton?: typeof CONFIRM_BUTTON | typeof CANCEL_BUTTON;
  buttonColor?:
    | 'primary'
    | 'text'
    | 'danger'
    | 'ghost'
    | 'secondary'
    | 'warning';
  // For docs only, will get passed with ...rest
  /**
   * Sets the max-width of the modal.
   * Set to `true` to use the default (`euiBreakpoints 'm'`),
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth?: boolean | number | string;
}

export const CONFIRM_BUTTON = 'confirm';
export const CANCEL_BUTTON = 'cancel';

export const EuiConfirmModal: FunctionComponent<EuiConfirmModalProps> = (
  props: EuiConfirmModalProps
) => {
  const {
    children,
    title,
    onCancel,
    onConfirm,
    cancelButtonText,
    confirmButtonText,
    confirmButtonDisabled,
    className,
    buttonColor = 'primary',
    defaultFocusedButton,
    ...rest
  } = props;

  let cancelButton: any;
  let confirmButton: any;

  useEffect(() => {
    // We have to do this instead of using `autoFocus` because React's polyfill for auto-focusing
    // elements conflicts with the focus-trap logic we have on EuiModal.
    const { defaultFocusedButton } = props;

    // Wait a beat for the focus-trap to complete, and then set focus to the right button. Check that
    // the buttons exist first, because it's possible the modal has been closed already.
    requestAnimationFrame(() => {
      if (defaultFocusedButton === CANCEL_BUTTON && cancelButton) {
        cancelButton.focus();
      } else if (defaultFocusedButton === CONFIRM_BUTTON && confirmButton) {
        confirmButton.focus();
      }
    });
  }, [cancelButton, confirmButton, props]);

  const confirmRef = (node: any) => (confirmButton = node);
  const cancelRef = (node: any) => (cancelButton = node);

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

  if (typeof children === 'string' && children.length > 0) {
    message = <p>{children}</p>;
  } else {
    message = children;
  }

  return (
    <EuiModal className={classes} onClose={onCancel} {...rest}>
      {modalTitle}

      {message && (
        <EuiModalBody>
          <EuiText data-test-subj="confirmModalBodyText">{message}</EuiText>
        </EuiModalBody>
      )}

      <EuiModalFooter>
        <EuiButtonEmpty
          data-test-subj="confirmModalCancelButton"
          onClick={onCancel}
          buttonRef={cancelRef}>
          {cancelButtonText}
        </EuiButtonEmpty>

        <EuiButton
          data-test-subj="confirmModalConfirmButton"
          onClick={onConfirm}
          fill
          buttonRef={confirmRef}
          color={buttonColor}
          isDisabled={confirmButtonDisabled}>
          {confirmButtonText}
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};
