/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { CommonProps } from '../common';
import { EuiAvatar, EuiAvatarProps } from '../avatar';

export interface EuiCommentTimelineProps extends CommonProps {
  /**
   * Main avatar that accompanies the comment. Pass any name, preferably the username.
   */
  timelineAvatarName: EuiAvatarProps['name'];
  /**
   * Customize the avatar with an any EuiIcon['type']. The avtar color defaults to `subdued`.
   */
  timelineAvatarIconType?: EuiAvatarProps['iconType'];
  /**
   * Further extend the props applied to EuiAvatar.
   */
  timelineAvatarProps?: Omit<EuiAvatarProps, 'name' | 'iconType'>;
}

export const EuiCommentTimeline: FunctionComponent<EuiCommentTimelineProps> = ({
  timelineAvatarName,
  timelineAvatarIconType,
  timelineAvatarProps,
}) => {
  let iconRender;

  const avatarClassName = 'euiCommentAvatar';

  if (timelineAvatarIconType) {
    iconRender = (
      <EuiAvatar
        {...(timelineAvatarProps as any)}
        className={avatarClassName}
        name={timelineAvatarName}
        iconType={timelineAvatarIconType}
        color="subdued"
      />
    );
  } else {
    iconRender = (
      <EuiAvatar
        {...(timelineAvatarProps as any)}
        className={avatarClassName}
        name={timelineAvatarName}
      />
    );
  }

  return <>{iconRender}</>;
};
