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
  ReactNode,
  Ref,
  ButtonHTMLAttributes,
} from 'react';

import {
  RenderLinkOrButton,
  validateHref,
  useEuiTheme,
} from '../../../services';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
} from '../../common';

import { euiButtonDisplayStyles } from './_button_display.styles';
import {
  EuiButtonDisplayContent,
  EuiButtonDisplayContentProps,
  EuiButtonDisplayContentType,
} from './_button_display_content';

const SIZES = ['xs', 's', 'm'] as const;
export type EuiButtonDisplaySizes = (typeof SIZES)[number];

/**
 * Extends EuiButtonDisplayContentProps which provides
 * `iconType`, `iconSide`, and `textProps`
 */
export interface EuiButtonDisplayCommonProps
  extends EuiButtonDisplayContentProps,
    CommonProps {
  element?: 'a' | 'button' | 'span';
  children?: ReactNode;
  size?: EuiButtonDisplaySizes;
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
  minWidth?: CSSProperties['minWidth'] | false;
  /**
   * Force disables the button and changes the icon to a loading spinner
   */
  isLoading?: boolean;
  /**
   * Object of props passed to the <span/> wrapping the button's content
   */
  contentProps?: CommonProps & EuiButtonDisplayContentType;
  style?: CSSProperties;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export type EuiButtonDisplayPropsForAnchor = PropsForAnchor<
  EuiButtonDisplayCommonProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

export type EuiButtonDisplayPropsForButton = PropsForButton<
  EuiButtonDisplayCommonProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

export type EuiButtonDisplayProps = ExclusiveUnion<
  EuiButtonDisplayPropsForAnchor,
  EuiButtonDisplayPropsForButton
>;

export function isButtonDisabled({
  href,
  isDisabled,
  isLoading,
}: {
  href?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}) {
  const isHrefValid = !href || validateHref(href);
  return isLoading || isDisabled || !isHrefValid;
}

/**
 * EuiButtonDisplay is an internal-only component used for displaying
 * any element as a button.
 */
export const EuiButtonDisplay = forwardRef<HTMLElement, EuiButtonDisplayProps>(
  (
    {
      element: _element = 'button', // TODO: Not doing anything with this now
      type = 'button',
      children,
      iconType,
      iconSide = 'left',
      iconSize,
      size = 'm',
      isDisabled,
      disabled,
      isLoading,
      isSelected,
      fullWidth,
      minWidth,
      contentProps,
      textProps,
      href,
      target,
      rel,
      style,
      ...rest
    },
    ref
  ) => {
    const buttonIsDisabled = isButtonDisabled({
      href,
      isDisabled: isDisabled || disabled,
      isLoading,
    });

    const theme = useEuiTheme();

    const styles = euiButtonDisplayStyles(theme);
    const cssStyles = [
      styles.euiButtonDisplay,
      styles[size],
      fullWidth && styles.fullWidth,
      minWidth == null && styles.defaultMinWidth,
    ];

    return (
      <RenderLinkOrButton
        componentCss={cssStyles}
        style={minWidth ? { ...style, minInlineSize: minWidth } : style}
        fallbackElement="button"
        elementRef={ref}
        href={href}
        target={target}
        rel={rel}
        isDisabled={buttonIsDisabled}
        buttonProps={{
          type,
          'aria-pressed': isSelected,
          css: buttonIsDisabled && styles.isDisabled,
        }}
        {...rest}
      >
        <EuiButtonDisplayContent
          isLoading={isLoading}
          isDisabled={buttonIsDisabled}
          iconType={iconType}
          iconSide={iconSide}
          iconSize={iconSize}
          textProps={textProps}
          {...contentProps}
        >
          {children}
        </EuiButtonDisplayContent>
      </RenderLinkOrButton>
    );
  }
);

EuiButtonDisplay.displayName = 'EuiButtonDisplay';
