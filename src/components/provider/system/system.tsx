/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  forwardRef,
  ComponentType,
  Ref,
  ForwardRefExoticComponent,
  ForwardedRef,
} from 'react';
import { UseEuiTheme, useEuiTheme } from '../../../services';
import { EuiCacheProvider, useEuiCacheContext } from '../cache';

export interface WithEuiSystemProps<P = {}> {
  euiTheme: UseEuiTheme<P>;
}
export const withEuiSystem = <T extends {} = {}, U extends {} = {}>(
  Component:
    | ComponentType<T & WithEuiSystemProps<U>>
    | ForwardRefExoticComponent<T & WithEuiSystemProps<U>>
) => {
  const componentName = Component.displayName || Component.name || 'Component';
  const Render = (
    props: Omit<T, keyof WithEuiSystemProps<U>>,
    ref:
      | Ref<Omit<T, keyof WithEuiSystemProps<U>>>
      | ForwardedRef<Omit<T, keyof WithEuiSystemProps<U>>>
  ) => {
    const euiTheme = useEuiTheme<U>();
    const cache = useEuiCacheContext();
    return (
      <EuiCacheProvider cache={cache}>
        <Component euiTheme={euiTheme} ref={ref} {...(props as T)} />
      </EuiCacheProvider>
    );
  };

  const WithEuiSystem = forwardRef(Render);

  WithEuiSystem.displayName = componentName.replace(/^_{1}/, '');

  return WithEuiSystem;
};
