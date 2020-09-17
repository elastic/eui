import React, { useState } from 'react';

import { EuiComboBox } from '../../../../src/components';

const optionsStatic = [
  {
    label: 'Titan',
    id: 'titan1',
  },
  {
    label: 'Titan',
    id: 'titan2',
  },
  {
    label: 'Enceladus is disabled',
    disabled: true,
  },
  {
    label: 'Titan',
    id: 'titan3',
  },
  {
    label: 'Dione',
  },
];
export default () => {
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState([options[2], options[4]]);

  const onChange = selectedOptions => {
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
        option => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <EuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
      isClearable={true}
      data-test-subj="demoComboBox"
    />
  );
};
