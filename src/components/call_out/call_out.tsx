/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';

import { CommonProps } from '../common';
import { IconType, EuiIcon } from '../icon';

import { EuiButtonIcon } from '../button';
import { EuiText } from '../text';
import { useEuiTheme } from '../../services';
import { EuiPanel } from '../panel';
import { EuiSpacer } from '../spacer';
import { EuiTitle } from '../title';
import { EuiI18n } from '../i18n';

import { euiCallOutStyles, euiCallOutHeadingStyles } from './call_out.styles';

export const COLORS = ['primary', 'success', 'warning', 'danger'] as const;
export type Color = (typeof COLORS)[number];

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] as const;
type Heading = (typeof HEADINGS)[number];

type Size = 's' | 'm';

export type EuiCallOutProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> & {
    title?: ReactNode;
    iconType?: IconType;
    color?: Color;
    size?: Size;
    heading?: Heading;
    /**
     * Passing an `onDismiss` callback will render a cross in the top right hand corner
     * of the callout.
     *
     * This callback fires when users click this button, which allows conditionally
     * removing the callout or other actions.
     */
    onDismiss?: () => void;
  };

export const EuiCallOut = forwardRef<HTMLDivElement, EuiCallOutProps>(
  (
    {
      title,
      color = 'primary',
      size = 'm',
      iconType,
      children,
      className,
      heading = 'p',
      onDismiss,
      ...rest
    },
    ref
  ) => {
    const theme = useEuiTheme();
    const styles = euiCallOutStyles(theme);
    const cssStyles = [
      styles.euiCallOut,
      onDismiss && styles.hasDismissButton.hasDimissButton,
      onDismiss && styles.hasDismissButton[size],
    ];
    const cssDismissButtonStyles = [
      styles.dismissButton.euiCallOut__dismissButton,
      styles.dismissButton[size],
    ];
    const headerStyles = euiCallOutHeadingStyles(theme);
    const cssHeaderStyles = [
      headerStyles.euiCallOutHeader,
      headerStyles[color],
    ];

    const classes = classNames(
      'euiCallOut',
      {
        [`euiCallOut--${color}`]: color,
      },
      className
    );

    const dismissButton = onDismiss && (
      <EuiI18n
        token="euiCallOut.dismissAriaLabel"
        default="Dismiss this callout"
      >
        {(dismissAriaLabel: string) => (
          <EuiButtonIcon
            iconType="cross"
            onClick={onDismiss}
            aria-label={dismissAriaLabel}
            css={cssDismissButtonStyles}
            color={color}
            data-test-subj="euiDismissCalloutButton"
          />
        )}
      </EuiI18n>
    );

    const headerIcon = iconType && (
      <EuiIcon
        css={styles.euiCallOut__icon}
        type={iconType}
        size="m"
        aria-hidden="true"
        color="inherit"
      />
    );
    const H: Heading = heading;
    const header = title && (
      <EuiTitle size={size === 's' ? 'xxs' : 'xs'} css={cssHeaderStyles}>
        <H className="euiCallOutHeader__title">
          {headerIcon}
          {title}
        </H>
      </EuiTitle>
    );

    const optionalChildren = children && (
      <EuiText size={size === 's' ? 'xs' : 's'} color="default">
        {children}
      </EuiText>
    );

    // Note: the DOM position of the dismiss button matters to screen reader users.
    // We generally want them to have some context of _what_ they're dismissing,
    // instead of navigating to the dismiss button first before the callout content
    const calloutContent =
      header && optionalChildren ? (
        <>
          {header}
          {dismissButton}
          <EuiSpacer size="s" />
          {optionalChildren}
        </>
      ) : (
        <>
          {header || optionalChildren}
          {dismissButton}
        </>
      );

    return (
      <EuiPanel
        borderRadius="none"
        color={color}
        css={cssStyles}
        paddingSize={size === 's' ? 's' : 'm'}
        className={classes}
        panelRef={ref}
        grow={false}
        {...rest}
      >
        {calloutContent}
      </EuiPanel>
    );
  }
);
EuiCallOut.displayName = 'EuiCallOut';
