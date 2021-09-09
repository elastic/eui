import React, { Fragment, useState } from 'react';

import {
  EuiColorPicker,
  EuiFormRow,
  EuiColorPickerSwatch,
  EuiBadge,
  EuiSpacer,
} from '../../../../src/components';

import { useColorPickerState } from '../../../../src/services';

export default () => {
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
          secondaryInputDisplay="top"
          button={
            <EuiColorPickerSwatch
              color={selectedColor}
              aria-label="Select a new color"
            />
          }
          isClearable={true}
        />
      </EuiFormRow>
      <EuiSpacer />
      <EuiColorPicker
        onChange={handleColorChange}
        color={color}
        isInvalid={!!errors}
        secondaryInputDisplay="bottom"
        button={
          <EuiBadge
            color={selectedColor ? selectedColor : 'hollow'}
            onClickAriaLabel="Select a new color"
          >
            Color this badge
          </EuiBadge>
        }
      />
    </Fragment>
  );
};
