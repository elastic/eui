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

export default () => {
  const [allOptions, setAllOptions] = useState([colorGroup, soundGroup]);
  const [selectedOptions, setSelected] = useState([
    colorGroup.options[2],
    soundGroup.options[3],
  ]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue) => {
    const newOption = {
      label: searchValue,
    };

    setAllOptions((allOptions) => {
      const [colors, sounds, custom = { label: 'Custom', options: [] }] =
        allOptions;
      return [
        colors,
        sounds,
        {
          ...custom,
          options: [...custom.options, newOption],
        },
      ];
    });

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  return (
    <EuiComboBox
      aria-label="EuiComboBox example with groups"
      placeholder="These options are grouped"
      options={allOptions}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
    />
  );
};
