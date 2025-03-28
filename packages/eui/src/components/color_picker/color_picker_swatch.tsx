/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ButtonHTMLAttributes, forwardRef, useMemo } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { useEuiI18n } from '../i18n';

import { getChromaColor } from './utils';
import { euiColorPickerSwatchStyles } from './color_picker_swatch.styles';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';

export type EuiColorPickerSwatchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    color?: string;

    /**
     * renders a tooltip with the color value to provide a visual text alternative
     * @default true
     */
    showToolTip?: boolean;

    /** Additional props for the EuiToolip when `showToolTip={true}` */
    toolTipProps?: Omit<EuiToolTipProps, 'children' | 'delay' | 'position'> & {
      delay?: EuiToolTipProps['delay'];
      position?: EuiToolTipProps['position'];
    };
  };

export const EuiColorPickerSwatch = forwardRef<
  HTMLButtonElement,
  EuiColorPickerSwatchProps
>(
  (
    { className, color, style, toolTipProps, showToolTip = true, ...rest },
    ref
  ) => {
    const classes = classNames('euiColorPickerSwatch', className);
    const styles = useEuiMemoizedStyles(euiColorPickerSwatchStyles);

    const chromaColor = useMemo(() => getChromaColor(color, true), [color]);
    const background = useMemo(
      () => (chromaColor ? chromaColor.css() : 'transparent'),
      [chromaColor]
    );

    const ariaLabel = useEuiI18n(
      'euiColorPickerSwatch.ariaLabel',
      'Select {color} as the color',
      { color }
    );

    const element = (
      <button
        type="button"
        css={styles.euiColorPickerSwatch}
        className={classes}
        aria-label={ariaLabel}
        ref={ref}
        style={{
          background,
          ...style,
        }}
        {...rest}
      />
    );

    return showToolTip ? (
      <EuiToolTip
        content={color}
        {...toolTipProps}
        anchorProps={{
          ...toolTipProps?.anchorProps,
          css: [toolTipProps?.anchorProps?.css, styles.tooltip],
        }}
        // since the button already has a descriptive `ariaLabel` we can disable
        // the tooltip content from being read additionally by screen readers
        disableScreenReaderOutput={true}
      >
        {element}
      </EuiToolTip>
    ) : (
      element
    );
  }
);

EuiColorPickerSwatch.displayName = 'EuiColorPickerSwatch';
