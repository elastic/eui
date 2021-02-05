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

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import { CommonProps } from '../common';

export type EuiTableHeaderProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * Children must be valid DOM structure residing within `<thead>`.
     * Use `<td> | <th>` by default, or `<tr><th/></tr>` when `wrapWithTableRow=false`
     */
    children?: ReactNode;
    /**
     * Automatically adds a wrapping `<tr>` element around the children
     */
    wrapWithTableRow?: boolean;
  };

export const EuiTableHeader: FunctionComponent<EuiTableHeaderProps> = ({
  children,
  className,
  wrapWithTableRow = true,
  ...rest
}) => {
  return (
    <thead className={className} {...rest}>
      {wrapWithTableRow ? <tr>{children}</tr> : children}
    </thead>
  );
};
