import React, { useState } from 'react';

import {
  EuiComboBox,
  EuiComboBoxOptionOption,
} from '../../../../src/components';

const options: Array<EuiComboBoxOptionOption<string>> = [
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
];
export default () => {
  const [selectedOptions, setSelected] = useState([options[2]]);

  const onChange = (
    selectedOptions: Array<EuiComboBoxOptionOption<string>>
  ) => {
    setSelected(selectedOptions);
  };

  return (
    <EuiComboBox
      aria-label="Example of combobox options with tooltips"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      isClearable={true}
    />
  );
};
