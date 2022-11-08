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
import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';
import { cloneElementWithCss } from '../../services/theme/clone_element';

import { euiTabsStyles } from './tabs.styles';

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type EuiTabsSizes = typeof SIZES[number];

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
    const euiTheme = useEuiTheme();

    const classes = classNames('euiTabs', className);

    const styles = euiTabsStyles(euiTheme);
    const cssStyles = [
      styles.euiTabs,
      styles[size],
      bottomBorder && styles.bottomBorder,
    ];

    const tabItems = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return cloneElementWithCss(child, {
          // we're passing the parent `size` and `expand` down to the children
          size: size,
          expand: expand,
        });
      }
    });

    return (
      <div
        ref={ref}
        className={classes}
        css={cssStyles}
        {...(children && { role: 'tablist' })}
        {...rest}
      >
        {tabItems}
      </div>
    );
  }
);

EuiTabs.displayName = 'EuiTabs';
