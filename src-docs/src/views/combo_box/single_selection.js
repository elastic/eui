import React, { useState } from 'react';

import { EuiComboBox } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

const options = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
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
];

export default () => {
  const [selectedOptions, setSelected] = useState([options[2]]);

  const onChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelected(selectedOptions);
  };

  return (
    <DisplayToggles
      canDisabled={false}
      canReadOnly={false}
      canLoading={false}
      canPrepend={false}
      canIsDisabled
      canAppend
    >
      <EuiComboBox
        placeholder="Select a single option"
        singleSelection={{ asPlainText: true }}
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        isDisabled
      />
    </DisplayToggles>
  );
};
