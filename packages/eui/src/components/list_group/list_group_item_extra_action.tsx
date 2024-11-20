/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { EuiButtonIcon, EuiButtonIconPropsForButton } from '../button';

import { euiListGroupItemExtraActionStyles } from './list_group_item_extra_action.styles';

export type EuiListGroupItemExtraActionProps = {
  alwaysShow?: boolean;
} & EuiButtonIconPropsForButton;

type _FromEuiListGroupItem = { parentIsDisabled?: boolean };

export const EuiListGroupItemExtraAction: FunctionComponent<
  EuiListGroupItemExtraActionProps & _FromEuiListGroupItem
> = ({
  iconType,
  alwaysShow,
  className,
  isDisabled,
  parentIsDisabled,
  color,
  ...rest
}) => {
  const extraActionClasses = classNames(
    'euiListGroupItemExtraAction',
    className
  );

  const extraActionStyles = useEuiMemoizedStyles(
    euiListGroupItemExtraActionStyles
  );
  const cssExtraActionStyles = [
    extraActionStyles.euiListGroupItemExtraAction,
    alwaysShow && extraActionStyles.alwaysShow,
    !alwaysShow && !parentIsDisabled && extraActionStyles.hoverStyles,
  ];

  return (
    <EuiButtonIcon
      color={color}
      className={extraActionClasses}
      css={cssExtraActionStyles}
      iconType={iconType}
      disabled={isDisabled || parentIsDisabled}
      {...rest}
    />
  );
};
