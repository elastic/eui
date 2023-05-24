/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { Component, LiHTMLAttributes } from 'react';
import { CommonProps, keysOf } from '../../common';
import { EuiI18n } from '../../i18n';
import { EuiIcon, IconColor, IconType } from '../../icon';
import { EuiSelectableOptionCheckedType } from '../selectable_option';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiBadge, EuiBadgeProps } from '../../badge';

function resolveIconAndColor(checked: EuiSelectableOptionCheckedType): {
  icon: IconType;
  color?: IconColor;
} {
  switch (checked) {
    case 'on':
      return { icon: 'check', color: 'text' };
    case 'off':
      return { icon: 'cross', color: 'text' };
    case 'mixed':
      return { icon: 'minus', color: 'text' };
    case undefined:
    default:
      return { icon: 'empty' };
  }
}

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiSelectableListItem--paddingSmall',
};
export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);
export type EuiSelectablePaddingSize = (typeof PADDING_SIZES)[number];

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
    /**
     * Padding for the list items.
     */
    paddingSize?: EuiSelectablePaddingSize;
    /**
     * Whether the `EuiSelectable` instance is searchable.
     * When true, the Space key will not toggle selection, as it will type into the search box instead. Screen reader instructions will be added instructing users to use the Enter key to select items.
     * When false, the Space key will toggle item selection. No extra screen reader instructions will be added, as Space to toggle is a generally standard for most select/checked elements.
     */
    searchable?: boolean;
    /**
     * Attribute applied the option `<li>`.
     * If set to a role that allows [aria-checked](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked),
     * `aria-checked` will be automatically configured.
     */
    role?: LiHTMLAttributes<HTMLLIElement>['role'];
    /**
     * How to handle long text within the item.
     * Wrapping only works if virtualization is off.
     */
    textWrap?: 'truncate' | 'wrap';
  };

export class EuiSelectableListItem extends Component<EuiSelectableListItemProps> {
  static defaultProps = {
    showIcons: true,
    onFocusBadge: true,
    textWrap: 'truncate',
  };

  constructor(props: EuiSelectableListItemProps) {
    super(props);
  }

  // aria-checked is intended to be used with role="checkbox" but
  // the MDN documentation lists it as a possibility for role="option".
  // See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
  // and https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role
  isChecked = (role: string, checked: EuiSelectableOptionCheckedType) => {
    const rolesThatCanBeMixed = ['option', 'checkbox', 'menuitemcheckbox'];
    const rolesThatCanBeChecked = [
      ...rolesThatCanBeMixed,
      'radio',
      'menuitemradio',
      'switch',
    ];
    if (!rolesThatCanBeChecked.includes(role)) return undefined;

    switch (checked) {
      case 'on':
      case 'off':
        return true;
      case 'mixed':
        if (rolesThatCanBeMixed.includes(role)) {
          return 'mixed';
        } else {
          return false;
        }
      default:
        return false;
    }
  };

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
      paddingSize = 's',
      role = 'option',
      searchable,
      textWrap,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiSelectableListItem',
      {
        'euiSelectableListItem-isFocused': isFocused,
      },
      paddingSizeToClassNameMap[paddingSize],
      className
    );

    const textClasses = classNames('euiSelectableListItem__text', {
      [`euiSelectableListItem__text--${textWrap}`]: textWrap,
    });

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
    let instructions: React.ReactNode;
    const screenReaderStrings = {
      checked: {
        state: (
          <EuiI18n
            token="euiSelectableListItem.checkedOption"
            default="Checked option."
          />
        ),
        instructions: (
          <EuiI18n
            token="euiSelectableListItem.checkOptionInstructions"
            default="To check this option, press Enter."
          />
        ),
      },
      unchecked: {
        instructions: (
          <EuiI18n
            token="euiSelectableListItem.uncheckOptionInstructions"
            default="To uncheck this option, press Enter."
          />
        ),
      },
      excluded: {
        state: (
          <EuiI18n
            token="euiSelectableListItem.excludedOption"
            default="Excluded option."
          />
        ),
        instructions: (
          <EuiI18n
            token="euiSelectableListItem.excludeOptionInstructions"
            default="To exclude this option, press Enter."
          />
        ),
      },
      mixed: {
        state: (
          <EuiI18n
            token="euiSelectableListItem.mixedOption"
            default="Mixed (indeterminate) option."
          />
        ),
        instructions: (
          <EuiI18n
            token="euiSelectableListItem.mixedOptionInstructions"
            default="To check this option for all, press Enter once."
          />
        ),
        uncheckInstructions: (
          <EuiI18n
            token="euiSelectableListItem.mixedOptionUncheckInstructions"
            default="To uncheck this option for all, press Enter twice."
          />
        ),
        excludeInstructions: (
          <EuiI18n
            token="euiSelectableListItem.mixedOptionExcludeInstructions"
            default="To exclude this option for all, press Enter twice."
          />
        ),
      },
    };

    switch (checked) {
      case 'on':
        state = screenReaderStrings.checked.state;
        instructions = allowExclusions
          ? screenReaderStrings.excluded.instructions
          : searchable
          ? screenReaderStrings.unchecked.instructions
          : undefined;
        break;
      case 'off':
        state = screenReaderStrings.excluded.state;
        instructions = screenReaderStrings.unchecked.instructions;
        break;
      case 'mixed':
        state = screenReaderStrings.mixed.state;
        instructions = (
          <>
            {screenReaderStrings.mixed.instructions}{' '}
            {allowExclusions
              ? screenReaderStrings.mixed.excludeInstructions
              : screenReaderStrings.mixed.uncheckInstructions}
          </>
        );
        break;
      case undefined:
      default:
        instructions =
          allowExclusions || searchable
            ? screenReaderStrings.checked.instructions
            : undefined;
        break;
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
            {...(restBadgeProps as EuiBadgeProps)}
          >
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

    const screenReaderText = (state || instructions) && (
      <EuiScreenReaderOnly>
        <div>
          {state || instructions ? '. ' : null}
          {state}
          {state && instructions ? ' ' : null}
          {instructions}
        </div>
      </EuiScreenReaderOnly>
    );

    return (
      <li
        role={role}
        aria-disabled={disabled}
        aria-checked={this.isChecked(role, checked)} // Whether the item is "checked"
        aria-selected={!disabled && isFocused} // Whether the item has keyboard focus per W3 spec
        className={classes}
        {...rest}
      >
        <span className="euiSelectableListItem__content">
          {optionIcon}
          {prependNode}
          <span className={textClasses}>
            {children}
            {screenReaderText}
          </span>
          {appendNode}
        </span>
      </li>
    );
  }
}
