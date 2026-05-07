/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import {
  _EuiThemeBackgroundColors,
  getTokenName,
} from '@elastic/eui-theme-common';

import { useEuiMemoizedStyles, useEuiTheme } from '../../services';
import { useEuiBorderColorCSS } from '../../global_styling';
import { CommonProps, DataAttributeProps } from '../common';
import { IconType } from '../icon';
import { EuiButtonIcon } from '../button';
import { type EuiButtonIconPropsForButton } from '../button/button_icon/button_icon';
import { EuiText } from '../text';
import { EuiPanel } from '../panel';
import { EuiTitle } from '../title';
import { EuiI18n } from '../i18n';
import { EuiLiveAnnouncer } from '../accessibility/live_announcer';
import {
  EuiNotificationIcon,
  EuiNotificationIconType,
} from '../notification_icon/notification_icon';

import {
  EuiCallOutAction,
  EuiCallOutActionPrimaryProps,
  EuiCallOutActioSecondaryProps,
} from './call_out_action';
import { euiCallOutStyles, euiCallOutHeaderStyles } from './call_out.styles';
import {
  EuiCalloutColor,
  EuiCallOutHeading,
  EuiCallOutSize,
  EuiCallOutType,
} from './types';

export const TYPE_TO_VARIANT_MAP: Record<
  EuiCallOutType,
  { color: EuiCalloutColor; iconType: EuiNotificationIconType }
> = {
  neutral: { color: 'primary', iconType: 'info' },
  success: { color: 'success', iconType: 'success' },
  warning: { color: 'warning', iconType: 'warning' },
  danger: { color: 'danger', iconType: 'error' },
};

export type EuiCallOutProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> & {
    title?: ReactNode;
    /**
     * Main component text.
     * Should be used for text only. Do not pass complex content or custom components.
     */
    text?: ReactNode;
    /**
     * Defines the overall type of the callout and renders preset color and icon.
     */
    type?: EuiCallOutType;

    /**
     * @deprecated - use `type` instead.
     */
    iconType?: IconType;
    /**
     * @deprecated - use `type` instead.
     */
    color?: EuiCalloutColor;
    size?: EuiCallOutSize;
    heading?: EuiCallOutHeading;
    /**
     * Passing an `onDismiss` callback will render a cross in the top right hand corner
     * of the callout.
     *
     * This callback fires when users click this button, which allows conditionally
     * removing the callout or other actions.
     */
    onDismiss?: () => void;

    /**
     * Useful for passing additional props to the dismiss button e.g. data attributes
     */
    dismissButtonProps?: Partial<EuiButtonIconPropsForButton> &
      DataAttributeProps;

    /**
     * Enables the content to be read by screen readers on mount.
     * Use this for callouts that are shown based on a user action.
     *
     * @default false
     */
    announceOnMount?: boolean;
    /**
     * Props for primary and secondary actions within the callout.
     * Secondary actions will only be rendered in combination with a primary action.
     */
    actionProps?: {
      primary?: EuiCallOutActionPrimaryProps;
      secondary?: EuiCallOutActioSecondaryProps;
    };
  };

export const EuiCallOut = forwardRef<HTMLDivElement, EuiCallOutProps>(
  (
    {
      title,
      text,
      type = 'neutral',
      size = 'm',
      color,
      iconType,
      children,
      actionProps,
      className,
      heading = 'p',
      onDismiss,
      dismissButtonProps,
      announceOnMount = false,
      style,
      ...rest
    },
    ref
  ) => {
    const { euiTheme } = useEuiTheme();
    const variant = TYPE_TO_VARIANT_MAP[type];

    const borderColors = useEuiBorderColorCSS();
    const styles = useEuiMemoizedStyles(euiCallOutStyles);
    const cssStyles = [
      styles.euiCallOut,
      borderColors[variant.color],
      onDismiss && styles.hasDismissButton,
    ];

    const highlightColorToken = getTokenName(
      'backgroundFilled',
      variant.color
    ) as keyof _EuiThemeBackgroundColors;
    const typeColor = euiTheme.colors[highlightColorToken];

    const cssVariables = useMemo(
      () => ({
        '--euiCallOutTypeColor': typeColor,
      }),
      [typeColor]
    );

    const classes = classNames('euiCallOut', className);

    const dismissButton = useMemo(() => {
      if (!onDismiss) return;

      const cssStyles = [styles.dismissButton.euiCallOut__dismissButton];

      return (
        <EuiI18n
          token="euiCallOut.dismissAriaLabel"
          default="Dismiss this callout"
        >
          {(dismissAriaLabel: string) => (
            <EuiButtonIcon
              data-test-subj="euiDismissCalloutButton"
              aria-label={dismissAriaLabel}
              css={cssStyles}
              {...dismissButtonProps}
              iconType="cross"
              color={variant.color}
              size="xs"
              onClick={onDismiss}
            />
          )}
        </EuiI18n>
      );
    }, [onDismiss, styles, variant, dismissButtonProps]);

    const headerStyles = useEuiMemoizedStyles(euiCallOutHeaderStyles);
    const header = useMemo(() => {
      if (!title) return;

      const H: EuiCallOutHeading = heading;
      const cssStyles = [headerStyles.euiCallOutHeader];

      return (
        <EuiTitle size={size === 's' ? 'xxs' : 'xs'} css={cssStyles}>
          <H className="euiCallOutHeader__title">{title}</H>
        </EuiTitle>
      );
    }, [title, heading, size, headerStyles]);

    const optionalChildren = (
      <>
        {text && (
          <EuiText size="s" color="default" className="euiCallOut__text">
            {text}
          </EuiText>
        )}
        {children && (
          <div className="euiCallOut__additionalContent">{children}</div>
        )}
      </>
    );

    const actionControls = useMemo(() => {
      const actionPrimaryProps = {
        ...actionProps?.primary,
        color: variant.color,
      };
      const actionSecondaryProps = {
        ...actionProps?.secondary,
        color: variant.color,
      };
      const hasActionPrimary = Boolean(actionProps?.primary);
      const hasActionSecondary = Boolean(actionProps?.secondary);
      // a standalone secondary action is not supported
      const hasActions = hasActionPrimary;

      if (!hasActions) return null;

      const actionPrimary = hasActionPrimary && (
        <EuiCallOutAction actionType="primary" {...actionPrimaryProps} />
      );

      const actionSecondary = hasActionSecondary && (
        <EuiCallOutAction actionType="secondary" {...actionSecondaryProps} />
      );

      return (
        <div css={styles.actions}>
          {actionPrimary}
          {actionSecondary}
        </div>
      );
    }, [actionProps, variant, styles]);

    const announcement = useMemo(() => {
      if (!announceOnMount || !(title || text || children)) return null;

      return (
        <EuiLiveAnnouncer>
          {title && title}
          {title && text && ',\u00A0'}
          {text && text}
          {(title || text) && children && ',\u00A0'}
          {children && children}
        </EuiLiveAnnouncer>
      );
    }, [announceOnMount, title, text, children]);

    return (
      <EuiPanel
        borderRadius="none"
        color={variant.color}
        css={cssStyles}
        // uses custom padding
        paddingSize="none"
        className={classes}
        panelRef={ref}
        grow={false}
        style={{ ...cssVariables, ...style }}
        data-size={size}
        data-type={type}
        {...rest}
      >
        <div css={styles.wrapper}>
          <div css={styles.body}>
            <EuiNotificationIcon
              css={styles.icon}
              type={variant.iconType}
              size={size === 's' ? 'm' : 'l'}
            />
            <div css={styles.content}>
              {
                // Note: the DOM position of the dismiss button matters to screen reader users.
                // We generally want them to have some context of _what_ they're dismissing,
                // instead of navigating to the dismiss button first before the callout content
                header && optionalChildren ? (
                  <>
                    {header}
                    {dismissButton}
                    {optionalChildren}
                  </>
                ) : (
                  <>
                    {header || optionalChildren}
                    {dismissButton}
                  </>
                )
              }
            </div>
          </div>

          {actionControls}
          {announcement}
        </div>
      </EuiPanel>
    );
  }
);
EuiCallOut.displayName = 'EuiCallOut';
