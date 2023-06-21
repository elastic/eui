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

import {
  EuiThemeProvider,
  getSecureRelForTarget,
  useEuiTheme,
} from '../../../services';
import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
} from '../../common';

import { IconType, IconSize, EuiIcon } from '../../icon';

import { EuiLoadingSpinner } from '../../loading';

import {
  useEuiButtonColorCSS,
  useEuiButtonFocusCSS,
  _EuiButtonColor,
} from '../../../themes/amsterdam/global_styling/mixins/button';
import { isButtonDisabled } from '../button_display/_button_display';
import { euiButtonIconStyles, _emptyHoverStyles } from './button_icon.styles';

export const SIZES = ['xs', 's', 'm'] as const;
export type EuiButtonIconSizes = (typeof SIZES)[number];

export const DISPLAYS = ['base', 'empty', 'fill'] as const;
type EuiButtonIconDisplay = (typeof DISPLAYS)[number];

export interface EuiButtonIconProps extends CommonProps {
  iconType: IconType;
  /**
   * Any of the named color palette options.
   * **`'ghost'` is set for deprecation. Use EuiThemeProvide.colorMode = 'dark' instead.**
   */
  color?: _EuiButtonColor | 'ghost';
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

export const EuiButtonIcon: FunctionComponent<Props> = (props) => {
  const {
    className,
    iconType,
    iconSize = 'm',
    color: _color = 'primary',
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
  } = props;

  const euiThemeContext = useEuiTheme();
  const isDisabled = isButtonDisabled({
    isDisabled: _isDisabled || disabled,
    href,
    isLoading,
  });

  const ariaHidden = rest['aria-hidden'];
  const isAriaHidden = ariaHidden === 'true' || ariaHidden === true;

  if (!rest['aria-label'] && !rest['aria-labelledby'] && !isAriaHidden) {
    console.warn(
      `EuiButtonIcon requires aria-label or aria-labelledby to be specified because icon-only
      buttons are screen-reader-inaccessible without them.`
    );
  }

  const color = isDisabled ? 'disabled' : _color === 'ghost' ? 'text' : _color;
  const buttonColorStyles = useEuiButtonColorCSS({ display });
  const buttonFocusStyle = useEuiButtonFocusCSS();

  const styles = euiButtonIconStyles(euiThemeContext);
  const emptyHoverStyles = _emptyHoverStyles(euiThemeContext, color);

  const cssStyles = [
    styles.euiButtonIcon,
    styles[size],
    buttonColorStyles[color],
    buttonFocusStyle,
    display === 'empty' && emptyHoverStyles,
    isDisabled && styles.isDisabled,
  ];

  const classes = classNames('euiButtonIcon', className);

  if (_color === 'ghost') {
    // INCEPTION: If `ghost`, re-implement with a wrapping dark mode theme provider
    return (
      <EuiThemeProvider colorMode="dark" wrapperProps={{ cloneElement: true }}>
        <EuiButtonIcon {...props} color="text" />
      </EuiThemeProvider>
    );
  }

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

  if (iconType && isLoading) {
    // `original` size doesn't exist in `EuiLoadingSpinner`
    // when the `iconSize` is `original` we don't pass any size to the `EuiLoadingSpinner`
    // so it gets the default size
    const loadingSize = iconSize === 'original' ? undefined : iconSize;

    // When the button is disabled the text gets gray
    // and in some buttons the background gets a light gray
    // for better contrast we want to change the border of the spinner
    // to have the same color of the text. This way we ensure the borders
    // are always visible. The default spinner color could be very light.
    const loadingSpinnerColor = isDisabled
      ? { border: 'currentcolor' }
      : undefined;

    buttonIcon = (
      <EuiLoadingSpinner size={loadingSize} color={loadingSpinnerColor} />
    );
  }

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !isDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        css={cssStyles}
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
      css={cssStyles}
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
