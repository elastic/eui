import React from 'react';
import { GuideRule, GuideRuleExample } from '../../components';
import {
  EuiSpacer,
  EuiFormRow,
  EuiSwitch,
  EuiTitle,
  EuiCheckboxGroup,
  EuiRadioGroup,
  EuiHorizontalRule,
  EuiBasicTable,
} from '../../../../src/components';

export default () => {
  const accessDo = [
    {
      id: 'access_do_one',
      label: 'Read access',
    },
    {
      id: 'access_do_two',
      label: 'Write access',
    },
    {
      id: 'access_do_three',
      label: 'Create access',
    },
    {
      id: 'access_do_four',
      label: 'Delete access',
    },
  ];

  const accessDont = [
    {
      id: 'access_dont_one',
      label: 'Read Access',
      'data-test-sub': 'dts_test',
    },
    {
      id: 'access_dont_two',
      label: 'Write Access',
    },
    {
      id: 'access_dont_three',
      label: 'Create Access',
    },
    {
      id: 'access_dont_four',
      label: 'Delete Access',
    },
  ];

  const easyScanDo = [
    {
      id: 'easy_scan_do_one',
      label: 'Canceled',
    },
    {
      id: 'easy_scan_do_two',
      label: 'In progress',
    },
    {
      id: 'easy_scan_do_three',
      label: 'On Hold',
    },
    {
      id: 'easy_scan_do_four',
      label: 'Resolved',
    },
  ];

  const easyScanDont = [
    {
      id: 'easy_scan_dontnt_one',
      label: 'Case is canceled',
    },
    {
      id: 'easy_scan_dont_two',
      label: 'Case is in progress',
    },
    {
      id: 'easy_scan_dont_three',
      label: 'Case is on Hold',
    },
    {
      id: 'easy_scan_dont_four',
      label: 'Case is resolved',
    },
  ];

  const items = [
    {
      id: '1',
      name: 'Log created',
      enabled: true,
    },
    {
      id: '2',
      name: 'Log deleted',
      enabled: false,
    },
    {
      id: '3',
      name: 'Log suspended',
      enabled: true,
    },
    {
      id: '4',
      name: 'Log updated',
      enabled: false,
    },
  ];

  const columns = [
    {
      field: 'enabled',
      name: 'Enabled',
      render: (enabled) => (
        <EuiSwitch checked={enabled} onChange={() => {}} compressed />
      ),
    },
    {
      field: 'name',
      name: 'Name',
    },
  ];

  return (
    <>
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
          <EuiRadioGroup
            options={easyScanDo}
            onChange={() => {}}
            name="radio group"
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Long labels makes it difficult to scan."
        >
          <EuiRadioGroup
            options={easyScanDont}
            onChange={() => {}}
            name="radio group"
          />
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
          <EuiCheckboxGroup options={accessDo} onChange={() => {}} />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Title case can feel more cluttered."
        >
          <EuiCheckboxGroup options={accessDont} onChange={() => {}} />
        </GuideRuleExample>
      </GuideRule>

      <EuiHorizontalRule />

      <EuiSpacer size="xl" />

      <EuiTitle>
        <h2>Switch labels</h2>
      </EuiTitle>

      <GuideRule
        heading="Always action-oriented"
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
          <EuiSwitch
            checked={false}
            onChange={() => {}}
            label="Malware protection"
          />
        </GuideRuleExample>
        <GuideRuleExample
          type="dont"
          text='Start with statements such as "If true" or "If
              enabled".'
        >
          <EuiSwitch
            checked={false}
            onChange={() => {}}
            label="If enabled, uses malware protection"
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule>
        <GuideRuleExample
          type="do"
          text='If
              relevant, start with a verb ("Use A",
              "Show B") and add help text to provide more info.'
          minHeight={80}
        >
          <EuiFormRow helpText="Rollover when an index is 30 days old or reaches 50 gigabytes.">
            <EuiSwitch
              checked={false}
              onChange={() => {}}
              label="Use recommended defaults"
            />
          </EuiFormRow>
        </GuideRuleExample>
        <GuideRuleExample
          type="dont"
          text='Use only a verb, such as "Enable".'
          minHeight={80}
        >
          <EuiSwitch checked={false} onChange={() => {}} label="Enable" />
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
          text="In a list of already created items, use the past tense."
          minHeight={234}
        >
          <EuiBasicTable columns={columns} items={items} tableLayout="auto" />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Use the past tense in a single form."
          minHeight={234}
        >
          <EuiSwitch checked={false} onChange={() => {}} label="Log enabled" />
        </GuideRuleExample>
      </GuideRule>
    </>
  );
};
