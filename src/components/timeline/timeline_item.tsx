/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ElementType } from 'react';
import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';

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
export type EuiTimelineItemVerticalAlign = typeof VERTICAL_ALIGN[number];

export const GAP_SIZES = ['m', 'l', 'xl'] as const;
export type EuiTimelineItemGap = typeof GAP_SIZES[number];

export interface EuiTimelineItemProps
  extends Omit<HTMLAttributes<ElementType>, 'children'>,
    CommonProps,
    Omit<EuiTimelineItemIconProps, 'verticalAlign' | 'gap'>,
    Omit<EuiTimelineItemEventProps, 'verticalAlign'> {
  /**
   * Vertical alignment of the event with the icon
   */
  verticalAlign?: EuiTimelineItemVerticalAlign;
  /**
   * Sets the HTML element for `EuiTimelineItem`.
   * By default, the element renders as a `<li/>`.
   * Only change the HTML element when it is not wrapped in a `EuiTimeline` that renders as a `<ol/>`.
   */
  component?: ElementType;
  /**
   * Sets the size of the gap (gutter) between each timeline item
   */
  gap?: EuiTimelineItemGap;
}

export const EuiTimelineItem: FunctionComponent<EuiTimelineItemProps> = ({
  children,
  verticalAlign = 'center',
  icon,
  iconAriaLabel,
  className,
  component = 'li',
  gap = 'xl',
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiTimelineItemStyles(euiTheme);

  const cssStyles = [styles.euiTimelineItem, styles[gap]];

  const Element = component;

  return (
    <Element css={cssStyles} {...rest}>
      <EuiTimelineItemIcon
        icon={icon}
        iconAriaLabel={iconAriaLabel}
        verticalAlign={verticalAlign}
        gap={gap}
      />

      <EuiTimelineItemEvent verticalAlign={verticalAlign}>
        {children}
      </EuiTimelineItemEvent>
    </Element>
  );
};
