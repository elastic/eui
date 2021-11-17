import React, { useState } from 'react';

import { EuiComboBox, EuiSpacer, EuiText } from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

interface optionsInterface {
  label: string;
  'data-test-subj'?: string;
}

export default () => {
  const generatedId = useGeneratedHtmlId({ prefix: 'generated-heading' });
  const [options, updateOptions] = useState([
    {
      label: 'Titan',
      'data-test-subj': 'titanOption',
    },
    {
      label: 'Enceladus is disabled',
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
  ]);

  const [selectedOptions, setSelected] = useState([options[2], options[4]]);

  const onChange = (selectedOptions: optionsInterface[]) => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (
    searchValue: string,
    flattenedOptions: optionsInterface[]
  ) => {
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
      updateOptions([...options, newOption]);
    }

    // Select the option.
    setSelected((prevSelected) => [...prevSelected, newOption]);
  };

  return (
    <React.Fragment>
      <EuiText>
        <h3 id={generatedId}>Heading as a label</h3>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiComboBox
        aria-labelledby={generatedId}
        placeholder="Select or create options"
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onCreateOption={onCreateOption}
        isClearable={true}
      />
    </React.Fragment>
  );
};
