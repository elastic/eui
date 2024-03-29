/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { useEuiI18n } from '../i18n';
import { useInnerText } from '../inner_text';
import { DistributiveOmit } from '../common';
import { EuiNotificationBadge } from '../badge';
import { BadgeNotificationColor } from '../badge/notification_badge/badge_notification';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button/button_empty';

import {
  euiFilterButtonStyles,
  euiFilterButtonChildStyles,
} from './filter_button.styles';

export type EuiFilterButtonProps = {
  /**
   * Bolds the button if true
   */
  hasActiveFilters?: boolean;
  /**
   * Pass the total number of filters available and it will
   * add a subdued notification badge showing the number
   */
  numFilters?: number;
  /**
   * Pass the number of selected filters and it will
   * add a bright notification badge showing the number
   */
  numActiveFilters?: number;
  /**
   * Applies a visual state to the button useful when using with a popover.
   */
  isSelected?: boolean;
  /**
   * Should the button grow to fill its container, best used for dropdown buttons
   */
  grow?: boolean;
  /**
   * Remove border after button, good for opposite filters
   */
  withNext?: boolean;
  /**
   * Change color of the counter badge
   */
  badgeColor?: BadgeNotificationColor;
} & DistributiveOmit<EuiButtonEmptyProps, 'flush' | 'size'>;

export const EuiFilterButton: FunctionComponent<EuiFilterButtonProps> = ({
  children,
  className,
  iconType,
  iconSide = 'right',
  color = 'text',
  badgeColor = 'accent',
  hasActiveFilters,
  numFilters,
  numActiveFilters,
  isDisabled,
  isSelected,
  type = 'button',
  grow = true,
  withNext,
  textProps,
  contentProps,
  ...rest
}) => {
  const numFiltersDefined = numFilters != null; // != instead of !== to allow for null and undefined
  const numActiveFiltersDefined =
    numActiveFilters != null && numActiveFilters > 0;

  const styles = useEuiMemoizedStyles(euiFilterButtonStyles);
  const cssStyles = [
    styles.euiFilterButton,
    withNext && styles.withNext,
    !grow && styles.noGrow,
    hasActiveFilters && styles.hasActiveFilters,
    numFiltersDefined && styles.hasNotification,
  ];
  const {
    content: contentStyles,
    text: textStyles,
    notification: notificationStyles,
  } = useEuiMemoizedStyles(euiFilterButtonChildStyles);

  const classes = classNames(
    'euiFilterButton',
    {
      'euiFilterButton-isSelected': isSelected,
      'euiFilterButton-hasActiveFilters': hasActiveFilters,
      'euiFilterButton-hasNotification': numFiltersDefined,
    },
    className
  );

  /**
   * Badge
   */
  const showBadge = numFiltersDefined || numActiveFiltersDefined;
  const badgeCount = numActiveFilters || numFilters;
  const activeBadgeLabel = useEuiI18n(
    'euiFilterButton.filterBadgeActiveAriaLabel',
    '{count} active filters',
    { count: badgeCount }
  );
  const availableBadgeLabel = useEuiI18n(
    'euiFilterButton.filterBadgeAvailableAriaLabel',
    '{count} available filters',
    { count: badgeCount }
  );
  const badgeStyles = [
    notificationStyles.euiFilterButton__notification,
    isDisabled && notificationStyles.disabled,
  ];

  /**
   * Text
   */
  const buttonTextClassNames = classNames(
    'euiFilterButton__text',
    { 'euiFilterButton__text-hasNotification': showBadge },
    textProps && textProps.className
  );
  const textCssStyles = [
    textStyles.euiFilterButton__text,
    showBadge && textStyles.hasNotification,
    textProps && textProps.css,
  ];

  const [ref, innerText] = useInnerText();
  const dataText =
    children && typeof children === 'string' ? children : innerText;

  return (
    <EuiButtonEmpty
      className={classes}
      css={cssStyles}
      color={color}
      isDisabled={isDisabled}
      iconSide={iconSide}
      iconType={iconType}
      type={type}
      textProps={false}
      contentProps={{
        ...contentProps,
        css: [
          contentStyles.euiFilterButton__content,
          iconType && contentStyles.hasIcon,
          contentProps?.css,
        ],
      }}
      {...rest}
    >
      <span
        ref={ref}
        data-text={dataText}
        title={dataText}
        {...textProps}
        className={buttonTextClassNames}
        css={textCssStyles}
      >
        {children}
      </span>

      {showBadge && (
        <EuiNotificationBadge
          className="euiFilterButton__notification"
          css={badgeStyles}
          aria-label={hasActiveFilters ? activeBadgeLabel : availableBadgeLabel}
          color={isDisabled || !hasActiveFilters ? 'subdued' : badgeColor}
          role="marquee" // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/marquee_role
        >
          {badgeCount}
        </EuiNotificationBadge>
      )}
    </EuiButtonEmpty>
  );
};
