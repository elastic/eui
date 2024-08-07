/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import classnames from 'classnames';

import { keys, useEuiTheme } from '../../services';
import { isDOMNode } from '../../utils';

import { EuiButtonIcon } from '../button';

import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiI18n } from '../i18n';

import { euiModalStyles } from './modal.styles';

export interface EuiModalProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  onClose: (
    event?:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /**
   * Sets the max-width of the modal.
   * Set to `true` to use the default (`euiBreakpoints 'm'`),
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth?: boolean | number | string;
  /**
   * Specifies what element should initially have focus.
   * Can be a DOM node, or a selector string (which will be passed to document.querySelector() to find the DOM node), or a function that returns a DOM node.
   */
  initialFocus?: HTMLElement | (() => HTMLElement) | string;
  /**
   * Identifies a modal dialog to screen readers. Modal dialogs that confirm destructive actions
   * or need a user's attention should use "alertdialog".
   */
  role?: 'dialog' | 'alertdialog';
}

export const EuiModal: FunctionComponent<EuiModalProps> = ({
  className,
  children,
  initialFocus,
  onClose,
  maxWidth = true,
  role = 'dialog',
  style,
  ...rest
}) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === keys.ESCAPE) {
      if (
        isDOMNode(event.target) &&
        event.currentTarget.contains(event.target)
      ) {
        event.preventDefault();
        event.stopPropagation();
        onClose(event);
      }
    }
  };

  let newStyle = style;

  if (typeof maxWidth !== 'boolean') {
    newStyle = { ...newStyle, maxInlineSize: maxWidth };
  }

  const classes = classnames('euiModal', className);

  const euiTheme = useEuiTheme();
  const styles = euiModalStyles(euiTheme);
  const cssStyles = [
    styles.euiModal,
    maxWidth === true && styles.defaultMaxWidth,
  ];

  const cssCloseIconStyles = [styles.euiModal__closeIcon];

  return (
    <EuiOverlayMask>
      <EuiFocusTrap initialFocus={initialFocus} scrollLock preventScrollOnFocus>
        <div
          css={cssStyles}
          className={classes}
          onKeyDown={onKeyDown}
          tabIndex={0}
          style={newStyle}
          role={role}
          aria-modal={true}
          {...rest}
        >
          <EuiI18n
            token="euiModal.closeModal"
            default="Closes this modal window"
          >
            {(closeModal: string) => (
              <EuiButtonIcon
                iconType="cross"
                onClick={onClose}
                css={cssCloseIconStyles}
                className="euiModal__closeIcon"
                color="text"
                aria-label={closeModal}
              />
            )}
          </EuiI18n>
          {children}
        </div>
      </EuiFocusTrap>
    </EuiOverlayMask>
  );
};
