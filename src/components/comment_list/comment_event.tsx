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

export interface EuiCommentEventProps extends CommonProps {
  /**
   * Author of the comment. Display a small icon or avatar with it if needed.
   */
  username: ReactNode;
  /**
   * Time of occurrence of the event. Its format is set on the consumer's side
   */
  timestamp?: ReactNode;
  /**
   * Describes the event that took place
   */
  event?: ReactNode;
  /**
   * Custom actions that the user can perform from the comment's header
   */
  actions?: ReactNode;
  /**
   * Use "update" when the comment is primarily showing info about actions that the user or the system has performed (e.g. "user1 edited a case").
   */
  type?: EuiCommentType;
}

const typeToClassNameMap = {
  regular: 'euiCommentEvent--regular',
  update: 'euiCommentEvent--update',
};

export const TYPES = keysOf(typeToClassNameMap);
export type EuiCommentType = keyof typeof typeToClassNameMap;

export const EuiCommentEvent: FunctionComponent<EuiCommentEventProps> = ({
  children,
  className,
  username,
  timestamp,
  type = 'regular',
  event,
  actions,
}) => {
  const classes = classNames(
    'euiCommentEvent',
    typeToClassNameMap[type],
    className
  );

  const isFigure =
    type === 'regular' ||
    (type === 'update' && typeof children !== 'undefined');

  const Element = isFigure ? 'figure' : 'div';
  const HeaderElement = isFigure ? 'figcaption' : 'div';

  return (
    <Element className={classes}>
      <HeaderElement className="euiCommentEvent__header">
        <div className="euiCommentEvent__headerData">
          <div className="euiCommentEvent__headerUsername">{username}</div>
          <div className="euiCommentEvent__headerEvent">{event}</div>
          {timestamp ? (
            <div className="euiCommentEvent__headerTimestamp">
              <time>{timestamp}</time>
            </div>
          ) : (
            undefined
          )}
        </div>
        {actions ? (
          <div className="euiCommentEvent__headerActions">{actions}</div>
        ) : (
          undefined
        )}
      </HeaderElement>
      {children ? (
        <div className="euiCommentEvent__body">{children}</div>
      ) : (
        undefined
      )}
    </Element>
  );
};
