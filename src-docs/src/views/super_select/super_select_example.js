import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiSuperSelect,
  EuiLink,
  EuiCallOut,
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

export const SuperSelectExample = {
  title: 'Super select',
  intro: (
    <EuiCallOut
      iconType="questionInCircle"
      title="Not sure which selection component to use?"
    >
      <p>
        See{' '}
        <EuiLink
          href="https://github.com/elastic/eui/discussions/7049"
          target="_blank"
        >
          EUI's in-depth guide to selection components{' '}
        </EuiLink>{' '}
        for more information.
      </p>
    </EuiCallOut>
  ),
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
  ],
};
