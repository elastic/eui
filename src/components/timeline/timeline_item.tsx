/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';

import {
  EuiTimelineItemEvent,
  EuiTimelineItemEventProps,
} from './timeline_item_event';
import {
  EuiTimelineItemIcon,
  EuiTimelineItemIconProps,
} from './timeline_item_icon';
import { euiTimelineItemStyles } from './timeline_item.styles';
export const VERTICAL_ALIGN = ['top', 'center'] as const;
export type EuiTimelineItemVerticalAlign = (typeof VERTICAL_ALIGN)[number];

export interface EuiTimelineItemProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'>,
    CommonProps,
    Omit<EuiTimelineItemIconProps, 'verticalAlign'>,
    Omit<EuiTimelineItemEventProps, 'verticalAlign'> {
  /**
   * Vertical alignment of the event with the icon
   */
  verticalAlign?: EuiTimelineItemVerticalAlign;
}

export const EuiTimelineItem: FunctionComponent<EuiTimelineItemProps> = ({
  children,
  verticalAlign = 'center',
  icon,
  iconAriaLabel,
  ...rest
}) => {
  const styles = euiTimelineItemStyles();
  const cssStyles = [styles.euiTimelineItem, styles[verticalAlign]];

  return (
    <li css={cssStyles} {...rest}>
      <EuiTimelineItemIcon
        icon={icon}
        iconAriaLabel={iconAriaLabel}
        verticalAlign={verticalAlign}
      />

      <EuiTimelineItemEvent verticalAlign={verticalAlign}>
        {children}
      </EuiTimelineItemEvent>
    </li>
  );
};
