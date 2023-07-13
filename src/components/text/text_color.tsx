/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  CSSProperties,
  isValidElement,
} from 'react';

import { CommonProps } from '../common';
import { useEuiTheme, cloneElementWithCss } from '../../services';

import { euiTextColorStyles } from './text_color.styles';

export const COLORS = [
  'default',
  'subdued',
  'success',
  'accent',
  'danger',
  'warning',
  'ghost',
  'inherit',
] as const;
export type TextColor = (typeof COLORS)[number];

export type EuiTextColorProps = CommonProps &
  Omit<
    HTMLAttributes<HTMLDivElement> & HTMLAttributes<HTMLSpanElement>,
    'color'
  > & {
    /**
     * Any of our named colors or a `hex`, `rgb` or `rgba` value.
     */
    color?: TextColor | CSSProperties['color'];
    /**
     * Determines the root element
     */
    component?: 'div' | 'span';
    /**
     * Applies text styling to the child element instead of rendering a parent wrapper `span`/`div`.
     * Can only be used when wrapping a *single* child element/tag, and not raw text.
     */
    cloneElement?: boolean;
  };

export const EuiTextColor: FunctionComponent<EuiTextColorProps> = ({
  children,
  color = 'default',
  component = 'span',
  cloneElement = false,
  style,
  ...rest
}) => {
  const isNamedColor = COLORS.includes(color as TextColor);

  const euiTheme = useEuiTheme();
  const styles = euiTextColorStyles(euiTheme);
  const cssStyles = [
    styles.euiTextColor,
    isNamedColor ? styles[color as TextColor] : styles.customColor,
  ];

  // We're checking if is a custom color.
  // If it is a custom color we set the `color` of the `.euiTextColor` div to that custom color.
  // This way the children text elements can `inherit` that color and border and backgrounds can get that `currentColor`.
  const euiTextStyle = !isNamedColor
    ? {
        color: color,
        ...style,
      }
    : { ...style };

  const props = { css: cssStyles, style: euiTextStyle, ...rest };

  if (isValidElement(children) && cloneElement) {
    const childrenStyle = { ...children.props.style, ...euiTextStyle };
    return cloneElementWithCss(children, { ...props, style: childrenStyle });
  } else {
    const Component = component;
    return <Component {...props}>{children}</Component>;
  }
};
