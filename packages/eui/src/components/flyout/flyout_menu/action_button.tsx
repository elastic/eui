/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { EuiButtonIcon } from '../../button';
import { EuiToolTip } from '../../tool_tip';
import type { EuiFlyoutMenuAction } from './types';

export const MenuActionButton: React.FC<{
  action: EuiFlyoutMenuAction;
}> = ({ action }) => {
  const {
    iconType,
    onClick,
    'aria-label': ariaLabel,
    toolTipContent,
    toolTipProps,
    isDisabled,
    isLoading,
    href,
    target,
  } = action;

  const sharedProps = {
    'aria-label': ariaLabel,
    iconType,
    onClick,
    color: 'text' as const,
    size: 'xs' as const,
    isDisabled,
    // Keeps the button focusable so tooltip-on-disabled works for keyboard users
    isLoading,
    href,
    target,
  };

  return toolTipContent ? (
    <EuiToolTip
      content={toolTipContent}
      disableScreenReaderOutput
      {...toolTipProps}
    >
      <EuiButtonIcon {...sharedProps} />
    </EuiToolTip>
  ) : (
    <EuiButtonIcon {...sharedProps} />
  );
};
