/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
  Ref,
  LabelHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
} from '../common';

import { EuiBetaBadge } from '../badge/beta_badge';

import { getSecureRelForTarget, htmlIdGenerator } from '../../services';

import { IconType } from '../icon';
import { EuiRadio, EuiCheckbox } from '../form';

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
   * Be sure to use `true` AND `false` when acting as a toggle.
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
       * Defaults to a random string
       */
      name?: string;
      /**
       * The value of the radio input for 'single'.
       */
      value?: string;
      /**
       * Single: Returns the `id` of the clicked option and the `value`
       */
      onChange: (id: string, value?: any) => void;
    },
    {
      /**
       * Type `'single'` renders the item as a `<label>` and
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
  isDisabled,
  isSelected,
  label,
  children,
  className,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeIconType,
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
  const actuallyDisabled = isDisabled || disabled;

  const classes = classNames(
    'euiKeyPadMenuItem',
    {
      'euiKeyPadMenuItem--hasBetaBadge': betaBadgeLabel,
      'euiKeyPadMenuItem-isDisabledLabel': checkable && actuallyDisabled,
      'euiKeyPadMenuItem-isSelectedLabel': checkable && isSelected,
    },
    className
  );

  let Element = href && !actuallyDisabled ? 'a' : 'button';
  if (checkable) Element = 'label';
  const itemId = id || htmlIdGenerator()();

  const renderCheckableElement = () => {
    if (!checkable) return;

    const inputClasses = classNames('euiKeyPadMenuItem__checkableInput');
    const nameIfSingle = name || htmlIdGenerator()();

    let checkableElement;
    if (checkable === 'single') {
      checkableElement = (
        <EuiRadio
          id={itemId}
          className={inputClasses}
          checked={isSelected}
          disabled={actuallyDisabled}
          name={nameIfSingle}
          // value={value}
          onChange={() => {
            // @ts-ignore HELP!
            onChange ? onChange(itemId, value) : undefined;
          }}
        />
      );
    } else {
      checkableElement = (
        <EuiCheckbox
          id={itemId}
          className={inputClasses}
          checked={isSelected}
          disabled={actuallyDisabled}
          // @ts-ignore HELP!
          onChange={() => onChange && onChange(itemId)}
        />
      );
    }

    return checkableElement;
  };

  const renderBetaBadge = () => {
    if (!betaBadgeLabel) return;

    return (
      <span className="euiKeyPadMenuItem__betaBadgeWrapper">
        <EuiBetaBadge
          className="euiKeyPadMenuItem__betaBadge"
          label={betaBadgeLabel}
          iconType={betaBadgeIconType}
          tooltipContent={betaBadgeTooltipContent}
        />
      </span>
    );
  };

  const renderContent = () => (
    <span className="euiKeyPadMenuItem__inner">
      {checkable ? renderCheckableElement() : renderBetaBadge()}

      <span className="euiKeyPadMenuItem__icon">{children}</span>

      <span className="euiKeyPadMenuItem__label">{label}</span>
    </span>
  );

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

  if (href && !actuallyDisabled) {
    relObj.href = href;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
    relObj.target = target;
    relObj['aria-current'] = isSelected ? isSelected : undefined;
  } else if (checkable) {
    relObj.htmlFor = itemId;
  } else {
    relObj.disabled = actuallyDisabled;
    relObj.type = 'button';
    relObj['aria-pressed'] = isSelected;
  }

  return (
    // @ts-ignore HELP!
    <Element
      className={classes}
      {...(relObj as HTMLAttributes<HTMLElement>)}
      {...(rest as HTMLAttributes<HTMLElement>)}
      // ref={buttonRef} HELP!
    >
      {renderContent()}
    </Element>
  );
};
