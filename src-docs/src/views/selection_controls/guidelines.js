import React from 'react';

import { GuideRule, GuideRuleExample } from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiFormRow,
  EuiSwitch,
  EuiTitle,
  EuiCheckboxGroup,
  EuiRadioGroup,
  EuiHorizontalRule,
} from '../../../../src/components';

export default () => {
  const checkboxesDo = [
    {
      id: 'option_do_one',
      label: 'Option one',
      'data-test-sub': 'dts_test',
    },
    {
      id: 'option_do_two',
      label: 'Option two',
      className: 'classNameTest',
    },
    {
      id: 'option_do_three',
      label: 'Option three',
    },
  ];

  const checkboxesDont = [
    {
      id: 'option_dont_one',
      label: 'Option one',
      'data-test-sub': 'dts_test',
    },
    {
      id: 'option_dont_two',
      label: 'Option two is checked by default',
      className: 'classNameTest',
    },
    {
      id: 'option_dont_three',
      label: 'Option three is disabled',
    },
  ];

  const radiosDo = [
    {
      id: 'option_do_one',
      label: 'Option one',
      'data-test-sub': 'dts_test',
    },
    {
      id: 'option_do_two',
      label: 'Option two',
      className: 'classNameTest',
    },
    {
      id: 'option_do_three',
      label: 'Option three',
    },
  ];

  const radiosDont = [
    {
      id: 'option_dont_one',
      label: 'Option one',
      'data-test-sub': 'dts_test',
    },
    {
      id: 'option_dont_two',
      label: 'Option Two',
      className: 'classNameTest',
    },
    {
      id: 'option_dont_three',
      label: 'option three',
    },
  ];

  return (
    <>
      <EuiText grow={false}>
        <p>
          This page documents writing guidelines and examples for various
          components.
        </p>
      </EuiText>

      <EuiSpacer size="xl" />

      <EuiTitle>
        <h2>Checkbox and radio labels</h2>
      </EuiTitle>

      <GuideRule
        heading="Make it easy to scan the options"
        description={
          <p>
            A label should be succinct, short, and descriptive with one to two
            words. This way users can quickly scan the available options.
          </p>
        }
      >
        <GuideRuleExample
          type="do"
          text="A label should be succinct, short, and descriptive with one to two words."
        >
          <EuiCheckboxGroup options={checkboxesDo} onChange={() => {}} />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Title case can feel more cluttered."
        >
          <EuiCheckboxGroup options={checkboxesDont} onChange={() => {}} />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule
        description={
          <p>Always prefer sentence cases (capitalize the first word).</p>
        }
      >
        <GuideRuleExample
          type="do"
          text="Sentence case makes titles easier to read."
        >
          <EuiRadioGroup
            options={radiosDo}
            onChange={() => {}}
            name="radio group"
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Title case can feel more cluttered."
        >
          <EuiRadioGroup
            options={radiosDont}
            onChange={() => {}}
            name="radio group"
          />
        </GuideRuleExample>
      </GuideRule>

      <EuiHorizontalRule />

      <EuiSpacer size="xl" />

      <EuiTitle>
        <h2>Switch labels</h2>
      </EuiTitle>

      <GuideRule
        heading="Action oriented"
        description={
          <p>
            The label should be static, action-oriented, and describe the
            feature or present a question.
          </p>
        }
      >
        <GuideRuleExample
          type="do"
          text="Use a static noun describing the setting to turn on or off."
        >
          <div style={{ width: 400 }}>
            <EuiSwitch
              checked={false}
              onChange={() => {}}
              label="Malware protection"
            />
          </div>
        </GuideRuleExample>
        <GuideRuleExample
          type="dont"
          text='Start with statements such as "If true" or "If
              enabled".'
        >
          <div style={{ width: 400 }}>
            <EuiSwitch
              checked={false}
              onChange={() => {}}
              label="If enabled, uses malware protection"
            />
          </div>
        </GuideRuleExample>
        <GuideRuleExample
          type="do"
          text='If
              relevant, start with a verb ("Use A",
              "Show B") and add help text to provide more info.'
        >
          <div style={{ width: 400 }}>
            <EuiFormRow helpText="Rollover when an index is 30 days old or reaches 50 gigabytes.">
              <EuiSwitch
                checked={false}
                onChange={() => {}}
                label="Use recommended defaults"
              />
            </EuiFormRow>
          </div>
        </GuideRuleExample>
        <GuideRuleExample type="dont" text='Use only a verb, such as "Enable".'>
          <div style={{ width: 400 }}>
            <EuiSwitch checked={false} onChange={() => {}} label="Enable" />
          </div>
        </GuideRuleExample>
      </GuideRule>

      <GuideRule
        description={
          <p>
            Use past tense only when labelling a list of previously created
            items, like in a table header.
          </p>
        }
      >
        <GuideRuleExample
          type="do"
          text="Sentence case makes titles easier to read."
        >
          <div style={{ width: 400 }}>
            <EuiSwitch
              checked={false}
              onChange={() => {}}
              label="Malware protection"
            />
          </div>
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Title case can feel more cluttered."
        >
          <div style={{ width: 400 }}>
            <EuiSwitch
              checked={false}
              onChange={() => {}}
              label="Malware protection"
            />
          </div>
        </GuideRuleExample>
      </GuideRule>
    </>
  );
};
