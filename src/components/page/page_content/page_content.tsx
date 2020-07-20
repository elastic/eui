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

import { EuiPanel, PanelPaddingSize, EuiPanelProps } from '../../panel/panel';

export type EuiPageContentVerticalPositions = 'center';
export type EuiPageContentHorizontalPositions = 'center';

const verticalPositionToClassNameMap: {
  [position in EuiPageContentVerticalPositions]: string | null
} = {
  center: 'euiPageContent--verticalCenter',
};

const horizontalPositionToClassNameMap: {
  [position in EuiPageContentHorizontalPositions]: string | null
} = {
  center: 'euiPageContent--horizontalCenter',
};

export type EuiPageContentProps = CommonProps &
  EuiPanelProps & {
    panelPaddingSize?: PanelPaddingSize;
    verticalPosition?: EuiPageContentVerticalPositions;
    horizontalPosition?: EuiPageContentHorizontalPositions;
  };

export const EuiPageContent: FunctionComponent<EuiPageContentProps> = ({
  verticalPosition,
  horizontalPosition,
  panelPaddingSize = 'l',
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiPageContent',
    verticalPosition ? verticalPositionToClassNameMap[verticalPosition] : null,
    horizontalPosition
      ? horizontalPositionToClassNameMap[horizontalPosition]
      : null,
    className
  );

  return (
    <EuiPanel className={classes} paddingSize={panelPaddingSize} {...rest}>
      {children}
    </EuiPanel>
  );
};
