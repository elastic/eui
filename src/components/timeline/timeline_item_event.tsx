/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { EuiPanel, _EuiPanelDivlike } from '../panel/panel';
import { CommonProps, keysOf } from '../common';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiTimelineItemEvent--paddingSmall',
  m: 'euiTimelineItemEvent--paddingMedium',
  l: 'euiTimelineItemEvent--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export type PaddingSize = typeof PADDING_SIZES[number];

export type EuiTimelineItemEventProps = {
  /**
   * The most important part of the event (e.g. a title, username, metadata).
   * It should be one line. When no body is passed it vertically center aligns with the icon.
   */
  header?: ReactNode;
  /**
   * Use the body for aditional content. You can also use this prop
   * to pass more complex components (e.g. editors, code blocks or any custom component).
   */
  body?: ReactNode;
  /**
   * Padding applied around the event header and/or event body.
   */
  paddingSize?: PaddingSize;
  /**
   * Sets the color of all the panel.
   */
  color?: _EuiPanelDivlike['color'];
  /**
   * Sets the color of the header color.
   */
  headerColor?: _EuiPanelDivlike['color'];
  /**
   * Adds a border around the panel and a line separating the header and body.
   */
  hasBorder?: _EuiPanelDivlike['hasBorder'];
  /**
   * Changes the event wrapper element to `figure` and the the header element to `figcaption`.
   */
  isFigure?: boolean;
} & CommonProps &
  Omit<
    _EuiPanelDivlike,
    'hasBorder' | 'color' | 'paddingSize' | 'borderRadius' | 'hasShadow'
  >;

export const EuiTimelineItemEvent: FunctionComponent<EuiTimelineItemEventProps> = ({
  children,
  className,
  header,
  body,
  paddingSize = 'none',
  color = 'transparent',
  headerColor = 'transparent',
  hasBorder,
  grow = true,
  isFigure = false,
  ...rest
}) => {
  const classes = classNames(
    'euiTimelineItemEvent',
    paddingSizeToClassNameMap[paddingSize],
    className
  );

  const headerClasses = classNames(
    'euiTimelineItemEvent__header',
    `euiTimelineItemEvent__header--${headerColor}`
  );

  const bodyClasses = classNames('euiTimelineItemEvent__body');

  const Element = isFigure ? 'figure' : 'div';
  const HeaderElement = isFigure ? 'figcaption' : 'div';

  return (
    <EuiPanel
      className={classes}
      paddingSize="none"
      color={color}
      hasBorder={hasBorder}
      grow={grow}
      {...rest}
    >
      <Element className="euiTimelineItemEvent__inner">
        {header && (
          <HeaderElement className={headerClasses}>{header}</HeaderElement>
        )}

        {body && <div className={bodyClasses}>{body}</div>}
      </Element>
    </EuiPanel>
  );
};
