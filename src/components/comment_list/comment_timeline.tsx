/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { CommonProps } from '../common';

import { EuiTimelineItemProps } from '../timeline';
import { EuiAvatar } from '../avatar';

export interface EuiCommentTimelineProps extends CommonProps {
  /**
   * Main icon that accompanies the comment. The default is `user` for regular comments and `dot` for update comments. To customize, pass a `string` as an `EuiIcon['type']` or any `ReactNode`.
   */
  timelineIcon?: EuiTimelineItemProps['icon'];
  username: string;
}

export const EuiCommentTimeline: FunctionComponent<EuiCommentTimelineProps> = ({
  timelineIcon,
  username,
}) => {
  let iconRender;
  if (typeof timelineIcon === 'string') {
    iconRender = (
      <EuiAvatar
        className="euiCommentTimeline"
        name={username}
        iconType={timelineIcon}
      />
    );
  } else {
    // if no `iconType` or custom avatar is passed, it defaults to an avatar with the username initial letter
    iconRender = <EuiAvatar className="euiCommentTimeline" name={username} />;
  }

  return iconRender;
};
