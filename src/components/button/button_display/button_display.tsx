/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, HTMLAttributes } from 'react';
// @ts-ignore module doesn't export `createElement`
import { createElement } from '@emotion/react';
import { useEuiTheme } from '../../../services';

import { EuiButtonProps } from '../button';
import { euiButtonDisplayStyles } from './button_display.styles';
import { EuiButtonDisplayContent } from './button_display_content';

export type ButtonSize = 's' | 'm';

export type EuiButtonDisplayProps = Omit<EuiButtonProps, 'color'> &
  HTMLAttributes<HTMLElement> & {
    /**
     * Provide a valid element to render the element as
     */
    element?: 'a' | 'button' | 'span' | 'label';
    /**
     * The button text
     */
    text?: string;
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
      text,
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
        text={text}
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
