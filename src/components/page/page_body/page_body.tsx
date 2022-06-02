/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren, ComponentType, ComponentProps } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { _EuiPageRestrictWidth } from '../_restrict_width';
import { euiPageRestictWidthStyles } from '../_restrict_width.styles';
import { EuiPanel, EuiPanelProps } from '../../panel';
import { useEuiPaddingCSS, _EuiPaddingSize } from '../../../global_styling';
import { euiPageBodyStyles } from './page_body.styles';

type ComponentTypes = keyof JSX.IntrinsicElements | ComponentType<any>;

export type EuiPageBodyProps<T extends ComponentTypes = 'main'> = CommonProps &
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
    paddingSize?: _EuiPaddingSize;
  };

export const EuiPageBody = <T extends ComponentTypes>({
  children,
  restrictWidth = false,
  className,
  component: Component = 'div' as T,
  panelled,
  panelProps,
  paddingSize = 'none',
  borderRadius = 'none',
  ...rest
}: PropsWithChildren<EuiPageBodyProps<T>>) => {
  const styles = euiPageBodyStyles();
  const padding = useEuiPaddingCSS()[paddingSize as _EuiPaddingSize];
  const width = euiPageRestictWidthStyles(
    restrictWidth as _EuiPageRestrictWidth
  );

  const classes = classNames('euiPageBody', className);

  const panelCSS = [styles.euiPageBody, width];
  const componentCSS = [styles.euiPageBody, padding, width];

  return panelled ? (
    <EuiPanel
      className={classes}
      css={panelCSS}
      borderRadius={borderRadius}
      paddingSize={paddingSize}
      {...panelProps}
      {...rest}
    >
      {children}
    </EuiPanel>
  ) : (
    <Component className={classes} css={componentCSS} {...rest}>
      {children}
    </Component>
  );
};
