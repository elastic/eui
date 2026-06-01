/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';

import { useEuiMemoizedStyles } from '../../../services';
import { DistributiveOmit } from '../../common';
import { EuiIcon, IconColor, IconType } from '../../icon';
import { EuiLoadingSpinner } from '../../loading';

import {
  EuiFormControlLayoutClearButton,
  EuiFormControlLayoutClearButtonProps,
} from './form_control_layout_clear_button';
import {
  EuiFormControlLayoutCustomIcon,
  EuiFormControlLayoutCustomIconProps,
} from './form_control_layout_custom_icon';
import { euiFormControlLayoutIconsStyles } from './form_control_layout_icons.styles';

export const ICON_SIDES = ['left', 'right'] as const;

export type IconShape = DistributiveOmit<
  EuiFormControlLayoutCustomIconProps,
  'type' | 'iconRef'
> & {
  type: IconType;
  side?: (typeof ICON_SIDES)[number];
  color?: IconColor;
  ref?: EuiFormControlLayoutCustomIconProps['iconRef'];
};

export const isIconShape = (
  icon: EuiFormControlLayoutIconsProps['icon']
): icon is IconShape => {
  return !!icon && icon.hasOwnProperty('type');
};

export interface EuiFormControlLayoutIconsProps {
  icon?: IconType | IconShape;
  side?: (typeof ICON_SIDES)[number];
  iconsPosition?: 'absolute' | 'static';
  clear?: EuiFormControlLayoutClearButtonProps;
  isLoading?: boolean;
  isInvalid?: boolean;
  isDropdown?: boolean;
  compressed?: boolean;
  isDisabled?: boolean;
}

const renderCustomIcon = (
  icon: EuiFormControlLayoutIconsProps['icon'],
  isDisabled?: boolean
): ReactNode => {
  if (!icon) {
    return null;
  }

  const iconProps: IconShape = isIconShape(icon)
    ? icon
    : {
        type: icon,
      };
  const { ref: iconRef, side, ...iconRest } = iconProps;

  return (
    <EuiFormControlLayoutCustomIcon
      size="m"
      disabled={isDisabled}
      iconRef={iconRef}
      {...iconRest}
    />
  );
};

const renderDropdownIcon = (
  isDropdown?: boolean,
  isDisabled?: boolean
): ReactNode => {
  if (!isDropdown) {
    return null;
  }

  return (
    <EuiFormControlLayoutCustomIcon
      size="m"
      disabled={isDisabled}
      type="chevronSingleDown"
    />
  );
};

const renderLoadingSpinner = (isLoading?: boolean): ReactNode => {
  if (!isLoading) {
    return null;
  }

  return <EuiLoadingSpinner size="m" />;
};

const renderClearButton = (
  clear?: EuiFormControlLayoutClearButtonProps,
  isDisabled?: boolean
): ReactNode => {
  if (!clear) {
    return null;
  }

  return (
    <EuiFormControlLayoutClearButton
      size="m"
      disabled={isDisabled}
      {...clear}
    />
  );
};

const renderInvalidIcon = (isInvalid?: boolean): ReactNode => {
  if (!isInvalid) {
    return null;
  }

  return <EuiIcon size="m" color="danger" type="warning" aria-hidden={true} />;
};

export const EuiFormControlLayoutIcons: FunctionComponent<
  EuiFormControlLayoutIconsProps
> = (props) => {
  const {
    side = 'left',
    iconsPosition = 'absolute',
    compressed,
    isDisabled,
    icon,
    isLoading,
    isInvalid,
    isDropdown,
  } = props;

  const customIcon = renderCustomIcon(icon, isDisabled);
  const loadingSpinner = renderLoadingSpinner(isLoading);
  const clearButton = renderClearButton(props.clear, isDisabled);
  const invalidIcon = renderInvalidIcon(isInvalid);
  const dropdownIcon = renderDropdownIcon(isDropdown, isDisabled);

  const styles = useEuiMemoizedStyles(euiFormControlLayoutIconsStyles);
  const cssStyles = [
    styles.euiFormControlLayoutIcons,
    compressed ? styles.compressed : styles.uncompressed,
    ...(iconsPosition === 'absolute'
      ? [
          styles.position.absolute.absolute,
          compressed
            ? styles.position.absolute.compressed[side]
            : styles.position.absolute.uncompressed[side],
        ]
      : [
          styles.position.static.static,
          compressed
            ? styles.position.static.compressed
            : styles.position.static.uncompressed,
        ]),
    isDisabled && styles.disabled,
  ];

  return (
    <div css={cssStyles} className="euiFormControlLayoutIcons">
      {clearButton}
      {loadingSpinner}
      {invalidIcon}
      {customIcon}
      {dropdownIcon}
    </div>
  );
};
