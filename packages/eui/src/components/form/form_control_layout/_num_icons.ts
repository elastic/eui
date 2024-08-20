/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  isIconShape,
  type EuiFormControlLayoutIconsProps,
} from './form_control_layout_icons';

export const isRightSideIcon = (
  icon?: EuiFormControlLayoutIconsProps['icon']
): boolean => {
  return !!icon && isIconShape(icon) && icon.side === 'right';
};

export const getIconAffordanceStyles = ({
  icon,
  clear,
  isLoading,
  isInvalid,
  isDropdown,
}: {
  icon?: EuiFormControlLayoutIconsProps['icon'];
  clear?: EuiFormControlLayoutIconsProps['clear'] | boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  isDropdown?: boolean;
}) => {
  const cssVariables = {
    '--euiFormControlLeftIconsCount': 0,
    '--euiFormControlRightIconsCount': 0,
  };

  if (icon) {
    if (isRightSideIcon(icon)) {
      cssVariables['--euiFormControlRightIconsCount']++;
    } else {
      cssVariables['--euiFormControlLeftIconsCount']++;
    }
  }

  if (clear) cssVariables['--euiFormControlRightIconsCount']++;
  if (isLoading) cssVariables['--euiFormControlRightIconsCount']++;
  if (isInvalid) cssVariables['--euiFormControlRightIconsCount']++;
  if (isDropdown) cssVariables['--euiFormControlRightIconsCount']++;

  const filtered = Object.entries(cssVariables).filter(
    ([, count]) => count > 0
  );
  return filtered.length ? Object.fromEntries(filtered) : undefined;
};
