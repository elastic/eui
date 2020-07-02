import React, { useMemo } from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';

import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState();
  const isInvalid = useMemo(() => color !== '' && !!errors, [color, errors]);

  const customSwatches = ['#333', '#666', '#999', '#CCC'];

  return (
    <React.Fragment>
      <EuiFormRow label="Pick a color" isInvalid={isInvalid} error={errors}>
        <EuiColorPicker
          onChange={setColor}
          color={color}
          isInvalid={isInvalid}
          swatches={customSwatches}
          placeholder="Auto"
          isClearable={true}
        />
      </EuiFormRow>
    </React.Fragment>
  );
};
