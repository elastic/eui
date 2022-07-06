/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../common';
import { EuiAvatar, EuiAvatarProps } from '../avatar';
import { EuiCommentEventProps } from './comment_event';

export interface EuiCommentTimelineProps extends CommonProps {
  /**
   * Main icon that accompanies the comment. Should indicate who is the author of the comment. To customize, pass a `string` as an `EuiIcon['type']` or any `ReactNode`. If no icon is provided, it  will default to the `username`'s initials.
   */
  timelineIcon?: ReactNode | EuiAvatarProps['iconType'];

  username: EuiCommentEventProps['username'];
}

export const EuiCommentTimeline: FunctionComponent<EuiCommentTimelineProps> = ({
  timelineIcon,
  username,
}) => {
  let iconRender;

  const avatarClassName = 'euiCommentAvatar';

  const iconIsString = typeof timelineIcon === 'string';
  const iconIsNode = typeof timelineIcon === 'object';

  if (iconIsString) {
    iconRender = (
      <EuiAvatar
        className={avatarClassName}
        name={username}
        iconType={timelineIcon}
        color="subdued"
      />
    );
  } else if (iconIsNode) {
    iconRender = timelineIcon;
  } else {
    iconRender = <EuiAvatar className={avatarClassName} name={username} />;
  }

  return <>{iconRender}</>;
};
