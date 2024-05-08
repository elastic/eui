import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import Guidelines from './guidelines';

import {
  EuiCallOut,
  EuiCheckbox,
  EuiCheckboxGroup,
  EuiCode,
  EuiRadio,
  EuiRadioGroup,
  EuiSwitch,
  EuiText,
  EuiFormFieldset,
  EuiFormLegend,
  EuiSpacer,
  EuiLink,
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

import Fieldset from './fieldset';
const fieldsetSource = require('!!raw-loader!./fieldset');

export const SelectionControlsExample = {
  title: 'Selection controls',
  guidelines: <Guidelines />,
  intro: (
    <EuiText>
      <p>
        EUI provides three types of selection controls:{' '}
        <strong>EuiCheckbox</strong>, <strong>EuiRadio</strong> and{' '}
        <strong>EuiSwitch</strong>. These controls allow users to select options
        among a list or switch settings on/off. They are ideal for a small list
        of options.
      </p>
      <p>
        For longer lists of options, consider using a{' '}
        <Link to="/forms/form-controls#select">EuiSelect</Link>,{' '}
        <Link to="/forms/super-select">EuiSuperSelect</Link> or{' '}
        <Link to="/forms/combo-box">EuiComboBox</Link>.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Checkbox',

      source: [
        {
          type: GuideSectionTypes.JS,
          code: checkboxSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            This component renders a basic HTML{' '}
            <EuiCode>{'<input type="checkbox">'}</EuiCode> element. Use
            checkboxes to allow users to select multiple options from a list.
          </p>
          <p>
            Use the <EuiCode>checked</EuiCode> prop to handle the checked and
            unchecked state. You can also use the{' '}
            <EuiCode>indeterminate</EuiCode> prop to set an indeterminate state.
            This state is commonly used in hierarchical checkboxes to indicate
            that only some of the checkbox&apos;s descendants are checked.
          </p>
          <p>
            Make sure to pass a <EuiCode>label</EuiCode> to ensure a larger
            clickable area and ensure that screen readers will read out the
            label when the user is focused on the input. To learn more about
            labels usage, go to the{' '}
            <Link to="/forms/selection-controls/guidelines">
              guidelines tab
            </Link>
            .
          </p>
        </Fragment>
      ),
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
      text: (
        <Fragment>
          <p>
            Use a <strong>EuiCheckboxGroup</strong> when you want to generate a
            group of checkboxes by passing an array of{' '}
            <EuiCode>options</EuiCode> with an <EuiCode>id</EuiCode> and
            <EuiCode>label</EuiCode> for each object. Use the{' '}
            <EuiCode>idToSelectedMap</EuiCode> to indicate the IDs of the
            selected items.
          </p>
          <p>
            When the individual labels for each radio do not provide a
            sufficient description, pass a <EuiCode>legend</EuiCode> to the
            group.
          </p>
          <p>
            Use the <EuiCode>compressed</EuiCode> prop to tighten up the spacing
            between checkbox rows.
          </p>
        </Fragment>
      ),
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
      text: (
        <Fragment>
          <p>
            This component renders a basic HTML{' '}
            <EuiCode>{'<input type="radio">'}</EuiCode> element. Use radio
            buttons to allow users to choose one option out of a list. They are
            ideal for a list of more than 2 options, and usually no more than 6
            options.
          </p>
          <p>
            When creating a list, each input should have the same{' '}
            <EuiCode>name</EuiCode> to ensure a group is established. This way
            when you select a radio button in that group, the other options are
            automatically deselected.
          </p>
          <p>
            Make sure to pass a <EuiCode>label</EuiCode> to ensure a larger
            clickable area and ensure that screen readers will read out the
            label when the user is focused on the input. To learn more about
            labels usage, go to the{' '}
            <Link to="/forms/selection-controls/guidelines">
              guidelines tab
            </Link>
            .
          </p>
        </Fragment>
      ),
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
      text: (
        <Fragment>
          <p>
            Use a <strong>EuiRadioGroup</strong> when you want to generate a
            group of radio buttons by passing an array of{' '}
            <EuiCode>options</EuiCode> with an <EuiCode>id</EuiCode> and
            <EuiCode>label</EuiCode> for each object. Pass a single{' '}
            <EuiCode>name</EuiCode> property to define the group.
          </p>
          <p>
            When the individual labels for each radio do not provide a
            sufficient description, pass a <EuiCode>legend</EuiCode> to the
            group.
          </p>
        </Fragment>
      ),
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
        <p>
          A switch can be substituted for a checkbox when the semantics of the
          label dictate a true on/off state.
        </p>
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
            Make sure to pass a <EuiCode>label</EuiCode> to ensure a larger
            clickable area and ensure that screen readers will read out the
            label when the user is focused on the input. You can find more about
            labels usage in the{' '}
            <Link to="/forms/selection-controls/guidelines">
              guidelines tab
            </Link>
            .
          </p>
          <p>
            If the switch is described in some other manner, like when using an{' '}
            <Link to="/forms/form-layouts#form-and-form-rows">
              <strong>EuiFormRow</strong>
            </Link>
            , you can eliminate the visible label with{' '}
            <EuiCode language="tsx">{'showLabel={false}'}</EuiCode> or use it to
            further describe the state.
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
    {
      title: 'Fieldset and legend',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldsetSource,
        },
      ],
      text: (
        <Fragment>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title={
              <span>
                &quot;[Use a fieldset and legend] for groups of related controls
                where the individual labels for each control do not provide a
                sufficient description, and an additional group level
                description is needed.&quot;{' '}
                <EuiLink
                  external
                  href="https://www.w3.org/WAI/WCAG21/Techniques/html/H71"
                >
                  WCAG Spec
                </EuiLink>
              </span>
            }
          />
          <EuiSpacer />
          <p>
            <strong>EuiFormFieldset</strong> simply wraps its children in a{' '}
            <EuiCode language="html">&lt;fieldset&gt;</EuiCode> with the option
            to add a <EuiCode language="html">&lt;legend&gt;</EuiCode> via the{' '}
            <EuiCode>legend</EuiCode> object prop. Find more examples in the{' '}
            <Link to="/forms/selection-controls/guidelines">
              guidelines tab
            </Link>
            .
          </p>
        </Fragment>
      ),
      props: {
        EuiFormFieldset,
        EuiFormLegend,
      },
      demo: <Fieldset />,
      snippet: [
        `<EuiFormFieldset legend={{ children: 'Legend' }}>
  <!-- Controls -->
</EuiFormFieldset>`,
        `<EuiFormFieldset legend={{ children: 'Hidden legend', display: 'hidden' }}>
  <!-- Controls -->
</EuiFormFieldset>`,
      ],
    },
  ],
};
