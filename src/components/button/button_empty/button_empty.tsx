/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, Ref } from 'react';
import classNames from 'classnames';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../../common';
import { getSecureRelForTarget } from '../../../services';
import {
  EuiButtonContent,
  EuiButtonContentProps,
  EuiButtonContentType,
} from '../button_content';
import { validateHref } from '../../../services/security/href_validator';

export type EuiButtonEmptyColor =
  | 'primary'
  | 'danger'
  | 'text'
  | 'ghost'
  | 'success'
  | 'warning';

const colorToClassNameMap: { [color in EuiButtonEmptyColor]: string } = {
  primary: 'euiButtonEmpty--primary',
  danger: 'euiButtonEmpty--danger',
  text: 'euiButtonEmpty--text',
  ghost: 'euiButtonEmpty--ghost',
  success: 'euiButtonEmpty--success',
  warning: 'euiButtonEmpty--warning',
};

export const COLORS = keysOf(colorToClassNameMap);

const sizeToClassNameMap = {
  xs: 'euiButtonEmpty--xSmall',
  s: 'euiButtonEmpty--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiButtonEmptySizes = keyof typeof sizeToClassNameMap;

const flushTypeToClassNameMap = {
  left: 'euiButtonEmpty--flushLeft',
  right: 'euiButtonEmpty--flushRight',
  both: 'euiButtonEmpty--flushBoth',
};

export const FLUSH_TYPES = keysOf(flushTypeToClassNameMap);

/**
 * Extends EuiButtonContentProps which provides
 * `iconType`, `iconSide`, and `textProps`
 */
export interface CommonEuiButtonEmptyProps
  extends EuiButtonContentProps,
    CommonProps {
  /**
   * Any of our named colors
   */
  color?: EuiButtonEmptyColor;
  size?: EuiButtonEmptySizes;
  /**
   * Ensure the text of the button sits flush to the left, right, or both sides of its container
   */
  flush?: keyof typeof flushTypeToClassNameMap;
  /**
   * `disabled` is also allowed
   */
  isDisabled?: boolean;
  /**
   * Force disables the button and changes the icon to a loading spinner
   */
  isLoading?: boolean;
  /**
   * Applies the boolean state as the `aria-pressed` property to create a toggle button.
   * *Only use when the readable text does not change between states.*
   */
  isSelected?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  buttonRef?: Ref<HTMLButtonElement | HTMLAnchorElement>;
  /**
   * Object of props passed to the <span/> wrapping the button's content
   */
  contentProps?: EuiButtonContentType;
}

type EuiButtonEmptyPropsForAnchor = PropsForAnchor<CommonEuiButtonEmptyProps>;

type EuiButtonEmptyPropsForButton = PropsForButton<CommonEuiButtonEmptyProps>;

export type EuiButtonEmptyProps = ExclusiveUnion<
  EuiButtonEmptyPropsForAnchor,
  EuiButtonEmptyPropsForButton
>;

export const EuiButtonEmpty: FunctionComponent<EuiButtonEmptyProps> = ({
  children,
  className,
  iconType,
  iconSide = 'left',
  iconSize = 'm',
  color = 'primary',
  size = 'm',
  flush,
  isDisabled: _isDisabled,
  disabled: _disabled,
  isLoading,
  href,
  target,
  rel,
  type = 'button',
  buttonRef,
  contentProps,
  textProps,
  isSelected,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;
  const isDisabled = _isDisabled || !isHrefValid;

  // If in the loading state, force disabled to true
  const buttonIsDisabled = isLoading || isDisabled || disabled;

  const classes = classNames(
    'euiButtonEmpty',
    colorToClassNameMap[color],
    size ? sizeToClassNameMap[size] : null,
    flush ? flushTypeToClassNameMap[flush] : null,
    {
      'euiButtonEmpty-isDisabled': buttonIsDisabled,
    },
    className
  );

  const contentClassNames = classNames(
    'euiButtonEmpty__content',
    contentProps && contentProps.className
  );

  const textClassNames = classNames(
    'euiButtonEmpty__text',
    textProps && textProps.className
  );

  const innerNode = (
    <EuiButtonContent
      isLoading={isLoading}
      iconType={iconType}
      iconSide={iconSide}
      iconSize={size === 'xs' ? 's' : iconSize}
      textProps={{ ...textProps, className: textClassNames }}
      {...contentProps}
      // className has to come last to override contentProps.className
      className={contentClassNames}>
      {children}
    </EuiButtonContent>
  );

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !buttonIsDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef as Ref<HTMLAnchorElement>}
        {...(rest as EuiButtonEmptyPropsForAnchor)}>
        {innerNode}
      </a>
    );
  }

  return (
    <button
      disabled={buttonIsDisabled}
      className={classes}
      type={type}
      ref={buttonRef as Ref<HTMLButtonElement>}
      aria-pressed={isSelected}
      {...(rest as EuiButtonEmptyPropsForButton)}>
      {innerNode}
    </button>
  );
};
