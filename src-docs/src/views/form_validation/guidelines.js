import React, { useState, Fragment } from 'react';
import { GuideRule, GuideRuleExample } from '../../components';
import { EuiTitle, EuiFieldText, EuiFormRow } from '../../../../src/components';

export default () => {
  const [showErrors] = useState(true);

  let errors;
  let required;

  if (showErrors) {
    errors = ['This address already exists. Enter a different one.'];
    required = ['Name is required.'];
  }

  return (
    <>
      <EuiTitle>
        <h2>Validation text</h2>
      </EuiTitle>

      <GuideRule
        description={
          <p>
            Validation messages are needed when the user input differs from what
            the system expects and enforces:
            <ul>
              <li>Indicating required fields that are still blank.</li>
              <li>
                Indicating a value is not correct, for one or several reasons
                (forbidden characters, formatting, duplicate
              </li>
            </ul>
            Use clear language that helps users understand what they have to do.
          </p>
        }
      >
        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="Use a simple, minimalist format for a required field."
        >
          <EuiFormRow label="Name" isInvalid={showErrors} error={required}>
            <EuiFieldText name="first" isInvalid={showErrors} />
          </EuiFormRow>
        </GuideRuleExample>

        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="Tell users what happened and how to fix it."
        >
          <EuiFormRow
            label="Email"
            helpText="The email address must be valid."
            isInvalid={showErrors}
            error={errors}
          >
            <EuiFieldText name="text" isInvalid={showErrors} />
          </EuiFormRow>
        </GuideRuleExample>
      </GuideRule>
    </>
  );
};
