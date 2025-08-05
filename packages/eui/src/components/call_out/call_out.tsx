/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';

import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { IconType, EuiIcon } from '../icon';
import { EuiButtonIcon } from '../button';
import { EuiText } from '../text';
import { EuiPanel } from '../panel';
import { EuiSpacer } from '../spacer';
import { EuiTitle } from '../title';
import { EuiI18n } from '../i18n';
import { EuiLiveAnnouncer } from '../accessibility/live_announcer';

import { euiCallOutStyles, euiCallOutHeaderStyles } from './call_out.styles';

export const COLORS = [
  'primary',
  'success',
  'warning',
  'danger',
  'accent',
] as const;
export type Color = (typeof COLORS)[number];

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] as const;
export type Heading = (typeof HEADINGS)[number];

export const SIZES = ['s', 'm'] as const;
export type Size = (typeof SIZES)[number];

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
    /**
     * Enables the content to be read by screen readers on mount.
     * Use this for callouts that are shown based on a user action.
     *
     * @default false
     */
    announceOnMount?: boolean;
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
      announceOnMount = false,
      ...rest
    },
    ref
  ) => {
    const styles = useEuiMemoizedStyles(euiCallOutStyles);
    const cssStyles = [
      styles.euiCallOut,
      onDismiss && styles.hasDismissButton.hasDimissButton,
      onDismiss && styles.hasDismissButton[size],
    ];

    const classes = classNames(
      'euiCallOut',
      {
        [`euiCallOut--${color}`]: color,
      },
      className
    );

    const dismissButton = useMemo(() => {
      if (!onDismiss) return;

      const cssStyles = [
        styles.dismissButton.euiCallOut__dismissButton,
        styles.dismissButton[size],
      ];

      return (
        <EuiI18n
          token="euiCallOut.dismissAriaLabel"
          default="Dismiss this callout"
        >
          {(dismissAriaLabel: string) => (
            <EuiButtonIcon
              iconType="cross"
              onClick={onDismiss}
              aria-label={dismissAriaLabel}
              css={cssStyles}
              color={color}
              data-test-subj="euiDismissCalloutButton"
            />
          )}
        </EuiI18n>
      );
    }, [onDismiss, styles, color, size]);

    const headerStyles = useEuiMemoizedStyles(euiCallOutHeaderStyles);
    const header = useMemo(() => {
      if (!title) return;

      const H: Heading = heading;
      const cssStyles = [headerStyles.euiCallOutHeader, headerStyles[color]];

      return (
        <EuiTitle size={size === 's' ? 'xxs' : 'xs'} css={cssStyles}>
          <H className="euiCallOutHeader__title">
            {iconType && (
              <EuiIcon
                css={headerStyles.euiCallOut__icon}
                type={iconType}
                size="m"
                aria-hidden="true"
                color="inherit"
              />
            )}
            {title}
          </H>
        </EuiTitle>
      );
    }, [title, heading, iconType, size, color, headerStyles]);

    const optionalChildren = children && (
      <EuiText size={size === 's' ? 'xs' : 's'} color="default">
        {children}
      </EuiText>
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
        {
          // Note: the DOM position of the dismiss button matters to screen reader users.
          // We generally want them to have some context of _what_ they're dismissing,
          // instead of navigating to the dismiss button first before the callout content
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
          )
        }
        {announceOnMount && (title || children) && (
          <EuiLiveAnnouncer>
            {title && `${title}, `}
            {children}
          </EuiLiveAnnouncer>
        )}
      </EuiPanel>
    );
  }
);
EuiCallOut.displayName = 'EuiCallOut';
