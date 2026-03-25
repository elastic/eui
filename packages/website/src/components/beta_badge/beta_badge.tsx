/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { EuiBadge, EuiToolTip } from '@elastic/eui';

type BetaBadgeProps = {
  color?: 'hollow' | 'accent';
  tooltipContent?: string;
};

export const BetaBadge = ({
  color = 'accent',
  tooltipContent,
}: BetaBadgeProps) => {
  const badge = (
    <EuiBadge color={color} iconType="beta" fill>
      BETA
    </EuiBadge>
  );

  if (tooltipContent) {
    return <EuiToolTip content={tooltipContent}>{badge}</EuiToolTip>;
  }

  return badge;
};
