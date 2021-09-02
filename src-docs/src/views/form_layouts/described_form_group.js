import React, { Fragment, useState } from 'react';

import {
  EuiCode,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiDescribedFormGroup,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiLink,
} from '../../../../src/components';

export default () => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  return (
    <EuiForm component="form">
      <EuiDescribedFormGroup
        title={<h3>Single text field</h3>}
        description={
          <Fragment>
            A single text field that can be used to display additional text. It
            can have{' '}
            <EuiLink href="http://www.elastic.co" target="_blank">
              links
            </EuiLink>{' '}
            or any other type of content.
          </Fragment>
        }
      >
        <EuiFormRow label="Text field">
          <EuiFieldText name="first" aria-label="Example" />
        </EuiFormRow>
      </EuiDescribedFormGroup>
      <EuiDescribedFormGroup title={<h3>No description</h3>}>
        <EuiFormRow label="Text field">
          <EuiFieldText name="first" />
        </EuiFormRow>
      </EuiDescribedFormGroup>
      <EuiDescribedFormGroup
        title={<h3>Multiple fields</h3>}
        description="Here are three form rows. The first form row does not have a title."
      >
        <EuiFormRow
          hasEmptyLabelSpace
          helpText={<span>This is a help text</span>}
        >
          <EuiSelect
            hasNoInitialSelection
            onChange={() => {}}
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            aria-label="An example of a form element without a visible label"
          />
        </EuiFormRow>

        <EuiFormRow label="File picker">
          <EuiFilePicker />
        </EuiFormRow>

        <EuiFormRow label="Range">
          <EuiRange min={0} max={100} name="range" id="range" />
        </EuiFormRow>
      </EuiDescribedFormGroup>
      <EuiDescribedFormGroup
        title={<h2>Full width</h2>}
        titleSize="xxxs"
        description={
          <Fragment>
            By default, <strong>EuiDescribedFormGroup</strong> will be double
            the default width of form elements. However, you can pass{' '}
            <EuiCode>fullWidth</EuiCode> prop to this, the individual field and
            row components to expand to their container.
          </Fragment>
        }
        fullWidth
      >
        <EuiFormRow
          label="Use a switch instead of a single checkbox"
          hasChildLabel={false}
          fullWidth
        >
          <EuiSwitch
            name="switch"
            label="Should we do this?"
            checked={isSwitchChecked}
            onChange={onSwitchChange}
          />
        </EuiFormRow>

        <EuiFormRow fullWidth>
          <EuiFieldText
            name="second"
            fullWidth
            aria-label="An example of EuiTextField with fullWidth"
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </EuiForm>
  );
};
