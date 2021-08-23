import React, { useState, Fragment } from 'react';

import {
  EuiButton,
  EuiForm,
  EuiSelect,
  EuiFormRow,
  EuiTextArea,
  EuiFieldText,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [showErrors, setShowErrors] = useState(true);

  const onButtonClick = () => {
    setShowErrors(!showErrors);
  };

  const button = (
    <EuiButton fill color="danger" onClick={onButtonClick}>
      Toggle errors
    </EuiButton>
  );

  let errors;

  if (showErrors) {
    errors = [
      "Here's an example of an error",
      'You might have more than one error, so pass an array.',
    ];
  }

  return (
    <Fragment>
      <EuiForm isInvalid={showErrors} error={errors} component="form">
        <EuiFormRow label="Validation only" isInvalid={showErrors}>
          <EuiFieldText name="first" isInvalid={showErrors} />
        </EuiFormRow>

        <EuiFormRow
          label="Validation with help text and errors"
          helpText="I am some friendly help text."
          isInvalid={showErrors}
          error={errors}
        >
          <EuiFieldText name="text" isInvalid={showErrors} />
        </EuiFormRow>

        <EuiFormRow label="Text area" isInvalid={showErrors}>
          <EuiTextArea name="area" isInvalid={showErrors} />
        </EuiFormRow>

        <EuiFormRow label="Select" isInvalid={showErrors}>
          <EuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            isInvalid={showErrors}
          />
        </EuiFormRow>

        <EuiSpacer />

        {button}
      </EuiForm>
    </Fragment>
  );
};
