import React from 'react';

import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiLink,
  EuiCode,
  EuiComboBox,
  EuiText,
  EuiCallOut,
} from '../../../../src/components';

import { EuiComboBoxOptionOption } from '!!prop-loader!../../../../src/components/combo_box/types';

import ComboBox from './combo_box';
const comboBoxSource = require('!!raw-loader!./combo_box');
const comboBoxSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select or create options"
  options={[
    {
      label: 'Titan',
    },
  ]}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import Containers from './containers';
const containersSource = require('!!raw-loader!./containers');

import Colors from './colors';
const colorsSource = require('!!raw-loader!./colors');
const colorsSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select or create options"
  options={[
    {
      label: 'Titan',
      color: "#ff0000",
    },
  ]}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import OptionPrependAppend from './option_prepend_append';
const optionPrependAppendSource = require('!!raw-loader!./option_prepend_append');
const optionsPrependAppendSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select or create options"
  options={[
    {
      label: 'Titan',
      prepend: <EuiIcon type="bell" size="s" />,
    },
    {
      label: 'Mimas',
      append: '(5)',
    },
  ]}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import RenderOption from './render_option';
const renderOptionSource = require('!!raw-loader!./render_option');
const renderOptionSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select or create options"
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  renderOption={renderOption}
/>`;

import Groups from './groups';
const groupsSource = require('!!raw-loader!./groups');
const groupsSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="These options are grouped"
  options={[colorGroup, soundGroup]}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
/>`;

import SingleSelection from './single_selection';
import SingleSelectionPrepend from './single_selection_prepend';
const singleSelectionSource = require('!!raw-loader!./single_selection');
const singleSelectionPrependSource = require('!!raw-loader!./single_selection_prepend');
const singleSelectionSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select a single option"
  singleSelection={{ asPlainText: true }}
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
/>`;
const singleSelectionPrependSnippet = `<EuiComboBox
  prepend="Prepend"
  singleSelection={{ asPlainText: true }}
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
/>`;

import SingleSelectionCustomOptions from './single_selection_custom_options';
const singleSelectionCustomOptionsSource = require('!!raw-loader!./single_selection_custom_options');
const singleSelectionCustomOptionsSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select a single option"
  singleSelection={{ asPlainText: true }}
  options={options}
  selectedOptions={selectedOptions}
  onCreateOption={onCreateOption}
  onChange={onChange}
/>`;

import DisallowCustomOptions from './disallow_custom_options';
const disallowCustomOptionsSource = require('!!raw-loader!./disallow_custom_options');
const disallowCustomOptionsSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select one or more options"
  options={options}
  onChange={onChange}
  onSearchChange={onSearchChange}
/>`;

import CustomOptionsOnly from './custom_options_only';
const customOptionsOnlySource = require('!!raw-loader!./custom_options_only');
const customOptionsOnlySnippet = `<EuiComboBox
  noSuggestions
  placeholder="Create some tags (letters only)"
  selectedOptions={selectedOptions}
  onCreateOption={onCreateOption}
  onChange={onChange}
  onSearchChange={onSearchChange}
  isInvalid={isInvalid}
/>`;

import Async from './async';
const asyncSource = require('!!raw-loader!./async');
const asyncSnippet = `<EuiComboBox
  placeholder="Search asynchronously"
  async
  aria-label="Accessible screen reader label"
  options={options}
  selectedOptions={selectedOptions}
  isLoading={isLoading}
  onChange={onChange}
  onSearchChange={onSearchChange}
  onCreateOption={onCreateOption}
/>`;

import Virtualized from './virtualized';
const virtualizedSource = require('!!raw-loader!./virtualized');
const virtualizedSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select one or more options"
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
/>`;

import CaseSensitive from './case_sensitive';
const caseSensitiveSource = require('!!raw-loader!./case_sensitive');
const caseSensitiveSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select or create options"
  options={options}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isCaseSensitive
/>`;

import Disabled from './disabled';
const disabledSource = require('!!raw-loader!./disabled');
const disabledSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select or create options"
  options={options}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isDisabled
/>`;

import Delimiter from './combo_box_delimiter';
const delimiterSource = require('!!raw-loader!./combo_box_delimiter');
const delimiterSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select or create options"
  options={options}
  delimiter=","
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import StartingWith from './startingWith';
const startingWithSource = require('!!raw-loader!./startingWith');
const startingWithSnippet = `<EuiComboBox
  aria-label="Accessible screen reader label"
  placeholder="Select or create options"
  sortMatchesBy="startsWith"
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import DuplicateOptions from './combo_box_duplicates';
const duplicateOptionsSource = require('!!raw-loader!./combo_box_duplicates');
const duplicateOptionsSnippet = `const options = [{
  label: 'Label',
  key: 'label1',
},
{
  label: 'Label',
  key: 'Label2',
}]`;

import Labelledby from './combo_box_labelledby';
const labelledbySource = require('!!raw-loader!./combo_box_labelledby');
const labelledbySnippet = `<EuiComboBox
  aria-labelledby={generatedId}
  placeholder="Select or create options"
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

export const ComboBoxExample = {
  title: 'Combo box',
  intro: (
    <EuiText>
      <p>
        Use a <strong>EuiComboBox</strong> when the input has so many options
        that the user needs to be able to search them, the user needs to be able
        to select multiple options, and/or the user should have the ability to
        specify a custom value in addition to selecting from a predetermined
        list. If you're unsure of which selection component to use, see{' '}
        <EuiLink
          href="https://github.com/elastic/eui/discussions/7049"
          target="_blank"
        >
          EUI's in-depth guide to selection components
        </EuiLink>{' '}
        for more information.
      </p>
      <EuiCallOut
        iconType="accessibility"
        title={
          <>
            You must add an accessible label to each instance of{' '}
            <strong>EuiComboBox</strong>
          </>
        }
      >
        Labels can be created by wrapping the combo box in an{' '}
        <strong>EuiFormRow</strong> with a <EuiCode>label</EuiCode>, adding an{' '}
        <EuiCode>aria-label</EuiCode> prop, or passing a text node ID to the{' '}
        <EuiCode>aria-labelledby</EuiCode> prop.
      </EuiCallOut>
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: comboBoxSource,
        },
      ],
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: comboBoxSnippet,
      demo: <ComboBox />,
    },
    {
      title: 'Disabled',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: disabledSource,
        },
      ],
      text: (
        <p>
          Set the prop <EuiCode>isDisabled</EuiCode> to make the combo box
          disabled.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: disabledSnippet,
      demo: <Disabled />,
    },
    {
      title: 'Case-sensitive matching',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: caseSensitiveSource,
        },
      ],
      text: (
        <p>
          Set the prop <EuiCode>isCaseSensitive</EuiCode> to make the combo box
          option matching case sensitive.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: caseSensitiveSnippet,
      demo: <CaseSensitive />,
    },
    {
      title: 'Virtualized',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: virtualizedSource,
        },
      ],
      text: (
        <p>
          <strong>EuiComboBoxList</strong> uses{' '}
          <EuiLink href="https://github.com/bvaughn/react-window">
            react-window
          </EuiLink>{' '}
          to only render visible options to be super fast no matter how many
          options there are.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: virtualizedSnippet,
      demo: <Virtualized />,
    },
    {
      title: 'Containers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: containersSource,
        },
      ],
      text: (
        <p>
          This example demonstrates how the combo box works within containers.
          Because this component uses portals, it&rsquo;s important that it
          works within other portal-using components.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      demo: <Containers />,
    },
    {
      title: 'Pill colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorsSource,
        },
      ],
      text: (
        <p>
          Useful for visualization or tagging systems. You can also pass a color
          in your option list. The color can be a hex value (like{' '}
          <EuiCode>#000</EuiCode>) or any other named color value accepted by
          the{' '}
          <Link to="/display/badge">
            <strong>EuiBadge</strong>
          </Link>{' '}
          component.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: colorsSnippet,
      demo: <Colors />,
    },
    {
      title: 'Option rendering',
      text: (
        <p>
          There are two object properties you can add to enhance the content of
          your options, <EuiCode>option.prepend</EuiCode> and{' '}
          <EuiCode>option.append</EuiCode>. These will add nodes before and
          after the option label respectively, to both the dropdown option and
          selected pill. They will not be included in the searchable content as
          this only matches against the label property.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: optionsPrependAppendSnippet,
      demo: <OptionPrependAppend />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: optionPrependAppendSource,
        },
      ],
    },
    {
      text: (
        <>
          <h3 id="renderOption">Custom dropdown content</h3>
          <p>
            While it is best to stick to the <EuiCode>option.label</EuiCode>,{' '}
            <EuiCode>option.append</EuiCode>, and{' '}
            <EuiCode>option.prepend</EuiCode> props, you can pass a custom{' '}
            <EuiCode>renderOption</EuiCode> function which will pass back the
            single option <EuiCode>option</EuiCode> and the{' '}
            <EuiCode>searchValue</EuiCode> to use for highlighting.
          </p>
          <p>
            You can use the <EuiCode>value</EuiCode> prop of the{' '}
            <EuiCode>option</EuiCode> object to store metadata about the option
            for use in this callback.
          </p>
          <p>
            <strong>Note:</strong> virtualization (above) requires that each
            option have the same height. Ensure that you render the options so
            that wrapping text is truncated instead of causing the height of the
            option to change.
          </p>
        </>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: renderOptionSnippet,
      demo: <RenderOption />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: renderOptionSource,
        },
      ],
    },
    {
      title: 'Groups',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: groupsSource,
        },
      ],
      text: (
        <p>
          You can group options together. The groups <em>won&rsquo;t</em> match
          against the search value.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: groupsSnippet,
      demo: <Groups />,
    },
    {
      title: 'Single selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singleSelectionSource,
        },
      ],
      text: (
        <>
          <p>
            To only allow the user to select a single option, provide the{' '}
            <EuiCode>singleSelection</EuiCode> prop. You may want to render the
            selected option as plain text instead of pill form. To do this, pass{' '}
            <EuiCode language="js">
              {'singleSelection={{ asPlainText: true }}'}
            </EuiCode>
          </p>
        </>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: singleSelectionSnippet,
      demo: <SingleSelection />,
    },
    {
      title: 'Single selection with prepended label',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singleSelectionPrependSource,
        },
      ],
      text: (
        <>
          <p>
            <EuiCode>append</EuiCode> and <EuiCode>prepend</EuiCode> props only
            work if
            <EuiCode>singleSelection</EuiCode> prop is not set to{' '}
            <EuiCode>false</EuiCode> to avoid multi-lines that makes combobox
            height greater than that of <EuiCode>append</EuiCode> and{' '}
            <EuiCode>prepend</EuiCode>.
          </p>
        </>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: singleSelectionPrependSnippet,
      demo: <SingleSelectionPrepend />,
    },
    {
      title: 'Single selection with custom options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singleSelectionCustomOptionsSource,
        },
      ],
      text: (
        <>
          <p>
            You can allow the user to select a single option and also allow the
            creation of custom options. To do that, use the{' '}
            <EuiCode>singleSelection</EuiCode> in conjunction with the{' '}
            <EuiCode>onCreateOption</EuiCode> prop.
          </p>
          <p>
            <strong>Note:</strong> Creating custom options might not be obvious
            to the user, so provide help text explaining that this option is
            available. You can also customize the custom option text by passing
            a text to <EuiCode>customOptionText</EuiCode> prop.
          </p>
        </>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: singleSelectionCustomOptionsSnippet,
      demo: <SingleSelectionCustomOptions />,
    },
    {
      title: 'Disallowing custom options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: disallowCustomOptionsSource,
        },
      ],
      text: (
        <p>
          Leave out the <EuiCode>onCreateOption</EuiCode> prop to disallow the
          creation of custom options.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: disallowCustomOptionsSnippet,
      demo: <DisallowCustomOptions />,
    },
    {
      title: 'Custom options only, with validation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customOptionsOnlySource,
        },
      ],
      text: (
        <p>
          Alternatively, provide the <EuiCode>noSuggestions</EuiCode> prop to
          hide the suggestions list and <em>only</em> allow the creation of
          custom options.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: customOptionsOnlySnippet,
      demo: <CustomOptionsOnly />,
    },
    {
      title: 'Async',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: asyncSource,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>onSearchChange</EuiCode> code to handle searches
          asynchronously. Use the
          <EuiCode>isLoading</EuiCode> prop to let the user know that something
          async is happening.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: asyncSnippet,
      demo: <Async />,
    },
    {
      title: 'With delimiter',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: delimiterSource,
        },
      ],
      text: (
        <p>
          Pass a unique character to the <EuiCode>delimiter</EuiCode> prop to
          aid in option creation. This is best used when knowing that content
          may be pasted from elsewhere such as a comma separated list.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: delimiterSnippet,
      demo: <Delimiter />,
    },
    {
      title: 'Sorting matches',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: startingWithSource,
        },
      ],
      text: (
        <p>
          By default, the matched options will keep their original sort order.
          If you would like to prioritize those options that{' '}
          <strong>start with</strong> the searched string, pass{' '}
          <EuiCode language="js">sortMatchesBy=&quot;startsWith&quot;</EuiCode>
          to display those options at the top of the list.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      snippet: startingWithSnippet,
      demo: <StartingWith />,
    },
    {
      title: 'Duplicate labels',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: duplicateOptionsSource,
        },
      ],
      text: (
        <p>
          In general, it is not recommended to use duplicate labels on the
          options because the user has no way to distinguish between them. If
          you need duplicate labels, you will need to add a unique{' '}
          <EuiCode language="js">key</EuiCode> for each option.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      demo: <DuplicateOptions />,
      snippet: duplicateOptionsSnippet,
    },
    {
      title: 'Accessible label with aria-labelledby',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: labelledbySource,
        },
      ],
      text: (
        <p>
          Sometimes it&rsquo;s preferable to label a combobox with a heading or
          paragraph. You can easily create a unique ID for a text element using
          the <a href="/#/utilities/html-id-generator">HTML ID generator</a>,{' '}
          then pass your unique ID to the <EuiCode>aria-labelledby</EuiCode>{' '}
          prop.
        </p>
      ),
      props: { EuiComboBox, EuiComboBoxOptionOption },
      demo: <Labelledby />,
      snippet: labelledbySnippet,
    },
  ],
};
