/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { useEuiTheme } from '../../../services';
import { logicalStyles } from '../../../global_styling';

import { EuiRangeLevel } from './range_levels';
import { euiRangeLevelColor } from './range_levels_colors';
import {
  euiRangeSliderStyles,
  euiRangeSliderThumbStyles,
} from './range_slider.styles';

export type EuiRangeSliderProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    id?: string;
    name?: string;
    min: number;
    max: number;
    step?: number;
    compressed?: boolean;
    isLoading?: boolean;
    hasFocus?: boolean;
    showRange?: boolean;
    showTicks?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    thumbColor?: EuiRangeLevel['color'];
  };

export const EuiRangeSlider = forwardRef<HTMLInputElement, EuiRangeSliderProps>(
  (
    {
      className,
      disabled,
      id,
      max,
      min,
      name,
      step,
      onChange,
      tabIndex,
      value,
      style,
      showTicks,
      showRange,
      hasFocus,
      thumbColor,
      ...rest
    },
    ref
  ) => {
    const classes = classNames('euiRangeSlider', className);

    const euiTheme = useEuiTheme();
    const styles = euiRangeSliderStyles(euiTheme);
    const thumbStyles = euiRangeSliderThumbStyles(euiTheme);
    const cssStyles = [
      styles.euiRangeSlider,
      showTicks && styles.hasTicks,
      hasFocus && styles.hasFocus,
      showRange && styles.hasRange,
      thumbColor && thumbStyles.thumb,
    ];

    const sliderStyle = {
      color: thumbColor && euiRangeLevelColor(thumbColor, euiTheme.euiTheme),
      ...style,
    };

    return (
      <input
        ref={ref}
        type="range"
        id={id}
        name={name}
        className={classes}
        css={cssStyles}
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={onChange}
        style={logicalStyles(sliderStyle)}
        tabIndex={tabIndex}
        {...rest}
      />
    );
  }
);

EuiRangeSlider.displayName = 'EuiRangeSlider';
