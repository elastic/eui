/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useContext } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../services';
import {
  EuiFlyoutBody,
  EuiFlyoutBodyProps,
  EuiFlyoutFooter,
  EuiFlyoutFooterProps,
} from '../flyout';

import { EuiCollapsibleNavContext } from './context';
import {
  euiCollapsibleNavBodyStyles as bodyStyles,
  euiCollapsibleNavFooterStyles,
} from './collapsible_nav_body_footer.styles';

/**
 * These components are incredibly light wrappers around `EuiFlyoutBody`
 * and `EuiFlyoutFooter` with collapsible nav-specific styling/considerations.
 *
 * Note: They are not intended to be used standalone outside of EuiCollapsibleNav
 */

export const EuiCollapsibleNavBody: EuiFlyoutBodyProps = ({
  className,
  ...props
}) => {
  const classes = classNames('euiCollapsibleNav__body', className);

  const { isCollapsed, isPush } = useContext(EuiCollapsibleNavContext);
  const cssStyles = [
    bodyStyles.euiCollapsibleNav__body,
    isCollapsed && isPush && bodyStyles.isPushCollapsed,
  ];

  return (
    <EuiFlyoutBody
      className={classes}
      css={cssStyles}
      // Since this is a nav, we can almost guarantee there will be clickable
      // children/links that will enable scrolling. As such, we're optimistically
      // removing the extra tab stop
      scrollableTabIndex={-1}
      {...props}
    />
  );
};

export const EuiCollapsibleNavFooter: EuiFlyoutFooterProps = ({
  className,
  children,
  ...props
}) => {
  const classes = classNames('euiCollapsibleNav__footer', className);

  const { isCollapsed, isPush } = useContext(EuiCollapsibleNavContext);
  const euiTheme = useEuiTheme();
  const styles = euiCollapsibleNavFooterStyles(euiTheme);
  const cssStyles = styles.euiCollapsibleNav__footer;
  const overflowWrapperStyles = [
    styles.euiFlyoutFooter__overflow,
    isCollapsed && isPush && styles.isPushCollapsed,
  ];

  return (
    <EuiFlyoutFooter className={classes} css={cssStyles} {...props}>
      <div css={overflowWrapperStyles}>{children}</div>
    </EuiFlyoutFooter>
  );
};
