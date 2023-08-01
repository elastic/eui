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
} from 'react';
import classNames from 'classnames';

import { useEuiTheme, useGeneratedHtmlId } from '../../services';

import { CommonProps } from '../common';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';

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
  };

export const EuiCollapsibleNavBeta: FunctionComponent<
  EuiCollapsibleNavBetaProps
> = ({
  id,
  children,
  className,
  style,
  side = 'left',
  focusTrapProps,
  ...rest
}) => {
  const flyoutID = useGeneratedHtmlId({
    conditionalId: id,
    suffix: 'euiCollapsibleNav',
  });

  const euiTheme = useEuiTheme();
  const classes = classNames(
    'euiCollapsibleNav',
    'euiCollapsibleNavBeta',
    className
  );
  const styles = euiCollapsibleNavBetaStyles(euiTheme);
  const cssStyles = [styles.euiCollapsibleNavBeta, styles[side]];

  return (
    <EuiFlyout
      {...rest} // EuiCollapsibleNav is significantly less permissive than EuiFlyout
      id={flyoutID}
      css={cssStyles}
      className={classes}
      style={style}
      size={248} // TODO: Responsive behavior
      side={side}
      focusTrapProps={focusTrapProps}
      as="nav"
      type="push" // TODO: Responsive behavior
      paddingSize="none"
      pushMinBreakpoint="s"
      onClose={() => {}} // TODO: Collapsed state
      hideCloseButton={true}
    >
      {/* TODO: collapsible button */}
      {children}
    </EuiFlyout>
  );
};
