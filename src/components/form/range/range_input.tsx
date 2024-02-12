/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { useEuiTheme, useCombinedRefs } from '../../../services';
import { logicalStyles } from '../../../global_styling';
import { euiFormVariables } from '../form.styles';
import { EuiFieldNumber, EuiFieldNumberProps } from '../field_number';

import type { _SingleRangeValue, _SharedRangeInputSide } from './types';
import { euiRangeInputStyles } from './range_input.styles';

export interface EuiRangeInputProps
  extends Omit<EuiFieldNumberProps, 'max' | 'min' | 'value' | 'step'>,
    Omit<_SingleRangeValue, 'onChange'>,
    _SharedRangeInputSide {
  autoSize?: boolean;
}

export const EuiRangeInput: FunctionComponent<EuiRangeInputProps> = ({
  min,
  max,
  step,
  value,
  inputRef,
  isInvalid,
  disabled,
  compressed,
  onChange,
  name,
  side = 'max',
  fullWidth,
  autoSize = true,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiRangeInputStyles(euiTheme);
  const cssStyles = [styles.euiRangeInput];

  // Determine whether an invalid icon is showing, which can come from
  // the underlying EuiFieldNumber's native :invalid state
  const [hasInvalidIcon, setHasInvalidIcon] = useState(isInvalid);
  const validityRef = useRef<HTMLInputElement | null>(null);
  const setRefs = useCombinedRefs([validityRef, inputRef]);

  useEffect(() => {
    const isNativelyInvalid = !validityRef.current?.validity.valid;
    setHasInvalidIcon(isNativelyInvalid || isInvalid);
  }, [value, isInvalid]);

  // Calculate the auto size width of the input
  const widthStyle = useMemo(() => {
    if (!autoSize) return undefined;

    // Calculate the number of characters to show (dynamic based on user input)
    // Uses the min/max char length as a max, then add an extra UX buffer of 1
    const maxChars = Math.max(String(min).length, String(max).length) + 1;
    const inputCharWidth = Math.min(String(value).length, maxChars);

    // Calculate the form padding based on `compressed` state
    const { controlPadding, controlCompressedPadding } =
      euiFormVariables(euiTheme);
    const inputPadding = compressed ? controlCompressedPadding : controlPadding;

    // Calculate the invalid icon (if being displayed), also based on `compressed` state
    const invalidIconWidth = hasInvalidIcon
      ? euiTheme.euiTheme.base * (compressed ? 1.125 : 1.375) // TODO: DRY this out once EuiFormControlLayoutIcons is converted to Emotion
      : 0;

    // Guesstimate a width for the stepper. Note that it's a little wider in FF than it is in Chrome
    const stepperWidth = 2;

    return logicalStyles({
      width: `calc(${inputPadding} + ${inputCharWidth}ch + ${stepperWidth}em + ${invalidIconWidth}px)`,
    });
  }, [autoSize, euiTheme, compressed, hasInvalidIcon, min, max, value]);

  return (
    <EuiFieldNumber
      name={name}
      className={`euiRangeInput euiRangeInput--${side}`}
      css={cssStyles}
      min={Number(min)}
      max={Number(max)}
      step={step}
      value={value === '' ? '' : Number(value)}
      inputRef={setRefs}
      isInvalid={isInvalid}
      disabled={disabled}
      compressed={compressed}
      onChange={onChange}
      style={widthStyle}
      fullWidth={fullWidth}
      {...rest}
    />
  );
};
