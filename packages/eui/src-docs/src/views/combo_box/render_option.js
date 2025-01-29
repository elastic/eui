import React, { useEffect, useState } from 'react';

import {
  EuiComboBox,
  EuiHighlight,
  EuiHealth,
} from '../../../../src/components';
import {
  useEuiPaletteColorBlind,
  useEuiPaletteColorBlindBehindText,
} from '../../../../src/services';

const getOptionsStatic = (visColorsBehindText) => [
  {
    value: {
      size: 5,
    },
    label: 'Titan',
    'data-test-subj': 'titanOption',
    color: visColorsBehindText[0],
  },
  {
    value: {
      size: 2,
    },
    label: 'Enceladus',
    color: visColorsBehindText[1],
  },
  {
    value: {
      size: 15,
    },
    label: 'Mimas',
    color: visColorsBehindText[2],
  },
  {
    value: {
      size: 1,
    },
    label: 'Dione',
    color: visColorsBehindText[3],
  },
  {
    value: {
      size: 8,
    },
    label: 'Iapetus',
    color: visColorsBehindText[4],
  },
  {
    value: {
      size: 2,
    },
    label: 'Phoebe',
    color: visColorsBehindText[5],
  },
  {
    value: {
      size: 33,
    },
    label: 'Rhea',
    color: visColorsBehindText[6],
  },
  {
    value: {
      size: 18,
    },
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    color: visColorsBehindText[7],
  },
  {
    value: {
      size: 9,
    },
    label: 'Tethys',
    color: visColorsBehindText[8],
  },
  {
    value: {
      size: 4,
    },
    label: 'Hyperion',
    color: visColorsBehindText[9],
  },
];

export default () => {
  const visColors = useEuiPaletteColorBlind();
  const visColorsBehindText = useEuiPaletteColorBlindBehindText();

  const [options, setOptions] = useState(getOptionsStatic(visColorsBehindText));
  const [selectedOptions, setSelected] = useState([options[2], options[5]]);

  useEffect(() => {
    const updatedOptions = getOptionsStatic(visColorsBehindText);
    setOptions(updatedOptions);
    setSelected([updatedOptions[2], updatedOptions[5]]);
  }, [visColorsBehindText]);

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
      value: searchValue,
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      options.push(newOption);
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected((prevSelected) => [...prevSelected, newOption]);
  };

  const renderOption = (option, searchValue, contentClassName) => {
    const { color, label, value } = option;
    const dotColor = visColors[visColorsBehindText.indexOf(color)];
    return (
      <EuiHealth color={dotColor}>
        <span className={contentClassName}>
          <EuiHighlight search={searchValue}>{label}</EuiHighlight>
          &nbsp;
          <span>({value.size})</span>
        </span>
      </EuiHealth>
    );
  };

  return (
    <EuiComboBox
      aria-label="Accessible screen reader label"
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
      renderOption={renderOption}
    />
  );
};
