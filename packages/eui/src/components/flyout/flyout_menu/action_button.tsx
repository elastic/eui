/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { EuiButtonIcon, EuiButtonIconProps } from '../../button';
import { EuiToolTip } from '../../tool_tip';
import type { EuiFlyoutMenuAction } from './types';

export const MenuActionButton: React.FC<{
  action: EuiFlyoutMenuAction;
}> = ({ action }) => {
  const { toolTipContent, toolTipProps, ...buttonProps } = action;

  const button = (
    <EuiButtonIcon
      {...(buttonProps as EuiButtonIconProps)}
      // The menu bar sets these props itself so every action looks the same.
      // Anything set here also belongs in `EuiFlyoutMenuOwnedActionProps`.
      color="text"
      size="xs"
      display="empty"
      iconSize="m"
      isSelected={undefined}
  );

  return toolTipContent ? (
    <EuiToolTip
      content={toolTipContent}
      disableScreenReaderOutput
      {...toolTipProps}
    >
      {button}
    </EuiToolTip>
  ) : (
    button
  );
};
