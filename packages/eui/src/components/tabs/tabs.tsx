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
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import {
  keys,
  setMultipleRefs,
  useEuiMemoizedStyles,
} from '../../services';
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

/**
 * @see {@link https://eui.elastic.co/docs/components/containers/tabs/|EuiTabs documentation}
 */
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
      styles.hideTabUnderline,
      bottomBorder && styles.bottomBorder,
    ];

    const tabsRef = useRef<HTMLDivElement | null>(null);
    const indicatorRef = useRef<HTMLSpanElement | null>(null);
    const placementRef = useRef<{
      tab: HTMLElement;
      left: number;
      width: number;
    } | null>(null);

    const setTabsRef = useCallback(
      (node: HTMLDivElement | null) => {
        tabsRef.current = node;
        setMultipleRefs([ref], node);
      },
      [ref]
    );

    const placeIndicator = useCallback((allowAnimation: boolean) => {
      const tabsEl = tabsRef.current;
      const indicator = indicatorRef.current;
      if (!tabsEl || !indicator) return;

      const selected =
        Array.from(
          tabsEl.querySelectorAll<HTMLElement>('.euiTab-isSelected')
        ).find((tab) => tab.closest('.euiTabs') === tabsEl) ?? null;

      if (!selected) {
        indicator.style.opacity = '0';
        placementRef.current = null;
        return;
      }

      const tabsRect = tabsEl.getBoundingClientRect();
      const tabRect = selected.getBoundingClientRect();
      const left =
        Math.round(
          (tabRect.left - tabsRect.left - tabsEl.clientLeft + tabsEl.scrollLeft) *
            100
        ) / 100;
      const width = Math.round(tabRect.width * 100) / 100;
      const disabled =
        selected.hasAttribute('disabled') ||
        selected.getAttribute('aria-disabled') === 'true';

      indicator.toggleAttribute('data-disabled', disabled);

      const previous = placementRef.current;
      if (
        previous &&
        previous.tab === selected &&
        previous.left === left &&
        previous.width === width
      ) {
        return;
      }

      const shouldAnimate =
        allowAnimation && previous !== null && previous.tab !== selected;

      if (!shouldAnimate) indicator.style.transition = 'none';
      indicator.style.opacity = '1';
      indicator.style.width = `${width}px`;
      indicator.style.transform = `translate3d(${left}px, 0, 0)`;
      placementRef.current = { tab: selected, left, width };
      if (!shouldAnimate) {
        indicator.getBoundingClientRect();
        indicator.style.removeProperty('transition');
      }
    }, []);

    useLayoutEffect(() => {
      placeIndicator(true);
    }, [children, placeIndicator]);

    useLayoutEffect(() => {
      const tabsEl = tabsRef.current;
      if (!tabsEl) return;

      const observer = new ResizeObserver(() => placeIndicator(false));
      observer.observe(tabsEl);
      tabsEl.querySelectorAll<HTMLElement>('.euiTab').forEach((tab) => {
        if (tab.closest('.euiTabs') === tabsEl) observer.observe(tab);
      });

      return () => observer.disconnect();
    }, [children, placeIndicator]);

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
        ref={setTabsRef}
        className={classes}
        css={cssStyles}
        onKeyDown={handleKeyDown}
        {...(children && { role: 'tablist' })}
        {...rest}
      >
        <EuiTabsContext.Provider value={{ expand, size }}>
          {children}
        </EuiTabsContext.Provider>
        <span
          ref={indicatorRef}
          className="euiTabs__indicator"
          css={styles.euiTabs__indicator}
          aria-hidden="true"
        />
      </div>
    );
  }
);

EuiTabs.displayName = 'EuiTabs';
