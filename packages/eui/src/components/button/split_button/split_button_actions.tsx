/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useContext } from 'react';
import classNames from 'classnames';

import { EuiDisabledProps } from '../../../services';
import { EuiPopover } from '../../popover';
import { EuiToolTip, EuiToolTipProps } from '../../tool_tip';
import { EuiButton, Props as EuiButtonProps } from '../button';
import { isButtonDisabled } from '../button_display/_button_display';
import { EuiButtonIcon } from '../button_icon';
import { type Props as EuiButtonIconProps } from '../button_icon/button_icon';
import { euiSplitButtonActionStyles } from './split_button.styles';
import { EuiSplitButtonContext } from './split_button_context';

type EuiSplitButtonAction<T> = T & {
  /**
   * Enables rendering an `EuiToolTip` with the passed props.
   */
  tooltipProps?: Partial<Omit<EuiToolTipProps, 'children'>>;
};

export type EuiSplitButtonActionPrimaryProps = EuiDisabledProps &
  EuiSplitButtonAction<EuiButtonProps | EuiButtonIconProps> & {
    /**
     * Toggles the render as `EuiButtonIcon`.
     */
    isIconOnly?: boolean;
  };

export type EuiSplitButtonActionSecondaryProps = EuiDisabledProps &
  EuiSplitButtonAction<EuiButtonIconProps> & {
    /**
     * Enables rendering an `EuiPopover` with the passed props.
     * When passed the secondary action icon will be fixed to `arrowDown`.
     */
    popoverProps?: Omit<EuiPopover['props'], 'button'>;
  };

export const EuiSplitButtonActionPrimary: FunctionComponent<
  EuiSplitButtonActionPrimaryProps
> = ({ className, isIconOnly, tooltipProps, ...rest }) => {
  const { fill, isDisabled, isLoading, ...sharedRest } = useContext(
    EuiSplitButtonContext
  );
  const _isDisabled = !!isDisabled || isButtonDisabled(rest);
  const _isLoading = !!isLoading || !!rest.isLoading;
  const display = (fill ? 'fill' : 'base') as EuiButtonIconProps['display'];

  const classes = classNames('euiSplitButtonActionPrimary', className);
  const styles = euiSplitButtonActionStyles;

  const actionProps = {
    ...rest,
    ...sharedRest,
    isDisabled: _isDisabled,
    isLoading: _isLoading,
    css: [styles.euiSplitButtonActionPrimary],
    className: classes,
  };

  const actionButtonProps = {
    ...actionProps,
    fill,
  } as EuiButtonProps;

  const actionIconProps = {
    ...actionProps,
    display,
  } as EuiButtonIconProps;

  const button = isIconOnly ? (
    <EuiButtonIcon {...actionIconProps} />
  ) : (
    <EuiButton {...actionButtonProps} />
  );

  return tooltipProps ? (
    <EuiToolTip {...tooltipProps}>{button}</EuiToolTip>
  ) : (
    button
  );
};

export const EuiSplitButtonActionSecondary: FunctionComponent<
  EuiSplitButtonActionSecondaryProps
> = ({ className, popoverProps, tooltipProps, ...rest }) => {
  const { fill, isDisabled, isLoading, ...sharedRest } = useContext(
    EuiSplitButtonContext
  );

  const _isDisabled = !!isDisabled || isButtonDisabled(rest);
  const _isLoading = !!isLoading || !!rest.isLoading;
  const display = (fill ? 'fill' : 'base') as EuiButtonIconProps['display'];

  const classes = classNames('euiSplitButtonActionSecondary', className);
  const styles = euiSplitButtonActionStyles;

  const actionProps = {
    ...rest,
    ...sharedRest,
    display,
    // enforce arrowDown icon when a popover is rendered
    iconType: popoverProps != null ? 'arrowDown' : rest.iconType,
    isDisabled: _isDisabled,
    isLoading: _isLoading,
    css: [styles.euiSplitButtonActionSecondary],
    className: classes,
  };

  const button = <EuiButtonIcon {...actionProps} />;
  const action = tooltipProps ? (
    <EuiToolTip {...tooltipProps}>{button}</EuiToolTip>
  ) : (
    button
  );

  return popoverProps ? (
    <EuiPopover anchorPosition="downCenter" {...popoverProps} button={action} />
  ) : (
    action
  );
};
