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
import { Omit } from '../../common';

export const ICON_SIDES: ['left', 'right'] = ['left', 'right'];

type IconShape = Partial<
  Omit<EuiFormControlLayoutCustomIconProps, 'type' | 'iconRef'>
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
    const { icon } = this.props;

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

    return <EuiFormControlLayoutCustomIcon iconRef={iconRef} {...iconRest} />;
  }

  renderLoadingSpinner() {
    const { isLoading } = this.props;

    if (!isLoading) {
      return null;
    }

    return <EuiLoadingSpinner size="m" />;
  }

  renderClearButton() {
    const { clear } = this.props;

    if (!clear) {
      return null;
    }

    return <EuiFormControlLayoutClearButton {...clear} />;
  }
}
