/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
