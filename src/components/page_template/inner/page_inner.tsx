/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren, ComponentType, ComponentProps } from 'react';
import { CommonProps } from '../../common';
import {
  EuiPaddingSize,
  useEuiPaddingCSS,
  _EuiPaddingSize,
  _EuiThemeBreakpoint,
} from '../../../global_styling';
import { useEuiTheme, useIsWithinBreakpoints } from '../../../services';
import { euiPageInnerStyles } from './page_inner.styles';

type ComponentTypes = keyof JSX.IntrinsicElements | ComponentType<any>;

export type _EuiPageInnerProps<
  T extends ComponentTypes = 'main'
> = CommonProps &
  ComponentProps<T> &
  EuiPaddingSize & {
    /**
     * Sets the HTML element for `EuiPageBody`.
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
     * When direction is `row`, it will flip to `column` when within these breakpoints.
     */
    responsive?: _EuiThemeBreakpoint[];
  };

export const _EuiPageInner = <T extends ComponentTypes>({
  children,
  component: Component = 'div' as T,
  panelled,
  border,
  paddingSize = 'none',
  responsive = ['xs', 's'],
  ...rest
}: PropsWithChildren<_EuiPageInnerProps<T>>) => {
  const themeContext = useEuiTheme();
  const isResponding = useIsWithinBreakpoints(responsive);
  const styles = euiPageInnerStyles(themeContext);

  let borderSide: 'top' | 'left' | undefined;
  if (border && isResponding) {
    borderSide = 'top';
  } else if (border) {
    borderSide = 'left';
  }

  const cssStyles = [
    styles.euiPageInner,
    useEuiPaddingCSS()[paddingSize as _EuiPaddingSize],
    panelled && styles.panelled,
    borderSide && styles.border[borderSide],
  ];

  return (
    <Component css={cssStyles} {...rest}>
      {children}
    </Component>
  );
};
