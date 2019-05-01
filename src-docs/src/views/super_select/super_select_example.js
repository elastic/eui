import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSuperSelect } from '../../../../src/components';

import SuperSelect from './super_select';
const superSelectSource = require('!!raw-loader!./super_select');
const superSelectHtml = renderToHtml(SuperSelect);

import SuperSelectBasic from './super_select_basic';
const superSelectBasicSource = require('!!raw-loader!./super_select_basic');
const superSelectBasicHtml = renderToHtml(SuperSelectBasic);

import SuperSelectComplex from './super_select_complex';
const superSelectComplexSource = require('!!raw-loader!./super_select_complex');
const superSelectComplexHtml = renderToHtml(SuperSelectComplex);

export const SuperSelectExample = {
  title: 'SuperSelect',
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
            <EuiCode>EuiSelect</EuiCode> if you need more customization in
            either the display of the input or option. Simply pass an array of
            option objects:
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
      demo: <SuperSelectComplex />,
    },
    {
      title: 'States',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superSelectSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superSelectHtml,
        },
      ],
      text: (
        <p>
          You can pass the same props as you normally would to{' '}
          <EuiCode>EuiSelect</EuiCode> like disabled, isLoading, compressed,
          etc&hellip;
        </p>
      ),
      props: { EuiSuperSelect },
      demo: <SuperSelect />,
    },
  ],
};
