import React, { useState, useMemo } from 'react';

import {
  EuiComboBox,
  EuiIcon,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

const options = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
    prepend: <EuiIcon size="s" type="bell" />,
  },
  {
    label: 'Enceladus',
    prepend: <EuiIcon size="s" type="bolt" />,
  },
  {
    label: 'Mimas',
    prepend: <EuiIcon size="s" type="bug" />,
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    prepend: <EuiIcon size="s" type="comment" />,
    append: '(10)',
  },
  {
    label: 'Iapetus',
    prepend: <EuiIcon size="s" type="flag" color="danger" />,
    append: '(2)',
  },
  {
    label: 'Phoebe',
    prepend: <EuiIcon size="s" type="tag" color="success" />,
    append: '(5)',
  },
];

export default () => {
  const [selectedOptions, setSelected] = useState([options[0], options[5]]);
  const [singleSelection, setSingleSelection] = useState(false);

  const singleSelectedOption = useMemo(() => {
    return selectedOptions.length ? [selectedOptions[0]] : [];
  }, [selectedOptions]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  return (
    <>
      <EuiSwitch
        checked={singleSelection}
        onChange={() => setSingleSelection(!singleSelection)}
        label="Single selection"
      />
      <EuiSpacer />
      <EuiComboBox
        aria-label="Combo box demo with option prepend/append nodes"
        options={options}
        onChange={onChange}
        singleSelection={singleSelection ? { asPlainText: true } : false}
        selectedOptions={
          singleSelection ? singleSelectedOption : selectedOptions
        }
        placeholder={`Select one ${
          singleSelection ? 'option' : 'or more options'
        }`}
      />
    </>
  );
};
