/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { EuiSplitPanel } from '../panel';
import {
  _EuiSplitPanelOuterProps,
  _EuiSplitPanelInnerProps,
} from '../panel/split_panel';

export type EuiTimelineItemPanelProps = {
  header?: ReactNode;
  paddingSize?: _EuiSplitPanelInnerProps['paddingSize'];
} & Omit<_EuiSplitPanelOuterProps, 'hasBorder'>;

export const EuiTimelineItemPanel: FunctionComponent<EuiTimelineItemPanelProps> = ({
  children,
  className,
  header,
  paddingSize,
}) => {
  const classes = classNames('euiTimelineItemPanel', className);

  return (
    <EuiSplitPanel.Outer className={classes} hasBorder>
      {header && (
        <EuiSplitPanel.Inner
          className="euiTimelineItemPanel__header"
          color="subdued"
          paddingSize={paddingSize}
        >
          {header}
        </EuiSplitPanel.Inner>
      )}

      <EuiSplitPanel.Inner paddingSize={paddingSize}>
        {children}
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};
