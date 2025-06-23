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
  KeyboardEventHandler,
  PropsWithChildren,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { keys, useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { euiTabsStyles } from './tabs.styles';
import { EuiTabsContext } from './tabs_context';

export const SIZES = ['s', 'm', 'l'] as const;
export type EuiTabsSizes = (typeof SIZES)[number];

export type EuiTabsProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren &
  CommonProps & {
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
     */
    size?: EuiTabsSizes;
  };

export type EuiTabRef = HTMLDivElement;

export const EuiTabs = forwardRef<EuiTabRef, EuiTabsProps>(
  (
    {
      children,
      className,
      bottomBorder = true,
      expand = false,
      size = 'm',
      ...rest
    }: EuiTabsProps,
    ref
  ) => {
    const classes = classNames('euiTabs', className);

    const styles = useEuiMemoizedStyles(euiTabsStyles);
    const cssStyles = [
      styles.euiTabs,
      styles[size],
      bottomBorder && styles.bottomBorder,
    ];

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
      const tablist = event.currentTarget;
      const tabs = tablist?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled, [inert])'
      );
      if (!tabs?.length) return;

      const currentIndex = Array.from(tabs).findIndex((tab) =>
        tab.matches(':focus')
      );

      if (event.key === keys.ARROW_LEFT) {
        const previousIndex =
          (currentIndex === 0 ? tabs.length : currentIndex) - 1;
        tabs[previousIndex].focus();
      } else if (event.key === keys.ARROW_RIGHT) {
        const nextIndex =
          currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
        tabs[nextIndex].focus();
      }
    };

    return (
      <div
        ref={ref}
        className={classes}
        css={cssStyles}
        onKeyDown={handleKeyDown}
        {...(children && { role: 'tablist' })}
        {...rest}
      >
        <EuiTabsContext.Provider value={{ expand, size }}>
          {children}
        </EuiTabsContext.Provider>
      </div>
    );
  }
);

EuiTabs.displayName = 'EuiTabs';
