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

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import {
  EuiPanel,
  PanelPaddingSize,
  _EuiPanelProps,
  _EuiPanelDivlike,
} from '../../panel/panel';
import { HTMLAttributes } from 'enzyme';

export type EuiPageContentVerticalPositions = 'center';
export type EuiPageContentHorizontalPositions = 'center';

const verticalPositionToClassNameMap: {
  [position in EuiPageContentVerticalPositions]: string | null;
} = {
  center: 'euiPageContent--verticalCenter',
};

const horizontalPositionToClassNameMap: {
  [position in EuiPageContentHorizontalPositions]: string | null;
} = {
  center: 'euiPageContent--horizontalCenter',
};

export type EuiPageContentProps = CommonProps &
  // Use only the div properties of EuiPanel (not button)
  _EuiPanelProps &
  Omit<_EuiPanelDivlike, 'onClick' | 'role'> & {
    /**
     * **DEPRECATED: use `paddingSize` instead.**
     */
    panelPaddingSize?: PanelPaddingSize;
    verticalPosition?: EuiPageContentVerticalPositions;
    horizontalPosition?: EuiPageContentHorizontalPositions;
    /**
     * There should only be one EuiPageContent per page and should contain the main contents.
     * If this is untrue, set role = `null`, or change it to match your needed aria role
     */
    role?: HTMLAttributes['role'] | null;
  };

export const EuiPageContent: FunctionComponent<EuiPageContentProps> = ({
  verticalPosition,
  horizontalPosition,
  panelPaddingSize,
  paddingSize = 'l',
  borderRadius,
  children,
  className,
  role: _role = 'main',
  ...rest
}) => {
  const role = _role === null ? undefined : _role;

  const borderRadiusClass =
    borderRadius === 'none' ? 'euiPageContent--borderRadiusNone' : '';

  const classes = classNames(
    'euiPageContent',
    borderRadiusClass,
    verticalPosition ? verticalPositionToClassNameMap[verticalPosition] : null,
    horizontalPosition
      ? horizontalPositionToClassNameMap[horizontalPosition]
      : null,
    className
  );

  return (
    <EuiPanel
      className={classes}
      paddingSize={panelPaddingSize ?? paddingSize}
      borderRadius={borderRadius}
      role={role}
      {...rest}>
      {children}
    </EuiPanel>
  );
};
