/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../services';
import { EuiTitle, EuiTitleProps } from '../title';
import { EuiScreenReaderOnly } from '../accessibility';

export type EuiSideNavHeadingProps = Omit<EuiTitleProps, 'children'> & {
  children: ReactNode;
  /**
   * The actual HTML heading element to wrap the `heading`.
   * Default is `h2`
   */
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  /**
   * For best accessibility, `<nav>` elements should have a nested heading. But you can hide this element if it's redundent from something else (except on mobile).
   */
  screenReaderOnly?: boolean;
};

export const EuiSideNavHeading: FunctionComponent<EuiSideNavHeadingProps> = ({
  children,
  id,
  className,
  element: HeadingElement = 'h2',
  screenReaderOnly = false,
  // EuiTitle specific props
  size = 'xs',
  textTransform,
  ...rest
}) => {
  const classes = classNames('euiSideNav__heading', className);

  const { euiTheme } = useEuiTheme();

  return screenReaderOnly ? (
    <EuiScreenReaderOnly>
      <HeadingElement id={id} className={classes} {...rest}>
        {children}
      </HeadingElement>
    </EuiScreenReaderOnly>
  ) : (
    <EuiTitle size={size} textTransform={textTransform}>
      <HeadingElement
        id={id}
        className={classes}
        css={{ marginBlockEnd: euiTheme.size.l }}
        {...rest}
      >
        {children}
      </HeadingElement>
    </EuiTitle>
  );
};
