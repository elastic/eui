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

import { ExclusiveUnion, PropsForAnchor, PropsForButton } from '../common';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';

export type EuiPaginationButtonProps = EuiButtonEmptyProps & {
  isActive?: boolean;
  /**
   * For ellipsis or other non-clickable buttons.
   */
  isPlaceholder?: boolean;
  hideOnMobile?: boolean;
};

type EuiPaginationButtonPropsForAnchor = PropsForAnchor<
  EuiPaginationButtonProps
>;

type EuiPaginationButtonPropsForButton = PropsForButton<
  EuiPaginationButtonProps
>;

type Props = ExclusiveUnion<
  EuiPaginationButtonPropsForAnchor,
  EuiPaginationButtonPropsForButton
>;

export const EuiPaginationButton: FunctionComponent<Props> = ({
  className,
  isActive,
  isPlaceholder,
  hideOnMobile,
  ...rest
}) => {
  const classes = classNames('euiPaginationButton', className, {
    'euiPaginationButton-isActive': isActive,
    'euiPaginationButton-isPlaceholder': isPlaceholder,
    'euiPaginationButton--hideOnMobile': hideOnMobile,
  });

  const props = {
    className: classes,
    size: 'xs',
    color: 'text',
    isDisabled: isPlaceholder,
    ...rest,
  };

  return <EuiButtonEmpty {...props as EuiButtonEmptyProps} />;
};
