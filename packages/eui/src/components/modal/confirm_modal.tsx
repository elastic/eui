/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ComponentProps,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import classnames from 'classnames';

import { EuiModal, EuiModalProps } from './modal';
import { EuiModalFooter } from './modal_footer';
import { EuiModalHeader } from './modal_header';
import {
  EuiModalHeaderTitle,
  EuiModalHeaderTitleProps,
} from './modal_header_title';
import { EuiModalBody } from './modal_body';

import { useEuiTheme } from '../../services';
import { euiModalStyles } from './modal.styles';

import { EuiButtonColor, EuiButton, EuiButtonEmpty } from '../button';

import { EuiText } from '../text';

export interface EuiConfirmModalProps
  extends Omit<EuiModalProps, 'children' | 'onClose' | 'title'> {
  /**
   * ReactNode to render as this component's content
   */
  children?: ReactNode;
  title?: ReactNode;
  titleProps?: ComponentProps<EuiModalHeaderTitleProps>;
  cancelButtonText?: ReactNode;
  confirmButtonText?: ReactNode;
  onCancel: (
    event?:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>
      | MouseEvent
      | TouchEvent
  ) => void;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  confirmButtonDisabled?: boolean;
  className?: string;
  /**
   * Allows focusing either the confirm or cancel button on modal initialization.
   * Will take precedence over `initialFocus`, if `initialFocus` is passed.
   */
  defaultFocusedButton?: typeof CONFIRM_BUTTON | typeof CANCEL_BUTTON;
  buttonColor?: EuiButtonColor;
  // For docs only, will get passed with ...rest
  /**
   * Sets the max-width of the modal.
   * Set to `true` to use the default (`euiBreakpoints 'm'`),
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth?: boolean | number | string;
  /**
   * Passes `isLoading` prop to the confirm button
   */
  isLoading?: boolean;
}

export const CONFIRM_BUTTON = 'confirm';
export const CANCEL_BUTTON = 'cancel';

export const EuiConfirmModal: FunctionComponent<EuiConfirmModalProps> = ({
  children,
  title,
  titleProps,
  onCancel,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
  confirmButtonDisabled,
  className,
  buttonColor = 'primary',
  defaultFocusedButton,
  isLoading,
  ...rest
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // We have to do this instead of using `autoFocus` because React's polyfill for auto-focusing
    // elements conflicts with the focus-trap logic we have on EuiModal.
    // Wait a beat for the focus-trap to complete, and then set focus to the right button. Check that
    // the buttons exist first, because it's possible the modal has been closed already.
    setTimeout(() => {
      if (defaultFocusedButton === CANCEL_BUTTON && cancelButtonRef.current) {
        cancelButtonRef.current.focus();
      } else if (
        defaultFocusedButton === CONFIRM_BUTTON &&
        confirmButtonRef.current
      ) {
        confirmButtonRef.current.focus();
      }
    });
  }, [defaultFocusedButton, cancelButtonRef, confirmButtonRef]);

  const classes = classnames('euiModal--confirmation', className);

  const euiTheme = useEuiTheme();
  const styles = euiModalStyles(euiTheme);
  const cssStyles = [styles.confirmation];

  let modalTitle;

  if (title) {
    modalTitle = (
      <EuiModalHeader>
        <EuiModalHeaderTitle
          data-test-subj="confirmModalTitleText"
          {...titleProps}
        >
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
    <EuiModal
      className={classes}
      css={cssStyles}
      onClose={onCancel}
      role="alertdialog"
      {...rest}
    >
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
          buttonRef={cancelButtonRef}
        >
          {cancelButtonText}
        </EuiButtonEmpty>

        <EuiButton
          data-test-subj="confirmModalConfirmButton"
          onClick={onConfirm}
          isLoading={isLoading}
          fill
          buttonRef={confirmButtonRef}
          color={buttonColor}
          isDisabled={confirmButtonDisabled}
        >
          {confirmButtonText}
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};
