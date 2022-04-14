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

export interface EuiTimelineItemProps
  extends Omit<HTMLAttributes<ElementType>, 'children'>,
    CommonProps,
    Omit<EuiTimelineItemIconProps, 'verticalAlign'>,
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
  as?: ElementType;
}

export const EuiTimelineItem: FunctionComponent<EuiTimelineItemProps> = ({
  children,
  verticalAlign = 'center',
  icon,
  iconAriaLabel,
  className,
  as,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiTimelineItemStyles(euiTheme);

  const cssStyles = [styles.euiTimelineItem];

  const Element = as || 'li';

  return (
    <Element css={cssStyles} {...rest}>
      <EuiTimelineItemIcon
        icon={icon}
        iconAriaLabel={iconAriaLabel}
        verticalAlign={verticalAlign}
      />

      <EuiTimelineItemEvent verticalAlign={verticalAlign}>
        {children}
      </EuiTimelineItemEvent>
    </Element>
  );
};
