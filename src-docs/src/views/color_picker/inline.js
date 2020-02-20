import React from 'react';

import { EuiColorPicker } from '../../../../src/components';
import { useColorPicker } from './utils';

export const Inline = () => {
  const [color, setColor, errors] = useColorPicker('#D36086');
  return (
    <EuiColorPicker
      onChange={setColor}
      color={color}
      isInvalid={!!errors}
      display="inline"
    />
  );
};
