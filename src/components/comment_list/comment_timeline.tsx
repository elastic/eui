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
import { EuiCommentEventProps } from './comment_event';

export interface EuiCommentTimelineProps extends CommonProps {
  /**
   * A name for the the avatar. It will be used for the title attribute and initials.
   */
  avatarName?: EuiAvatarProps['name'];
  /**
   * Customize the avatar with any EuiIcon['type']. The avatar color defaults to `subdued`.
   */
  avatarIcon?: EuiAvatarProps['iconType'];
  /**
   * Further extend the props applied to EuiAvatar.
   */
  avatarProps?: Omit<EuiAvatarProps, 'name' | 'iconType'>;

  username?: EuiCommentEventProps['username'];
}

export const EuiCommentTimeline: FunctionComponent<EuiCommentTimelineProps> = ({
  avatarName,
  avatarIcon,
  avatarProps,
  username,
}) => {
  let iconRender;

  const avatarClassName = 'euiCommentAvatar';

  let name;

  if (username && !avatarName) {
    name = username;
  } else if (avatarName) {
    name = avatarName;
  } else {
    name = '';
  }

  if (avatarIcon) {
    iconRender = (
      <EuiAvatar
        {...(avatarProps as any)}
        className={avatarClassName}
        name={name}
        iconType={avatarIcon}
        color="subdued"
      />
    );
  } else {
    iconRender = (
      <EuiAvatar
        {...(avatarProps as any)}
        className={avatarClassName}
        name={name}
      />
    );
  }

  return <>{iconRender}</>;
};
