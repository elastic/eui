/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ComponentType } from 'react';

const TYPES = ['info', 'success', 'warning', 'error'] as const;
type EuiNotificationIconType = (typeof TYPES)[number];

export const NOTIFICATION_ICONS_MAP: Record<
  EuiNotificationIconType,
  { name: string }
> = {
  info: { name: 'infoFill' },
  success: { name: 'checkCircleFill' },
  warning: { name: 'warningStatic' },
  error: { name: 'errorFill' },
};

export const EuiNotificationIcon = ({
  type,
  'aria-label': ariaLabel,
  ...rest
}: any) => {
  return (
    <span
      data-euiicon-type={
        typeof type === 'string'
          ? NOTIFICATION_ICONS_MAP[type as EuiNotificationIconType].name
          : type.displayName || type.name
      }
      {...rest}
    >
      {
        // render aria-label as text, if it's passed in props
        ariaLabel ?? ''
      }
    </span>
  );
};

export const appendIconComponentCache = (_: {
  [iconType: string]: ComponentType;
}) => {
  // manually appending to the internal EuiIcon cache is out-of-scope of this test environment
};
