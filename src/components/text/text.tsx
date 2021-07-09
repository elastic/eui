/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
