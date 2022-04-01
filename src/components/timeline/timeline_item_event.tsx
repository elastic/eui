/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import { euiTimelineItemEventStyles } from './timeline_item_event.styles';

export type EuiTimelineItemEventProps = {
  /**
   * Accepts any node. But preferably `EuiPanel`
   */
  children: ReactNode;
};

export const EuiTimelineItemEvent: FunctionComponent<EuiTimelineItemEventProps> = ({
  children,
}) => {
  const styles = euiTimelineItemEventStyles();
  const cssStyles = [styles.euiTimelineItemEvent];

  return (
    <div className="euiTimelineItemEvent" css={cssStyles}>
      {children}
    </div>
  );
};
