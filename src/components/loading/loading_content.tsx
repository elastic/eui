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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type LineRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type EuiLoadingContentProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    lines?: LineRange;
  };

export const EuiLoadingContent: FunctionComponent<EuiLoadingContentProps> = ({
  lines = 3,
  className,
  ...rest
}) => {
  const classes = classNames('euiLoadingContent', className);
  const lineElements = [];

  for (let i = 0; i < lines; i++) {
    lineElements.push(
      <span key={i} className="euiLoadingContent__singleLine">
        <span className="euiLoadingContent__singleLineBackground" />
      </span>
    );
  }

  return (
    <span className={classes} {...rest}>
      {lineElements}
    </span>
  );
};
