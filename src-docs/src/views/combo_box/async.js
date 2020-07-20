import React, { useState, useEffect, useCallback } from 'react';

import { EuiComboBox } from '../../../../src/components';

const allOptions = [
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
  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  let searchTimeout;
  const onChange = selectedOptions => {
    setSelected(selectedOptions);
  };

  const onSearchChange = useCallback(searchValue => {
    setLoading(true);
    setOptions([]);

    clearTimeout(searchTimeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      setLoading(false);
      setOptions(
        allOptions.filter(option =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }, 1200);
  }, []);

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
        option => option.value.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      // Simulate creating this option on the server.
      allOptions.push(newOption);
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  useEffect(() => {
    // Simulate initial load.
    onSearchChange('');
  }, [onSearchChange]);

  return (
    <EuiComboBox
      placeholder="Search asynchronously"
      async
      options={options}
      selectedOptions={selectedOptions}
      isLoading={isLoading}
      onChange={onChange}
      onSearchChange={onSearchChange}
      onCreateOption={onCreateOption}
    />
  );
};
