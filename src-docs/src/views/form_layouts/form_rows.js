import React, { useState } from 'react';

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

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const formRowCheckboxItemId__1 = useGeneratedHtmlId({
    prefix: 'formRowCheckboxItem',
    suffix: 'first',
  });
  const formRowCheckboxItemId__2 = useGeneratedHtmlId({
    prefix: 'formRowCheckboxItem',
    suffix: 'second',
  });
  const formRowCheckboxItemId__3 = useGeneratedHtmlId({
    prefix: 'formRowCheckboxItem',
    suffix: 'third',
  });

  const formRowRangeId = useGeneratedHtmlId({ prefix: 'formRowRange' });
  const checkboxes = [
    {
      id: formRowCheckboxItemId__1,
      label: 'Option one',
    },
    {
      id: formRowCheckboxItemId__2,
      label: 'Option two is checked by default',
    },
    {
      id: formRowCheckboxItemId__3,
      label: 'Option three',
    },
  ];
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [formRowCheckboxItemId__2]: true,
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

      <EuiFormRow label="Disabled through form row" isDisabled>
        <EuiFieldText name="last" />
      </EuiFormRow>

      <EuiFormRow
        label="Select (with no initial selection)"
        labelAppend={
          <EuiText size="xs">
            <EuiLink>Link to some help</EuiLink>
          </EuiText>
        }
      >
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
        <EuiRange min={0} max={100} name="range" id={formRowRangeId} />
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
        hasChildLabel={false}
      >
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
