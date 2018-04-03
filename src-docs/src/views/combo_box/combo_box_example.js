import React, { Fragment } from 'react';

import {
  Link,
} from 'react-router';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiComboBox,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

import ComboBox from './combo_box';
const comboBoxSource = require('!!raw-loader!./combo_box');
const comboBoxHtml = renderToHtml(ComboBox);

import Containers from './containers';
const containersSource = require('!!raw-loader!./containers');
const containersHtml = renderToHtml(Containers);

import Colors from './colors';
const colorsSource = require('!!raw-loader!./colors');
const colorsHtml = renderToHtml(Colors);

import RenderOption from './render_option';
const renderOptionSource = require('!!raw-loader!./render_option');
const renderOptionHtml = renderToHtml(RenderOption);

import Groups from './groups';
const groupsSource = require('!!raw-loader!./groups');
const groupsHtml = renderToHtml(Groups);

import SingleSelection from './single_selection';
const singleSelectionSource = require('!!raw-loader!./single_selection');
const singleSelectionHtml = renderToHtml(SingleSelection);

import DisallowCustomOptions from './disallow_custom_options';
const disallowCustomOptionsSource = require('!!raw-loader!./disallow_custom_options');
const disallowCustomOptionsHtml = renderToHtml(DisallowCustomOptions);

import CustomOptionsOnly from './custom_options_only';
const customOptionsOnlySource = require('!!raw-loader!./custom_options_only');
const customOptionsOnlyHtml = renderToHtml(CustomOptionsOnly);

import Async from './async';
const asyncSource = require('!!raw-loader!./async');
const asyncHtml = renderToHtml(Async);

export const ComboBoxExample = {
  title: 'Combo Box',
  intro: (
    <Fragment>
      <EuiText>
        <p>
          Use a <EuiCode>EuiComboBox</EuiCode> when the input has so many options that the user
          needs to be able to search them, the user needs to be able to select multiple options,
          and/or the user should have the ability to specify
          a custom value in addition to selecting from a predetermined list.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiCallOut
        title="No duplicate option labels allowed"
        color="warning"
      >
        <p>
          The combo box will have errors if any of the options you pass to it share the same label
          property. It&rsquo;s OK if options have duplicate values, though. This is because the label
          is the only thing the combo box is concerned about, since this is what the user sees
          and what is matched against when the user searches.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: comboBoxSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: comboBoxHtml,
    }],
    props: { EuiComboBox },
    demo: <ComboBox />,
  }, {
    title: 'Containers',
    source: [{
      type: GuideSectionTypes.JS,
      code: containersSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: containersHtml,
    }],
    text: (
      <p>
        This example demonstrates how the combo box works within containers. Because this component
        uses portals, it&rsquo;s important that it works within other portal-using components.
      </p>
    ),
    props: { EuiComboBox },
    demo: <Containers />,
  }, {
    title: 'Pill colors',
    source: [{
      type: GuideSectionTypes.JS,
      code: colorsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorsHtml,
    }],
    text: (
      <p>
        Useful for visualization or tagging systems. You can also pass a color in
        your option list. The color can be a hex value
        (like <EuiCode>#000</EuiCode>) or any other named color value accepted by
        the <Link to="/display/badge">Badge</Link> component.
      </p>
    ),
    props: { EuiComboBox },
    demo: <Colors />,
  }, {
    title: 'Option rendering',
    source: [{
      type: GuideSectionTypes.JS,
      code: renderOptionSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: renderOptionHtml,
    }],
    text: (
      <p>
        You can provide a <EuiCode>renderOption</EuiCode> prop which will accept <EuiCode>option</EuiCode>
        and <EuiCode>searchValue</EuiCode> arguments. Use the <EuiCode>value</EuiCode> prop of the
        <EuiCode>option</EuiCode> object to store metadata about the option for use in this callback.
      </p>
    ),
    props: { EuiComboBox },
    demo: <RenderOption />,
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
    title: 'Single selection',
    source: [{
      type: GuideSectionTypes.JS,
      code: singleSelectionSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: singleSelectionHtml,
    }],
    text: (
      <p>
        To only allow the user to select a single option, provide
        the <EuiCode>singleSelection</EuiCode> prop.
      </p>
    ),
    props: { EuiComboBox },
    demo: <SingleSelection />,
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
    title: 'Custom options only, with validation',
    source: [{
      type: GuideSectionTypes.JS,
      code: customOptionsOnlySource,
    }, {
      type: GuideSectionTypes.HTML,
      code: customOptionsOnlyHtml,
    }],
    text: (
      <p>
        Alternatively, provide thhe <EuiCode>noSuggestions</EuiCode> prop to hide the suggestions list
        and <em>only</em> allow the creation of custom options.
      </p>
    ),
    props: { EuiComboBox },
    demo: <CustomOptionsOnly />,
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
