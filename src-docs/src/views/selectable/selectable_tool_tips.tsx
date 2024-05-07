import React, { useState } from 'react';

import { EuiSelectable, EuiSelectableOption } from '../../../../src';

export default () => {
  const [options, setOptions] = useState<EuiSelectableOption[]>([
    {
      label: 'Titan',
      toolTipContent:
        'Titan is the largest moon of Saturn and the second-largest in the Solar System',
    },
    {
      label: 'Pandora',
      toolTipContent:
        "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    },
    {
      label: 'Iapetus',
      toolTipContent: "Iapetus is the outermost of Saturn's large moons",
      toolTipProps: { position: 'bottom' },
    },
  ]);

  return (
    <EuiSelectable
      aria-label="Example with option tooltips"
      options={options}
      listProps={{ bordered: true, style: { maxInlineSize: 400 } }}
      onChange={(newOptions) => setOptions(newOptions)}
    >
      {(list) => list}
    </EuiSelectable>
  );
};
