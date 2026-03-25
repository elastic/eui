/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent, LiHTMLAttributes, useMemo } from 'react';

import { CommonProps } from '../../common';
import { EuiI18n } from '../../i18n';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiBadge, EuiBadgeProps } from '../../badge';
import {
  EuiListItemLayout,
  EuiListItemLayoutAsLi,
} from '../../list_item_layout/_list_item_layout';

import type {
  EuiSelectableOption,
  EuiSelectableOptionCheckedType,
} from '../selectable_option';

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
    singleSelection?: boolean;
    /**
     * When enabled by setting to either `true` or passing custom a custom badge,
     * shows a hollow badge as an append (far right) when the item is focused.
     * The default content when `true` is `↩ to select/deselect/include/exclude`
     */
    onFocusBadge?: boolean | EuiBadgeProps;
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
    textWrap?: EuiSelectableOption['textWrap'];
    /**
     * Optional custom tooltip content for the button
     */
    toolTipContent?: EuiSelectableOption['toolTipContent'];
    /**
     * Optional props to pass to the underlying **[EuiToolTip](/#/display/tooltip)**
     */
    toolTipProps?: EuiSelectableOption['toolTipProps'];
  };

export const EuiSelectableListItem: FunctionComponent<
  EuiSelectableListItemProps
> = ({
  children,
  className,
  disabled,
  checked,
  isFocused,
  showIcons = true,
  prepend,
  append,
  allowExclusions,
  singleSelection = true,
  onFocusBadge = false,
  role = 'option',
  searchable,
  toolTipContent,
  toolTipProps,
  ...rest
}) => {
  const classes = classNames(
    'euiSelectableListItem',
    { 'euiSelectableListItem-isFocused': isFocused },
    className
  );

  const onFocusBadgeNode = useMemo(() => {
    const defaultOnFocusBadgeProps: EuiBadgeProps = {
      'aria-hidden': true,
      iconType: 'return',
      iconSide: 'left',
      color: 'hollow',
    };

    if (onFocusBadge === true) {
      return (
        <EuiBadge
          className="euiSelectableListItem__onFocusBadge"
          {...defaultOnFocusBadgeProps}
        />
      );
    } else if (typeof onFocusBadge !== 'boolean' && !!onFocusBadge) {
      const { children, className, ...restBadgeProps } = onFocusBadge;
      return (
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
  }, [onFocusBadge]);

  const screenReaderText = useMemo(() => {
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

    return state || instructions ? (
      <EuiScreenReaderOnly>
        <div>
          {state || instructions ? '. ' : null}
          {state}
          {state && instructions ? ' ' : null}
          {instructions}
        </div>
      </EuiScreenReaderOnly>
    ) : null;
  }, [checked, searchable, allowExclusions]);

  const hasToolTip = !!toolTipContent && !disabled;
  const showOnFocusBadge = !!(isFocused && !disabled && onFocusBadgeNode);

  const listItemLayoutProps: Omit<EuiListItemLayoutAsLi, 'children'> = {
    component: 'li',
    role,
    className: classes,
    checked: checked,
    isDisabled: disabled,
    isFocused: !disabled && isFocused,
    isSelected: checked !== undefined,
    isSingleSelection: singleSelection,
    selectionMode:
      allowExclusions || checked === 'mixed' ? 'checked' : undefined,
    showIndicator: showIcons,
    prepend: prepend,
    prependProps: {
      className: 'euiSelectableListItem__prepend',
    },
    append: (append || showOnFocusBadge) && (
      <>
        {append}
        {showOnFocusBadge ? onFocusBadgeNode : null}
      </>
    ),
    appendProps: {
      className: 'euiSelectableListItem__append',
    },
    contentProps: {
      className: 'euiSelectableListItem__content',
    },
    textProps: {
      className: 'euiSelectableListItem__text',
    },
    tooltipProps: hasToolTip
      ? {
          content: toolTipContent,
          anchorClassName: 'eui-fullWidth',
          position: 'left',
          delay: 'regular',
          ...toolTipProps,
        }
      : undefined,
    ...rest,
  };

  return (
    <EuiListItemLayout {...listItemLayoutProps}>
      {children}
      {screenReaderText}
    </EuiListItemLayout>
  );
};
