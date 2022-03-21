/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import {
  EuiTimelineItemEvent,
  EuiTimelineItemEventProps,
} from './timeline_item_event';
import {
  EuiTimelineItemIcon,
  EuiTimelineItemIconProps,
} from './timeline_item_icon';

export type EuiTimelineItemProps = HTMLAttributes<HTMLDivElement> &
  EuiTimelineItemEventProps &
  EuiTimelineItemIconProps;

export const EuiTimelineItem: FunctionComponent<EuiTimelineItemProps> = ({
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiTimelineItem',
    { 'euiTimelineItem--hasHeader': rest.header },
    { 'euiTimelineItem--hasBody': rest.body },
    className
  );

  return (
    <div className={classes} {...(rest as HTMLAttributes<HTMLDivElement>)}>
      <EuiTimelineItemIcon {...(rest as EuiTimelineItemIconProps)} />
      <EuiTimelineItemEvent {...(rest as EuiTimelineItemEventProps)} />
    </div>
  );
};
