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
import { useEuiTheme } from '../../services';
import { EuiTimelineItem, EuiTimelineItemProps } from './timeline_item';

import { euiTimelineStyles } from './timeline.styles';

export const GAP_SIZES = ['m', 'l', 'xl'] as const;
export type EuiTimelineGap = typeof GAP_SIZES[number];

export interface EuiTimelineProps
  extends HTMLAttributes<HTMLOListElement>,
    CommonProps {
  /**
   * List of timeline items to render. See #EuiTimelineItem
   */
  items?: EuiTimelineItemProps[];
  /**
   * Sets the size of the gap (gutter) between each timeline item
   */
  gap?: EuiTimelineGap;
}

export const EuiTimeline: FunctionComponent<EuiTimelineProps> = ({
  className,
  items = [],
  children,
  gap = 'xl',
  ...rest
}) => {
  const classes = classNames('euiTimeline', className);

  const euiTheme = useEuiTheme();
  const styles = euiTimelineStyles(euiTheme);

  const cssStyles = [styles.euiTimeline, styles[gap]];

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ol className={classes} css={cssStyles} role="list" {...rest}>
      {items.map((item, index) => (
        <EuiTimelineItem key={index} {...item} />
      ))}
      {children}
    </ol>
  );
};
