import React, { useMemo } from 'react';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';

import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor, errors] = useColorPickerState();
  const isInvalid = useMemo(() => color !== '' && !!errors, [color, errors]);

  return (
    <React.Fragment>
      <EuiFormRow label="Pick a color" isInvalid={isInvalid} error={errors}>
        <EuiColorPicker
          onChange={setColor}
          color={color}
          isInvalid={isInvalid}
          placeholder="Auto"
          isClearable={true}
        />
      </EuiFormRow>
    </React.Fragment>
  );
};
