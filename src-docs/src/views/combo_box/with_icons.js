import React, { useState } from 'react';

import { EuiComboBox } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

const optionsStatic = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
    icon: 'logoSlack',
  },
  {
    label: 'Enceladus',
    icon: 'logoElastic',
  },
  {
    label: 'Mimas',
    icon: 'logoElastic',
  },
  {
    label: 'Dione',
    icon: 'logoElastic',
  },
  {
    label: 'Iapetus',
    icon: 'logoElastic',
  },
  {
    label: 'Phoebe',
    icon: 'logoSlack',
  },
];

export default () => {
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState([options[0], options[1]]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions = []) => {
    if (!searchValue) {
      return;
    }

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
    setSelected((prevSelected) => [...prevSelected, newOption]);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canDisabled={false} canReadOnly={false} canIsDisabled>
      <EuiComboBox
        aria-label="Accessible screen reader label"
        placeholder="Select or create options"
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onCreateOption={onCreateOption}
        isDisabled
      />
    </DisplayToggles>
  );
};
