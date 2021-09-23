import React, { useState } from 'react';

import { EuiComboBox } from '../../../../src/components';
import { euiPaletteColorBlindBehindText } from '../../../../src/services';
import { DisplayToggles } from '../form_controls/display_toggles';

const visColorsBehindText = euiPaletteColorBlindBehindText();
const optionsStatic = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
    color: visColorsBehindText[0],
  },
  {
    label: 'Enceladus',
    color: visColorsBehindText[1],
  },
  {
    label: 'Mimas',
    color: visColorsBehindText[2],
  },
  {
    label: 'Dione',
    color: visColorsBehindText[3],
  },
  {
    label: 'Iapetus',
    color: visColorsBehindText[4],
  },
  {
    label: 'Phoebe',
    color: visColorsBehindText[5],
  },
  {
    label: 'Rhea',
    color: visColorsBehindText[6],
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    color: visColorsBehindText[7],
  },
  {
    label: 'Tethys',
    color: visColorsBehindText[8],
  },
  {
    label: 'Hyperion',
    color: visColorsBehindText[9],
  },
];

export default () => {
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState([options[2], options[5]]);

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
