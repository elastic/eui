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
import { CommonProps, keysOf } from '../common';
import { useEuiTheme } from '../../services';
import { euiTimelineItemStyles } from './timeline_item.styles';

const verticalAlignToClassNameMap = {
  top: 'euiTimelineItem--verticalAlignTop',
  center: 'euiTimelineItem--verticalAlignCenter',
};

export const VERTICAL_ALIGN = keysOf(verticalAlignToClassNameMap);

export type EuiTimelineItemVerticalAlign = keyof typeof verticalAlignToClassNameMap;

export type EuiTimelineItemProps = EuiTimelineItemIconProps &
  EuiTimelineItemEventProps & {
    /**
     * Vertical alignment of the event with the icon
     */
    verticalAlign?: EuiTimelineItemVerticalAlign;
  } & CommonProps &
  HTMLAttributes<HTMLDivElement>;

export const EuiTimelineItem: FunctionComponent<EuiTimelineItemProps> = ({
  children,
  verticalAlign = 'top',
  icon,
  className,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiTimelineItemStyles(euiTheme);

  const classes = classNames(
    'euiTimelineItem',
    verticalAlignToClassNameMap[verticalAlign as EuiTimelineItemVerticalAlign],
    className
  );

  const cssStyles = [styles.euiTimelineItem, styles[verticalAlign]];

  return (
    <div className={classes} css={cssStyles} {...rest}>
      <EuiTimelineItemIcon icon={icon} />

      <EuiTimelineItemEvent>{children}</EuiTimelineItemEvent>
    </div>
  );
};
