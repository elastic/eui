import React, { useState } from 'react';

import {
  EuiInlineEdit,
  EuiFieldText,
  EuiComboBox,
  EuiTextArea,
  EuiComboBoxProps,
  EuiHorizontalRule,
  EuiSpacer,
} from '../../../../src/components';

const optionsStatic = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus is disabled',
    disabled: true,
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
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState([options[2], options[4]]);

  const onChange = (selectedOptions: any) => {
    setSelected(selectedOptions);
  };

  return (
    <>
      {/* Base components */}
      <h3>EuiInlineEdit - Text</h3>
      <EuiInlineEdit
        editViewType={EuiFieldText}
        defaultValue="helloWorld"
        editViewTypeProps={{ id: 'hello' }}
      />
      <EuiHorizontalRule />

      <h3>EuiInlineEdit - Textarea</h3>
      <EuiInlineEdit
        editViewType={EuiTextArea}
        defaultValue="Tiramisu jelly beans sweet croissant macaroon topping. Gummies fruitcake sesame snaps lollipop chocolate cake lemon drops icing. Cake cake croissant ice cream jujubes donut toffee. Gummies jelly tiramisu cheesecake brownie icing gummi bears candy canes."
        editViewTypeProps={{ id: 'hello' }}
      />
      <EuiHorizontalRule />

      <h3>EuiInlineEdit - Select</h3>
      <EuiInlineEdit
        editViewType={EuiComboBox}
        editViewTypeProps={{
          isClearable: true,
          options: options,
          placeholder: 'Select or create options',
          selectedOptions: selectedOptions,
          onChange: onChange,
          'data-test-subj': 'demoComboBox',
          'aria-label': 'Accessible screen reader label',
          autoFocus: true,
        }}
      />
      <EuiHorizontalRule />
    </>
  );
};
