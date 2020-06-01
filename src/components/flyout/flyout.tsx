/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  FunctionComponent,
  CSSProperties,
  Fragment,
  HTMLAttributes,
  useEffect,
} from 'react';
import classnames from 'classnames';

import { keyCodes, EuiWindowEvent } from '../../services';

import { CommonProps } from '../common';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';

export type EuiFlyoutSize = 's' | 'm' | 'l';

const sizeToClassNameMap: { [size in EuiFlyoutSize]: string } = {
  s: 'euiFlyout--small',
  m: 'euiFlyout--medium',
  l: 'euiFlyout--large',
};

export interface EuiFlyoutProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  /**
   * Defines the width of the panel
   */
  size?: EuiFlyoutSize;
  /**
   * Hides the default close button. You must provide another close button somewhere within the flyout.
   */
  hideCloseButton?: boolean;
  /**
   * Locks the mouse / keyboard focus to within the flyout
   */
  ownFocus?: boolean;
  /**
   * Specify an aria-label for the close button of the flyout.
   * Default is `'Close this dialog'`.
   */
  closeButtonAriaLabel?: string;
  /**
   * Sets the max-width of the panel,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth?: boolean | number | string;

  style?: CSSProperties;
}

export const EuiFlyout: FunctionComponent<EuiFlyoutProps> = ({
  className,
  children,
  hideCloseButton = false,
  onClose,
  ownFocus = false,
  size = 'm',
  closeButtonAriaLabel,
  maxWidth = false,
  style,
  ...rest
}) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      onClose();
    }
  };

  useEffect(() => {
    document.body.classList.add('euiBody--hasFlyout');

    return () => {
      document.body.classList.remove('euiBody--hasFlyout');
    };
  });

  let newStyle;
  let widthClassName;
  if (maxWidth === true) {
    widthClassName = 'euiFlyout--maxWidth-default';
  } else if (maxWidth !== false) {
    const value = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    newStyle = { ...style, maxWidth: value };
  }

  const classes = classnames(
    'euiFlyout',
    sizeToClassNameMap[size!],
    widthClassName,
    className
  );

  let closeButton;
  if (onClose && !hideCloseButton) {
    closeButton = (
      <EuiI18n token="euiFlyout.closeAriaLabel" default="Close this dialog">
        {(closeAriaLabel: string) => (
          <EuiButtonIcon
            className="euiFlyout__closeButton"
            iconType="cross"
            color="text"
            aria-label={closeButtonAriaLabel || closeAriaLabel}
            onClick={onClose}
            data-test-subj="euiFlyoutCloseButton"
          />
        )}
      </EuiI18n>
    );
  }

  const flyoutContent = (
    <div
      role="dialog"
      className={classes}
      tabIndex={0}
      style={newStyle || style}
      {...rest}>
      {closeButton}
      {children}
    </div>
  );

  // If ownFocus is set, show an overlay behind the flyout and allow the user
  // to click it to close it.
  let optionalOverlay;
  if (ownFocus) {
    optionalOverlay = <EuiOverlayMask onClick={onClose} />;
  }

  return (
    <Fragment>
      <EuiWindowEvent event="keydown" handler={onKeyDown} />
      {optionalOverlay}
      {/* Trap focus even when ownFocus={false}, otherwise closing the flyout won't return focus
        to the originating button */}
      <EuiFocusTrap clickOutsideDisables={true}>{flyoutContent}</EuiFocusTrap>
    </Fragment>
  );
};
