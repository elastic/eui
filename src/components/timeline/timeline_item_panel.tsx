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
  s: 'euiTimelineItemPanel--paddingSmall',
  m: 'euiTimelineItemPanel--paddingMedium',
  l: 'euiTimelineItemPanel--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export type PaddingSize = typeof PADDING_SIZES[number];

export type EuiTimelineItemPanelProps = {
  header?: ReactNode;
  paddingSize?: PaddingSize;
  color?: _EuiPanelDivlike['color'];
  headerColor?: _EuiPanelDivlike['color'];
  /**
   * Adds a border around the panel and a line separating the header and body.
   */
  hasBorder?: _EuiPanelDivlike['hasBorder'];
  /**
   * Should match the icon size to make the content get vertically center aligned with the icon.
   */
  minHeight?: number;
} & CommonProps &
  Omit<
    _EuiPanelDivlike,
    'hasBorder' | 'color' | 'paddingSize' | 'borderRadius'
  >;

export const EuiTimelineItemPanel: FunctionComponent<EuiTimelineItemPanelProps> = ({
  children,
  className,
  header,
  paddingSize = 's',
  color = 'transparent',
  headerColor = 'transparent',
  minHeight,
  hasBorder,
  grow = true,
  ...rest
}) => {
  const classes = classNames(
    'euiTimelineItemPanel',
    { 'euiTimelineItemPanel--noBody': !children },
    paddingSizeToClassNameMap[paddingSize],
    className
  );

  const headerClasses = classNames(
    'euiTimelineItemPanel__header',
    `euiTimelineItemPanel__header--${headerColor}`
  );

  const bodyClasses = classNames(
    'euiTimelineItemPanel__body',
    `euiTimelineItemPanel__body--${color}`
  );

  return (
    <div className={classes} style={{ minHeight: minHeight }}>
      <EuiPanel
        paddingSize="none"
        color="transparent"
        hasBorder={hasBorder}
        grow={grow}
        {...rest}
      >
        {header && <div className={headerClasses}>{header}</div>}

        <div className={bodyClasses}>{children}</div>
      </EuiPanel>
    </div>
  );
};
