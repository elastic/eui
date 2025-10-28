/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, MouseEvent } from 'react';
import classNames from 'classnames';

import { _EuiButtonColor } from '../../global_styling';
import {
  EuiThemeProvider,
  useEuiMemoizedStyles,
  useEuiTheme,
  useGeneratedHtmlId,
} from '../../services';
import { useEuiI18n } from '../i18n';
import { useInnerText } from '../inner_text';
import { DistributiveOmit } from '../common';
import { EuiNotificationBadge } from '../badge';
import { BadgeNotificationColor } from '../badge/notification_badge/badge_notification';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button/button_empty';

import {
  euiFilterButtonStyles,
  euiFilterButtonWrapperStyles,
  euiFilterButtonChildStyles,
} from './filter_button.styles';
import { EuiButtonGroupButton } from '../button/button_group/button_group_button';
import { _compressedButtonFocusColors } from '../button/button_group/button_group_button.styles';

export type EuiFilterButtonProps = {
  /**
   * Highlights active filters
   */
  hasActiveFilters?: boolean;
  /**
   * Pass the total number of filters available and it will
   * add a subdued notification badge showing the number
   */
  numFilters?: number;
  /**
   * The number of active (selected) filters.
   * The value will be displayed as a bright notification badge.
   *
   * Accepted values are integers and percentages (e.g., 20%).
   * Passing other values is not supported and may break the layout.
   *
   * @example 10
   * @example '20%'
   */
  numActiveFilters?: number | string;
  /**
   * Switches between toggle and regular button
   * @default false
   */
  isToggle?: boolean;
  /**
   * Applies a visual state to the button.
   * Automatically applies `aria-pressed` when used with `isToggle={true}`.
   * Otherwise applies `aria-expanded` when used with `isToggle={false}` and
   * `iconType="arrowDown"` as trigger button for e.g. a popover.
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
  /**
   * Any of the named color palette options.
   *
   * Do not use the following colors for standalone buttons directly,
   * they exist to serve other components:
   *  - accent
   *  - warning
   */
  color?: _EuiButtonColor;
} & DistributiveOmit<
  EuiButtonEmptyProps,
  'flush' | 'size' | 'color' | 'isSelected'
>;

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
  isToggle,
  isDisabled,
  isSelected,
  type = 'button',
  grow = true,
  withNext,
  textProps,
  contentProps,
  ...rest
}) => {
  const id = useGeneratedHtmlId({ prefix: 'filter-button' });
  const numFiltersDefined = numFilters != null; // != instead of !== to allow for null and undefined
  const numActiveFiltersDefined = !!numActiveFilters;

  const euiThemeContext = useEuiTheme();
  const { colorMode } = euiThemeContext;

  // assumption about type of usage based on icon usage
  // requires manual override to apply correct aria attributes for more custom usages
  const isCollapsible = !isToggle && iconType === 'arrowDown';
  const isExpanded = isCollapsible && (isSelected ?? hasActiveFilters);

  const styles = useEuiMemoizedStyles(euiFilterButtonStyles);
  const focusColorStyles = useEuiMemoizedStyles(_compressedButtonFocusColors);

  const toggleVariantStyles = [
    isToggle && styles.buttonType.toggle,
    !isToggle && !isDisabled && focusColorStyles[color],
    !isToggle && styles.buttonType.default,
  ];

  const cssStyles = [
    styles.euiFilterButton,
    hasActiveFilters && styles.hasActiveFilters,
    ...toggleVariantStyles,
  ];

  const wrapperStyles = useEuiMemoizedStyles(euiFilterButtonWrapperStyles);

  const wrapperCssStyles = [
    wrapperStyles.wrapper,
    withNext && styles.withNext,
    numFiltersDefined && styles.hasNotification,
    isToggle && wrapperStyles.hasToggle,
    !grow && styles.noGrow,
  ];

  const {
    content: contentStyles,
    text: textStyles,
    notification: notificationStyles,
  } = useEuiMemoizedStyles(euiFilterButtonChildStyles);

  const wrapperClasses = classNames('euiFilterButton__wrapper');
  const classes = classNames(
    'euiFilterButton',
    {
      'euiFilterButton-isSelected': isSelected,
      'euiFilterButton-hasActiveFilters': hasActiveFilters,
      'euiFilterButton-hasNotification': numFiltersDefined,
      'euiFilterButton-isToggle': isToggle,
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

  const badgeContent = (
    <EuiNotificationBadge
      className="euiFilterButton__notification"
      css={badgeStyles}
      aria-label={hasActiveFilters ? activeBadgeLabel : availableBadgeLabel}
      color={isDisabled || !hasActiveFilters ? 'subdued' : badgeColor}
      role="marquee" // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/marquee_role
    >
      {badgeCount}
    </EuiNotificationBadge>
  );

  const badgeElement = showBadge && (
    <EuiThemeProvider
      colorMode={isToggle && isSelected ? 'INVERSE' : colorMode}
    >
      {badgeContent}
    </EuiThemeProvider>
  );

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

  const textContent = (
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
  );

  /** Button element */
  const button = (
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
      aria-expanded={isCollapsible ? isExpanded : undefined}
      {...rest}
    >
      {textContent}
      {badgeElement}
    </EuiButtonEmpty>
  );

  const onToggleClick = (
    e: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => {
    rest?.onClick?.(e);
  };

  return (
    <div className={wrapperClasses} css={wrapperCssStyles}>
      {isToggle && !isCollapsible ? (
        <EuiButtonGroupButton
          id={id}
          label={
            <>
              {textContent}
              {badgeElement}
            </>
          }
          className={classes}
          css={cssStyles}
          color={color}
          isSelected={isSelected}
          size="compressed"
          isDisabled={isDisabled}
          iconSide={iconSide}
          iconType={iconType}
          isIconOnly={false}
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
          onClick={onToggleClick}
        />
      ) : (
        button
      )}
    </div>
  );
};
