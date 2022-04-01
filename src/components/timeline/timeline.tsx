/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { EuiTimelineItem, EuiTimelineItemProps } from './timeline_item';

export interface EuiTimelineProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    CommonProps {
  /**
   * List of timeline items to render. See #EuiTimelineItem
   */
  items?: EuiTimelineItemProps[];
}

export const EuiTimeline: FunctionComponent<EuiTimelineProps> = ({
  className,
  items = [],
  ...rest
}) => {
  const classes = classNames('euiTimeline', className);

  return (
    <div className={classes} {...rest}>
      {items.map((item, index) => (
        <EuiTimelineItem key={index} {...item} />
      ))}
    </div>
  );
};
