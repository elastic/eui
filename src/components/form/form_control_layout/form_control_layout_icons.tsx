/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Fragment, Component } from 'react';

import { EuiLoadingSpinner } from '../../loading';
import {
  EuiFormControlLayoutClearButton,
  EuiFormControlLayoutClearButtonProps,
} from './form_control_layout_clear_button';
import {
  EuiFormControlLayoutCustomIcon,
  EuiFormControlLayoutCustomIconProps,
} from './form_control_layout_custom_icon';
import { IconType } from '../../icon';
import { DistributiveOmit } from '../../common';

export const ICON_SIDES: ['left', 'right'] = ['left', 'right'];

type IconShape = DistributiveOmit<
  EuiFormControlLayoutCustomIconProps,
  'type' | 'iconRef'
> & {
  type: IconType;
  side?: typeof ICON_SIDES[number];
  ref?: EuiFormControlLayoutCustomIconProps['iconRef'];
};

function isIconShape(
  icon: EuiFormControlLayoutIconsProps['icon']
): icon is IconShape {
  return !!icon && icon.hasOwnProperty('type');
}

export interface EuiFormControlLayoutIconsProps {
  icon?: IconType | IconShape;
  clear?: EuiFormControlLayoutClearButtonProps;
  isLoading?: boolean;
  compressed?: boolean;
}

export class EuiFormControlLayoutIcons extends Component<
  EuiFormControlLayoutIconsProps
> {
  render() {
    const { icon } = this.props;
    const iconSide = isIconShape(icon) && icon.side ? icon.side : 'left';
    const customIcon = this.renderCustomIcon();
    const loadingSpinner = this.renderLoadingSpinner();
    const clearButton = this.renderClearButton();

    let leftIcons;

    if (customIcon && iconSide === 'left') {
      leftIcons = <div className="euiFormControlLayoutIcons">{customIcon}</div>;
    }

    let rightIcons;

    // If the icon is on the right, it should be placed after the clear button in the DOM.
    if (clearButton || loadingSpinner || (customIcon && iconSide === 'right')) {
      rightIcons = (
        <div className="euiFormControlLayoutIcons euiFormControlLayoutIcons--right">
          {clearButton}
          {loadingSpinner}
          {iconSide === 'right' ? customIcon : undefined}
        </div>
      );
    }

    return (
      <Fragment>
        {leftIcons}
        {rightIcons}
      </Fragment>
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

  renderLoadingSpinner() {
    const { isLoading } = this.props;

    if (!isLoading) {
      return null;
    }

    return <EuiLoadingSpinner size="m" />;
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
}
