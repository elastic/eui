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
} from '../../../global_styling';
import { useEuiTheme } from '../../../services';
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
     * Adds a white background and shadow to define the area
     */
    panelled?: boolean;
    /**
     * Adds a left side border, typically added when a side bar exists
     */
    border?: boolean;
  };

export const _EuiPageInner = <T extends ComponentTypes>({
  children,
  component: Component = 'div' as T,
  panelled,
  border,
  paddingSize = 'none',
  ...rest
}: PropsWithChildren<_EuiPageInnerProps<T>>) => {
  const themeContext = useEuiTheme();
  const styles = euiPageInnerStyles(themeContext);

  const cssStyles = [
    styles.euiPageInner,
    useEuiPaddingCSS()[paddingSize as _EuiPaddingSize],
    panelled && styles.panelled,
    border && styles.border,
  ];

  return (
    <Component css={cssStyles} {...rest}>
      {children}
    </Component>
  );
};

// _EuiPageInner.displayName = 'EuiPageInner';
