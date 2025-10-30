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

import {
  useEuiMemoizedStyles,
  useEuiThemeCSSVariables,
  useGeneratedHtmlId,
  throttle,
} from '../../services';

import { CommonProps } from '../common';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';
import { useEuiI18n } from '../i18n';
import { euiHeaderVariables } from '../header/header.styles';

import { EuiCollapsibleNavContext } from './context';
import { EuiCollapsibleNavButton } from './collapsible_nav_button';
import { euiCollapsibleNavBetaStyles } from './collapsible_nav_beta.styles';

export type EuiCollapsibleNavBetaProps = CommonProps &
  Omit<HTMLAttributes<HTMLElement>, 'onResize'> &
  Pick<
    EuiFlyoutProps, // Extend only specific flyout props - EuiCollapsibleNav is much less customizable than EuiFlyout
    'side' | 'focusTrapProps' | 'includeFixedHeadersInFocusTrap'
  > & {
    /**
     * ReactNode(s) to render as navigation flyout content, typically `EuiCollapsibleNavBeta.Item`s.
     * You will likely want to use `EuiCollapsibleNavBeta.Body` and `EuiCollapsibleNavBeta.Footer`
     * for organization.
     */
    children?: ReactNode;
    /**
     * Whether the navigation flyout should default to initially collapsed or expanded.
     * Used for **uncontrolled** state.
     */
    initialIsCollapsed?: boolean;
    /**
     * If defined, the navigation collapsed/expanded state is **controlled**
     * by the consumer and `onCollapseToggle` must be passed as well.
     * This prop supercedes `initialIsCollapsed`.
     */
    isCollapsed?: boolean;
    /**
     * Optional callback that fires when the user toggles the nav between
     * collapsed and uncollapsed states
     */
    onCollapseToggle?: (isCollapsed: boolean) => void;
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
    /**
     * Overlay flyouts are considered dialogs, and dialogs must have a label.
     * By default, a label of `Site menu` will be applied.
     *
     * If your usage of this component is not actually for site-wide navigation,
     * please set your own `aria-label` or `aria-labelledby`.
     *
     * @default 'Site menu'
     */
    'aria-label'?: string;
  };

const _EuiCollapsibleNavBeta: FunctionComponent<EuiCollapsibleNavBetaProps> = ({
  id,
  children,
  className,
  initialIsCollapsed = false,
  isCollapsed: propsIsCollapsed,
  onCollapseToggle,
  width: _width = 248,
  side = 'left',
  focusTrapProps: _focusTrapProps,
  ...rest
}) => {
  const { setGlobalCSSVariables } = useEuiThemeCSSVariables();
  const { height: headerHeight } = useEuiMemoizedStyles(euiHeaderVariables);

  /**
   * Collapsed state
   */
  const [isCollapsed, setIsCollapsed] = useState(initialIsCollapsed);
  const toggleCollapsed = useCallback(
    () =>
      setIsCollapsed((isCollapsed) => {
        onCollapseToggle?.(!isCollapsed);
        return !isCollapsed;
      }),
    [onCollapseToggle]
  );
  const onClose = useCallback(() => {
    setIsCollapsed(true);
    onCollapseToggle?.(true);
  }, [onCollapseToggle]);

  // Controlled state
  useEffect(() => {
    if (propsIsCollapsed !== undefined) {
      setIsCollapsed(propsIsCollapsed);
    }
  }, [propsIsCollapsed]);

  /**
   * Responsive behavior
   * By default on large enough screens, the nav is always a push flyout,
   * but on smaller/mobile screens, the nav overlays the page instead
   */
  const [isOverlay, setIsOverlay] = useState(false);
  const [isOverlayFullWidth, setIsOverlayFullWidth] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const toggleOverlayFlyout = useCallback(() => {
    setIsOverlayOpen((isOpen) => !isOpen);
  }, []);
  const closeOverlayFlyout = useCallback(() => setIsOverlayOpen(false), []);

  const flyoutType = isOverlay ? 'overlay' : 'push';
  const isPush = !isOverlay;

  // Set up a window resize listener that determines breakpoint behavior
  useEffect(() => {
    const getBreakpoints = () => {
      setIsOverlay(window.innerWidth < _width * 3);
      setIsOverlayFullWidth(window.innerWidth < _width * 1.5);
    };
    getBreakpoints();

    const onWindowResize = throttle(getBreakpoints, 50);
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [_width]);

  const width = useMemo(() => {
    if (isOverlayFullWidth) return '100%';
    if (isPush && isCollapsed) return headerHeight;
    return `${_width}px`;
  }, [_width, isOverlayFullWidth, isPush, isCollapsed, headerHeight]);

  // Other UI elements may need to account for the nav width -
  // set a global CSS variable that they can use
  useEffect(() => {
    setGlobalCSSVariables({
      '--euiCollapsibleNavOffset': isOverlay ? '0' : width,
    });
  }, [width, isOverlay, setGlobalCSSVariables]);

  /**
   * Prop setup
   */
  const flyoutID = useGeneratedHtmlId({
    conditionalId: id,
    suffix: 'euiCollapsibleNav',
  });
  const defaultAriaLabel = useEuiI18n(
    'euiCollapsibleNavBeta.ariaLabel',
    'Site menu'
  );

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
  const styles = useEuiMemoizedStyles(euiCollapsibleNavBetaStyles);
  const cssStyles = [
    styles.euiCollapsibleNavBeta,
    isPush && styles.isPush,
    styles[side],
    isPush && isCollapsed && styles.isPushCollapsed,
    isOverlayFullWidth && styles.isOverlayFullWidth,
  ];

  const flyout = (
    <EuiFlyout
      aria-label={defaultAriaLabel}
      {...rest} // EuiCollapsibleNav is significantly less permissive than EuiFlyout
      id={flyoutID}
      session="never"
      css={cssStyles}
      className={classes}
      size={width}
      side={side}
      focusTrapProps={focusTrapProps}
      as="nav"
      type={flyoutType}
      paddingSize="none"
      pushMinBreakpoint="xs"
      onClose={isPush ? onClose : closeOverlayFlyout}
      hideCloseButton={true}
    >
      {children}
    </EuiFlyout>
  );

  const hideFlyout = isOverlay && !isOverlayOpen;

  return (
    <EuiCollapsibleNavContext.Provider
      value={{
        isPush,
        isCollapsed,
        isOverlayOpen,
        side,
        closePortals: closeOverlayFlyout,
      }}
    >
      <EuiCollapsibleNavButton
        ref={buttonRef}
        onClick={isPush ? toggleCollapsed : toggleOverlayFlyout}
        aria-controls={flyoutID}
      />
      {!hideFlyout && flyout}
    </EuiCollapsibleNavContext.Provider>
  );
};

/**
 * Combined export with subcomponents
 */

import {
  EuiCollapsibleNavBody,
  EuiCollapsibleNavFooter,
} from './collapsible_nav_body_footer';
import { EuiCollapsibleNavItem } from './collapsible_nav_item';
import { KibanaCollapsibleNavSolution } from './_kibana_solution';

export const EuiCollapsibleNavBeta = Object.assign(_EuiCollapsibleNavBeta, {
  Body: EuiCollapsibleNavBody,
  Footer: EuiCollapsibleNavFooter,
  Item: EuiCollapsibleNavItem,
  KibanaSolution: KibanaCollapsibleNavSolution,
});
