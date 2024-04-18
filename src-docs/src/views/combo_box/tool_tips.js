import React, { useState } from 'react';

import { EuiComboBox } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

const optionsStatic = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
    toolTipContent: 'Lorem ipsum',
  },
  {
    label: 'Enceladus is disabled',
    disabled: true,
    toolTipContent: 'Lorem ipsum',
  },
  {
    label: 'Mimas',
    toolTipContent: 'Lorem ipsum',
  },
  {
    label: 'Dione',
    toolTipContent: 'Lorem ipsum',
  },
  {
    label: 'Iapetus',
    toolTipContent: 'Lorem ipsum',
  },
  {
    label: 'Phoebe',
    toolTipContent: 'Lorem ipsum',
  },
  {
    label: 'Rhea',
    toolTipContent: 'Lorem ipsum',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    toolTipContent: 'Lorem ipsum',
  },
  {
    label: 'Tethys',
    toolTipContent: 'Lorem ipsum',
  },
  {
    label: 'Hyperion',
    toolTipContent: 'Lorem ipsum',
  },
];
export default () => {
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState([options[2], options[4]]);

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
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canDisabled={false} canReadOnly={false} canIsDisabled>
      <EuiComboBox
        aria-label="Accessible screen reader label"
        placeholder="Select or create options"
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onCreateOption={onCreateOption}
        isClearable={true}
        data-test-subj="demoComboBox"
        autoFocus
      />
    </DisplayToggles>
  );
};
