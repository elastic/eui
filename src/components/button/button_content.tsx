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

/**
 * This component is simply a helper component for reuse within other button components
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { EuiLoadingSpinner } from '../loading';
import { EuiIcon, IconType } from '../icon';

export type ButtonIconSide = 'left' | 'right';

const iconSideToClassNameMap: { [side in ButtonIconSide]: string | null } = {
  left: null,
  right: 'euiButtonContent--iconRight',
};

export const ICON_SIDES = keysOf(iconSideToClassNameMap);

export type EuiButtonContentProps = HTMLAttributes<HTMLSpanElement> &
  CommonProps & {
    iconType?: IconType;
    iconSide?: ButtonIconSide;
    isLoading?: boolean;
    /**
     * Object of props passed to the <span/> wrapping the component's {children}
     */
    textProps?: HTMLAttributes<HTMLSpanElement> & CommonProps;
  };

export const EuiButtonContent: FunctionComponent<EuiButtonContentProps> = ({
  children,
  textProps,
  isLoading,
  iconType,
  iconSide,
  ...contentProps
}) => {
  // Add an icon to the button if one exists.
  let buttonIcon;

  if (isLoading) {
    buttonIcon = (
      <EuiLoadingSpinner className="euiButtonContent__spinner" size="m" />
    );
  } else if (iconType) {
    buttonIcon = (
      <EuiIcon className="euiButtonContent__icon" type={iconType} size="m" />
    );
  }

  const contentClassNames = classNames(
    iconSide ? iconSideToClassNameMap[iconSide] : null,
    contentProps && contentProps.className
  );

  return (
    <span {...contentProps} className={contentClassNames}>
      {buttonIcon}
      <span {...textProps}>{children}</span>
    </span>
  );
};
