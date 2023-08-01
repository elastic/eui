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
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme, useGeneratedHtmlId } from '../../services';
import { mathWithUnits, logicalStyle } from '../../global_styling';

import { CommonProps } from '../common';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';
import { euiHeaderVariables } from '../header/header.styles';

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
  };

export const EuiCollapsibleNavBeta: FunctionComponent<
  EuiCollapsibleNavBetaProps
> = ({
  id,
  children,
  className,
  style,
  initialIsCollapsed = false,
  side = 'left',
  focusTrapProps,
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

  const classes = classNames(
    'euiCollapsibleNav',
    'euiCollapsibleNavBeta',
    className
  );
  const styles = euiCollapsibleNavBetaStyles(euiTheme);
  const cssStyles = [styles.euiCollapsibleNavBeta, styles[side]];

  // Wait for any fixed headers to be queried before rendering (prevents position jumping)
  const flyout = fixedHeadersCount !== false && (
    <EuiFlyout
      {...rest} // EuiCollapsibleNav is significantly less permissive than EuiFlyout
      id={flyoutID}
      css={cssStyles}
      className={classes}
      style={stylesWithHeaderOffset}
      size={248} // TODO: Responsive behavior
      side={side}
      focusTrapProps={focusTrapProps}
      as="nav"
      type="push" // TODO: Responsive behavior
      paddingSize="none"
      pushMinBreakpoint="s"
      onClose={onClose}
      hideCloseButton={true}
    >
      {children}
    </EuiFlyout>
  );

  return (
    <>
      {/* TODO: collapsible button */}
      {!isCollapsed && flyout}
    </>
  );
};
