/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import classNames from 'classnames';

import { DataAttributeProps, ExclusiveUnion } from '../common';
import { EuiButton, EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { Props as EuiButtonProps } from '../button/button';
import { withEuiPopover, WithEuiPopoverProps } from '../popover';
import { withEuiToolTip, WithEuiToolTipProps } from '../tool_tip';
import { EuiCallOutColor } from './types';

type EuiCallOutActionCommonProps = DataAttributeProps & {
  tooltipProps?: WithEuiToolTipProps;
  popoverProps?: WithEuiPopoverProps;
};

export type EuiCallOutActionPrimaryProps = Omit<
  EuiButtonProps,
  'color' | 'size' | 'fill'
> &
  EuiCallOutActionCommonProps;

export type EuiCallOutActionSecondaryProps = Omit<
  EuiButtonEmptyProps,
  'color' | 'size' | 'flush'
> &
  EuiCallOutActionCommonProps;

type EuiCallOutActionPrimary = EuiCallOutActionPrimaryProps & {
  actionType: 'primary';
};

type EuiCallOutActionSecondary = EuiCallOutActionSecondaryProps & {
  actionType: 'secondary';
};

type EuiCallOutActionProps = ExclusiveUnion<
  EuiCallOutActionPrimary,
  EuiCallOutActionSecondary
>;

export const EuiCallOutAction = ({
  children,
  actionType = 'primary',
  color = 'primary',
  tooltipProps,
  popoverProps,
  className,
  ...rest
}: EuiCallOutActionProps & {
  color?: EuiCallOutColor;
}) => {
  const classes = classNames('euiCallOutAction', className);

  if (actionType === 'primary') {
    const button = (
      <EuiButton
        className={classes}
        size="s"
        color={color}
        {...(rest as EuiButtonProps)}
      >
        {children}
      </EuiButton>
    );

    return withEuiPopover(withEuiToolTip(button, tooltipProps), popoverProps);
  } else {
    const button = (
      <EuiButtonEmpty
        className={classes}
        size="s"
        color={color}
        {...(rest as EuiButtonEmptyProps)}
      >
        {children}
      </EuiButtonEmpty>
    );

    return withEuiPopover(withEuiToolTip(button, tooltipProps), popoverProps);
  }
};
