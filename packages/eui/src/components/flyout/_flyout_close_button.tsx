/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, MouseEvent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { useEuiI18n } from '../i18n';
import { EuiButtonIcon } from '../button';

import type { EuiFlyoutProps } from './flyout';
import { euiFlyoutCloseButtonStyles } from './_flyout_close_button.styles';

type EuiFlyoutCloseButtonProps = EuiFlyoutProps['closeButtonProps'] &
  Required<Pick<EuiFlyoutProps, 'closeButtonPosition' | 'onClose' | 'side'>>;

export const EuiFlyoutCloseButton: FunctionComponent<
  EuiFlyoutCloseButtonProps
> = ({ className, onClick, onClose, closeButtonPosition, side, ...rest }) => {
  const classes = classNames('euiFlyout__closeButton', className);

  const styles = useEuiMemoizedStyles(euiFlyoutCloseButtonStyles);
  const cssStyles = [
    styles.euiFlyout__closeButton,
    styles[closeButtonPosition],
    closeButtonPosition === 'outside' && styles.outsideSide[side],
  ];

  const ariaLabel = useEuiI18n(
    'euiFlyoutCloseButton.ariaLabel',
    'Close this dialog'
  );

  return (
    <EuiButtonIcon
      display={closeButtonPosition === 'outside' ? 'fill' : 'empty'}
      iconType="cross"
      color="text"
      aria-label={ariaLabel}
      data-test-subj="euiFlyoutCloseButton"
      {...rest}
      className={classes}
      css={cssStyles}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        onClose(e.nativeEvent);
        onClick?.(e);
      }}
    />
  );
};
