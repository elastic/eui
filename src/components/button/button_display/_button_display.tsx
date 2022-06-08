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

// @ts-ignore module doesn't export `createElement`
import { createElement } from '@emotion/react';
import { useEuiTheme } from '../../../services';

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

/**
 * Extends EuiButtonDisplayContentProps which provides
 * `iconType`, `iconSide`, and `textProps`
 */
export interface EuiButtonDisplayCommonProps
  extends EuiButtonDisplayContentProps,
    CommonProps {
  children?: ReactNode;
  size?: 'xs' | 's' | 'm';
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
  contentProps?: EuiButtonDisplayContentType;
  style?: CSSProperties;
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

export type Props = ExclusiveUnion<
  EuiButtonDisplayPropsForAnchor,
  EuiButtonDisplayPropsForButton
>;

export type EuiButtonDisplayProps = EuiButtonDisplayCommonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * Provide a valid element to render the element as
     */
    element?: 'a' | 'button' | 'span' | 'label';
  };

/**
 * EuiButtonDisplay is an internal-only component used for displaying
 * any element as a button.
 */
export const EuiButtonDisplay = forwardRef<HTMLElement, EuiButtonDisplayProps>(
  (
    {
      element = 'button',
      children,
      iconType,
      iconSide,
      size = 'm',
      isDisabled = false,
      isLoading,
      isSelected,
      fullWidth,
      minWidth,
      contentProps,
      textProps,
      ...rest
    },
    ref
  ) => {
    const buttonIsDisabled = isLoading || isDisabled;

    const minWidthPx: string =
      minWidth === 'number' ? `${minWidth}px` : (minWidth as string);

    const theme = useEuiTheme();

    const styles = euiButtonDisplayStyles(theme, minWidthPx);
    const cssStyles = [
      styles.euiButtonDisplay,
      styles[size],
      fullWidth && styles.fullWidth,
      isDisabled && styles.isDisabled,
    ];

    const innerNode = (
      <EuiButtonDisplayContent
        isLoading={isLoading}
        isDisabled={buttonIsDisabled}
        iconType={iconType}
        iconSide={iconSide}
        textProps={{ ...textProps }}
        {...contentProps}
      >
        {children}
      </EuiButtonDisplayContent>
    );

    return createElement(
      element,
      {
        css: cssStyles,
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
