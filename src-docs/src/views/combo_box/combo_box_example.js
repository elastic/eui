import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiComboBox,
} from '../../../../src/components';

import ComboBox from './combo_box';
const comboBoxSource = require('!!raw-loader!./combo_box');
const comboBoxHtml = renderToHtml(ComboBox);

import Groups from './groups';
const groupsSource = require('!!raw-loader!./groups');
const groupsHtml = renderToHtml(Groups);

import DisallowCustomOptions from './disallow_custom_options';
const disallowCustomOptionsSource = require('!!raw-loader!./disallow_custom_options');
const disallowCustomOptionsHtml = renderToHtml(DisallowCustomOptions);

import Async from './async';
const asyncSource = require('!!raw-loader!./async');
const asyncHtml = renderToHtml(Async);

export const ComboBoxExample = {
  title: 'Combo Box',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: comboBoxSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: comboBoxHtml,
    }],
    text: (
      <p>
        Use a <EuiCode>EuiComboBox</EuiCode> when the input has so many options that the user
        needs to be able to search them, the user needs to be able to select multiple options,
        and/or the user should have the ability to specify
        a custom value in addition to selecting from a predetermined list.
      </p>
    ),
    props: { EuiComboBox },
    demo: <ComboBox />,
  }, {
    title: 'Groups',
    source: [{
      type: GuideSectionTypes.JS,
      code: groupsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: groupsHtml,
    }],
    text: (
      <p>
        You can group options together. The groups <em>won&rsquo;t</em> match against the search value.
      </p>
    ),
    props: { EuiComboBox },
    demo: <Groups />,
  }, {
    title: 'Disallowing custom options',
    source: [{
      type: GuideSectionTypes.JS,
      code: disallowCustomOptionsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: disallowCustomOptionsHtml,
    }],
    text: (
      <p>
        Leave out the <EuiCode>onCreateOption</EuiCode> prop to disallow the creation of custom options.
      </p>
    ),
    props: { EuiComboBox },
    demo: <DisallowCustomOptions />,
  }, {
    title: 'Async',
    source: [{
      type: GuideSectionTypes.JS,
      code: asyncSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: asyncHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>onSearchChange</EuiCode> code to handle searches asynchronously. Use the
        <EuiCode>isLoading</EuiCode> prop to let the user know that something async is happening.
      </p>
    ),
    props: { EuiComboBox },
    demo: <Async />,
  }],
};
