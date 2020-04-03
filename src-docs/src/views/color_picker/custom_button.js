import React, { Fragment, useState } from 'react';

import {
  EuiColorPicker,
  EuiFormRow,
  EuiColorPickerSwatch,
  EuiBadge,
  EuiSpacer,
} from '../../../../src/components';

import { useColorPickerState } from '../../../../src/services';

export const CustomButton = () => {
  const [color, setColor, errors] = useColorPickerState('');
  const [selectedColor, setSelectedColor] = useState(color);
  const handleColorChange = (text, { hex, isValid }) => {
    setColor(text, { hex, isValid });
    setSelectedColor(hex);
  };
  return (
    <Fragment>
      <EuiFormRow label="Pick a color" error={errors}>
        <EuiColorPicker
          onChange={handleColorChange}
          color={color}
          button={
            <EuiColorPickerSwatch
              color={selectedColor}
              aria-label="Select a new color"
            />
          }
        />
      </EuiFormRow>
      <EuiSpacer />
      <EuiColorPicker
        onChange={handleColorChange}
        color={color}
        isInvalid={!!errors}
        button={
          <EuiBadge
            color={selectedColor ? selectedColor : 'hollow'}
            onClickAriaLabel="Select a new color">
            Color this badge
          </EuiBadge>
        }
      />
    </Fragment>
  );
};
