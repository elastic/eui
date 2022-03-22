/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiTimelineItemIconProps = CommonProps & {
  /**
   * Any node, but preferably a `EuiAvatar`
   */
  icon: ReactNode;
};

export const EuiTimelineItemIcon: FunctionComponent<EuiTimelineItemIconProps> = ({
  className,
  icon,
}) => {
  const classes = classNames('euiTimelineItemIcon', className);

  return (
    <div className={classes}>
      <div className="euiTimelineItemIcon__content">{icon}</div>
    </div>
  );
};
