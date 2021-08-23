import React, { useState } from 'react';

import {
  EuiCheckboxGroup,
  EuiComboBox,
  EuiFieldText,
  EuiFormRow,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiPanel,
  EuiSpacer,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const idPrefix = htmlIdGenerator()();

  const [checkboxes] = useState([
    {
      id: `${idPrefix}0`,
      label: 'Option one',
    },
    {
      id: `${idPrefix}1`,
      label: 'Option two is checked by default',
    },
    {
      id: `${idPrefix}2`,
      label: 'Option three',
    },
  ]);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [`${idPrefix}1`]: true,
  });

  const [comboBoxSelectionOptions, setComboBoxSelectionOptions] = useState([]);

  const [value, setValue] = useState(20);

  const onRangeChange = (e) => {
    setValue(e.target.value);
  };

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  const onCheckboxChange = (optionId) => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };
    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
  };
  return (
    <EuiPanel style={{ maxWidth: 300 }}>
      <EuiFormRow
        label="Text field"
        helpText="I am some friendly help text."
        display="rowCompressed"
      >
        <EuiFieldText name="first" isLoading compressed />
      </EuiFormRow>

      <EuiFormRow label="Select" display="rowCompressed">
        <EuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          compressed
        />
      </EuiFormRow>

      <EuiFormRow label="File picker" display="rowCompressed">
        <EuiFilePicker compressed display="default" />
      </EuiFormRow>

      <EuiFormRow label="Combobox" display="rowCompressed">
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

      <EuiFormRow label="Range" display="rowCompressed">
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

      <EuiFormRow label="Switch" display="rowCompressed" hasChildLabel={false}>
        <EuiSwitch
          label="Should we do this?"
          name="switch"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
          compressed
        />
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiCheckboxGroup
        options={checkboxes}
        idToSelectedMap={checkboxIdToSelectedMap}
        onChange={onCheckboxChange}
        legend={{
          children: 'Checkboxes',
        }}
        compressed
      />
    </EuiPanel>
  );
};
