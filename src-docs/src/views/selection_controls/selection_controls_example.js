import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import {
  GuideSectionTypes,
  GuideRule,
  GuideRuleExample,
} from '../../components';

import {
  EuiCallOut,
  EuiCheckbox,
  EuiCheckboxGroup,
  EuiCode,
  EuiFormRow,
  EuiLink,
  EuiRadio,
  EuiRadioGroup,
  EuiSwitch,
} from '../../../../src/components';

import { CheckboxConfig, RadioConfig, SwitchConfig } from './playground';

import Checkbox from './checkbox';
const checkboxSource = require('!!raw-loader!./checkbox');
const checkboxSnippet = [
  `<EuiCheckbox
  id={checkboxId__1}
  label="I am a checkbox"
  checked={checked}
  onChange={onChange}
/>`,
  `<EuiCheckbox
  id={checkboxId__2}
  label="I am an indeterminate checkbox"
  indeterminate={indeterminate}
  onChange={onChangeIndeterminate}
/>`,
];

import CheckboxGroup from './checkbox_group';
const checkboxGroupSource = require('!!raw-loader!./checkbox_group');

import Radio from './radio';
const radioSource = require('!!raw-loader!./radio');
const radioSnippet = [
  `<EuiRadio
  label="I am a radio"
  checked={checked}
  onChange={onChange}
/>`,
];

import RadioGroup from './radio_group';
const radioGroupSource = require('!!raw-loader!./radio_group');

import Switch from './switch';
const switchSource = require('!!raw-loader!./switch');
const switchSnippet = `<EuiSwitch
  label="Malware protection"
  checked={checked}
  onChange={onChange}
/>`;
import SwitchLabel from './switch_label';
const switchLabelSource = require('!!raw-loader!./switch_label');
const switchLabelSnippet = [
  `<EuiSwitch
  showLabel={false}
  label="Autoscaling"
  checked={checked}
  onChange={onChange}
  compressed
/>`,
  `<EuiSwitch
  label={checked ? 'on' : 'off'}
  aria-describedby={labelId}
  checked={checked}
  onChange={onChange}
  compressed
/>`,
];

export const SelectionControlsExample = {
  title: 'Selection controls',
  sections: [
    {
      title: 'Checkbox',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: checkboxSource,
        },
      ],
      snippet: checkboxSnippet,
      props: {
        EuiCheckbox,
      },
      demo: <Checkbox />,
      playground: CheckboxConfig,
    },
    {
      title: 'Checkbox group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: checkboxGroupSource,
        },
      ],
      props: {
        EuiCheckboxGroup,
      },
      demo: <CheckboxGroup />,
      snippet: `<EuiCheckboxGroup
  options={[
    {
      id: id1,
      label: 'Option one',
    },
  ]}
  idToSelectedMap={{ id1: true }}
  onChange={onChange}
/>`,
    },
    {
      title: 'Radio',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: radioSource,
        },
      ],
      snippet: radioSnippet,
      props: {
        EuiRadio,
      },
      demo: <Radio />,
      playground: RadioConfig,
    },
    {
      title: 'Radio group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: radioGroupSource,
        },
      ],
      props: {
        EuiRadioGroup,
      },
      demo: <RadioGroup />,
      snippet: `<EuiRadioGroup
  options={[
    {
      id: id1,
      label: 'Option one',
    },
  ]}
  idSelected={id1}
  onChange={onChange}
  name="radio group"
  legend={{
    children: 'A legend',
  }}
/>`,
    },
    {
      title: 'Switch',
      text: (
        <>
          <p>
            A switch can be substituted for a checkbox when the semantics of the
            label dictate a true on/off state.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: switchSource,
        },
      ],
      snippet: switchSnippet,
      props: {
        EuiSwitch,
      },
      demo: <Switch />,
      playground: SwitchConfig,
    },
    {
      text: (
        <>
          <p>
            <strong>Label</strong>
          </p>
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
            <GuideRuleExample
              type="dont"
              text='Use only a verb, such as "Enable".'
            >
              <div style={{ width: 400 }}>
                <EuiSwitch checked={false} onChange={() => {}} label="Enable" />
              </div>
            </GuideRuleExample>
          </GuideRule>
          <p>Special cases:</p>
          <p>
            <ul>
              <li>
                Use past tense only when labelling a list of previously created
                items, like in a{' '}
                <EuiLink href="https://github.com/elastic/eui/pull/5119#discussion_r699717319">
                  table header
                </EuiLink>
                .
              </li>
              <li>
                If the switch is described in some other manner, like when using
                an{' '}
                <Link to="/forms/form-layouts#form-and-form-rows">
                  <strong>EuiFormRow</strong>
                </Link>
                , you can eliminate the visible label with{' '}
                <EuiCode language="tsx">{'showLabel={false}'}</EuiCode> or use
                it to further describe the state.
              </li>
            </ul>
          </p>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title="When providing the state as the label, you'll need to provide an aria-describedby with the label's id to associate it with the switch."
          />
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: switchLabelSource,
        },
      ],
      snippet: switchLabelSnippet,
      props: {
        EuiSwitch,
      },
      demo: <SwitchLabel />,
    },
  ],
};
