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
  useGeneratedHtmlId,
  EuiComboBoxOptionOption,
} from '@elastic/eui';

export default () => {
  const compressedFormCheckboxId__1 = useGeneratedHtmlId({
    prefix: 'compressedFormCheckbox',
    suffix: 'first',
  });
  const compressedFormCheckboxId__2 = useGeneratedHtmlId({
    prefix: 'compressedFormCheckbox',
    suffix: 'second',
  });
  const compressedFormCheckboxId__3 = useGeneratedHtmlId({
    prefix: 'compressedFormCheckbox',
    suffix: 'third',
  });
  const compressedFormRangeId = useGeneratedHtmlId({
    prefix: 'compressedFormRange',
  });

  const [checkboxes] = useState([
    {
      id: compressedFormCheckboxId__1,
      label: 'Option one',
    },
    {
      id: compressedFormCheckboxId__2,
      label: 'Option two is checked by default',
    },
    {
      id: compressedFormCheckboxId__3,
      label: 'Option three',
    },
  ]);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [compressedFormCheckboxId__2]: true,
  });

  const [comboBoxSelectionOptions, setComboBoxSelectionOptions] = useState<
    EuiComboBoxOptionOption<unknown>[]
  >([]);

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
      <EuiFormRow label="Text field" helpText="I am some friendly help text.">
        <EuiFieldText name="first" isLoading compressed />
      </EuiFormRow>

      <EuiFormRow label="Select">
        <EuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          compressed
        />
      </EuiFormRow>

      <EuiFormRow label="File picker">
        <EuiFilePicker compressed display="default" />
      </EuiFormRow>

      <EuiFormRow label="Combobox">
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

      <EuiFormRow label="Range">
        <EuiRange
          min={0}
          max={100}
          name="range"
          id={compressedFormRangeId}
          showInput
          compressed
          value={value}
          onChange={onRangeChange}
        />
      </EuiFormRow>

      <EuiFormRow label="Switch" hasChildLabel={false}>
        <EuiSwitch
          label="Setting name"
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
