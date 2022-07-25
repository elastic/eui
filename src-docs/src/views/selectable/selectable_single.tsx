import React, { useState } from 'react';

import {
  EuiSwitch,
  EuiSpacer,
  EuiSelectable,
  EuiSelectableOption,
} from '../../../../src';

export default () => {
  const [options, setOptions] = useState<EuiSelectableOption[]>([
    {
      label: 'Titan',
      'data-test-subj': 'titanOption',
      checked: 'on',
    },
    {
      label: 'Enceladus is disabled',
      disabled: true,
    },
    {
      label: 'Mimas',
    },
    {
      label: 'Dione',
    },
    {
      label: 'Iapetus',
    },
    {
      label: 'Phoebe',
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

  const [always, setAlways] = useState(true);

  return (
    <>
      <EuiSwitch
        label="Show as 'always'"
        checked={always}
        onChange={(e) => setAlways(e.target.checked)}
      />
      <EuiSpacer />
      <EuiSelectable
        aria-label="Single selection example"
        options={options}
        onChange={(newOptions) => setOptions(newOptions)}
        singleSelection={always ? 'always' : true}
        listProps={{ bordered: true }}
      >
        {(list) => list}
      </EuiSelectable>
    </>
  );
};
