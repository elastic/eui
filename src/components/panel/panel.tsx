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
import { useEuiTheme } from '../../services';
import {
  useEuiBackgroundColorCSS,
  useEuiPaddingCSS,
  EuiBackgroundColor,
  EuiPaddingSize,
  BACKGROUND_COLORS,
  PADDING_SIZES,
} from '../../global_styling';
import { CommonProps, ExclusiveUnion } from '../common';
import { euiPanelStyles } from './panel.style';

export const SIZES = PADDING_SIZES;
export type PanelPaddingSize = EuiPaddingSize;

export const BORDER_RADII = ['none', 'm'] as const;
export type PanelBorderRadius = typeof BORDER_RADII[number];

export const COLORS = BACKGROUND_COLORS;
export type PanelColor = EuiBackgroundColor;

export interface _EuiPanelProps extends CommonProps {
  /**
   * Adds a medium shadow to the panel;
   * Only works when `color="plain"`
   */
  hasShadow?: boolean;
  /**
   * Adds a slight 1px border on all edges.
   * Only works when `color="plain | transparent"`
   * Default is `undefined` and will default to that theme's panel style
   */
  hasBorder?: boolean;
  /**
   * Padding for all four sides
   */
  paddingSize?: PanelPaddingSize;
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
  hasBorder,
  grow = true,
  panelRef,
  element,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  // Shadows are only allowed when there's a white background (plain)
  const canHaveShadow = !hasBorder && color === 'plain';
  const canHaveBorder = color === 'plain' || color === 'transparent';

  const styles = euiPanelStyles(euiTheme);
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

  const classes = classNames('euiPanel', `euiPanel--${color}`, className);

  if (rest.onClick && element !== 'div') {
    return (
      <button
        ref={panelRef as Ref<HTMLButtonElement>}
        className={classes}
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
