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
  extends HTMLAttributes<HTMLOListElement>,
    CommonProps {
  /**
   * List of timeline items to render. See #EuiTimelineItem
   */
  items?: EuiTimelineItemProps[];
}

export const EuiTimeline: FunctionComponent<EuiTimelineProps> = ({
  className,
  items = [],
  children,
  ...rest
}) => {
  const classes = classNames('euiTimeline', className);

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ol className={classes} role="list" {...rest}>
      {items.map((item, index) => (
        <EuiTimelineItem key={index} {...item} />
      ))}
      {children}
    </ol>
  );
};
