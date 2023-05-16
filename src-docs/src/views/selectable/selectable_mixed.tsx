import React, { useState } from 'react';

import { EuiSelectable, EuiSelectableOption } from '../../../../src';

export default () => {
  const [options, setOptions] = useState<EuiSelectableOption[]>([
    {
      label: 'Titan',
      'data-test-subj': 'titanOption',
    },
    {
      label: 'Enceladus is disabled',
      disabled: true,
    },
    {
      label: 'Mimas',
      checked: 'on',
    },
    {
      label: 'Dione',
      checked: 'mixed',
    },
    {
      label: 'Iapetus',
      checked: 'off',
    },
    {
      label: 'Phoebe',
      checked: 'mixed',
    },
    {
      label: 'Rhea',
    },
    {
      label:
        "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    },
    {
      label: 'Tethys',
    },
    {
      label: 'Hyperion',
    },
  ]);

  return (
    <EuiSelectable
      aria-label="Example of Selectable supporting mixed state"
      allowExclusions
      options={options}
      onChange={(newOptions) => setOptions(newOptions)}
    >
      {(list) => list}
    </EuiSelectable>
  );
};
