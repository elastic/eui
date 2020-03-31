import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import classnames from 'classnames';

import { keyCodes } from '../../services';

import { EuiButtonIcon } from '../button';

import { EuiFocusTrap } from '../focus_trap';

import { EuiI18n } from '../i18n';

export interface EuiModalProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
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
  /** specifies what element should initially have focus; Can be a DOM node, or a selector string (which will be passed to document.querySelector() to find the DOM node), or a function that returns a DOM node. */
  initialFocus?: HTMLElement | (() => HTMLElement) | string;
}

export const EuiModal: FunctionComponent<EuiModalProps> = ({
  className,
  children,
  initialFocus,
  onClose,
  maxWidth = true,
  style,
  ...rest
}) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      onClose(event);
    }
  };

  let newStyle;
  let widthClassName;
  if (maxWidth === true) {
    widthClassName = 'euiModal--maxWidth-default';
  } else if (maxWidth !== false) {
    const value = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    newStyle = { ...style, maxWidth: value };
  }

  const classes = classnames('euiModal', widthClassName, className);

  return (
    <EuiFocusTrap initialFocus={initialFocus}>
      {
        // Create a child div instead of applying these props directly to FocusTrap, or else
        // fallbackFocus won't work.
      }
      <div
        className={classes}
        onKeyDown={onKeyDown}
        tabIndex={0}
        style={newStyle || style}
        {...rest}>
        <EuiI18n token="euiModal.closeModal" default="Closes this modal window">
          {(closeModal: string) => (
            <EuiButtonIcon
              iconType="cross"
              onClick={onClose}
              className="euiModal__closeIcon"
              color="text"
              aria-label={closeModal}
            />
          )}
        </EuiI18n>
        <div className="euiModal__flex">{children}</div>
      </div>
    </EuiFocusTrap>
  );
};
