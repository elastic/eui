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
  FunctionComponent,
  Ref,
} from 'react';
import classNames from 'classnames';

import { getSecureRelForTarget } from '../../../services';
import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../../common';

import { IconType, IconSize, EuiIcon } from '../../icon';

import { EuiLoadingSpinner } from '../../loading';

import { ButtonColor } from '../button';

import { validateHref } from '../../../services/security/href_validator';

export type EuiButtonIconColor = ButtonColor;

const displayToClassNameMap = {
  base: null,
  empty: 'euiButtonIcon--empty',
  fill: 'euiButtonIcon--fill',
};

export const DISPLAYS = keysOf(displayToClassNameMap);
type EuiButtonIconDisplay = keyof typeof displayToClassNameMap;

export interface EuiButtonIconProps extends CommonProps {
  iconType: IconType;
  /**
   * Any of the named color palette options.
   */
  color?: EuiButtonIconColor;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  isDisabled?: boolean;
  /**
   * Overall size of button.
   * Matches the sizes of other EuiButtons
   */
  size?: EuiButtonIconSizes;
  /**
   * Size of the icon only.
   * This will not affect the overall size of the button
   */
  iconSize?: IconSize;
  /**
   * Applies the boolean state as the `aria-pressed` property to create a toggle button.
   * *Only use when the readable text does not change between states.*
   */
  isSelected?: boolean;
  /**
   * Sets the display style for matching other EuiButton types.
   * `base` is equivalent to a typical EuiButton
   * `fill` is equivalent to a filled EuiButton
   * `empty` (default) is equivalent to an EuiButtonEmpty
   */
  display?: EuiButtonIconDisplay;
  /**
   * Disables the button and changes the icon to a loading spinner
   */
  isLoading?: boolean;
}

export type EuiButtonIconPropsForAnchor = {
  type?: string;
} & PropsForAnchor<
  EuiButtonIconProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

export type EuiButtonIconPropsForButton = {
  type?: 'submit' | 'reset' | 'button';
} & PropsForButton<
  EuiButtonIconProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

type Props = ExclusiveUnion<
  EuiButtonIconPropsForAnchor,
  EuiButtonIconPropsForButton
>;

const colorToClassNameMap: { [color in EuiButtonIconColor]: string } = {
  accent: 'euiButtonIcon--accent',
  danger: 'euiButtonIcon--danger',
  ghost: 'euiButtonIcon--ghost',
  primary: 'euiButtonIcon--primary',
  success: 'euiButtonIcon--success',
  text: 'euiButtonIcon--text',
  warning: 'euiButtonIcon--warning',
};

export const COLORS = keysOf(colorToClassNameMap);

const sizeToClassNameMap = {
  xs: 'euiButtonIcon--xSmall',
  s: 'euiButtonIcon--small',
  m: 'euiButtonIcon--medium',
};

export type EuiButtonIconSizes = keyof typeof sizeToClassNameMap;

export const SIZES = keysOf(sizeToClassNameMap);

export const EuiButtonIcon: FunctionComponent<Props> = ({
  className,
  iconType,
  iconSize = 'm',
  color = 'primary',
  isDisabled: _isDisabled,
  disabled,
  href,
  type = 'button',
  display = 'empty',
  target,
  rel,
  size = 'xs',
  buttonRef,
  isSelected,
  isLoading,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || disabled || !isHrefValid || isLoading;

  const ariaHidden = rest['aria-hidden'];
  const isAriaHidden = ariaHidden === 'true' || ariaHidden === true;

  if (!rest['aria-label'] && !rest['aria-labelledby'] && !isAriaHidden) {
    console.warn(
      `EuiButtonIcon requires aria-label or aria-labelledby to be specified because icon-only
      buttons are screen-reader-inaccessible without them.`
    );
  }
  const classes = classNames(
    'euiButtonIcon',
    {
      'euiButtonIcon-isDisabled': isDisabled,
    },
    colorToClassNameMap[color],
    display && displayToClassNameMap[display],
    size && sizeToClassNameMap[size],
    className
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType && !isLoading) {
    buttonIcon = (
      <EuiIcon
        className="euiButtonIcon__icon"
        type={iconType}
        size={iconSize}
        aria-hidden="true"
        color="inherit" // forces the icon to inherit its parent color
      />
    );
  }

  // `original` size doesn't exist in `EuiLoadingSpinner`
  // when the `iconSize` is `original` we don't pass any size to the `EuiLoadingSpinner`
  // so it gets the default size
  const loadingSize = iconSize === 'original' ? undefined : iconSize;

  if (iconType && isLoading) {
    buttonIcon = <EuiLoadingSpinner size={loadingSize} />;
  }

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !isDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        tabIndex={isAriaHidden ? -1 : undefined}
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef as Ref<HTMLAnchorElement>}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {buttonIcon}
      </a>
    );
  }

  let buttonType: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  return (
    <button
      tabIndex={isAriaHidden ? -1 : undefined}
      disabled={isDisabled}
      className={classes}
      aria-pressed={isSelected}
      type={type as typeof buttonType}
      ref={buttonRef as Ref<HTMLButtonElement>}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {buttonIcon}
    </button>
  );
};
