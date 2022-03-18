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

export type EuiTimelineItemProps = HTMLAttributes<HTMLDivElement> & {
  eventHeader?: EuiTimelineItemEventProps['header'];
  eventBody?: EuiTimelineItemEventProps['body'];
  eventProps?: EuiTimelineItemEventProps;
} & EuiTimelineItemIconProps;

export const EuiTimelineItem: FunctionComponent<EuiTimelineItemProps> = ({
  children,
  className,
  icon,
  eventHeader,
  eventBody,
  eventProps,
  ...rest
}) => {
  const classes = classNames(
    'euiTimelineItem',
    { 'euiTimelineItem--update': eventHeader },
    { 'euiTimelineItem--hasBody': eventBody },
    className
  );

  return (
    <div className={classes} {...rest}>
      <EuiTimelineItemIcon icon={icon} />
      <EuiTimelineItemEvent
        header={eventHeader}
        body={eventBody}
        {...eventProps}
      />
    </div>
  );
};
