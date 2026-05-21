/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, ReactNode } from 'react';

import { useEuiMemoizedStyles } from '../../services';
import { useEuiBackgroundColorCSS } from '../../global_styling';
import { CommonProps, DistributiveOmit } from '../common';
import { useEuiI18n } from '../i18n';
import { EuiTitle } from '../title';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonEmptyProps,
  EuiButtonIcon,
  EuiButtonIconProps,
} from '../button';
import { Props as EuiButtonProps } from '../button/button';
import { EuiText } from '../text';
import { EuiLiveAnnouncer } from '../accessibility';

import { EuiBannerSize, euiBannerStyles } from './banner.styles';
import classNames from 'classnames';

export type EuiBannerActionPrimaryProps = DistributiveOmit<
  EuiButtonProps,
  'color' | 'size'
>;

export type EuiBannerActionSecondaryProps = DistributiveOmit<
  EuiButtonEmptyProps,
  'color' | 'size' | 'flush'
>;

export type EuiBannerProps = CommonProps & {
  /** Heading shown at the top. */
  title: string;
  /**
   * HTML element used to render the title.
   * @default 'h2'
   */
  headingElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Supporting copy rendered below the title. */
  text?: ReactNode;
  /** Extra content rendered directly below `text`. */
  children?: ReactNode;
  /** Illustration slot. Wrapped in a square (1:1) container. */
  media: ReactNode;
  /**
   * Visual size variant.
   * @default 'm'
   */
  size?: EuiBannerSize;
  /**
   * Defines the announcement background color.
   * @default 'highlighted'
   */
  color?: 'highlighted' | 'plain';
  /** Optional action buttons. */
  actionProps?: {
    /** Primary call-to-action, rendered as an `EuiButton`. */
    primary?: EuiBannerActionPrimaryProps;
    /** Secondary action, rendered as an `EuiButtonEmpty`. Is only rendered when a primary action is available. */
    secondary?: EuiBannerActionSecondaryProps;
  };
  /**
   * When provided, a dismiss button is rendered in the top-right corner and
   * this callback fires when the user activates it.
   */
  onDismiss?: () => void;
  /** Extra props spread onto the dismiss `EuiButtonIcon`. */
  dismissButtonProps?: Omit<
    EuiButtonIconProps,
    'onClick' | 'iconType' | 'color'
  >;
  /**
   * When set to `true`, the content is announced by screen readers on mount.
   * Use only when the announcement is immediately relevant, e.g. as feedback to user actions.
   * Avoid using on initial page load as it may create noise for assistive technology users.
   *
   * @default false
   */
  announceOnMount?: boolean;
};

export const EuiBanner = forwardRef<HTMLDivElement, EuiBannerProps>(
  (
    {
      title,
      headingElement = 'h2',
      text,
      size = 'm',
      color = 'highlighted',
      actionProps,
      media,
      onDismiss,
      dismissButtonProps,
      children,
      className,
      announceOnMount = false,
      'data-test-subj': dataTestSubj = 'euiBanner',
      ...rest
    },
    ref
  ) => {
    const styles = useEuiMemoizedStyles(euiBannerStyles);

    const dismissAriaLabel = useEuiI18n(
      'euiBanner.dismissAriaLabel',
      'Dismiss "{title}" announcement',
      { title }
    );

    const Heading = headingElement;
    const headingSize = size === 's' ? 'xxs' : size === 'm' ? 'xs' : 's';

    const primaryActionProps = actionProps?.primary;
    const secondaryActionProps = actionProps?.secondary;
    // a standalone secondary action is not supported
    const hasActions = Boolean(primaryActionProps);

    const classes = classNames('euiBanner', className);

    const backgroundColorStyles = useEuiBackgroundColorCSS()[color];
    const cssStyles = [styles.euiBanner, backgroundColorStyles];
    const containerCssStyles = [
      styles.container,
      onDismiss && styles.hasDismiss,
    ];

    return (
      <div
        ref={ref}
        className={classes}
        css={cssStyles}
        data-size={size}
        data-color={color}
        data-test-subj={dataTestSubj}
        {...rest}
      >
        <div css={containerCssStyles}>
          {media ? (
            <div css={styles.media} data-test-subj={`${dataTestSubj}-media`}>
              {media}
            </div>
          ) : null}

          <div css={styles.body}>
            <div css={styles.content}>
              <EuiTitle size={headingSize}>
                <Heading
                  css={styles.title}
                  data-test-subj={`${dataTestSubj}-title`}
                >
                  {title}
                </Heading>
              </EuiTitle>

              {/* make the dismiss button discoverable early for screen readers,
            but ensure the title is rendered before to provide a meaningful context */}
              {onDismiss ? (
                <EuiButtonIcon
                  iconType="cross"
                  color="text"
                  aria-label={dismissAriaLabel}
                  data-test-subj={`${dataTestSubj}-dismiss`}
                  {...dismissButtonProps}
                  css={styles.dismiss}
                  onClick={onDismiss}
                />
              ) : null}

              {text ? (
                <EuiText
                  css={styles.text}
                  size="s"
                  color="subdued"
                  data-test-subj={`${dataTestSubj}-text`}
                >
                  {text}
                </EuiText>
              ) : null}
              {children && children}
            </div>

            {hasActions ? (
              <div
                css={styles.actions}
                data-test-subj={`${dataTestSubj}-actions`}
              >
                {primaryActionProps ? (
                  <EuiButton
                    data-test-subj={`${dataTestSubj}-primaryAction`}
                    {...primaryActionProps}
                    color="primary"
                    size="s"
                  />
                ) : null}
                {secondaryActionProps ? (
                  <EuiButtonEmpty
                    data-test-subj={`${dataTestSubj}-secondaryAction`}
                    {...secondaryActionProps}
                    color="primary"
                    size="s"
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {announceOnMount && (
          <EuiLiveAnnouncer>
            {title && title}
            {title && text && ',\u00A0'}
            {text && text}
            {(title || text) && children && ',\u00A0'}
            {children && children}
          </EuiLiveAnnouncer>
        )}
      </div>
    );
  }
);

EuiBanner.displayName = 'EuiBanner';
