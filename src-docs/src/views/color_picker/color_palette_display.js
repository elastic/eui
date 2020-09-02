import React, { useState } from 'react';
import { euiPaletteColorBlind } from '../../../../src/services';

import {
  EuiSwitch,
  EuiSpacer,
  EuiCode,
  EuiColorPaletteDisplay,
} from '../../../../src/components/';

export default () => {
  const [selectionType, setSelectionType] = useState(false);

  return (
    <>
      <EuiSwitch
        label={
          <span>
            Display selected item as a <EuiCode>fixed</EuiCode>
          </span>
        }
        checked={selectionType}
        onChange={() => setSelectionType(!selectionType)}
      />
      <EuiSpacer />

      <EuiColorPaletteDisplay
        type={selectionType ? 'fixed' : 'gradient'}
        palette={euiPaletteColorBlind()}
      />
    </>
  );
};
