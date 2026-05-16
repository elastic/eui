/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { RenderWithEuiStylesMemoizer } from '../../../services';
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

export const EuiFormControlLayoutIcons = ({
  side = 'left',
  iconsPosition = 'absolute',
  compressed,
  isDisabled,
  icon,
  clear,
  isLoading,
  isInvalid,
  isDropdown,
}: EuiFormControlLayoutIconsProps) => {
  return (
    <RenderWithEuiStylesMemoizer>
      {(stylesMemoizer) => {
        const styles = stylesMemoizer(euiFormControlLayoutIconsStyles);
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
            <ClearButton clear={clear} isDisabled={isDisabled} />
            <LoadingSpinner isLoading={isLoading} />
            <InvalidIcon isInvalid={isInvalid} />
            <CustomIcon icon={icon} isDisabled={isDisabled} />
            <DropdownIcon isDropdown={isDropdown} isDisabled={isDisabled} />
          </div>
        );
      }}
    </RenderWithEuiStylesMemoizer>
  );
};

const CustomIcon = ({
  icon,
  isDisabled,
}: Pick<EuiFormControlLayoutIconsProps, 'icon' | 'isDisabled'>) => {
  if (!icon) {
    return null;
  }

  // Normalize the icon to an object if it's a string.
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

const DropdownIcon = ({
  isDropdown,
  isDisabled,
}: Pick<EuiFormControlLayoutIconsProps, 'isDropdown' | 'isDisabled'>) => {
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

const LoadingSpinner = ({
  isLoading,
}: Pick<EuiFormControlLayoutIconsProps, 'isLoading'>) => {
  if (!isLoading) {
    return null;
  }

  return <EuiLoadingSpinner size="m" />;
};

const ClearButton = ({
  clear,
  isDisabled,
}: Pick<EuiFormControlLayoutIconsProps, 'clear' | 'isDisabled'>) => {
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

const InvalidIcon = ({
  isInvalid,
}: Pick<EuiFormControlLayoutIconsProps, 'isInvalid'>) => {
  if (!isInvalid) {
    return null;
  }

  return <EuiIcon size="m" color="danger" type="warning" />;
};
