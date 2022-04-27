import { Fragment } from 'react';

import {
  EuiColorPicker,
  EuiColorStops,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

import {
  useColorPickerState,
  useColorStopsState,
} from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState('#D36086');
  const [colorStops, setColorStops] = useColorStopsState();

  return (
    <Fragment>
      <EuiFormRow label="Pick a swatch" isInvalid={!!errors} error={errors}>
        <EuiColorPicker
          mode="swatch"
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </EuiFormRow>
      <EuiFormRow label="Pick a color" isInvalid={!!errors} error={errors}>
        <EuiColorPicker
          mode="picker"
          onChange={setColor}
          color={color}
          isInvalid={!!errors}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Set stops with swatches">
        <EuiColorStops
          label="Set stops with swatches"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="swatch"
        />
      </EuiFormRow>

      <EuiFormRow label="Set stops with picker">
        <EuiColorStops
          label="Set stops with picker"
          onChange={setColorStops}
          colorStops={colorStops}
          min={0}
          max={100}
          mode="picker"
        />
      </EuiFormRow>
    </Fragment>
  );
};
