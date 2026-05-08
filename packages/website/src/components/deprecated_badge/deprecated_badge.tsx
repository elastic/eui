/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { EuiBadge, EuiToolTip } from '@elastic/eui';

type DeprecatedBadgeProps = {
  color?: 'subdued' | 'warning';
  tooltipContent?: string;
};

export const DeprecatedBadge = ({
  color = 'warning',
  tooltipContent,
}: DeprecatedBadgeProps) => {
  const badge = (
    <EuiBadge color={color} iconType="archive" fill>
      DEPRECATED
    </EuiBadge>
  );

  if (tooltipContent) {
    return <EuiToolTip content={tooltipContent}>{badge}</EuiToolTip>;
  }

  return badge;
};
