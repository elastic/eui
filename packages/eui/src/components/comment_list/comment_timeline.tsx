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

export interface EuiCommentTimelineProps extends CommonProps {
  /**
   * Main avatar that accompanies the comment. Should indicate who is the author of the comment.
   * Any `ReactNode`, but preferably `EuiAvatar`, or a `string` as an `EuiAvatarProps['iconType']`.
   * If no `timelineAvatar` is passed, the `user` icon will be used as the avatar.
   */
  timelineAvatar?: ReactNode | EuiAvatarProps['iconType'];

  /**
   * Specify an `aria-label` and `title` for the `timelineAvatar` when passed as an `IconType` or when nothing is passed.
   * If no `timelineAvatarAriaLabel` is passed we assume the avatar is purely decorative.
   */
  timelineAvatarAriaLabel?: string;
}

export const EuiCommentTimeline: FunctionComponent<EuiCommentTimelineProps> = ({
  timelineAvatar,
  timelineAvatarAriaLabel,
}) => {
  let iconRender;

  const avatarClassName = 'euiCommentAvatar';
  const iconIsString = typeof timelineAvatar === 'string';

  if (iconIsString) {
    iconRender = (
      <EuiAvatar
        className={avatarClassName}
        name={timelineAvatarAriaLabel || ''}
        iconType={timelineAvatar}
        color="subdued"
      />
    );
  } else if (timelineAvatar) {
    iconRender = timelineAvatar;
  } else {
    iconRender = (
      <EuiAvatar
        className={avatarClassName}
        name={timelineAvatarAriaLabel || ''}
        iconType="user"
        color="subdued"
      />
    );
  }

  return <>{iconRender}</>;
};
