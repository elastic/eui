/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  FunctionComponent,
  LiHTMLAttributes,
  ReactElement,
  useState,
  useEffect,
  useMemo,
} from 'react';

import { CommonProps, keysOf } from '../../common';
import { EuiI18n } from '../../i18n';
import { EuiIcon, IconColor, IconType } from '../../icon';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiBadge, EuiBadgeProps } from '../../badge';
import { EuiToolTip } from '../../tool_tip';

import type {
  EuiSelectableOption,
  EuiSelectableOptionCheckedType,
} from '../selectable_option';

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
  onFocusBadge = true,
  paddingSize = 's',
  role = 'option',
  searchable,
  textWrap = 'truncate',
  toolTipContent,
  toolTipProps,
  'aria-describedby': _ariaDescribedBy,
  ...rest
}) => {
  const classes = classNames(
    'euiSelectableListItem',
    { 'euiSelectableListItem-isFocused': isFocused },
    paddingSizeToClassNameMap[paddingSize],
    className
  );

  const textClasses = classNames('euiSelectableListItem__text', {
    [`euiSelectableListItem__text--${textWrap}`]: textWrap,
  });

  const optionIcon = useMemo(() => {
    if (showIcons) {
      const { icon, color } = resolveIconAndColor(checked);
      return (
        <EuiIcon
          className="euiSelectableListItem__icon"
          color={color}
          type={icon}
        />
      );
    }
  }, [showIcons, checked]);

  const prependNode = useMemo(() => {
    if (prepend) {
      return <span className="euiSelectableListItem__prepend">{prepend}</span>;
    }
  }, [prepend]);

  const onFocusBadgeNode = useMemo(() => {
    const defaultOnFocusBadgeProps: EuiBadgeProps = {
      'aria-hidden': true,
      iconType: 'returnKey',
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
  const showOnFocusBadge = !!(isFocused && !disabled && onFocusBadgeNode);

  const appendNode = useMemo(() => {
    if (append || showOnFocusBadge) {
      return (
        <span className="euiSelectableListItem__append">
          {append} {showOnFocusBadge ? onFocusBadgeNode : null}
        </span>
      );
    }
  }, [append, showOnFocusBadge, onFocusBadgeNode]);

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

  // aria-checked is intended to be used with role="checkbox" but
  // the MDN documentation lists it as a possibility for role="option".
  // See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
  // and https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role
  const ariaChecked = useMemo(() => {
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
  }, [role, checked]);

  const hasToolTip = !!toolTipContent && !disabled;
  const [tooltipRef, setTooltipRef] = useState<EuiToolTip | null>(null); // Needs to be state and not a ref to trigger useEffect
  const [ariaDescribedBy, setAriaDescribedBy] = useState(_ariaDescribedBy);

  // Manually trigger the tooltip on keyboard focus
  useEffect(() => {
    if (!tooltipRef) return;

    if (isFocused) {
      tooltipRef.showToolTip();
    } else {
      tooltipRef.hideToolTip();
    }
  }, [isFocused, tooltipRef]);

  // Manually set the `aria-describedby` id on the <li> wrapper
  useEffect(() => {
    if (tooltipRef) {
      const tooltipId = tooltipRef.state.id;
      setAriaDescribedBy(classNames(tooltipId, _ariaDescribedBy));
    }
  }, [tooltipRef, _ariaDescribedBy]);

  const content: ReactElement = (
    <span className="euiSelectableListItem__content">
      {optionIcon}
      {prependNode}
      <span className={textClasses}>
        {children}
        {screenReaderText}
      </span>
      {appendNode}
    </span>
  );

  return (
    <li
      role={role}
      aria-disabled={disabled}
      aria-checked={ariaChecked} // Whether the item is "checked"
      aria-selected={!disabled && isFocused} // Whether the item has keyboard focus per W3 spec
      className={classes}
      {...rest}
      aria-describedby={ariaDescribedBy}
    >
      {hasToolTip ? (
        <EuiToolTip
          ref={setTooltipRef}
          content={toolTipContent}
          anchorClassName="euiSelectableListItem__tooltipAnchor"
          position="left"
          {...toolTipProps}
        >
          {content}
        </EuiToolTip>
      ) : (
        content
      )}
    </li>
  );
};
