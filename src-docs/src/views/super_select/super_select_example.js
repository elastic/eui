import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSuperSelect } from '../../../../src/components';

import SuperSelectBasic from './super_select_basic';
const superSelectBasicSource = require('!!raw-loader!./super_select_basic');
const superSelectBasicHtml = renderToHtml(SuperSelectBasic);
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
const superSelectComplexHtml = renderToHtml(SuperSelectComplex);
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
const superSelectStatesHtml = renderToHtml(SuperSelectStates);
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
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superSelectBasicSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superSelectBasicHtml,
        },
      ],
      text: (
        <div>
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
        </div>
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
        {
          type: GuideSectionTypes.HTML,
          code: superSelectComplexHtml,
        },
      ],
      text: (
        <p>
          Both <EuiCode>inputDisplay</EuiCode> and{' '}
          <EuiCode>dropdownDisplay</EuiCode> accept React nodes. Therefore you
          can pass some descriptions with each option to show in the dropdown.
          If your options will most likely be multi-line, add the{' '}
          <EuiCode>hasDividers</EuiCode> prop to show borders between options.
        </p>
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
        {
          type: GuideSectionTypes.HTML,
          code: superSelectStatesHtml,
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
