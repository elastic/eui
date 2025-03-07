/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  PropsWithChildren,
  ComponentType,
  ComponentProps,
  JSX,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import {
  setStyleForRestrictedPageWidth,
  _EuiPageRestrictWidth,
} from '../_restrict_width';
import { EuiPanel, EuiPanelProps } from '../../panel';
import { useEuiPaddingCSS, EuiPaddingSize } from '../../../global_styling';
import { euiPageBodyStyles } from './page_body.styles';

type ComponentTypes = keyof JSX.IntrinsicElements | ComponentType<any>;

export type EuiPageBodyProps<T extends ComponentTypes = 'main'> =
  PropsWithChildren &
    CommonProps &
    ComponentProps<T> &
    _EuiPageRestrictWidth & {
      /**
       * Sets the HTML element for `EuiPageBody`.
       */
      component?: T;
      /**
       * Uses an EuiPanel as the main component instead of a plain div
       */
      panelled?: boolean;
      /**
       * Extends any extra EuiPanel props if `panelled=true`
       */
      panelProps?: Omit<EuiPanelProps, 'paddingSize'>;
      /**
       * Adjusts the padding
       */
      paddingSize?: EuiPaddingSize;
    };

export const EuiPageBody = <T extends ComponentTypes>({
  children,
  restrictWidth = false,
  className,
  css,
  component: Component = 'div' as T,
  panelled,
  panelProps,
  paddingSize = 'none',
  borderRadius = 'none',
  ...rest
}: EuiPageBodyProps<T>) => {
  // Set max-width as a style prop
  const widthStyles = setStyleForRestrictedPageWidth(
    restrictWidth,
    rest?.style
  );

  // Shared
  const classes = classNames('euiPageBody', className);
  const styles = euiPageBodyStyles();
  const cssStyles = [styles.euiPageBody, restrictWidth && styles.restrictWidth];

  // Panelled
  const panelClasses = classNames(classes, panelProps?.className);
  const panelCssStyles = [...cssStyles, panelProps?.css, css];

  // Non-panelled
  const padding = useEuiPaddingCSS()[paddingSize as EuiPaddingSize];
  const componentCssStyles = [...cssStyles, padding, css];

  return panelled ? (
    <EuiPanel
      borderRadius={borderRadius}
      paddingSize={paddingSize}
      {...panelProps}
      {...rest}
      className={panelClasses}
      css={panelCssStyles}
    >
      {children}
    </EuiPanel>
  ) : (
    <Component
      {...rest}
      className={classes}
      css={componentCssStyles}
      style={widthStyles}
    >
      {children}
    </Component>
  );
};
