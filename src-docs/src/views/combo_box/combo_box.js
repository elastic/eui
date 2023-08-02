import React, { useState } from 'react';

import { EuiComboBox, EuiSwitch } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

const optionsStatic = [
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
];
export default () => {
  const [options, setOptions] = useState(optionsStatic);
  const [canTruncate, setCanTruncate] = useState(false);
  const [selectedOptions, setSelected] = useState([options[2], options[4]]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions = []) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canDisabled={false}
      canReadOnly={false}
      canIsDisabled
      extras={[
        <EuiSwitch
          compressed
          label={'middle truncation'}
          checked={canTruncate}
          onChange={(e) => setCanTruncate(e.target.checked)}
        />,
      ]}
    >
      <EuiComboBox
        aria-label="Accessible screen reader label"
        placeholder="Select or create options"
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onCreateOption={onCreateOption}
        isClearable={true}
        data-test-subj="demoComboBox"
        autoFocus
        truncation={canTruncate ? 'middle' : undefined}
      />
    </DisplayToggles>
  );
};
