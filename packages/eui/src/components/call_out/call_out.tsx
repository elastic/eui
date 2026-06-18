/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { _EuiThemeBorderColors, getTokenName } from '@elastic/eui-theme-common';

import { useEuiMemoizedStyles, useEuiTheme } from '../../services';
import { useEuiBorderColorCSS } from '../../global_styling';
import { CommonProps, DataAttributeProps } from '../common';
import { EuiIcon, IconType } from '../icon';
import { EuiButtonIcon } from '../button';
import { type EuiButtonIconPropsForButton } from '../button/button_icon/button_icon';
import { EuiText } from '../text';
import { EuiPanel } from '../panel';
import { EuiTitle } from '../title';
import { EuiI18n } from '../i18n';
import { EuiLiveAnnouncer } from '../accessibility/live_announcer';
import {
  EuiNotificationIcon,
  type EuiNotificationIconType,
} from '../notification_icon/notification_icon';

import { useLayoutObserver } from './use_layout_observer';
import {
  EuiCallOutAction,
  EuiCallOutActionPrimaryProps,
  EuiCallOutActionSecondaryProps,
} from './call_out_action';
import { euiCallOutStyles, euiCallOutHeaderStyles } from './call_out.styles';
import { EuiCallOutColor, EuiCallOutHeading, EuiCallOutSize } from './types';
import { euiNotificationIconStyles } from '../notification_icon/notification_icon.styles';

export const COLOR_TO_NOTIFICATION_ICON_MAP: Record<
  EuiCallOutColor,
  EuiNotificationIconType
> = {
  primary: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
};

/** Get correct color with fallback */
const getCallOutColor = (color: unknown): EuiCallOutColor => {
  return typeof color === 'string' && color in COLOR_TO_NOTIFICATION_ICON_MAP
    ? (color as EuiCallOutColor)
    : 'primary';
};

export type EuiCallOutProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> & {
    /**
     * Title of the callout. Should be used with text only. Do not pass complex content or custom components.
     * Ensure to always pass a title. It's currently marked as optional for backwards compatibility.
     * In a future major release, this will be required.
     */
    title?: ReactNode;
    /**
     * Main component text. Accepts text, text block elements such as `<p>`, and inline elements such as `<span>`, `<strong>`, `<em>` or `<EuiLink>`.
     * Avoid passing complex layouts or custom components. Use `children` instead.
     */
    text?: ReactNode;
    /**
     * Can be used for additional, non-inline content. Use sparingly, as callouts are not meant to have complex content.
     * Where possible, use `text` and `actionProps` instead to display text and actions.
     */
    children?: ReactNode;
    /**
     * Defines a custom icon to be displayed.
     * When no `iconType` is set, a default icon will be used based on the `color` of the callout.
     */
    iconType?: IconType;
    color?: EuiCallOutColor;
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
     */
    actionProps?: {
      primary?: EuiCallOutActionPrimaryProps;
      secondary?: EuiCallOutActionSecondaryProps;
    };
  };

export const EuiCallOut = forwardRef<HTMLDivElement, EuiCallOutProps>(
  (
    {
      title,
      text,
      color: _color = 'primary',
      size = 'm',
      iconType,
      children,
      actionProps,
      className,
      heading = 'p',
      onDismiss,
      dismissButtonProps,
      announceOnMount = false,
      style,
      'data-test-subj': dataTestSubj,
      ...rest
    },
    ref
  ) => {
    const { euiTheme } = useEuiTheme();
    const color = getCallOutColor(_color);

    /* Uses resize observer to determine the container width/layout instead of native container queries,
    because callouts can be placed in containers without defined size (absolute positioned, no-grow flex layout etc.)
    where container queries would collapse by design instead of adjusting to the content dimensions. */
    const panelRef = useLayoutObserver(size, ref);

    const borderColors = useEuiBorderColorCSS();
    const styles = useEuiMemoizedStyles(euiCallOutStyles);
    const cssStyles = [
      styles.euiCallOut,
      borderColors[color],
      onDismiss && styles.hasDismissButton,
    ];

    const highlightColorToken = getTokenName(
      'borderStrong',
      color
    ) as keyof _EuiThemeBorderColors;
    const typeColor = euiTheme.colors[highlightColorToken];

    const cssVariables = useMemo(
      () => ({
        '--euiCallOutTypeColor': typeColor,
      }),
      [typeColor]
    );

    const classes = classNames(
      'euiCallOut',
      {
        [`euiCallOut--${color}`]: color,
      },
      className
    );

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
              color={color}
              size="xs"
              onClick={onDismiss}
            />
          )}
        </EuiI18n>
      );
    }, [onDismiss, styles, color, dismissButtonProps]);

    const headerStyles = useEuiMemoizedStyles(euiCallOutHeaderStyles);
    const iconStyles = useEuiMemoizedStyles(euiNotificationIconStyles);
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

    const icon = useMemo(() => {
      if (!iconType) {
        const iconType = COLOR_TO_NOTIFICATION_ICON_MAP[color] ?? 'info';

        return (
          <EuiNotificationIcon
            css={styles.icon}
            type={iconType}
            size={size === 's' ? 'm' : 'l'}
          />
        );
      }

      return (
        <EuiIcon
          css={[styles.icon, size === 'm' && iconStyles.size.l]}
          type={iconType}
          size={size === 's' ? 'm' : 'l'}
          aria-hidden="true"
          color={typeColor}
        />
      );
    }, [iconType, color, size, typeColor, styles, iconStyles]);

    const optionalChildren = (text || children) && (
      <>
        {text && (
          <EuiText
            size="s"
            color="default"
            className="euiCallOut__text"
            data-test-subj={dataTestSubj && `${dataTestSubj}__message`}
          >
            {text}
          </EuiText>
        )}
        {children && (
          <EuiText
            className="euiCallOut__additionalContent"
            size={size === 's' ? 'xs' : 's'}
            color="default"
            data-test-subj={dataTestSubj && `${dataTestSubj}__content`}
          >
            {children}
          </EuiText>
        )}
      </>
    );

    const actionControls = useMemo(() => {
      const actionPrimaryProps = {
        ...actionProps?.primary,
        color: color,
      };
      const actionSecondaryProps = {
        ...actionProps?.secondary,
        color: color,
      };
      const hasActionPrimary = Boolean(actionProps?.primary);
      const hasActionSecondary = Boolean(actionProps?.secondary);

      if (!hasActionPrimary && !hasActionSecondary) return null;

      const actionPrimary = hasActionPrimary && (
        <EuiCallOutAction actionType="primary" {...actionPrimaryProps} />
      );

      const actionSecondary = hasActionSecondary && (
        <EuiCallOutAction actionType="secondary" {...actionSecondaryProps} />
      );

      return (
        <div
          css={styles.actions}
          data-test-subj={dataTestSubj && `${dataTestSubj}__actions`}
        >
          {actionPrimary}
          {actionSecondary}
        </div>
      );
    }, [actionProps, color, styles, dataTestSubj]);

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
        color={color}
        css={cssStyles}
        // uses custom padding
        paddingSize="none"
        className={classes}
        panelRef={panelRef}
        grow={false}
        style={{ ...cssVariables, ...style }}
        data-size={size}
        data-test-subj={dataTestSubj}
        {...rest}
      >
        <div css={styles.wrapper}>
          <div css={styles.body}>
            {icon}
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
