/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import { EuiIcon } from '../../icon';
import { useEuiI18n } from '../../i18n';

import { EuiFormControlLayoutClearButtonStyles } from './form_control_layout_clear_button.styles';

export type EuiFormControlLayoutClearButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 's' | 'm';
  };

export const EuiFormControlLayoutClearButton: FunctionComponent<
  EuiFormControlLayoutClearButtonProps
> = ({ className, onClick, size = 'm', ...rest }) => {
  const classes = classNames('euiFormControlLayoutClearButton', className);
  const styles = useEuiMemoizedStyles(EuiFormControlLayoutClearButtonStyles);
  const cssStyles = [styles.euiFormControlLayoutClearButton, styles.size[size]];
  const iconStyles = [
    styles.icon.euiFormControlLayoutClearButton__icon,
    styles.icon.size[size],
  ];

  const ariaLabel = useEuiI18n(
    'euiFormControlLayoutClearButton.label',
    'Clear input'
  );

  return (
    <button
      type="button"
      css={cssStyles}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      <EuiIcon
        css={iconStyles}
        className="euiFormControlLayoutClearButton__icon"
        type="cross"
        size={size}
      />
    </button>
  );
};
