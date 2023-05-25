/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, CSSProperties } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { useEuiTheme } from '../../services';
import { euiTextStyles } from './text.styles';

import { TextColor, EuiTextColor } from './text_color';

import { EuiTextAlign, TextAlignment } from './text_align';

export const TEXT_SIZES = ['xs', 's', 'm', 'relative'] as const;
export type TextSize = (typeof TEXT_SIZES)[number];

export type EuiTextProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    textAlign?: TextAlignment;
    /**
     * Determines the text size. Choose `relative` to control the `font-size` based on the value of a parent container.
     */
    size?: TextSize;
    /**
     * Any of our named colors or a `hex`, `rgb` or `rgba` value.
     * @default inherit
     */
    color?: TextColor | CSSProperties['color'];
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
  const euiTheme = useEuiTheme();
  const styles = euiTextStyles(euiTheme);
  const cssStyles = [
    styles.euiText,
    !grow ? styles.constrainedWidth : undefined,
    styles[size],
  ];

  const classes = classNames('euiText', className);

  let text = (
    <div css={cssStyles} className={classes} {...rest}>
      {children}
    </div>
  );

  if (color) {
    text = (
      <EuiTextColor color={color} className={classes} cloneElement>
        {text}
      </EuiTextColor>
    );
  }

  if (textAlign) {
    text = (
      <EuiTextAlign textAlign={textAlign} className={classes} cloneElement>
        {text}
      </EuiTextAlign>
    );
  }

  return text;
};
