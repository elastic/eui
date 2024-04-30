import React, { useCallback, useState } from 'react';

import {
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiComboBoxOptionMatcher,
} from '../../../../src';

const options: EuiComboBoxOptionOption[] = [
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
  const [selectedOptions, setSelected] = useState<EuiComboBoxOptionOption[]>(
    []
  );
  const onChange = (selectedOptions: EuiComboBoxOptionOption[]) => {
    setSelected(selectedOptions);
  };

  const startsWithMatcher = useCallback<EuiComboBoxOptionMatcher<unknown>>(
    ({ option, searchValue }) => {
      return option.label.startsWith(searchValue);
    },
    []
  );

  return (
    <EuiComboBox
      placeholder="Select options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      isClearable={true}
      optionMatcher={startsWithMatcher}
    />
  );
};
