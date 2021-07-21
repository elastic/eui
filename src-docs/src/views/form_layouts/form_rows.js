import React, { useState, useRef } from 'react';

import {
  EuiButton,
  EuiCheckboxGroup,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFilePicker,
  EuiLink,
  EuiRange,
  EuiSelect,
  EuiSpacer,
  EuiSwitch,
  EuiText,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const idPrefix = useRef(htmlIdGenerator()());
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const checkboxes = [
    {
      id: `${idPrefix.current}0`,
      label: 'Option one',
    },
    {
      id: `${idPrefix.current}1`,
      label: 'Option two is checked by default',
    },
    {
      id: `${idPrefix.current}2`,
      label: 'Option three',
    },
  ];
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [`${idPrefix.current}1`]: true,
  });

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
    <EuiForm component="form">
      <EuiFormRow label="Text field" helpText="I am some friendly help text.">
        <EuiFieldText name="first" />
      </EuiFormRow>

      <EuiFormRow
        label="Select (with no initial selection)"
        labelAppend={
          <EuiText size="xs">
            <EuiLink>Link to some help</EuiLink>
          </EuiText>
        }>
        <EuiSelect
          hasNoInitialSelection
          onChange={() => {}}
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
        />
      </EuiFormRow>

      <EuiFormRow label="File picker">
        <EuiFilePicker />
      </EuiFormRow>

      <EuiFormRow label="Range">
        <EuiRange min={0} max={100} name="range" id="range" />
      </EuiFormRow>

      <EuiSpacer />

      <EuiCheckboxGroup
        options={checkboxes}
        idToSelectedMap={checkboxIdToSelectedMap}
        onChange={onCheckboxChange}
        legend={{
          children:
            'Checkbox groups should use the `legend` prop instead of form row',
        }}
      />

      <EuiSpacer />

      <EuiFormRow
        label="Use a switch instead of a single checkbox"
        hasChildLabel={false}>
        <EuiSwitch
          name="switch"
          label="Should we do this?"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiButton type="submit" fill>
        Save form
      </EuiButton>
    </EuiForm>
  );
};
