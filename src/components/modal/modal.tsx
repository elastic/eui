/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
  useRef,
  useCallback,
} from 'react';
import classnames from 'classnames';

import { keys, useEuiTheme } from '../../services';

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
  // TODO: Remove this onFocus scroll workaround after react-focus-on supports focusOptions
  // @see https://github.com/elastic/eui/issues/6304
  const bodyScrollTop = useRef<undefined | number>(
    typeof window === 'undefined' ? undefined : window.scrollY // Account for SSR
  );
  const onFocus = useCallback(() => {
    if (bodyScrollTop.current != null) {
      window.scrollTo({ top: bodyScrollTop.current });
      bodyScrollTop.current = undefined; // Unset after first auto focus
    }
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      onClose(event);
    }
  };

  let newStyle;

  if (maxWidth === true) {
    newStyle = style;
  } else if (maxWidth !== false) {
    const value = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    newStyle = { ...style, maxWidth: value };
  }

  const classes = classnames('euiModal', className);

  const euiTheme = useEuiTheme();
  const styles = euiModalStyles(euiTheme);
  const cssStyles = [styles.euiModal, maxWidth && styles.maxWidthDefault];

  const cssCloseIconStyles = [styles.euiModal__closeIcon];

  return (
    <EuiOverlayMask>
      <EuiFocusTrap initialFocus={initialFocus} scrollLock>
        {
          // Create a child div instead of applying these props directly to FocusTrap, or else
          // fallbackFocus won't work.
        }
        <div
          css={cssStyles}
          className={classes}
          onKeyDown={onKeyDown}
          tabIndex={0}
          onFocus={onFocus}
          style={newStyle || style}
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
