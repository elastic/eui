/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { EuiTimelineItemEvent } from './timeline_item_event';
import {
  EuiTimelineItemIcon,
  EuiTimelineItemIconProps,
} from './timeline_item_icon';

export type EuiTimelineItemProps = EuiTimelineItemIconProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'aria-label' | 'className'> & {
    /**
     * Center aligns the event with the icon
     */
    isCenterAligned?: boolean;
    /**
     * Accepts any node.
     */
    children: ReactNode;
  };

export const EuiTimelineItem: FunctionComponent<EuiTimelineItemProps> = ({
  children,
  isCenterAligned,
  icon,
}) => {
  const classes = classNames('euiTimelineItem', {
    'euiTimelineItem--alignItemsCenter': isCenterAligned,
  });

  return (
    <div className={classes}>
      <EuiTimelineItemIcon icon={icon} />

      <EuiTimelineItemEvent>{children}</EuiTimelineItemEvent>
    </div>
  );
};
