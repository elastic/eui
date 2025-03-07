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
import { CommonProps } from '../../common';
import {
  EuiPaddingSize,
  useEuiPaddingCSS,
  _EuiThemeBreakpoint,
} from '../../../global_styling';
import { useEuiTheme, useIsWithinBreakpoints } from '../../../services';
import { euiPageInnerStyles } from './page_inner.styles';

export type ComponentTypes = keyof JSX.IntrinsicElements | ComponentType;

export type _EuiPageInnerProps<T extends ComponentTypes = 'main'> =
  PropsWithChildren &
    CommonProps &
    ComponentProps<T> & {
      /**
       * Sets which HTML element to render.
       */
      component?: T;
      /**
       * Adds a white background and shadow to define the area.
       */
      panelled?: boolean;
      /**
       * Adds a single side border, based on the `responsive` state.
       * Typically added when a side bar exists.
       */
      border?: boolean;
      /**
       * Adjust the overall padding.
       */
      paddingSize?: EuiPaddingSize;
      /**
       * Decides at which point the main content wrapper will be 100vw.
       */
      responsive?: _EuiThemeBreakpoint[];
    };

export const _EuiPageInner = <T extends ComponentTypes>({
  children,
  component: Component = 'main' as T,
  panelled,
  border,
  paddingSize = 'none',
  responsive = ['xs', 's'],
  ...rest
}: _EuiPageInnerProps<T>) => {
  const themeContext = useEuiTheme();
  const isResponding = useIsWithinBreakpoints(responsive);
  const styles = euiPageInnerStyles(themeContext);
  const paddingStyles = useEuiPaddingCSS()[paddingSize];

  let borderSide: 'top' | 'left' | undefined;
  if (border && isResponding) {
    borderSide = 'top';
  } else if (border) {
    borderSide = 'left';
  }

  const cssStyles = [
    styles.euiPageInner,
    paddingStyles,
    panelled && styles.panelled,
    borderSide && styles.border[borderSide],
  ];

  return (
    // @ts-expect-error Generic element type mismatch
    <Component css={cssStyles} {...rest}>
      {children}
    </Component>
  );
};
