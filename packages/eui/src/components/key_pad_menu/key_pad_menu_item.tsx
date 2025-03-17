/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ElementType as ReactElementType,
  FunctionComponent,
  ReactNode,
  Ref,
  LabelHTMLAttributes,
  useMemo,
  JSX,
} from 'react';
import classNames from 'classnames';

import {
  useEuiMemoizedStyles,
  getSecureRelForTarget,
  useGeneratedHtmlId,
} from '../../services';
import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
} from '../common';

import { EuiBetaBadge } from '../badge/beta_badge';
import { IconType } from '../icon';
import { EuiRadio, EuiCheckbox } from '../form';
import { validateHref } from '../../services/security/href_validator';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';

import {
  euiKeyPadMenuItemStyles,
  euiKeyPadMenuItemChildStyles,
} from './key_pad_menu_item.styles';

export type EuiKeyPadMenuItemCheckableType = 'single' | 'multi';

export type EuiKeyPadMenuItemCommonProps = {
  /**
   * One will be generated if not provided
   */
  id?: string;
  /**
   * Pass an EuiIcon, preferrably `size="l"`
   */
  children: ReactNode;
  isDisabled?: boolean;
  /**
   * Indicate if an item is the current one.
   * Be sure to use `true` AND `false` when acting as a toggle to ensure the attribute is added for both states
   */
  isSelected?: boolean;
  /**
   * The text to display beneath the icon
   */
  label: ReactNode;
};

type EuiKeyPadMenuItemPropsForUncheckable = {
  /**
   * Beta badges are unavailable if the item is checkable
   */
  checkable?: undefined;
  /**
   * Add a badge to the card to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel?: string;
  /**
   * Supply an icon type if the badge should just be an icon
   */
  betaBadgeIconType?: IconType;
  /**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent?: ReactNode;
  /**
   * Extends the wrapping EuiToolTip props when `betaBadgeLabel` is provided
   */
  betaBadgeTooltipProps?: Partial<
    Omit<EuiToolTipProps, 'title' | 'content' | 'delay'>
  >;
  /**
   * Use `onClick` instead when the item is not `checkable`
   */
  onChange?: never;
};

type EuiKeyPadMenuItemPropsForAnchor = PropsForAnchor<
  EuiKeyPadMenuItemCommonProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
    rel?: string;
  } & EuiKeyPadMenuItemPropsForUncheckable
>;

type EuiKeyPadMenuItemPropsForButton = PropsForButton<
  EuiKeyPadMenuItemCommonProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  } & EuiKeyPadMenuItemPropsForUncheckable
>;

type EuiKeyPadMenuItemPropsForCheckable = Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'onChange'
> &
  EuiKeyPadMenuItemCommonProps & {
    /**
     * Use `onChange` instead when the item is `checkable`
     */
    onClick?: never;
  } & ExclusiveUnion<
    {
      /**
       * Type `'single'` renders the item as a `<label>` and
       * adds a radio element.
       */
      checkable: 'single';
      /**
       * The `name` attribute for radio inputs;
       * Required in order to group properly
       */
      name: string;
      /**
       * The value of the radio input for 'single'
       */
      value?: string;
      /**
       * Single: Returns the `id` of the clicked option and the `value`
       */
      onChange: (id: string, value?: any) => void;
    },
    {
      /**
       * Type `'multi'` renders the item as a `<label>` and
       * adds a checkbox.
       */
      checkable: 'multi';
      /**
       * Multi: Returns the `id` of the clicked option
       */
      onChange: (id: string) => void;
    }
  >;

export type EuiKeyPadMenuItemProps = CommonProps &
  ExclusiveUnion<
    EuiKeyPadMenuItemPropsForCheckable,
    ExclusiveUnion<
      EuiKeyPadMenuItemPropsForAnchor,
      EuiKeyPadMenuItemPropsForButton
    >
  >;

export const EuiKeyPadMenuItem: FunctionComponent<EuiKeyPadMenuItemProps> = ({
  id,
  isSelected,
  isDisabled: _isDisabled,
  label,
  children,
  className,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeIconType,
  betaBadgeTooltipProps,
  href,
  rel,
  target,
  buttonRef,
  // Checkable props
  checkable,
  name,
  value,
  disabled,
  onChange,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const isDisabled = disabled || _isDisabled || !isHrefValid;

  const styles = useEuiMemoizedStyles(euiKeyPadMenuItemStyles);
  const cssStyles = [
    styles.euiKeyPadMenuItem,
    !isDisabled ? styles.enabled : styles.disabled.disabled,
    isSelected && (!isDisabled ? styles.selected : styles.disabled.selected),
  ];

  const classes = classNames('euiKeyPadMenuItem', className);

  let Element: keyof JSX.IntrinsicElements =
    href && !isDisabled ? 'a' : 'button';
  if (checkable) Element = 'label';
  type ElementType = ReactElementType<typeof Element>;

  const itemId = useGeneratedHtmlId({ conditionalId: id });
  const childStyles = useEuiMemoizedStyles(euiKeyPadMenuItemChildStyles);

  const checkableElement = useMemo(() => {
    if (!checkable) return;

    const cssStyles = [
      childStyles.euiKeyPadMenuItem__checkableInput,
      !isSelected && isDisabled && childStyles.hideCheckableInput,
      !isSelected && !isDisabled && childStyles.showCheckableInputOnInteraction,
    ];

    const sharedProps = {
      id: itemId,
      className: 'euiKeyPadMenuItem__checkableInput',
      css: cssStyles,
      checked: isSelected,
      disabled: isDisabled,
      name,
    };

    if (checkable === 'single') {
      return (
        <EuiRadio
          {...sharedProps}
          value={value as string}
          onChange={() => onChange!(itemId, value)}
        />
      );
    } else {
      return (
        <EuiCheckbox {...sharedProps} onChange={() => onChange!(itemId)} />
      );
    }
  }, [
    checkable,
    isDisabled,
    isSelected,
    onChange,
    value,
    name,
    itemId,
    childStyles,
  ]);

  const betaBadge = useMemo(() => {
    if (!betaBadgeLabel) return;

    return (
      <EuiBetaBadge
        // Since we move the tooltip contents to a wrapping EuiToolTip,
        // this badge is purely visual therefore we can safely hide it from screen readers
        aria-hidden="true"
        size="s"
        color="subdued"
        className="euiKeyPadMenuItem__betaBadge"
        css={childStyles.euiKeyPadMenuItem__betaBadge}
        label={betaBadgeLabel.charAt(0)}
        iconType={betaBadgeIconType}
      />
    );
  }, [betaBadgeLabel, betaBadgeIconType, childStyles]);

  const relObj: {
    disabled?: boolean;
    type?: string;
    href?: string;
    rel?: string;
    target?: string;
    'aria-pressed'?: boolean;
    'aria-current'?: boolean;
    htmlFor?: string;
  } = {};

  if (href && !isDisabled) {
    relObj.href = href;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
    relObj.target = target;
    relObj['aria-current'] = isSelected ? isSelected : undefined;
  } else if (checkable) {
    relObj.htmlFor = itemId;
  } else {
    relObj.disabled = isDisabled;
    relObj.type = 'button';
    relObj['aria-pressed'] = isSelected;
  }

  const button = (
    <Element
      className={classes}
      css={cssStyles}
      {...(relObj as ElementType)}
      {...(rest as ElementType)}
      // Unable to get past `LegacyRef` conflicts
      ref={buttonRef as Ref<any>}
    >
      <span
        className="euiKeyPadMenuItem__inner"
        css={childStyles.euiKeyPadMenuItem__inner}
      >
        {checkable ? checkableElement : betaBadge}
        <span
          className="euiKeyPadMenuItem__icon"
          css={childStyles.euiKeyPadMenuItem__icon}
        >
          {children}
        </span>
        <span
          className="euiKeyPadMenuItem__label"
          css={childStyles.euiKeyPadMenuItem__label}
        >
          {label}
        </span>
      </span>
    </Element>
  );

  return betaBadgeLabel ? (
    <EuiToolTip
      {...betaBadgeTooltipProps}
      title={betaBadgeLabel}
      content={betaBadgeTooltipContent}
      delay="long"
    >
      {button}
    </EuiToolTip>
  ) : (
    button
  );
};
