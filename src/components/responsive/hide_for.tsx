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

import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiHideForBreakpoints = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface EuiHideForProps {
  children?: React.ReactNode;
  /**
   * List of all the responsive sizes to show the children for.
   * Options are `'xs' | 's' | 'm' | 'l' | 'xl'`
   */
  sizes: EuiHideForBreakpoints[];
}

const responsiveSizesToClassNameMap = {
  xs: 'eui-hideFor--xs',
  s: 'eui-hideFor--s',
  m: 'eui-hideFor--m',
  l: 'eui-hideFor--l',
  xl: 'eui-hideFor--xl',
};

export const EuiHideFor: FunctionComponent<EuiHideForProps> = ({
  children,
  sizes,
}) => {
  const utilityClasses = sizes.map(function(item) {
    return responsiveSizesToClassNameMap[item];
  });

  if (React.isValidElement(children)) {
    return (
      <React.Fragment>
        {React.Children.map(children, (child: ReactElement<CommonProps>) =>
          React.cloneElement(child, {
            className: classNames(child.props.className, utilityClasses),
          })
        )}
      </React.Fragment>
    );
  } else {
    return <span className={classNames(utilityClasses)}>{children}</span>;
  }
};
