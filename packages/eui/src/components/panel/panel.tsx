/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
  Ref,
} from 'react';
import classNames from 'classnames';
import { useEuiMemoizedStyles } from '../../services';
import {
  useEuiBackgroundColorCSS,
  useEuiPaddingCSS,
  _EuiBackgroundColor,
  EuiPaddingSize,
  BACKGROUND_COLORS,
  PADDING_SIZES,
} from '../../global_styling';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { euiPanelStyles } from './panel.styles';

export const SIZES = PADDING_SIZES;

// Exported padding sizes and class names necessary for EuiPopover and EuiCard.
// Which currently will only maintain support for the original values until conversion.
const paddingSizeToClassNameMap: {
  [value in EuiPaddingSize]?: string | null;
} = {
  none: null,
  s: 'paddingSmall',
  m: 'paddingMedium',
  l: 'paddingLarge',
};
const _SIZES = keysOf(paddingSizeToClassNameMap);
export type PanelPaddingSize = (typeof _SIZES)[number];

export const BORDER_RADII = ['none', 'm'] as const;
export type PanelBorderRadius = (typeof BORDER_RADII)[number];

export const COLORS = BACKGROUND_COLORS;
export type PanelColor = _EuiBackgroundColor | 'highlighted';

export interface _EuiPanelProps extends CommonProps {
  /**
   * Adds a medium shadow to the panel;
   * Only works when `color="plain"`
   */
  hasShadow?: boolean;
  /**
   * Adds a slight 1px border on all edges.
   * Only works when `color="plain | transparent"`
   */
  hasBorder?: boolean;
  /**
   * Padding for all four sides
   */
  paddingSize?: EuiPaddingSize;
  /**
   * Corner border radius
   */
  borderRadius?: PanelBorderRadius;
  /**
   * When true the panel will grow in height to match `EuiFlexItem`
   */
  grow?: boolean;
  panelRef?: Ref<HTMLDivElement>;
  /**
   * Background color of the panel;
   * Usually a lightened form of the brand colors
   */
  color?: PanelColor;
}

export interface _EuiPanelDivlike
  extends _EuiPanelProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  element?: 'div';
}

export interface _EuiPanelButtonlike
  extends _EuiPanelProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  element?: 'button';
}

export type EuiPanelProps = ExclusiveUnion<
  _EuiPanelButtonlike,
  _EuiPanelDivlike
>;

export const EuiPanel: FunctionComponent<EuiPanelProps> = ({
  children,
  className,
  paddingSize = 'm',
  borderRadius = 'm',
  color = 'plain',
  hasShadow = true,
  hasBorder = false,
  grow = true,
  panelRef,
  element,
  ...rest
}) => {
  // Shadows are only allowed when there's a white background (plain)
  const canHaveShadow = !hasBorder && color === 'plain';
  const canHaveBorder = color === 'plain' || color === 'transparent';

  const styles = useEuiMemoizedStyles(euiPanelStyles);
  const cssStyles = [
    styles.euiPanel,
    grow && styles.grow,
    styles.radius[borderRadius],
    useEuiPaddingCSS()[paddingSize],
    useEuiBackgroundColorCSS()[color],
    canHaveShadow && hasShadow === true && styles.hasShadow,
    canHaveBorder && hasBorder === true && styles.hasBorder,
    rest.onClick && styles.isClickable,
  ];

  const classes = classNames(
    'euiPanel',
    `euiPanel--${color}`,
    {
      [`euiPanel--${paddingSizeToClassNameMap[paddingSize]}`]:
        paddingSizeToClassNameMap[paddingSize],
    },
    className
  );

  if (rest.onClick && element !== 'div') {
    return (
      <button
        ref={panelRef as Ref<HTMLButtonElement>}
        className={classes}
        css={cssStyles}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      ref={panelRef as Ref<HTMLDivElement>}
      className={classes}
      css={cssStyles}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
};
