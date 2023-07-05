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
} from '../../common';
import {
  useEuiTheme,
  EuiThemeProvider,
  getSecureRelForTarget,
} from '../../../services';

import {
  EuiButtonDisplayContent,
  EuiButtonDisplayContentProps,
  EuiButtonDisplayContentType,
} from '../button_display/_button_display_content';

import {
  useEuiButtonColorCSS,
  _EuiButtonColor,
} from '../../../themes/amsterdam/global_styling/mixins/button';
import { isButtonDisabled } from '../button_display/_button_display';

import { euiButtonEmptyStyles } from './button_empty.styles';

export const SIZES = ['xs', 's', 'm'] as const;
export type EuiButtonEmptySizes = (typeof SIZES)[number];

export const FLUSH_TYPES = ['left', 'right', 'both'] as const;
export type EuiButtonEmptyFlush = (typeof FLUSH_TYPES)[number];

/**
 * Extends EuiButtonContentProps which provides
 * `iconType`, `iconSide`, and `textProps`
 */
export interface CommonEuiButtonEmptyProps
  extends EuiButtonDisplayContentProps,
    CommonProps {
  /**
   * Any of the named color palette options.
   * **`'ghost'` is set for deprecation. Use EuiThemeProvide.colorMode = 'dark' instead.**
   */
  color?: _EuiButtonColor | 'ghost';
  size?: EuiButtonEmptySizes;
  /**
   * Ensure the text of the button sits flush to the left, right, or both sides of its container
   */
  flush?: EuiButtonEmptyFlush;
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
  contentProps?: CommonProps & EuiButtonDisplayContentType;
}

type EuiButtonEmptyPropsForAnchor = PropsForAnchor<CommonEuiButtonEmptyProps>;

export type EuiButtonEmptyPropsForButton =
  PropsForButton<CommonEuiButtonEmptyProps>;

export type EuiButtonEmptyProps = ExclusiveUnion<
  EuiButtonEmptyPropsForAnchor,
  EuiButtonEmptyPropsForButton
>;

export const EuiButtonEmpty: FunctionComponent<EuiButtonEmptyProps> = (
  props
) => {
  const {
    children,
    className,
    iconType,
    iconSide = 'left',
    iconSize = 'm',
    color: _color = 'primary',
    size = 'm',
    flush,
    isDisabled: _isDisabled,
    disabled,
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
  } = props;

  const isDisabled = isButtonDisabled({
    isDisabled: _isDisabled || disabled,
    href,
    isLoading,
  });

  const color = isDisabled ? 'disabled' : _color === 'ghost' ? 'text' : _color;
  const buttonColorStyles = useEuiButtonColorCSS({
    display: 'empty',
  });

  const euiTheme = useEuiTheme();
  const styles = euiButtonEmptyStyles(euiTheme);
  const cssStyles = [
    styles.euiButtonEmpty,
    styles[size],
    buttonColorStyles[color],
    flush && styles.flush,
    flush && styles[flush],
    isDisabled && styles.isDisabled,
  ];

  if (_color === 'ghost') {
    // INCEPTION: If `ghost`, re-implement with a wrapping dark mode theme provider
    return (
      <EuiThemeProvider colorMode="dark" wrapperProps={{ cloneElement: true }}>
        <EuiButtonEmpty {...props} color="text" />
      </EuiThemeProvider>
    );
  }

  const classes = classNames('euiButtonEmpty', className);

  const contentClassNames = classNames(
    'euiButtonEmpty__content',
    contentProps?.className
  );

  const textClassNames = classNames(
    'euiButtonEmpty__text',
    textProps?.className
  );

  const innerNode = (
    <EuiButtonDisplayContent
      isDisabled={isDisabled}
      isLoading={isLoading}
      iconType={iconType}
      iconSide={iconSide}
      iconSize={size === 'xs' ? 's' : iconSize}
      textProps={{ ...textProps, className: textClassNames }}
      {...{ ...contentProps, className: contentClassNames }}
    >
      {children}
    </EuiButtonDisplayContent>
  );

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !isDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        className={classes}
        css={cssStyles}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef as Ref<HTMLAnchorElement>}
        {...(rest as EuiButtonEmptyPropsForAnchor)}
      >
        {innerNode}
      </a>
    );
  }

  return (
    <button
      disabled={isDisabled}
      className={classes}
      css={cssStyles}
      type={type}
      ref={buttonRef as Ref<HTMLButtonElement>}
      aria-pressed={isSelected}
      {...(rest as EuiButtonEmptyPropsForButton)}
    >
      {innerNode}
    </button>
  );
};
