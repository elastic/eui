/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component } from 'react';
import classNames from 'classnames';

import { EuiLoadingSpinner } from '../../loading';
import {
  EuiFormControlLayoutClearButton,
  EuiFormControlLayoutClearButtonProps,
} from './form_control_layout_clear_button';
import {
  EuiFormControlLayoutCustomIcon,
  EuiFormControlLayoutCustomIconProps,
} from './form_control_layout_custom_icon';
import { EuiIcon, IconColor, IconType } from '../../icon';
import { DistributiveOmit } from '../../common';

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

function isIconShape(
  icon: EuiFormControlLayoutIconsProps['icon']
): icon is IconShape {
  return !!icon && icon.hasOwnProperty('type');
}

export interface EuiFormControlLayoutIconsProps {
  icon?: IconType | IconShape;
  side?: (typeof ICON_SIDES)[number];
  iconsPosition?: 'absolute' | 'static';
  clear?: EuiFormControlLayoutClearButtonProps;
  isLoading?: boolean;
  isInvalid?: boolean;
  isDropdown?: boolean;
  compressed?: boolean;
}

export class EuiFormControlLayoutIcons extends Component<EuiFormControlLayoutIconsProps> {
  render() {
    const { side = 'left', iconsPosition = 'absolute' } = this.props;

    const customIcon = this.renderCustomIcon();
    const loadingSpinner = this.renderLoadingSpinner();
    const clearButton = this.renderClearButton();
    const invalidIcon = this.renderInvalidIcon();
    const dropdownIcon = this.renderDropdownIcon();

    const classes = classNames(
      'euiFormControlLayoutIcons',
      `euiFormControlLayoutIcons--${side}`,
      `euiFormControlLayoutIcons--${iconsPosition}`
    );

    return (
      <div className={classes}>
        {clearButton}
        {loadingSpinner}
        {invalidIcon}
        {customIcon}
        {dropdownIcon}
      </div>
    );
  }

  renderCustomIcon() {
    const { icon, compressed } = this.props;

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
        size={compressed ? 's' : 'm'}
        iconRef={iconRef}
        {...iconRest}
      />
    );
  }

  renderDropdownIcon() {
    const { isDropdown, compressed } = this.props;

    if (!isDropdown) {
      return null;
    }

    return (
      <EuiFormControlLayoutCustomIcon
        size={compressed ? 's' : 'm'}
        type="arrowDown"
      />
    );
  }

  renderLoadingSpinner() {
    const { isLoading, compressed } = this.props;

    if (!isLoading) {
      return null;
    }

    return <EuiLoadingSpinner size={compressed ? 's' : 'm'} />;
  }

  renderClearButton() {
    const { clear, compressed } = this.props;
    if (!clear) {
      return null;
    }

    return (
      <EuiFormControlLayoutClearButton
        size={compressed ? 's' : 'm'}
        {...clear}
      />
    );
  }

  renderInvalidIcon() {
    const { isInvalid, compressed } = this.props;
    if (!isInvalid) {
      return null;
    }

    return (
      <EuiIcon size={compressed ? 's' : 'm'} color="danger" type="warning" />
    );
  }
}
