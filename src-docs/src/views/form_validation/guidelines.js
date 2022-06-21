import React, { useState, Fragment } from 'react';
import { GuideRule, GuideRuleExample } from '../../components';
import {
  EuiTitle,
  EuiFieldText,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [showErrors] = useState(true);

  let errors;
  let required;
  let forbidden;

  if (showErrors) {
    errors = ['This address is already used. Enter a different one.'];
    required = ['Name is required.'];
    forbidden = ["The key can't contain the `:` character."];
  }

  return (
    <>
      <EuiTitle>
        <h2>Validation error text</h2>
      </EuiTitle>

      <GuideRule
        description={
          <p>
            Validation messages are needed when the user input differs from what
            the system expects and enforces:
            <EuiSpacer />
            <ul>
              <li>Required fields that are still blank.</li>
              <li>
                Invalid values, for one or several reasons (forbidden
                characters, formatting, duplicate).
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
          <EuiFormRow label="Email" isInvalid={showErrors} error={errors}>
            <EuiFieldText name="text" isInvalid={showErrors} />
          </EuiFormRow>
        </GuideRuleExample>
        <GuideRuleExample
          panelDisplay="block"
          type="do"
          text="Be as precise as possible to describe the problem."
        >
          <EuiFormRow label="Key" isInvalid={showErrors} error={forbidden}>
            <EuiFieldText name="text" isInvalid={showErrors} />
          </EuiFormRow>
        </GuideRuleExample>
      </GuideRule>
    </>
  );
};
