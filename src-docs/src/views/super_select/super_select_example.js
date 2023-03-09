import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiSpacer,
  EuiSuperSelect,
  EuiText,
} from '../../../../src/components';

import SuperSelectBasic from './super_select_basic';
const superSelectBasicSource = require('!!raw-loader!./super_select_basic');
const superSelectBasicSnippet = `<EuiSuperSelect
  options={[
    {
      value: 'warning',
      inputDisplay: inputDisplay,
    },
  ]}
  valueOfSelected={value}
  onChange={onChange}
/>
`;

import SuperSelectComplex from './super_select_complex';
const superSelectComplexSource = require('!!raw-loader!./super_select_complex');
const superSelectComplexSnippet = `<EuiSuperSelect
  options={[
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      dropdownDisplay: dropdownDisplay,
    },
  ]}
  valueOfSelected={value}
  onChange={onChange}
  hasDividers
/>
`;

import SuperSelectStates from './super_select_states';
const superSelectStatesSource = require('!!raw-loader!./super_select_states');
const superSelectStatesSnippet = `<EuiSuperSelect
  options={[
    {
      value: 'option_one',
      inputDisplay: 'Option one',
    },
  ]}
  valueOfSelected={value}
  onChange={onChange}
  compressed={true}
  fullWidth={true}
  prepend={prepend}
  append={append}
/>
`;

import SuperSelectAppendPrepend from './super_select_append_prepend';
const superSelectAppendPrepend = require('!!raw-loader!./super_select_append_prepend');
const superSelectAppendPrependSnippet = `<EuiSuperSelect
id={testId}
options={options}
valueOfSelected={value}
onChange={(value) => onChange(value)}
append={[
  <span className="euiFormLabel">Append</span>,
]}
prepend={[
  <span className="euiFormLabel">Prepend</span>,
]}
/>`;

export const SuperSelectExample = {
  title: 'Super select',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superSelectBasicSource,
        },
      ],
      text: (
        <>
          <p>
            This is a simple replacement component for{' '}
            <strong>EuiSelect</strong> if you need more customization in either
            the display of the input or option. Simply pass an array of option
            objects:
          </p>
          <ul>
            <li>
              <EuiCode>value</EuiCode>: for storing unique value of item,{' '}
            </li>
            <li>
              <EuiCode>inputDisplay</EuiCode>: what shows inside the form input
              when selected,{' '}
            </li>
            <li>
              <EuiCode>dropdownDisplay</EuiCode>: (optional) what shows for the
              item in the dropdown
            </li>
          </ul>
          <p>
            &hellip; and the component will create a select styled button that
            triggers a popover of selectable items.
          </p>
        </>
      ),
      props: { EuiSuperSelect },
      snippet: superSelectBasicSnippet,
      demo: <SuperSelectBasic />,
    },
    {
      title: 'More complex',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superSelectComplexSource,
        },
      ],
      text: (
        <>
          <p>
            Both <EuiCode>inputDisplay</EuiCode> and{' '}
            <EuiCode>dropdownDisplay</EuiCode> accept React nodes. Therefore you
            can pass some descriptions with each option to show in the dropdown.
            If your options will most likely be multi-line, add the{' '}
            <EuiCode>hasDividers</EuiCode> prop to show borders between options.
          </p>
          <p>
            A <EuiCode>placeholder</EuiCode> prop may also be passed that
            accepts string as well as React nodes (to match your{' '}
            <EuiCode>inputDisplay</EuiCode> if necessary). This placeholder will
            only show when <EuiCode>valueOfSelected</EuiCode> is empty.
          </p>
        </>
      ),
      props: {},
      snippet: superSelectComplexSnippet,
      demo: <SuperSelectComplex />,
    },
    {
      title: 'States',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superSelectStatesSource,
        },
      ],
      text: (
        <p>
          You can pass the same props as you normally would to{' '}
          <strong>EuiSelect</strong> like disabled, isLoading, compressed,
          etc&hellip;
        </p>
      ),
      props: { EuiSuperSelect },
      snippet: superSelectStatesSnippet,
      demo: <SuperSelectStates />,
    },
    {
      title: 'Append and prepend',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superSelectAppendPrepend,
        },
      ],
      text: (
        <>
          <EuiText>
            <p>
              You can create custom labels by passing <EuiCode>append</EuiCode>{' '}
              or <EuiCode>prepend</EuiCode> props to{' '}
              <strong>EuiSuperSelect</strong>.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCallOut
            iconType="accessibility"
            title={
              <>
                Make your <EuiCode>append</EuiCode> and{' '}
                <EuiCode>prepend</EuiCode> labels accessible
              </>
            }
          >
            <EuiSpacer size="s" />
            <p>
              You must do two things to create accessible append/prepend labels
              for <EuiCode>EuiSuperSelect</EuiCode>:
            </p>
            <ul>
              <li>
                Pass a unique <EuiCode>id</EuiCode> prop
              </li>
              <li>
                Pass a custom ReactElement for the <EuiCode>append</EuiCode> and{' '}
                <EuiCode>prepend</EuiCode> props. This could be a{' '}
                <EuiCode>SPAN</EuiCode> or <EuiCode>DIV</EuiCode>.
              </li>
            </ul>
          </EuiCallOut>
        </>
      ),
      props: { EuiSuperSelect },
      snippet: superSelectAppendPrependSnippet,
      demo: <SuperSelectAppendPrepend />,
    },
  ],
};
