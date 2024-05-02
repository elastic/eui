import React, { useState } from 'react';

import { EuiSelectable, EuiSelectableOption } from '../../../../src';

export default () => {
  const [options, setOptions] = useState<EuiSelectableOption[]>([
    {
      label: 'Titan',
      'data-test-subj': 'titanOption',
      toolTipContent: 'Lorem ipsum',
    },
    {
      label: 'Enceladus is disabled',
      disabled: true,
      toolTipContent: 'Lorem ipsum',
    },
    {
      label: 'Mimas',
      checked: 'on',
      toolTipContent: 'Lorem ipsum',
    },
    {
      label: 'Dione',
      toolTipContent: 'Lorem ipsum',
      toolTipProps: { position: 'bottom' },
    },
    {
      label: 'Iapetus',
      checked: 'on',
      toolTipContent: 'Lorem ipsum',
    },
    {
      label: 'Phoebe',
      toolTipContent: 'Lorem ipsum',
    },
    {
      label: 'Rhea',
      toolTipContent: 'Lorem ipsum',
    },
    {
      label:
        "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
      toolTipContent: 'Lorem ipsum',
    },
    {
      label: 'Tethys',
      toolTipContent: 'Lorem ipsum',
    },
    {
      label: 'Hyperion',
      toolTipContent: 'Lorem ipsum',
    },
  ]);

  return (
    <EuiSelectable
      aria-label="Basic example"
      options={options}
      listProps={{ bordered: true }}
      onChange={(newOptions) => setOptions(newOptions)}
    >
      {(list) => list}
    </EuiSelectable>
  );
};
