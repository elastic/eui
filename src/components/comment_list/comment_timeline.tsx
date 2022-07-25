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
   * Any `ReactNode`, but preferably `EuiAvatar`, or a `string` as an `EuiIcon['type']`.
   * If no `timelineIcon` is passed, the `userAvatar` icon will be used as the avatar.
   */
  timelineIcon?: ReactNode | EuiAvatarProps['iconType'];

  /**
   * Specify an `aria-label` for the `timelineIcon` when passed as an `IconType` or when nothing is passed.
   * If no `aria-label` is passed we assume the icon is purely decorative.
   */
  timelineIconAriaLabel?: string;
}

export const EuiCommentTimeline: FunctionComponent<EuiCommentTimelineProps> = ({
  timelineIcon,
  timelineIconAriaLabel,
}) => {
  let iconRender;

  const avatarClassName = 'euiCommentAvatar';
  const iconIsString = typeof timelineIcon === 'string';

  if (iconIsString) {
    iconRender = (
      <EuiAvatar
        className={avatarClassName}
        name={timelineIconAriaLabel || ''}
        iconType={timelineIcon}
        color="subdued"
      />
    );
  } else if (timelineIcon) {
    iconRender = timelineIcon;
  } else {
    iconRender = (
      <EuiAvatar
        className={avatarClassName}
        name={timelineIconAriaLabel ? timelineIconAriaLabel : ''}
        iconType="userAvatar"
        color="subdued"
      />
    );
  }

  return <>{iconRender}</>;
};
