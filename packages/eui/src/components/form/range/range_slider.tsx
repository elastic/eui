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
  FunctionComponent,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { useEuiTheme } from '../../../services';
import { logicalStyles } from '../../../global_styling';
import {
  EuiResizeObserver,
  EuiResizeObserverProps,
} from '../../observer/resize_observer';

import type { EuiRangeProps, EuiRangeLevel } from './types';
import { euiRangeLevelColor } from './range_levels_colors';
import { euiRangeSliderStyles } from './range_slider.styles';

export interface EuiRangeSliderProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'min' | 'max' | 'step' | 'onResize'
    >,
    CommonProps,
    Pick<
      EuiRangeProps,
      | 'id'
      | 'name'
      | 'tabIndex'
      | 'min'
      | 'max'
      | 'step'
      | 'disabled'
      | 'isLoading'
      | 'showRange'
      | 'showTicks'
    > {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  thumbColor?: EuiRangeLevel['color'];
  onResize: EuiResizeObserverProps['onResize'];
  ariaValueText?: string;
}

export const EuiRangeSlider: FunctionComponent<EuiRangeSliderProps> = ({
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
  thumbColor,
  onResize,
  ariaValueText,
  ...rest
}) => {
  const classes = classNames('euiRangeSlider', className);

  const euiTheme = useEuiTheme();
  const styles = euiRangeSliderStyles(euiTheme);
  const cssStyles = [
    styles.euiRangeSlider,
    showTicks && styles.hasTicks,
    showRange && styles.hasRange,
  ];

  const sliderStyle = useMemo(() => {
    return logicalStyles({
      // @ts-ignore - CSS variable
      '--euiRangeThumbColor':
        thumbColor && euiRangeLevelColor(thumbColor, euiTheme),
      ...style,
    });
  }, [thumbColor, euiTheme, style]);

  return (
    <EuiResizeObserver onResize={onResize}>
      {(resizeRef) => (
        <input
          aria-valuetext={ariaValueText}
          ref={resizeRef}
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
          style={sliderStyle}
          tabIndex={tabIndex}
          {...rest}
        />
      )}
    </EuiResizeObserver>
  );
};
