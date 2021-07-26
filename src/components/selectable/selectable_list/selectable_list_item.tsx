/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { Component, LiHTMLAttributes } from 'react';
import { CommonProps } from '../../common';
import { EuiI18n } from '../../i18n';
import { EuiIcon, IconColor, IconType } from '../../icon';
import { EuiSelectableOptionCheckedType } from '../selectable_option';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiBadge, EuiBadgeProps } from '../../badge';

function resolveIconAndColor(
  checked: EuiSelectableOptionCheckedType
): { icon: IconType; color?: IconColor } {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === 'on'
    ? { icon: 'check', color: 'text' }
    : { icon: 'cross', color: 'text' };
}

export type EuiSelectableListItemProps = LiHTMLAttributes<HTMLLIElement> &
  CommonProps & {
    children?: React.ReactNode;
    /**
     * Applies an icon and visual styling to activated items
     */
    checked?: EuiSelectableOptionCheckedType;
    /**
     * Shows icons based on `checked` type
     */
    showIcons?: boolean;
    /**
     * Highlights the item for pseudo focus
     */
    isFocused?: boolean;
    disabled?: boolean;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    allowExclusions?: boolean;
    /**
     * When enabled by setting to either `true` or passing custom a custom badge,
     * shows a hollow badge as an append (far right) when the item is focused.
     * The default content when `true` is `↩ to select/deselect/include/exclude`
     */
    onFocusBadge?: boolean | EuiBadgeProps;
  };

// eslint-disable-next-line react/prefer-stateless-function
export class EuiSelectableListItem extends Component<
  EuiSelectableListItemProps
> {
  static defaultProps = {
    showIcons: true,
    onFocusBadge: true,
  };

  constructor(props: EuiSelectableListItemProps) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      disabled,
      checked,
      isFocused,
      showIcons,
      prepend,
      append,
      allowExclusions,
      onFocusBadge,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiSelectableListItem',
      {
        'euiSelectableListItem-isFocused': isFocused,
      },
      className
    );

    let optionIcon: React.ReactNode;
    if (showIcons) {
      const { icon, color } = resolveIconAndColor(checked);
      optionIcon = (
        <EuiIcon
          className="euiSelectableListItem__icon"
          color={color}
          type={icon}
        />
      );
    }

    let state: React.ReactNode;
    let instruction: React.ReactNode;
    if (allowExclusions && checked === 'on') {
      state = (
        <EuiScreenReaderOnly>
          <span>
            <EuiI18n
              token="euiSelectableListItem.includedOption"
              default="Included option."
            />
          </span>
        </EuiScreenReaderOnly>
      );
      instruction = (
        <EuiScreenReaderOnly>
          <span>
            <EuiI18n
              token="euiSelectableListItem.includedOptionInstructions"
              default="To exclude this option, press enter."
            />
          </span>
        </EuiScreenReaderOnly>
      );
    } else if (allowExclusions && checked === 'off') {
      state = (
        <EuiScreenReaderOnly>
          <span>
            <EuiI18n
              token="euiSelectableListItem.excludedOption"
              default="Excluded option."
            />
          </span>
        </EuiScreenReaderOnly>
      );
      instruction = (
        <EuiScreenReaderOnly>
          <span>
            <EuiI18n
              token="euiSelectableListItem.excludedOptionInstructions"
              default="To deselect this option, press enter."
            />
          </span>
        </EuiScreenReaderOnly>
      );
    }

    let prependNode: React.ReactNode;
    if (prepend) {
      prependNode = (
        <span className="euiSelectableListItem__prepend">{prepend}</span>
      );
    }

    let appendNode: React.ReactNode;
    if (append || !!onFocusBadge) {
      let onFocusBadgeNode: React.ReactNode;
      const defaultOnFocusBadgeProps: EuiBadgeProps = {
        'aria-hidden': true,
        iconType: 'returnKey',
        iconSide: 'left',
        color: 'hollow',
      };

      if (onFocusBadge === true) {
        onFocusBadgeNode = (
          <EuiBadge
            className="euiSelectableListItem__onFocusBadge"
            {...defaultOnFocusBadgeProps}
          />
        );
      } else if (!!onFocusBadge && onFocusBadge !== false) {
        const { children, className, ...restBadgeProps } = onFocusBadge;
        onFocusBadgeNode = (
          <EuiBadge
            className={classNames(
              'euiSelectableListItem__onFocusBadge',
              className
            )}
            {...defaultOnFocusBadgeProps}
            {...(restBadgeProps as EuiBadgeProps)}>
            {children}
          </EuiBadge>
        );
      }

      // Only display the append wrapper if append exists or isFocused
      if (append || (isFocused && !disabled)) {
        appendNode = (
          <span className="euiSelectableListItem__append">
            {append} {isFocused && !disabled ? onFocusBadgeNode : null}
          </span>
        );
      }
    }

    return (
      <li
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="option"
        aria-selected={!disabled && typeof checked === 'string'}
        className={classes}
        aria-disabled={disabled}
        {...rest}>
        <span className="euiSelectableListItem__content">
          {optionIcon}
          {prependNode}
          <span className="euiSelectableListItem__text">
            {state}
            {children}
            {instruction}
          </span>
          {appendNode}
        </span>
      </li>
    );
  }
}
