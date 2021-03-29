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
import { CommonProps } from '../../common';
import classNames from 'classnames';
import { EuiText } from '../../text';

export type EuiSelectableMessageProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> &
  CommonProps & {
    /**
     * Match this to the `listProps.bordered` property of your `EuiSelectable` instance
     */
    bordered?: boolean;
  };

export const EuiSelectableMessage: FunctionComponent<EuiSelectableMessageProps> = ({
  children,
  className,
  bordered = false,
  ...rest
}) => {
  const classes = classNames(
    'euiSelectableMessage',
    {
      'euiSelectableMessage--bordered': bordered,
    },
    className
  );

  return (
    <EuiText color="subdued" size="xs" className={classes} {...rest}>
      {children}
    </EuiText>
  );
};
