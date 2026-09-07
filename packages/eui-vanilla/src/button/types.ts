/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export {
  BUTTON_COLORS,
  BUTTON_DISPLAYS,
  BUTTON_DISPLAY_SIZES as BUTTON_SIZES,
} from '../../../eui/src/global_styling/mixins/_button_constants';
import type {
  _EuiButtonColor,
  _EuiButtonDisplay,
  _EuiButtonDisplaySize,
} from '../../../eui/src/global_styling/mixins/_button_constants';
import type { EuiHtmlMounted } from '../mount';

export type EuiHtmlButtonColor = _EuiButtonColor;
export type EuiHtmlButtonSize = _EuiButtonDisplaySize;
export type EuiHtmlButtonDisplay = _EuiButtonDisplay;

export type EuiHtmlButtonProps = {
  label: string;
  color?: EuiHtmlButtonColor;
  size?: EuiHtmlButtonSize;
  /**
   * `fill` maps to EuiButton's `fill` prop. `empty` is EuiButtonEmpty.
   */
  display?: EuiHtmlButtonDisplay;
  fill?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  /**
   * Native `disabled` becomes `aria-disabled` so the control stays focusable.
   */
  hasAriaDisabled?: boolean;
  isLoading?: boolean;
  isSelected?: boolean;
  fullWidth?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  className?: string;
  onClick?: (event: MouseEvent) => void;
};

export type EuiHtmlMountedButton = EuiHtmlMounted<EuiHtmlButtonProps>;
