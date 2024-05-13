import React, { useState } from 'react';

import {
  EuiSelectable,
  EuiSelectableOption,
  EuiButton,
  EuiSpacer,
} from '../../../../src';

const initialOptions: EuiSelectableOption[] = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
    checked: 'mixed',
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
];

export default () => {
  const [options, setOptions] = useState(initialOptions);

  return (
    <>
      <EuiSelectable
        aria-label="Example of Selectable supporting mixed state"
        options={options}
        onChange={(newOptions) => setOptions(newOptions)}
      >
        {(list) => list}
      </EuiSelectable>
      <EuiSpacer size="s" />
      <EuiButton onClick={() => setOptions(initialOptions)}>
        Reset mixed options
      </EuiButton>
    </>
  );
};
