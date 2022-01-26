import React from 'react';

import { GuideRule, GuideRuleExample } from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiFormRow,
  EuiSwitch,
  EuiTitle,
  EuiLink,
} from '../../../../src/components';

export default () => (
  <>
    <EuiText grow={false}>
      <p>
        This page documents writing guidelines and examples for various
        components.
      </p>
    </EuiText>
    <EuiSpacer size="xl" />

    <EuiTitle>
      <h1>Switch labels</h1>
    </EuiTitle>

    <GuideRule>
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

    <EuiText>
      <p>
        {' '}
        Use past tense only when labelling a list of previously created items,
        like in a{' '}
        <EuiLink href="https://github.com/elastic/eui/pull/5119#discussion_r699717319">
          table header
        </EuiLink>
        .
      </p>
    </EuiText>
  </>
);
