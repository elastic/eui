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

import React, { FunctionComponent, TableHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export interface EuiTableProps
  extends CommonProps,
    TableHTMLAttributes<HTMLTableElement> {
  compressed?: boolean;
  responsive?: boolean;
  /**
   * Sets the table-layout CSS property
   */
  tableLayout?: 'fixed' | 'auto';
}

const tableLayoutToClassMap: { [tableLayout: string]: string | null } = {
  fixed: null,
  auto: 'euiTable--auto',
};

export const EuiTable: FunctionComponent<EuiTableProps> = ({
  children,
  className,
  compressed,
  tableLayout = 'fixed',
  responsive = true,
  ...rest
}) => {
  const classes = classNames(
    'euiTable',
    className,
    {
      'euiTable--compressed': compressed,
      'euiTable--responsive': responsive,
    },
    tableLayoutToClassMap[tableLayout]
  );

  return (
    <table className={classes} {...rest}>
      {children}
    </table>
  );
};
