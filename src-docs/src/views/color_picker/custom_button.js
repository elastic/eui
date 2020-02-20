import React, { Fragment } from 'react';

import {
  EuiColorPicker,
  EuiFormRow,
  EuiColorPickerSwatch,
  EuiBadge,
  EuiSpacer,
} from '../../../../src/components';

import { useColorPicker } from './utils';

export const CustomButton = () => {
  const [color, setColor, errors] = useColorPicker('');
  return (
    <Fragment>
      <EuiFormRow label="Pick a color" error={errors}>
        <EuiColorPicker
          onChange={setColor}
          color={color}
          button={
            <EuiColorPickerSwatch
              color={color}
              aria-label="Select a new color"
            />
          }
        />
      </EuiFormRow>
      <EuiSpacer />
      <EuiColorPicker
        onChange={setColor}
        color={color}
        isInvalid={!!errors}
        button={
          <EuiBadge
            color={color ? color : 'hollow'}
            onClickAriaLabel="Select a new color">
            Color this badge
          </EuiBadge>
        }
      />
    </Fragment>
  );
};
