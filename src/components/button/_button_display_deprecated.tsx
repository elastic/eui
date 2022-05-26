/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  forwardRef,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  Ref,
} from 'react';
import classNames from 'classnames';

import {
  EuiButtonContent_Deprecated as EuiButtonContent,
  EuiButtonContentProps_Deprecated as EuiButtonContentDisplayProps,
  EuiButtonContentType_Deprecated as EuiButtonContentType,
} from './_button_content_deprecated';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../common';

export type ButtonDisplayColor_Deprecated =
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost'
  | 'text';

export type ButtonDisplaySize_Deprecated = 's' | 'm';

export const colorToClassNameMap: {
  [color in ButtonDisplayColor_Deprecated]: string;
} = {
  primary: '--primary',
  accent: '--accent',
  success: '--success',
  warning: '--warning',
  danger: '--danger',
  ghost: '--ghost',
  text: '--text',
};

export const COLORS = keysOf(colorToClassNameMap);

export const sizeToClassNameMap: {
  [size in ButtonDisplaySize_Deprecated]: string | null;
} = {
  s: '--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

/**
 * Extends EuiButtonContentDisplayProps which provides
 * `iconType`, `iconSide`, and `textProps`
 */
export interface EuiButtonDisplayCommonProps_Deprecated
  extends EuiButtonContentDisplayProps,
    CommonProps {
  children?: ReactNode;
  /**
   * Make button a solid color for prominence
   */
  fill?: boolean;
  /**
   * Any of our named colors.
   */
  color?: ButtonDisplayColor_Deprecated;
  /**
   * Use size `s` in confined spaces
   */
  size?: ButtonDisplaySize_Deprecated;
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

export type EuiButtonDisplayPropsForAnchor_Deprecated = PropsForAnchor<
  EuiButtonDisplayCommonProps_Deprecated,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

export type EuiButtonDisplayPropsForButton_Deprecated = PropsForButton<
  EuiButtonDisplayCommonProps_Deprecated,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

export type EuiButtonDisplayUnionProps_Deprecated = ExclusiveUnion<
  EuiButtonDisplayPropsForAnchor_Deprecated,
  EuiButtonDisplayPropsForButton_Deprecated
>;

export type EuiButtonDisplayProps_Deprecated = EuiButtonDisplayCommonProps_Deprecated &
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
 * *INTERNAL ONLY / DEPRECATED*
 * EuiButtonDisplay is an internal-only component used for displaying
 * any element as a button.
 * This component has been deprecated in favor of the new EuiButtonDisplay
 * that can be found in `src/components/button/button_display/_button_display.tsx`
 */
export const EuiButtonDisplay_Deprecated = forwardRef<
  HTMLElement,
  EuiButtonDisplayProps_Deprecated
>(
  (
    {
      element = 'button',
      baseClassName,
      children,
      className,
      iconType,
      iconSide = 'left',
      color = 'primary',
      size = 'm',
      fill = false,
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
        : `${baseClassName}${colorToClassNameMap.primary}`,
      size && sizeToClassNameMap[size]
        ? `${baseClassName}${sizeToClassNameMap[size]}`
        : null,
      fill && `${baseClassName}--fill`,
      fullWidth && `${baseClassName}--fullWidth`,
      buttonIsDisabled && `${baseClassName}-isDisabled`,
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
EuiButtonDisplay_Deprecated.displayName = 'EuiButtonDisplay_Deprecated';
