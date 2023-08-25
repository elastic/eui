import React from 'react';

import { EuiColorPicker } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

import { useColorPickerState } from '../../../../src/services';

export default () => {
  const [color, setColor] = useColorPickerState('#D36086');

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canLoading={false} canPrepend canAppend canClear>
      <EuiColorPicker color={color} onChange={setColor} />
    </DisplayToggles>
  );
};
