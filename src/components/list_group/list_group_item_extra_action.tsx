/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiButtonIcon, EuiButtonIconPropsForButton } from '../button';

import { useEuiTheme } from '../../services';
import { euiListGroupItemExtraActionStyles } from './list_group_item_extra_action.styles';

export type EuiListGroupItemExtraActionProps = EuiButtonIconPropsForButton & {
  alwaysShow?: boolean;
};

export const EuiListGroupItemExtraAction: FunctionComponent<EuiListGroupItemExtraActionProps> = ({
  iconType,
  alwaysShow,
  className,
  isDisabled,
  ...rest
}) => {
  const extraActionClasses = classNames(
    'euiListGroupItemExtraAction',
    {
      'euiListGroupItemExtraAction-alwaysShow': alwaysShow,
    },
    className
  );

  const euiTheme = useEuiTheme();

  const extraActionStyles = euiListGroupItemExtraActionStyles(euiTheme);
  const cssExtraActionStyles = [
    extraActionStyles.euiListGroupItemExtraAction,
    alwaysShow && extraActionStyles.alwaysShow,
  ];

  return (
    <EuiButtonIcon
      className={extraActionClasses}
      css={cssExtraActionStyles}
      iconType={iconType}
      {...rest}
    />
  );
};
