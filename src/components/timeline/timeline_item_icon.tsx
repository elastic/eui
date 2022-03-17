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
import { EuiIcon, IconType } from '../icon';

export interface EuiTimelineItemIconProps extends CommonProps {
  /**
   * Main icon. To customize, pass a `string` as an `EuiIcon['type']` or any `ReactNode`.
   */
  icon?: ReactNode | IconType;
}

export const EuiTimelineItemIcon: FunctionComponent<EuiTimelineItemIconProps> = ({
  icon,
  className,
}) => {
  const iconRender = typeof icon === 'string' ? <EuiIcon type={icon} /> : icon;
  const classes = classNames('euiTimelineItemIcon', className);
  const iconClasses = classNames({
    euiTimelineItemIcon__iconBackground: typeof icon === 'string',
  });

  return (
    <div className={classes}>
      <div className="euiTimelineItemIcon__content">
        <div className={iconClasses}>{iconRender}</div>
      </div>
    </div>
  );
};
