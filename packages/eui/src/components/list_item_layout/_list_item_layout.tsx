/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
// @ts-ignore module doesn't export `createElement`
import { createElement } from '@emotion/react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps, ExclusiveUnion } from '../common';
import {
  euiListItemLayoutStyles,
  euiListItemLayoutWrapperStyles,
} from './_list_item_layout.styles';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';
import { EuiCheckboxControl } from '../form';
import { EuiIcon, IconColor, IconType } from '../icon';

export const OPTION_CHECKED_STATES = ['on', 'off', 'mixed', undefined] as const;
export type EuiListItemLayoutCheckedType =
  (typeof OPTION_CHECKED_STATES)[number];

const NATIVELY_CHECKABLE_ROLES = [
  'checkbox',
  'menuitemcheckbox',
  'radio',
  'menuitemradio',
  'switch',
];
const ROLES_THAT_CAN_BE_MIXED = ['option', 'checkbox', 'menuitemcheckbox'];
const ROLES_THAT_CAN_USE_ARIA_CHECKED = [
  'option',
  ...NATIVELY_CHECKABLE_ROLES,
] as const;
const ROLES_THAT_CAN_USE_ARIA_SELECTED = [
  'tab',
  'gridcell',
  'option',
  'row',
  'treeitem',
];

export type EuiListItemLayoutSharedProps = CommonProps & {
  children?: ReactNode;
  /**
   * Slot for prepended content (icons)
   */
  prepend?: ReactNode;
  /**
   * Slot for additional appended content (e.g. badges)
   * Use extraAction instead for interactive elements.
   */
  append?: ReactNode;
  /**
   * Slot for additional interactive appended content (extra actions)
   */
  extraAction?: ReactNode;
  /**
   * Set to manually define the wrapping element for navigational items (`component=button/a`).
   * This has no effect when `component=li/div`.
   * @default 'li'
   */
  wrapperComponent?: 'li' | 'div';
  /**
   * Props applied to the wrapper.
   * Applies only if `warpperComponent` is defined or `extraAction` is passed.
   */
  wrapperProps?: CommonProps;
  /**
   * Props applied to the content wrapper element.
   */
  contentProps?: CommonProps;
  /**
   * Props applied to the label text element.
   */
  textProps?: CommonProps;
  prependProps?: CommonProps;
  appendProps?: CommonProps;
  tooltipProps?: Omit<EuiToolTipProps, 'children'>;
  /**
   * Controls the item checked indicator and applies a semantic `aria-checked` attribute.
   * Ensure to pass an appropriate `role` for the item that supports semantic
   * `checked` state. For no/other role(s) `checked` only controls the visual checked indicator.
   *
   * When using `singleSelection=true` it's expected to only use the values `on` or `undefined`
   * to toggle between checked and not checked.
   */
  checked?: EuiListItemLayoutCheckedType;
  /**
   * Controls the item selection state within a list (not the checked indicator).
   * It applies an `aria-selected` or `aria-current` attributes depending on `component` and `role`.
   * It adds a visual selected style when `isSingleSelection=true` or `showIndicator=false`.
   */
  isSelected?: boolean;
  /**
   * Highlights the item as currently navigated item within a listbox.
   * The item is not acutally focused, it will only be styled as active.
   */
  isFocused?: boolean;
  isDisabled?: boolean;
  /**
   * Toggles between multi-selection (renders checkbox indicators) and
   * single-selection (renders icon indicators).
   * @default false
   */
  isSingleSelection?: boolean;
  /**
   * Manually overrides the selection type (checkbox vs selection).
   * This controls whether `aria-checked` or `aria-selected` attributes are set.
   *
   * By default when unset, it's handled internally based on `isSingleSelection`
   * and applies `aria-checked` to multi-selection and `aria-selected` to single-selection.
   *
   * Use only when you need to manually adjust this, e.g. for a single-selection
   * multi-state checkbox item (supports exclusion or indeterminate).
   */
  selectionMode?: 'checked' | 'selected';
  /**
   * Controls the visibility of the indicator.
   * @default true
   */
  showIndicator?: boolean;
  /**
   * Native `role` attribute.
   * If you pass a custom role make sure to align `selectionMode` where needed as well.
   * Set it to `checked` when the role natively supports checked states and to `selected` otherwise.
   */
  role?: HTMLAttributes<HTMLElement>['role'];

  /**
   * How to handle long text within the item.
   * @default 'truncate'
   */
  textWrap?: 'truncate' | 'wrap';
};

export type EuiListItemLayoutAsLi = {
  component: 'li';
} & EuiListItemLayoutSharedProps &
  Omit<HTMLAttributes<HTMLLIElement>, 'role'>;
export type EuiListItemLayoutAsDiv = {
  component: 'div';
} & EuiListItemLayoutSharedProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'role'>;
export type EuiListItemLayoutAsButton = {
  component: 'button';
} & EuiListItemLayoutSharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'role'>;
export type EuiListItemLayoutAsAnchor = {
  component: 'a';
} & EuiListItemLayoutSharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'role'>;

// Ensure an exclusive union of either li, div, button, or anchor
export type EuiListItemLayoutProps = ExclusiveUnion<
  EuiListItemLayoutAsLi,
  ExclusiveUnion<
    ExclusiveUnion<EuiListItemLayoutAsButton, EuiListItemLayoutAsAnchor>,
    EuiListItemLayoutAsDiv
  >
>;

/**
 * This is an EUI internal-only layout component that is used to share layout and
 * styles between selection and navigational list components.
 */
export const EuiListItemLayout = forwardRef<
  HTMLElement,
  EuiListItemLayoutProps
>(
  (
    {
      children: _children,
      component: _component = 'li',
      wrapperComponent,
      className,
      css,
      role,
      prepend: _prepend,
      append: _append,
      extraAction,
      wrapperProps: _wrapperProps,
      contentProps: _contentProps,
      prependProps: _prependProps,
      appendProps: _appendProps,
      textProps: _textProps,
      tooltipProps: _tooltipProps,
      checked,
      isDisabled,
      isFocused,
      isSelected,
      isSingleSelection = true,
      selectionMode: _selectionMode,
      showIndicator = true,
      textWrap = 'truncate',
      'aria-describedby': _ariaDescribedBy,
      'aria-selected': _ariaSelected,
      'aria-checked': _ariaChecked,
      'data-test-subj': dataTestSubj = 'euiListItemLayout',
      ...props
    },
    ref
  ) => {
    const [tooltipRef, setTooltipRef] = useState<EuiToolTip | null>(null); // Needs to be state and not a ref to trigger useEffect
    const [ariaDescribedBy, setAriaDescribedBy] = useState(_ariaDescribedBy);

    const { href, target, rel, ...rest } =
      props as AnchorHTMLAttributes<HTMLAnchorElement>;

    const component = _component === 'a' && isDisabled ? 'button' : _component;
    const hasToolTip = !!_tooltipProps && !isDisabled;

    const isNonInteractiveComponent = ['li', 'div'].includes(component);
    const isInteractiveComponent =
      ['button', 'a'].includes(component) ||
      ['button', 'link'].includes(role ?? '');
    /* Multi-action: component is interactive (button/a) and has an additional action passed via `extraAction`,
    which requires to not nest interactive elements. The wrapper is the outermost styled container and owns
    hover/focus/selected styles.
    Single-action: component (li/div) is the outermost element and owns all styles. */
    const isMultiAction = extraAction != null && isInteractiveComponent;
    const WrapperComponent = isMultiAction
      ? wrapperComponent ?? 'li'
      : isInteractiveComponent
      ? wrapperComponent
      : undefined;
    const hasWrapper = WrapperComponent != null;

    // aria-checked is intended to be used with role="checkbox" but
    // the MDN documentation lists it as a possibility for role="option".
    // See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
    // and https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role
    const ariaChecked = useMemo(() => {
      if (!role) return undefined;
      if (!ROLES_THAT_CAN_USE_ARIA_CHECKED.includes(role)) return undefined;

      switch (checked) {
        case 'on':
        case 'off':
          return true;
        case 'mixed':
          if (ROLES_THAT_CAN_BE_MIXED.includes(role)) {
            return 'mixed';
          } else {
            return false;
          }
        default:
          return false;
      }
    }, [role, checked]);

    const defaultSelectionMode = useMemo((): 'checked' | 'selected' => {
      if (!isSingleSelection) {
        return 'checked';
      }

      if (role && NATIVELY_CHECKABLE_ROLES.includes(role)) {
        return 'checked';
      }

      return 'selected';
    }, [isSingleSelection, role]);

    const selectionMode = _selectionMode ?? defaultSelectionMode;
    const hasAriaChecked =
      (selectionMode === 'checked' ? ariaChecked : undefined) !== undefined;
    const hasAriaSelected = ROLES_THAT_CAN_USE_ARIA_SELECTED.includes(
      role ?? ''
    );
    const hasCustomAriaSelected = _ariaSelected != null;

    /* Styles */

    const wrapperClasses = classNames(
      'euiListItemLayout__wrapper',
      _wrapperProps?.className
    );
    const classes = classNames('euiListItemLayout', className);
    const wrapperStyles = useEuiMemoizedStyles(euiListItemLayoutWrapperStyles);
    const styles = useEuiMemoizedStyles(euiListItemLayoutStyles);

    const interactiveStyles = [
      styles.isInteractive,
      isFocused && styles.isFocused,
      (isSingleSelection || !showIndicator) && isSelected && styles.isSelected,
      (isSingleSelection || !showIndicator) &&
        isSelected &&
        isFocused &&
        styles.isSelectedFocused,
    ];

    const wrapperCssStyles = [
      wrapperStyles.euiListItemLayout__wrapper,
      extraAction && wrapperStyles.hasExtraAction,
      !isDisabled && hasWrapper && interactiveStyles,
      hasWrapper && css,
      isDisabled && hasWrapper && styles.isDisabled,
    ];
    const cssStyles = [
      styles.euiListItemLayout,
      hasWrapper && styles.euiListItemLayout__action,
      !isDisabled && !hasWrapper && interactiveStyles,
      !hasWrapper && css,
      isDisabled && styles.isDisabled,
    ];

    // Manually trigger the tooltip on keyboard focus
    useEffect(() => {
      if (!tooltipRef || isFocused == null) return;

      if (isFocused) {
        tooltipRef.showToolTip();
      } else {
        tooltipRef.hideToolTip();
      }
    }, [isFocused, tooltipRef]);

    /* Props */

    // Manually set the `aria-describedby` id on the wrapper
    useEffect(() => {
      if (tooltipRef) {
        const tooltipId = tooltipRef.state.id;
        setAriaDescribedBy(classNames(tooltipId, _ariaDescribedBy));
      }
    }, [tooltipRef, _ariaDescribedBy]);

    const contentProps = useMemo(
      () => ({
        ..._contentProps,
        css: [styles.euiListItemLayout__content, _contentProps?.css],
        className: classNames(
          'euiListItemLayout__content',
          _contentProps?.className
        ),
      }),
      [_contentProps, styles]
    );

    const textProps = useMemo(
      () => ({
        ..._textProps,
        css: [
          styles.euiListItemLayout__text,
          styles.textWrap[textWrap],
          _textProps?.css,
        ],
        className: classNames('euiListItemLayout__text', _textProps?.className),
      }),
      [_textProps, textWrap, styles]
    );

    /**
     * ARIA selection attribute appliance:
     * - multi-selection + checkable role -> `aria-checked`
     * - multi-selection + non-checkable, selectable role -> `aria-selected`
     * - multi-selection + non-checkable, non-selectable role -> `aria-current`
     * - single-selection + checkable role -> `aria-checked`
     * - single-selection + non-checkable, selectable role -> `aria-selected`
     * - single-selection + non-checkable, non-selectable role -> `aria-current`
     */

    // added to selection list items only (`component=li/div`)
    const selectionProps =
      isNonInteractiveComponent && !isInteractiveComponent
        ? {
            role,
            'aria-checked': hasAriaChecked ? ariaChecked : undefined,
            'aria-selected':
              !hasAriaChecked && hasAriaSelected ? isSelected : undefined,
            'aria-current':
              !hasAriaChecked && !hasAriaSelected && isSelected
                ? 'true'
                : undefined,
          }
        : {};

    // added to navigational list items only (`component=button/a`)
    const navigationalProps = isInteractiveComponent
      ? {
          'aria-current':
            !hasCustomAriaSelected && isSelected ? 'true' : undefined, // indicates currently active navigation item
          /* allow manual `aria-selected` overrides; By default a list of navigational elements likely uses `aria-current` but using
          a button with appropriate `role` within a selection list could still be valid, though weird (e.g. custom EuiSuperSelect) */
          'aria-selected': hasCustomAriaSelected ? isSelected : undefined, // indicates current selected item
        }
      : {};

    const linkProps =
      ['a'].includes(component) && !isDisabled
        ? {
            href,
            target,
            rel,
          }
        : {};

    const disabledProps = isDisabled
      ? {
          disabled: component === 'button' ? isDisabled : undefined,
          'aria-disabled': component !== 'button' ? isDisabled : undefined,
        }
      : {};

    const wrapperProps = {
      'data-test-subj': `${dataTestSubj}-wrapper`,
      ..._wrapperProps,
      className: wrapperClasses,
      css: [wrapperCssStyles, _wrapperProps?.css],
    };

    const hasInternalTooltip = isNonInteractiveComponent && hasToolTip;
    const elementProps = {
      ref,
      role,
      className: classes,
      css: cssStyles,
      ...selectionProps,
      ...navigationalProps,
      ...linkProps,
      ...disabledProps,
      ['aria-describedby']: hasInternalTooltip
        ? ariaDescribedBy
        : _ariaDescribedBy,
      'data-test-subj': dataTestSubj,
      ...rest,
    };

    /* Render nodes */

    const indicator = useMemo(() => {
      if (showIndicator) {
        if (!isSingleSelection) {
          return (
            <EuiCheckboxControl
              className="euiListItemLayout__checkbox"
              checked={checked === 'on'}
              disabled={isDisabled}
              indeterminate={checked === 'mixed'}
              excluded={checked === 'off'}
            />
          );
        }

        const { icon, color } = resolveIconAndColor(
          checked,
          isSelected,
          isDisabled
        );

        return (
          <EuiIcon
            css={styles.euiListItemLayout__icon}
            className="euiListItemLayout__icon"
            color={color}
            type={icon}
          />
        );
      }
    }, [
      checked,
      isSingleSelection,
      showIndicator,
      isSelected,
      isDisabled,
      styles,
    ]);

    const prepend = useMemo(() => {
      if (_prepend) {
        const prependProps = {
          ..._prependProps,
          css: [styles.euiListItemLayout__prepend, _prependProps?.css],
          className: classNames(
            'euiListItemLayout__prepend',
            _prependProps?.className
          ),
        };

        return <span {...prependProps}>{_prepend}</span>;
      }
    }, [_prepend, _prependProps, styles]);

    const append = useMemo(() => {
      if (_append) {
        const appendProps = {
          ..._appendProps,
          css: [styles.euiListItemLayout__append, _appendProps?.css],
          className: classNames(
            'euiListItemLayout__append',
            _appendProps?.className
          ),
        };

        return <span {...appendProps}>{_append}</span>;
      }
    }, [_append, _appendProps, styles]);

    const innerContent = (
      <span {...contentProps}>
        {indicator}
        {prepend}
        <span {...textProps}>{_children}</span>
        {append}
        {!isMultiAction && extraAction}
      </span>
    );
    /* for non interactive elements, specifically semantic li we need to
    ensure that the li is the outer element to be a valid child of a wrapping ul */
    const content = hasInternalTooltip ? (
      <EuiToolTip
        ref={setTooltipRef}
        content={_tooltipProps?.content}
        anchorClassName="eui-fullWidth"
        {..._tooltipProps}
      >
        {innerContent}
      </EuiToolTip>
    ) : (
      innerContent
    );

    /* Uses `createElement` to side step having to speficy element types. Since this is an
    internal-only component and we're speficying separate types for each element, we can safely
    assume the right props are passed at this point.
    It uses the import from @emotion/react to ensure the `css` props works as in JSX. */
    const innerElement = createElement(component, elementProps, content);
    const element =
      !isNonInteractiveComponent && hasToolTip ? (
        <EuiToolTip
          ref={setTooltipRef}
          content={_tooltipProps?.content}
          anchorClassName="eui-fullWidth"
          {..._tooltipProps}
        >
          {innerElement}
        </EuiToolTip>
      ) : (
        innerElement
      );

    return WrapperComponent ? (
      <WrapperComponent {...wrapperProps}>
        {element}
        {isMultiAction && extraAction}
      </WrapperComponent>
    ) : (
      element
    );
  }
);

EuiListItemLayout.displayName = 'EuiListItemLayout';

/* Internal helpers */

function resolveIconAndColor(
  checked: EuiListItemLayoutCheckedType,
  isSelected?: boolean,
  isDisabled?: boolean
): {
  icon: IconType;
  isSelected?: boolean;
  isDisabled?: boolean;
  color?: IconColor;
} {
  switch (checked) {
    case 'on':
      return {
        icon: 'check',
        color: isDisabled ? 'subdued' : isSelected ? 'primary' : 'text',
      };
    case 'off':
      return {
        icon: 'cross',
        color: isDisabled ? 'subdued' : isSelected ? 'primary' : 'text',
      };
    case 'mixed':
      return {
        icon: 'minus',
        color: isDisabled ? 'subdued' : isSelected ? 'primary' : 'text',
      };
    case undefined:
    default:
      return {
        icon: 'empty',
        color: isDisabled ? 'subdued' : 'text',
      };
  }
}
