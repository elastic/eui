/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { EuiTimelineItemEvent } from './timeline_item_event';
import {
  EuiTimelineItemIcon,
  EuiTimelineItemIconProps,
} from './timeline_item_icon';

import { keysOf } from '../common';

const alignItemsToClassNameMap = {
  stretch: null,
  flexStart: 'euiTimelineItem--alignItemsFlexStart',
  flexEnd: 'euiTimelineItem--alignItemsFlexEnd',
  center: 'euiTimelineItem--alignItemsCenter',
  baseline: 'euiTimelineItem--alignItemsBaseline',
};

export const ALIGN_ITEMS = keysOf(alignItemsToClassNameMap);

export type EuiTimelineItemAlignItems = keyof typeof alignItemsToClassNameMap;

export type EuiTimelineItemProps = EuiTimelineItemIconProps & {
  alignItems?: EuiTimelineItemAlignItems;
} & HTMLAttributes<HTMLDivElement>;

export const EuiTimelineItem: FunctionComponent<EuiTimelineItemProps> = ({
  className,
  children,
  alignItems,
  ...rest
}) => {
  const classes = classNames(
    'euiTimelineItem',
    alignItemsToClassNameMap[alignItems as EuiTimelineItemAlignItems],
    className
  );

  return (
    <div className={classes}>
      <EuiTimelineItemIcon {...(rest as EuiTimelineItemIconProps)} />

      <EuiTimelineItemEvent>{children}</EuiTimelineItemEvent>
    </div>
  );
};
