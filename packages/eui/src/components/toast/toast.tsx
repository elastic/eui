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
} from 'react';
import classNames from 'classnames';
import {
  _EuiThemeBackgroundColors,
  _EuiThemeBorderColors,
  getTokenName,
} from '@elastic/eui-theme-common';

import { useEuiMemoizedStyles, useEuiTheme } from '../../services';
import { CommonProps } from '../common';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import { IconType, EuiIcon } from '../icon';
import { EuiText } from '../text';

import { euiToastStyles, euiToastHeaderStyles } from './toast.styles';
import {
  EuiNotificationIcon,
  type EuiNotificationIconType,
} from '../notification_icon/notification_icon';
import { euiNotificationIconStyles } from '../notification_icon/notification_icon.styles';
import {
  EuiToastAction,
  EuiToastActionPrimaryProps,
  EuiToastActionSecondaryProps,
} from './toast_action';
import { EuiToastColor } from './types';
import { EuiTitle } from '../title';

export const COLOR_TO_NOTIFICATION_ICON_MAP: Record<
  EuiToastColor,
  EuiNotificationIconType
> = {
  primary: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
};

export interface EuiToastProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Title of the toast. Should be used with text only. Do not pass complex content or custom components.
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
   * Can be used for additional, non-inline content. Use sparingly, as toasts are not meant to have complex content.
   * Where possible, use `text` and `actionProps` instead to display text and actions.
   */
  children?: ReactNode;
  color?: EuiToastColor;
  /**
   * Defines a custom icon to be displayed.
   * When no `iconType` is set, a default icon will be used based on the `color` of the toast.
   */
  iconType?: IconType;
  onClose?: () => void;
  /**
   * Duration in milliseconds that drives a countdown animation on the toast's decor bar.
   * When not set the bar is static at full width.
   */
  animationMs?: number;
  /**
   * Props for primary and secondary actions within the toast.
   * Secondary actions will only be rendered in combination with a primary action.
   */
  actionProps?: {
    primary?: EuiToastActionPrimaryProps;
    secondary?: EuiToastActionSecondaryProps;
  };
}

export const EuiToast: FunctionComponent<EuiToastProps> = ({
  title,
  text,
  color = 'primary',
  iconType,
  children,
  className,
  actionProps,
  style,
  onClose,
  animationMs,
  ...rest
}) => {
  const { euiTheme } = useEuiTheme();

  const styles = useEuiMemoizedStyles(euiToastStyles);
  const iconStyles = useEuiMemoizedStyles(euiNotificationIconStyles);
  const headerStyles = useEuiMemoizedStyles(euiToastHeaderStyles);

  const cssStyles = [styles.euiToast];
  const decorCssStyles = [styles.decor, animationMs && styles.hasAnimation];

  const classes = classNames('euiToast', className);

  const highlightColorToken = getTokenName(
    'borderStrong',
    color
  ) as keyof _EuiThemeBorderColors;
  const typeColor = euiTheme.colors[highlightColorToken];
  const backgroundLightToken = getTokenName(
    'backgroundLight',
    color
  ) as keyof _EuiThemeBackgroundColors;
  const backgroundLightColor = euiTheme.colors[backgroundLightToken];

  const cssVariables = useMemo(
    () => ({
      '--euiToastTypeColor': typeColor,
      '--euiToastTypeBackgroundColor': backgroundLightColor,
      ...(animationMs && {
        '--euiToastAnimationMs': `${animationMs}ms`,
      }),
    }),
    [typeColor, backgroundLightColor, animationMs]
  );

  const dismissButton = useMemo(() => {
    if (!onClose) return;

    return (
      <EuiI18n token="euiToast.dismissToast" default="Dismiss toast">
        {(dismissToast: string) => (
          <EuiButtonIcon
            css={styles.dismissButton}
            iconType="cross"
            color="text"
            size="xs"
            aria-label={dismissToast}
            onClick={onClose}
            data-test-subj="toastCloseButton"
          />
        )}
      </EuiI18n>
    );
  }, [onClose, styles]);

  const header = useMemo(() => {
    if (!title) return;

    const headerCssStyles = [
      headerStyles.euiToastHeader,
      onClose && headerStyles.hasDismissButton,
    ];

    return (
      <EuiTitle
        size="xs"
        css={headerCssStyles}
        data-test-subj="euiToastHeader__title"
      >
        <p>{title}</p>
      </EuiTitle>
    );
  }, [title, headerStyles, onClose]);

  const icon = useMemo(() => {
    if (!iconType) {
      const defaultIconType = COLOR_TO_NOTIFICATION_ICON_MAP[color] ?? 'info';

      return (
        <EuiNotificationIcon
          css={styles.icon}
          type={defaultIconType}
          size="l"
        />
      );
    }

    return (
      <EuiIcon
        css={[styles.icon, iconStyles.size.l]}
        type={iconType}
        size="l"
        aria-hidden="true"
        color={typeColor}
      />
    );
  }, [iconType, color, typeColor, styles, iconStyles]);

  const optionalChildren = useMemo(() => {
    if (!text && !children) return null;

    return (
      <>
        {text && (
          <EuiText
            size="s"
            color="default"
            className="euiToast__text"
            data-test-subj="euiToastText"
          >
            {text}
          </EuiText>
        )}
        {children && (
          <EuiText
            className="euiToast__additionalContent"
            size="s"
            color="default"
            data-test-subj="euiToastAdditionalContent"
          >
            {children}
          </EuiText>
        )}
      </>
    );
  }, [text, children]);

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
      <EuiToastAction actionType="primary" {...actionPrimaryProps} />
    );

    const actionSecondary = hasActionSecondary && (
      <EuiToastAction actionType="secondary" {...actionSecondaryProps} />
    );

    return (
      <div css={styles.actions}>
        {actionPrimary}
        {actionSecondary}
      </div>
    );
  }, [actionProps, color, styles]);

  return (
    <div
      css={cssStyles}
      className={classes}
      style={{ ...cssVariables, ...style }}
      {...rest}
    >
      <div className="euiToastDecor" css={decorCssStyles} role="presentation" />
      {/* Screen reader announcement */}
      <EuiScreenReaderOnly>
        <p>
          <EuiI18n
            token="euiToast.newNotification"
            default="A new notification appears"
          />
        </p>
      </EuiScreenReaderOnly>
      <div css={styles.wrapper}>
        <div css={styles.body} data-test-subj="euiToastBody">
          {icon}

          <div css={styles.content}>
            {
              // Note: the DOM position of the dismiss button matters to screen reader users.
              // We generally want them to have some context of _what_ they're dismissing,
              // instead of navigating to the dismiss button first before the content
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
      </div>
    </div>
  );
};
