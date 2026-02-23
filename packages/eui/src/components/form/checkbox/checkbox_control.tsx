/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import { EuiIcon } from '../../icon';

import { EuiCheckboxControlStyles } from './checkbox_control.styles';

export interface EuiCheckboxControlProps extends CommonProps {
  /**
   * Renders a checked variant.
   * @default false
   */
  checked?: boolean;
  /**
   * Renders an indeterminate variant.
   * This overrides any other variant.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Renders an excluded variant.
   * This overrides the checked variant.
   * @default false
   */
  excluded?: boolean;
  /**
   * Renders a disabled variant.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Presentation-only checkbox control element. Renders a checkbox square and state icon only without functionality.
 */
export const EuiCheckboxControl: FunctionComponent<EuiCheckboxControlProps> = ({
  className,
  checked = false,
  indeterminate = false,
  excluded = false,
  disabled = false,
  ...rest
}) => {
  const isSelected = checked || indeterminate || excluded;
  const isExcluded = excluded && !indeterminate;

  const classes = classNames('EuiCheckboxControl', className);
  const styles = useEuiMemoizedStyles(EuiCheckboxControlStyles);

  const cssStyles = [
    styles.EuiCheckboxControl,
    disabled
      ? isSelected
        ? styles.disabled.selected
        : styles.disabled.unselected
      : isExcluded
      ? styles.enabled.excluded
      : isSelected
      ? styles.enabled.selected
      : styles.enabled.unselected,
  ];

  const iconStyles = [
    styles.icon.euiCheckbox__icon,
    indeterminate ? styles.icon.indeterminate : styles.icon.check,
  ];

  const iconType = indeterminate
    ? 'stopFilled'
    : excluded
    ? 'cross'
    : checked
    ? 'check'
    : 'empty';

  return (
    <span css={cssStyles} className={classes} {...rest}>
      <EuiIcon role="presentation" css={iconStyles} type={iconType} size="m" />
    </span>
  );
};
