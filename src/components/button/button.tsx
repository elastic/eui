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
} from '../common';

import { EuiButtonContentDeprecated as EuiButtonContent } from './_button_content_deprecated';
import {
  BUTTON_COLORS,
  useEuiButtonColorCSS,
  useEuiButtonFocusCSS,
  _EuiButtonColor,
} from '../../themes/amsterdam/global_styling/mixins/button';
import {
  EuiButtonDisplay,
  EuiButtonDisplayCommonProps,
  isButtonDisabled,
} from './button_display/_button_display';
import { EuiThemeProvider } from '../../services';

export const COLORS = [...BUTTON_COLORS, 'ghost'] as const;
export type EuiButtonColor = _EuiButtonColor | 'ghost';

export const SIZES = ['s', 'm'] as const;
export type EuiButtonSize = typeof SIZES[number];

interface BaseProps {
  children?: ReactNode;
  /**
   * Make button a solid color for prominence
   */
  fill?: boolean;
  /**
   * Any of the named color palette options.
   * **`'ghost'` is set for deprecation. Use EuiThemeProvide.colorMode = 'dark' instead.**
   */
  color?: EuiButtonColor;
  /**
   * Use size `s` in confined spaces
   */
  size?: EuiButtonSize;
  /**
   * `disabled` is also allowed
   */
  isDisabled?: boolean;
}

export interface EuiButtonProps
  extends BaseProps,
    Omit<EuiButtonDisplayCommonProps, 'size'>,
    CommonProps {}

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
export const EuiButton: FunctionComponent<Props> = (props) => {
  const { buttonRef, color: _color = 'primary', fill, ...rest } = props;

  const buttonIsDisabled = isButtonDisabled({
    href: rest.href,
    isDisabled: rest.isDisabled || rest.disabled,
    isLoading: rest.isLoading,
  });

  // eslint-disable-next-line no-nested-ternary
  const color = buttonIsDisabled ? 'disabled' : _color;

  const buttonColorStyles = useEuiButtonColorCSS({
    display: fill ? 'fill' : 'base',
  })[color === 'ghost' ? 'text' : color];

  const buttonFocusStyle = useEuiButtonFocusCSS();

  const cssStyles = [buttonColorStyles, buttonFocusStyle];

  if (_color === 'ghost') {
    // INCEPTION: If `ghost`, re-implement with a wrapping dark mode theme provider
    return (
      <EuiThemeProvider colorMode="dark">
        <EuiButton {...props} color="text" />
      </EuiThemeProvider>
    );
  }

  return (
    <EuiButtonDisplay
      className="euiButton"
      ref={buttonRef}
      css={cssStyles}
      {...rest}
    />
  );
};

EuiButton.displayName = 'EuiButton';

// Use defaultProps for simple pass-through props
EuiButton.defaultProps = {
  size: 'm',
  color: 'primary',
};

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

export const sizeToClassNameMap: { [size in EuiButtonSize]: string | null } = {
  s: '--small',
  m: null,
};

export const colorToClassNameMap: {
  [color in EuiButtonColor]: string | null;
} = {
  primary: '--primary',
  accent: '--accent',
  success: '--success',
  warning: '--warning',
  danger: '--danger',
  ghost: '--ghost',
  text: '--text',
};

/**
 * *DEPRECATED*
 * EuiButtonDisplay is an internal-only component used for displaying
 * any element as a button.
 * NOTE: This component *must* be below EuiButton in the file and
 * EuiButton must also set a displayName for react-docgen-typescript
 * to correctly set EuiButton's docgenInfo and display a props table.
 * This component has been deprecated in favor of the new EuiButtonDisplay
 * that can be found in `src/components/button/button_display/_button_display.tsx`
 */
export const EuiButtonDisplayDeprecated = forwardRef<
  HTMLElement,
  EuiButtonDisplayProps
>(
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
    const buttonIsDisabled = isButtonDisabled({ isLoading, isDisabled });

    const classes = classNames(
      baseClassName,
      color && colorToClassNameMap[color]
        ? `${baseClassName}${colorToClassNameMap[color]}`
        : undefined,
      size && sizeToClassNameMap[size]
        ? `${baseClassName}${sizeToClassNameMap[size]}`
        : null,
      fullWidth && `${baseClassName}--fullWidth`,
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
        // @ts-ignore - deprecated component
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
EuiButtonDisplayDeprecated.displayName = 'EuiButtonDisplay';
