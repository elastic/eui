/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, useEuiTheme } from '../../services';

import type { SharedTextProps, EuiTextColors, EuiTextAlignment } from './types';
import { EuiTextColor } from './text_color';
import { EuiTextAlign } from './text_align';
import { euiTextStyles } from './text.styles';

export const TEXT_SIZES = ['xs', 's', 'm', 'relative'] as const;
export type TextSize = (typeof TEXT_SIZES)[number];

export type EuiTextProps = SharedTextProps &
  EuiTextColors &
  EuiTextAlignment & {
    /**
     * Determines the text size. Choose `relative` to control the `font-size` based on the value of a parent container.
     */
    size?: TextSize;
    grow?: boolean;
  };

export const EuiText: FunctionComponent<EuiTextProps> = ({
  component = 'div',
  size,
  color,
  grow = true,
  textAlign,
  children,
  className,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const defaultSize = size ?? euiTheme.euiTheme.font.text.defaultSize ?? 'm';
  const styles = useEuiMemoizedStyles(euiTextStyles);
  const cssStyles = [
    styles.euiText,
    !grow ? styles.constrainedWidth : undefined,
    styles[defaultSize as keyof typeof styles],
  ];

  const classes = classNames('euiText', className);
  const Component = component;

  let text = (
    <Component css={cssStyles} className={classes} {...rest}>
      {children}
    </Component>
  );

  if (color) {
    text = (
      <EuiTextColor
        component={component}
        color={color}
        className={classes}
        cloneElement
      >
        {text}
      </EuiTextColor>
    );
  }

  if (textAlign) {
    text = (
      <EuiTextAlign
        component={component}
        textAlign={textAlign}
        className={classes}
        cloneElement
      >
        {text}
      </EuiTextAlign>
    );
  }

  return text;
};
