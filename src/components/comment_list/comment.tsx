/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { EuiCommentEvent, EuiCommentEventProps } from './comment_event';
import {
  EuiCommentTimeline,
  EuiCommentTimelineProps,
} from './comment_timeline';

export interface EuiCommentProps
  extends HTMLAttributes<HTMLDivElement>,
    EuiCommentEventProps,
    EuiCommentTimelineProps {}

const typeToClassNameMap = {
  regular: '',
  update: 'euiComment--update',
};

export const EuiComment: FunctionComponent<EuiCommentProps> = ({
  children,
  className,
  username,
  event,
  actions,
  timelineIcon,
  type = 'regular',
  timestamp,
  ...rest
}) => {
  const classes = classNames(
    'euiComment',
    typeToClassNameMap[type],
    { 'euiComment--hasBody': children },
    className
  );

  return (
    <div className={classes} {...rest}>
      <EuiCommentTimeline type={type} timelineIcon={timelineIcon} />
      <EuiCommentEvent
        username={username}
        actions={actions}
        event={event}
        timestamp={timestamp}
        type={type}>
        {children}
      </EuiCommentEvent>
    </div>
  );
};
