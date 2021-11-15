import React, { useState } from 'react';

import { EuiComboBox } from '../../../../src/components';

const colorGroup = {
  label: 'Colors',
  options: [
    {
      label: 'Red',
    },
    {
      label: 'Blue',
    },
    {
      label: 'Yellow',
    },
    {
      label: 'Green',
    },
  ],
};

const soundGroup = {
  label: 'Sounds',
  options: [
    {
      label: 'Pop',
    },
    {
      label: 'Hiss',
    },
    {
      label: 'Screech',
    },
    {
      label: 'Ding',
    },
  ],
};

const allOptionsStatic = [colorGroup, soundGroup];

export default () => {
  const [allOptions, setAllOptions] = useState(allOptionsStatic);
  const [selectedOptions, setSelected] = useState([
    colorGroup.options[2],
    soundGroup.options[3],
  ]);

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
      if (allOptions[allOptions.length - 1].label !== 'Custom') {
        setAllOptions([
          ...allOptions,
          {
            label: 'Custom',
            options: [],
          },
        ]);
      }
      const [colors, sounds, custom] = allOptions;
      setAllOptions([
        colors,
        sounds,
        {
          ...custom,
          options: [...custom.options, newOption],
        },
      ]);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  return (
    <EuiComboBox
      aria-label="Accessible screen reader label"
      placeholder="These options are grouped"
      options={allOptions}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
    />
  );
};
