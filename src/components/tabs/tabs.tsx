/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const sizeToClassNameMap = {
  s: 'euiTabs--small',
  m: null,
  l: 'euiTabs--large',
  xl: 'euiTabs--xlarge',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiTabsSizes = keyof typeof sizeToClassNameMap;

export type EuiTabsProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * ReactNode to render as this component's content
     */
    children?: ReactNode;
    /**
     * Evenly stretches each tab to fill the
     * horizontal space
     */
    expand?: boolean;
    /**
     * Adds a bottom border to separate it from the content after
     */
    bottomBorder?: boolean;
    /**
     * Sizes affect both font size and overall size.
     * Only use the `xl` size when displayed as page titles.
     */
    size?: EuiTabsSizes;
  };

export type EuiTabRef = HTMLDivElement;

export const EuiTabs = forwardRef<EuiTabRef, PropsWithChildren<EuiTabsProps>>(
  (
    {
      children,
      className,
      bottomBorder = true,
      expand = false,
      size = 'm',
      ...rest
    }: PropsWithChildren<EuiTabsProps>,
    ref
  ) => {
    const classes = classNames(
      'euiTabs',
      sizeToClassNameMap[size],
      {
        'euiTabs--expand': expand,
        'euiTabs--bottomBorder': bottomBorder,
      },
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        {...(children && { role: 'tablist' })}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

EuiTabs.displayName = 'EuiTabs';
