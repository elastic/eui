import React, { useState } from 'react';

import { EuiComboBox } from '../../../../src/components';

export default () => {
  const [options, updateOptions] = useState([
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

  const [selectedOptions, setSelected] = useState([options[2], options[4]]);

  const onChange = selectedOptions => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions) => {
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
        option => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      updateOptions([...options, newOption]);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  return (
    <EuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
      isClearable={true}
      isDisabled
    />
  );
};
