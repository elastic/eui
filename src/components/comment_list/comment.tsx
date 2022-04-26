/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { keysOf } from '../common';
import { EuiTimelineItem } from '../timeline';
import { EuiCommentEvent, EuiCommentEventProps } from './comment_event';
import {
  EuiCommentTimeline,
  EuiCommentTimelineProps,
} from './comment_timeline';

export interface EuiCommentProps
  extends EuiCommentEventProps,
    EuiCommentTimelineProps {}

const typeToClassNameMap = {
  regular: '',
  update: 'euiComment--update',
  custom: '',
};

export const TYPES = keysOf(typeToClassNameMap);

export const EuiComment: FunctionComponent<EuiCommentProps> = ({
  children,
  className,
  username,
  event,
  actions,
  timelineIcon,
  type = 'regular',
  timestamp,
  updateIcon,
  updateColor,
  ...rest
}) => {
  const classes = classNames(
    'euiComment',
    typeToClassNameMap[type],
    { 'euiComment--hasBody': children },
    className
  );

  const isTypeUpdate = type === 'update';
  const verticalAlign = isTypeUpdate ? 'center' : 'top';

  return (
    <EuiTimelineItem
      verticalAlign={verticalAlign}
      className={classes}
      icon={
        <EuiCommentTimeline username={username} timelineIcon={timelineIcon} />
      }
      {...rest}
    >
      <EuiCommentEvent
        username={username}
        actions={actions}
        event={event}
        timestamp={timestamp}
        type={type}
        updateIcon={updateIcon}
        updateColor={updateColor}
      >
        {children}
      </EuiCommentEvent>
    </EuiTimelineItem>
  );
};
