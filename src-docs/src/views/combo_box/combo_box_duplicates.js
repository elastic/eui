import React, { useState } from 'react';

import { EuiComboBox } from '../../../../src/components';

const optionsStatic = [
  {
    label: 'Titan',
    key: 'titan1',
  },
  {
    label: 'Titan',
    key: 'titan2',
  },
  {
    label: 'Enceladus is disabled',
    disabled: true,
  },
  {
    label: 'Titan',
    key: 'titan3',
  },
  {
    label: 'Titan',
    key: 'titan4',
  },
  {
    label: 'Dione',
    key: 'dione1',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Dione',
    key: 'dione2',
  },
];
export default () => {
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState([options[15]]);

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
    <EuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      singleSelection={{ asPlainText: true }}
      onChange={onChange}
      onCreateOption={onCreateOption}
      isClearable={true}
      data-test-subj="demoComboBox"
    />
  );
};
