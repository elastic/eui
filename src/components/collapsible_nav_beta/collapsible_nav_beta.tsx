/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme, useGeneratedHtmlId, throttle } from '../../services';
import { mathWithUnits, logicalStyle } from '../../global_styling';

import { CommonProps } from '../common';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';
import { euiHeaderVariables } from '../header/header.styles';

import { EuiCollapsibleNavContext } from './context';
import { EuiCollapsibleNavButton } from './collapsible_nav_button';
import { euiCollapsibleNavBetaStyles } from './collapsible_nav_beta.styles';

export type EuiCollapsibleNavBetaProps = CommonProps &
  HTMLAttributes<HTMLElement> &
  Pick<
    EuiFlyoutProps, // Extend only specific flyout props - EuiCollapsibleNav is much less customizable than EuiFlyout
    'side' | 'focusTrapProps' | 'includeFixedHeadersInFocusTrap'
  > & {
    /**
     * ReactNode(s) to render as navigation flyout content, typically `EuiCollapsibleNavItem`s.
     * You may also want to use `EuiFlyoutBody` and `EuiFlyoutFooter` for organization.
     */
    children?: ReactNode;
    /**
     * Whether the navigation flyout should default to initially collapsed or expanded
     */
    initialIsCollapsed?: boolean;
    /**
     * Defaults to 248px wide. The navigation width determines behavior at
     * various responsive breakpoints.
     *
     * At larger screen sizes (at least 3x the width of the nav), the nav will
     * be able to be toggled between a docked full width nav and a collapsed
     * side bar that only shows the icon of each item.
     *
     * At under 3 times the width of the nav, the behavior will lose the collapsed
     * side bar behavior, and switch from a docked flyout to an overlay flyout only.
     *
     * If the page is under 1.5 times the width of the nav, the overlay will
     * take up the full width of the page.
     */
    width?: number;
  };

export const EuiCollapsibleNavBeta: FunctionComponent<
  EuiCollapsibleNavBetaProps
> = ({
  id,
  children,
  className,
  style,
  initialIsCollapsed = false,
  width: _width = 248,
  side = 'left',
  focusTrapProps: _focusTrapProps,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const headerHeight = euiHeaderVariables(euiTheme).height;

  /**
   * Collapsed state
   */
  const [isCollapsed, setIsCollapsed] = useState(initialIsCollapsed);
  const toggleCollapsed = useCallback(
    () => setIsCollapsed((isCollapsed) => !isCollapsed),
    []
  );
  const onClose = useCallback(() => setIsCollapsed(true), []);

  /**
   * Mobile behavior
   */
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSmallestScreen, setIsSmallestScreen] = useState(false);

  // Add a window resize listener that determines breakpoint behavior
  useEffect(() => {
    const getBreakpoints = () => {
      setIsSmallScreen(window.innerWidth < _width * 3);
      setIsSmallestScreen(window.innerWidth < _width * 1.5);
    };
    getBreakpoints();

    const onWindowResize = throttle(getBreakpoints, 50);
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [_width]);

  // If the screen was previously uncollapsed and shrinks down to
  // a smaller mobile view, default that view to a collapsed state
  useEffect(() => {
    if (isSmallScreen) setIsCollapsed(true);
  }, [isSmallScreen]);

  // On small screens, the flyout becomes an overlay rather than a push
  const flyoutType = isSmallScreen ? 'overlay' : 'push';
  const isMobileCollapsed = isSmallScreen && isCollapsed;

  const width = useMemo(() => {
    if (isSmallestScreen) return '100%';
    if (isSmallScreen) return _width;
    if (isCollapsed) return headerHeight;
    return _width;
  }, [_width, isSmallScreen, isSmallestScreen, isCollapsed, headerHeight]);

  /**
   * Header affordance
   */
  const [fixedHeadersCount, setFixedHeadersCount] = useState<number | false>(
    false
  );
  useEffect(() => {
    setFixedHeadersCount(
      document.querySelectorAll('.euiHeader[data-fixed-header]').length
    );
  }, []);

  const stylesWithHeaderOffset = useMemo(() => {
    if (!fixedHeadersCount) return style;

    const headersOffset = mathWithUnits(
      headerHeight,
      (x) => x * fixedHeadersCount
    );
    return {
      ...style,
      ...logicalStyle('top', headersOffset),
      ...logicalStyle('height', `calc(100% - ${headersOffset})`),
    };
  }, [fixedHeadersCount, style, headerHeight]);

  /**
   * Prop setup
   */
  const flyoutID = useGeneratedHtmlId({
    conditionalId: id,
    suffix: 'euiCollapsibleNav',
  });

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const focusTrapProps: EuiFlyoutProps['focusTrapProps'] = useMemo(
    () => ({
      ..._focusTrapProps,
      shards: [buttonRef, ...(_focusTrapProps?.shards || [])],
    }),
    [_focusTrapProps]
  );

  const classes = classNames(
    'euiCollapsibleNav',
    'euiCollapsibleNavBeta',
    className
  );
  const styles = euiCollapsibleNavBetaStyles(euiTheme);
  const cssStyles = [
    styles.euiCollapsibleNavBeta,
    styles[side],
    isSmallestScreen && styles.isSmallestScreen,
  ];

  // Wait for any fixed headers to be queried before rendering (prevents position jumping)
  const flyout = fixedHeadersCount !== false && (
    <EuiFlyout
      {...rest} // EuiCollapsibleNav is significantly less permissive than EuiFlyout
      id={flyoutID}
      css={cssStyles}
      className={classes}
      style={stylesWithHeaderOffset}
      size={width}
      side={side}
      focusTrapProps={focusTrapProps}
      as="nav"
      type={flyoutType}
      paddingSize="none"
      pushMinBreakpoint="xs"
      onClose={onClose}
      hideCloseButton={true}
    >
      {children}
    </EuiFlyout>
  );

  return (
    <EuiCollapsibleNavContext.Provider
      value={{ isSmallScreen, isCollapsed, side }}
    >
      <EuiCollapsibleNavButton
        ref={buttonRef}
        onClick={toggleCollapsed}
        aria-controls={flyoutID}
      />
      {!isMobileCollapsed && flyout}
    </EuiCollapsibleNavContext.Provider>
  );
};
