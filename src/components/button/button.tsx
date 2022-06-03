/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  forwardRef,
  FunctionComponent,
  Ref,
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../common';

import { getSecureRelForTarget } from '../../services';

import {
  EuiButtonContentProps,
  EuiButtonContentType,
  EuiButtonContent,
} from './button_content';
import { validateHref } from '../../services/security/href_validator';
import { useEuiButtonColorCSS } from '../../themes/amsterdam/global_styling/mixins/button';

export type ButtonColor =
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost'
  | 'text';

export type ButtonSize = 's' | 'm';

export const colorToClassNameMap: { [color in ButtonColor]: string } = {
  primary: '--primary',
  accent: '--accent',
  success: '--success',
  warning: '--warning',
  danger: '--danger',
  ghost: '--ghost',
  text: '--text',
};

export const COLORS = keysOf(colorToClassNameMap);

export const sizeToClassNameMap: { [size in ButtonSize]: string | null } = {
  s: '--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

/**
 * Extends EuiButtonContentProps which provides
 * `iconType`, `iconSide`, and `textProps`
 */
export interface EuiButtonProps extends EuiButtonContentProps, CommonProps {
  children?: ReactNode;
  /**
   * Make button a solid color for prominence
   */
  fill?: boolean;
  /**
   * Any of our named colors.
   */
  color?: ButtonColor;
  /**
   * Use size `s` in confined spaces
   */
  size?: ButtonSize;
  /**
   * `disabled` is also allowed
   */
  isDisabled?: boolean;
  /**
   * Applies the boolean state as the `aria-pressed` property to create a toggle button.
   * *Only use when the readable text does not change between states.*
   */
  isSelected?: boolean;
  /**
   * Extends the button to 100% width
   */
  fullWidth?: boolean;
  /**
   * Override the default minimum width
   */
  minWidth?: CSSProperties['minWidth'];
  /**
   * Force disables the button and changes the icon to a loading spinner
   */
  isLoading?: boolean;
  /**
   * Object of props passed to the <span/> wrapping the button's content
   */
  contentProps?: EuiButtonContentType;
  style?: CSSProperties;
}

export type EuiButtonPropsForAnchor = PropsForAnchor<
  EuiButtonProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

export type EuiButtonPropsForButton = PropsForButton<
  EuiButtonProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

export type Props = ExclusiveUnion<
  EuiButtonPropsForAnchor,
  EuiButtonPropsForButton
>;

/**
 * EuiButton is largely responsible for providing relevant props
 * and the logic for element-specific attributes
 */
export const EuiButton: FunctionComponent<Props> = ({
  isDisabled: _isDisabled,
  disabled: _disabled,
  href,
  target,
  rel,
  type = 'button',
  buttonRef,
  color: _color = 'primary',
  fill,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;
  const isDisabled = _isDisabled || !isHrefValid;

  const buttonIsDisabled = rest.isLoading || isDisabled || disabled;
  const element = href && !isDisabled ? 'a' : 'button';

  // eslint-disable-next-line no-nested-ternary
  const color = buttonIsDisabled
    ? 'disabled'
    : _color === 'ghost'
    ? 'text'
    : _color;
  const buttonColorStyles = useEuiButtonColorCSS({
    display: fill ? 'fill' : 'base',
  })[color];

  let elementProps = {};
  // Props for all elements
  elementProps = { ...elementProps, isDisabled: buttonIsDisabled };
  // Element-specific attributes
  if (element === 'button') {
    elementProps = { ...elementProps, disabled: buttonIsDisabled };
  }

  const relObj: {
    rel?: string;
    href?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    target?: string;
  } = {};

  if (href && !buttonIsDisabled) {
    relObj.href = href;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
    relObj.target = target;
  } else {
    relObj.type = type as ButtonHTMLAttributes<HTMLButtonElement>['type'];
  }

  const cssStyles = [buttonColorStyles];

  return (
    <EuiButtonDisplay
      element={element}
      baseClassName="euiButton"
      ref={buttonRef}
      css={cssStyles}
      {...elementProps}
      {...relObj}
      {...rest}
    />
  );
};
EuiButton.displayName = 'EuiButton';

export type EuiButtonDisplayProps = EuiButtonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * Provide a valid element to render the element as
     */
    element: 'a' | 'button' | 'span' | 'label';
    /**
     * Provide the component's base class name to build the class list on
     */
    baseClassName: string;
  };

/**
 * EuiButtonDisplay is an internal-only component used for displaying
 * any element as a button.
 * NOTE: This component *must* be below EuiButton in the file and
 * EuiButton must also set a displayName for react-docgen-typescript
 * to correctly set EuiButton's docgenInfo and display a props table.
 */
export const EuiButtonDisplay = forwardRef<HTMLElement, EuiButtonDisplayProps>(
  (
    {
      element = 'button',
      baseClassName,
      children,
      className,
      iconType,
      iconSide = 'left',
      color,
      size = 'm',
      isDisabled,
      isLoading,
      isSelected,
      contentProps,
      textProps,
      fullWidth,
      minWidth,
      style,
      ...rest
    },
    ref
  ) => {
    const buttonIsDisabled = isLoading || isDisabled;

    const classes = classNames(
      baseClassName,
      color && colorToClassNameMap[color]
        ? `${baseClassName}${colorToClassNameMap[color]}`
        : undefined,
      size && sizeToClassNameMap[size]
        ? `${baseClassName}${sizeToClassNameMap[size]}`
        : null,
      // fill && `${baseClassName}--fill`,
      fullWidth && `${baseClassName}--fullWidth`,
      // buttonIsDisabled && `${baseClassName}-isDisabled`,
      className
    );

    /**
     * Not changing the content or text class names to match baseClassName yet,
     * as it is a major breaking change.
     */
    const contentClassNames = classNames(
      'euiButton__content',
      contentProps && contentProps.className
    );

    const textClassNames = classNames(
      'euiButton__text',
      textProps && textProps.className
    );

    const innerNode = (
      <EuiButtonContent
        isLoading={isLoading}
        iconType={iconType}
        iconSide={iconSide}
        textProps={{ ...textProps, className: textClassNames }}
        {...contentProps}
        // className has to come last to override contentProps.className
        className={contentClassNames}
      >
        {children}
      </EuiButtonContent>
    );

    let calculatedStyle: CSSProperties | undefined = style;
    if (minWidth !== undefined || minWidth !== null) {
      calculatedStyle = {
        ...calculatedStyle,
        minWidth,
      };
    }

    return React.createElement(
      element,
      {
        className: classes,
        style: calculatedStyle,
        disabled: element === 'button' && buttonIsDisabled,
        'aria-pressed': element === 'button' ? isSelected : undefined,
        ref,
        ...rest,
      },
      innerNode
    );
  }
);
EuiButtonDisplay.displayName = 'EuiButtonDisplay';
