import React, { useState } from 'react';

import { EuiComboBox, EuiFormRow } from '../../../../src/components';

const isValid = (value) => {
  // Only allow letters. No spaces, numbers, or special characters.
  return value.match(/^[a-zA-Z]+$/) !== null;
};

export default () => {
  const [selectedOptions, setSelected] = useState([]);
  const [isInvalid, setInvalid] = useState(false);

  const onCreateOption = (searchValue) => {
    if (!isValid(searchValue)) {
      // Return false to explicitly reject the user's input.
      return false;
    }

    const newOption = {
      label: searchValue,
    };

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  const onSearchChange = (searchValue) => {
    if (!searchValue) {
      setInvalid(false);

      return;
    }

    setInvalid(!isValid(searchValue));
  };

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    setInvalid(false);
  };

  return (
    <EuiFormRow
      label="Only custom options"
      isInvalid={isInvalid}
      error={isInvalid ? 'Only letters are allowed' : undefined}
    >
      <EuiComboBox
        noSuggestions
        placeholder="Create some tags (letters only)"
        selectedOptions={selectedOptions}
        onCreateOption={onCreateOption}
        onChange={onChange}
        onSearchChange={onSearchChange}
        isInvalid={isInvalid}
      />
    </EuiFormRow>
  );
};
