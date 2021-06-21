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
import { CommonProps, keysOf } from '../common';

import { TextColor, EuiTextColor } from './text_color';

import { EuiTextAlign, TextAlignment } from './text_align';

const textSizeToClassNameMap = {
  xs: 'euiText--extraSmall',
  s: 'euiText--small',
  m: 'euiText--medium',
};

export type TextSize = keyof typeof textSizeToClassNameMap;

export const TEXT_SIZES = keysOf(textSizeToClassNameMap);

export type EuiTextProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    textAlign?: TextAlignment;
    size?: TextSize;
    /**
     * **`secondary` color is DEPRECATED, use `success` instead**
     */
    color?: TextColor;
    grow?: boolean;
  };

export const EuiText: FunctionComponent<EuiTextProps> = ({
  size = 'm',
  color,
  grow = true,
  textAlign,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiText',
    textSizeToClassNameMap[size],
    className,
    {
      'euiText--constrainedWidth': !grow,
    }
  );

  let optionallyAlteredText;
  if (color) {
    optionallyAlteredText = (
      <EuiTextColor color={color} component="div">
        {children}
      </EuiTextColor>
    );
  }

  if (textAlign) {
    optionallyAlteredText = (
      <EuiTextAlign textAlign={textAlign}>
        {optionallyAlteredText || children}
      </EuiTextAlign>
    );
  }

  return (
    <div className={classes} {...rest}>
      {optionallyAlteredText || children}
    </div>
  );
};
