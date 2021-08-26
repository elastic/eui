import React, { useState } from 'react';

import {
  EuiComboBox,
  EuiFieldText,
  EuiFormRow,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiPanel,
} from '../../../../src/components';

export default () => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [comboBoxSelectionOptions, setComboBoxSelectionOptions] = useState([]);
  const [value, setValue] = useState('20');

  const onRangeChange = (e) => {
    setValue(e.target.value);
  };

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  return (
    <EuiPanel style={{ maxWidth: 300 }}>
      <EuiFormRow
        label="Text field"
        helpText="I am some friendly help text."
        display="columnCompressed"
      >
        <EuiFieldText name="first" isLoading compressed />
      </EuiFormRow>

      <EuiFormRow label="Select" display="columnCompressed">
        <EuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          compressed
        />
      </EuiFormRow>

      <EuiFormRow label="File picker" display="columnCompressed">
        <EuiFilePicker compressed display="default" />
      </EuiFormRow>

      <EuiFormRow label="Comboboxwithalonglabelname" display="columnCompressed">
        <EuiComboBox
          options={[
            { label: 'Option one' },
            { label: 'Option two' },
            { label: 'Option three' },
          ]}
          compressed
          selectedOptions={comboBoxSelectionOptions}
          onChange={(comboBoxSelectionOptions) =>
            setComboBoxSelectionOptions(comboBoxSelectionOptions)
          }
        />
      </EuiFormRow>

      <EuiFormRow label="Range" display="columnCompressed">
        <EuiRange
          min={0}
          max={100}
          name="range"
          id="range"
          showInput
          compressed
          value={value}
          onChange={onRangeChange}
        />
      </EuiFormRow>

      <EuiFormRow display="columnCompressedSwitch" label="Switch">
        <EuiSwitch
          showLabel={false}
          label="Switch"
          name="switch"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
          compressed
        />
      </EuiFormRow>
    </EuiPanel>
  );
};
