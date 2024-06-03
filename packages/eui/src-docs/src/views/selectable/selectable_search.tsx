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
    },
    {
      label: 'Iapetus',
      checked: 'on',
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
      aria-label="Searchable example"
      searchable
      searchProps={{
        'data-test-subj': 'selectableSearchHere',
      }}
      options={options}
      onChange={(newOptions) => setOptions(newOptions)}
    >
      {(list, search) => (
        <>
          {search}
          {list}
        </>
      )}
    </EuiSelectable>
  );
};
