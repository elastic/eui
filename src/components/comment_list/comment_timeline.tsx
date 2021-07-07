/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';
import { EuiIcon, IconType } from '../icon';

export interface EuiCommentTimelineProps extends CommonProps {
  /**
   * Main icon that accompanies the comment. The default is `user` for regular comments and `dot` for update comments. To customize, pass a `string` as an `EuiIcon['type']` or any `ReactNode`.
   */
  timelineIcon?: ReactNode | IconType;
  type?: EuiCommentType;
}

const typeToClassNameMap = {
  regular: 'euiCommentTimeline__icon--regular',
  update: 'euiCommentTimeline__icon--update',
};

export const TYPES = keysOf(typeToClassNameMap);
export type EuiCommentType = keyof typeof typeToClassNameMap;

export const EuiCommentTimeline: FunctionComponent<EuiCommentTimelineProps> = ({
  className,
  timelineIcon,
  type = 'regular',
}) => {
  const classes = classNames('euiCommentTimeline', className);
  const iconClasses = classNames(
    {
      'euiCommentTimeline__icon--default':
        !timelineIcon || typeof timelineIcon === 'string',
    },
    typeToClassNameMap[type]
  );

  let iconRender;
  if (typeof timelineIcon === 'string') {
    iconRender = (
      <EuiIcon size={type === 'update' ? 'm' : 'l'} type={timelineIcon} />
    );
  } else if (timelineIcon) {
    iconRender = timelineIcon;
  } else {
    iconRender = (
      <EuiIcon
        type={type === 'update' ? 'dot' : 'user'}
        size={type === 'update' ? 's' : 'l'}
      />
    );
  }

  return (
    <div className={classes}>
      <div className="euiCommentTimeline__content">
        <div className={iconClasses}>{iconRender}</div>
      </div>
    </div>
  );
};
