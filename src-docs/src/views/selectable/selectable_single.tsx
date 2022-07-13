import React, { useState } from 'react';

import {
  EuiSelectable,
  EuiSelectableOption,
} from '../../../../src/components/selectable';

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

  return (
    <EuiSelectable
      aria-label="Single selection example"
      options={options}
      onChange={(newOptions) => setOptions(newOptions)}
      singleSelection={true}
      listProps={{ bordered: true }}
    >
      {(list) => list}
    </EuiSelectable>
  );
};
