/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import { IconType } from '../icon';
import { EuiAvatar } from '../avatar';

export type EuiTimelineItemIconProps = {
  /**
   * Any `ReactNode`, but preferably `EuiAvatar`, or a `string` as an `EuiIcon['type']`.
   */
  icon: ReactNode | IconType;
};

export const EuiTimelineItemIcon: FunctionComponent<EuiTimelineItemIconProps> = ({
  icon,
}) => {
  const iconRender =
    typeof icon === 'string' ? (
      <EuiAvatar color="subdued" name={icon} iconType={icon} />
    ) : (
      icon
    );

  return (
    <div className="euiTimelineItemIcon">
      <div className="euiTimelineItemIcon__content">{iconRender}</div>
    </div>
  );
};
