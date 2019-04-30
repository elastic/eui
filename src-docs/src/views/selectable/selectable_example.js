import React, { Fragment } from 'react';
import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiSelectable,
  EuiSelectableList,
  EuiSelectableMessage,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

import Selectable from './selectable';
const selectableSource = require('!!raw-loader!./selectable');
const selectableHtml = renderToHtml(Selectable);

import SelectablePopover from './selectable_popover';
const selectablePopoverSource = require('!!raw-loader!./selectable_popover');
const selectablePopoverHtml = renderToHtml(SelectablePopover);

import SelectableSearch from './selectable_search';
const selectableSearchSource = require('!!raw-loader!./selectable_search');
const selectableSearchHtml = renderToHtml(SelectableSearch);

import SelectableSingle from './selectable_single';
const selectableSingleSource = require('!!raw-loader!./selectable_single');
const selectableSingleHtml = renderToHtml(SelectableSingle);

import SelectableExclusion from './selectable_exclusion';
const selectableExclusionSource = require('!!raw-loader!./selectable_exclusion');
const selectableExclusionHtml = renderToHtml(SelectableExclusion);

import SelectableMessages from './selectable_messages';
const selectableMessagesSource = require('!!raw-loader!./selectable_messages');
const selectableMessagesHtml = renderToHtml(SelectableMessages);

import SelectableCustomRender from './selectable_custom_render';
const selectableCustomRenderSource = require('!!raw-loader!./selectable_custom_render');
const selectableCustomRenderHtml = renderToHtml(SelectableCustomRender);

export const SelectableExample = {
  title: 'Selectable',
  beta: true,
  intro: (
    <EuiText>
      <p>
        EuiSelectable aims to make the pattern of a selectable list (with or
        without search) consistent across implementations. It is the same
        concept used in <Link to="/forms/combo-box">EuiComboBox</Link> and{' '}
        <Link to="/forms/filter-group">EuiFilterGroup</Link>.{' '}
        <strong>
          This is not intended for{' '}
          <Link to="/display/list-group">primary navigation</Link>
        </strong>{' '}
        but can be used to simplify the construction of popover navigational
        menus; i.e. the spaces menu in the{' '}
        <Link to="/layout/header">header</Link>.
      </p>

      <EuiSpacer size="s" />
    </EuiText>
  ),
  sections: [
    {
      title: 'The basics',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            At its simplest, EuiSelectable requires an array of{' '}
            <EuiCode>options</EuiCode> and an <EuiCode>onChange</EuiCode>{' '}
            handler which passes back the altered{' '}
            <EuiCode>selectedOptions</EuiCode> array.
          </p>
          <h4>
            The <EuiCode>Option</EuiCode> props
          </h4>
          <ul>
            <li>
              <EuiCode>label: string</EuiCode> <strong>required</strong> Must be
              unique across items (todo: fix this)
            </li>
            <li>
              <EuiCode>checked?: &apos;on&apos; | &apos;off&apos;</EuiCode>{' '}
              Leave off to indicate not selected, &apos;on&apos; to indicate
              inclusion and &apos;off&apos; to indicate exclusion
            </li>
            <li>
              <EuiCode>disabled?: boolean</EuiCode>
            </li>
            <li>
              <EuiCode>isGroupLabel?: boolean</EuiCode> Set to true to indicate
              object is just a grouping label, not a selectable item
            </li>
            <li>
              <EuiCode>prepend?: React.ReactNode</EuiCode> Node to add between
              the selection icon and the label
            </li>
            <li>
              <EuiCode>append?: React.ReactNode</EuiCode> Node to add to the far
              right of the item
            </li>
            <li>
              <EuiCode>ref?: () =&gt; void</EuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      props: { EuiSelectable, EuiSelectableList },
      demo: <Selectable />,
      snippet: `<EuiSelectable
  options={[{ label: '' }, { label: '' }]}
  onChange={() => this.onChange(options)}
  listProps={{ bordered: true }}>
  {list => list}
</EuiSelectable>`,
    },
    {
      title: 'Searchable',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSearchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableSearchHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            To add a search component to the list, simply add the{' '}
            <EuiCode>searchable</EuiCode> prop. You can optionally pass in a{' '}
            <EuiCode>searchProps</EuiCode> object which will get passed down to
            the actual EuiFieldSearch used.
          </p>
          <p>
            <strong>
              The search will only perform a string match against the{' '}
              <EuiCode>option.label</EuiCode>.
            </strong>
          </p>
        </Fragment>
      ),
      props: { EuiSelectable },
      demo: <SelectableSearch />,
      snippet: `<EuiSelectable
  searchable
  searchProps={{
    'data-test-subj': dataTestSubj,
  }}
  options={[]}
  onChange={() => this.onChange(options)}>
  {(list, search) => (
    <Fragment>
      {search}
      {list}
    </Fragment>
  )}
</EuiSelectable>`,
    },
    {
      title: 'Single Selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSingleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableSingleHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Selection can be restricted to a single option at a time with the{' '}
            <EuiCode>singleSelection</EuiCode> prop. Passing{' '}
            <EuiCode>true</EuiCode> allows for 0 or 1 option to be selected,
            while
            <EuiCode>`always`</EuiCode> requires 1 option to be selected at all
            times. The default value is <EuiCode>false</EuiCode>.
          </p>
        </Fragment>
      ),
      props: { EuiSelectable },
      demo: <SelectableSingle />,
      snippet: `
      <EuiSelectable
        options={options}
        onChange={this.onChange}
        singleSelection={true}
        listProps={{ bordered: true }}>
        {list => list}
      </EuiSelectable>
    `,
    },
    {
      title: 'Sizing and containers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectablePopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectablePopoverHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            The component&apos;s children, <EuiCode>list, search</EuiCode>, are
            returned via the <EuiCode>children</EuiCode> function, which means
            you can wrap the indivial elements in anything you want.
          </p>
          <h3>Width and height</h3>
          <p>
            The width has been made to always be 100% of its container,
            including stretching the search input. By default, the height is
            capped at showing up to 7.5 items. It shows half of the last one to
            help indicate that there are more options to scroll to. To stretch
            the box to fill its container, pass &apos;full&apos; to the{' '}
            <EuiCode>height</EuiCode> prop.
          </p>
          <h3>Flexbox</h3>
          <p>
            Be aware that <EuiCode>display: flex</EuiCode> with column layout is
            applied to the wrapping container. This is so that you can opt in to
            allow the height of the list stretch to fill its container. See the
            flyout example.
          </p>
        </Fragment>
      ),
      props: { EuiSelectable },
      demo: <SelectablePopover />,
    },
    {
      title: 'Options can be excluded',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableExclusionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableExclusionHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Currently, adding <EuiCode>allowExclusions</EuiCode> simply allows
            cycling through the checked options (on {'-> off ->'} undefined).
            Should this be allowed by holding down a modifier key instead?
          </p>
        </Fragment>
      ),
      props: { EuiSelectable },
      demo: <SelectableExclusion />,
      snippet: `<EuiSelectable
  allowExclusions
  options={[]}
  onChange={() => this.onChange(options)}>
  {list => list}
</EuiSelectable>`,
    },
    {
      title: 'Messages and loading',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableMessagesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableMessagesHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            The component comes with some pre-composed messages for empty and
            loading states. To pass in your own message you can use the
            EuiSelectableMessage component and replace the{' '}
            <EuiCode>list</EuiCode> child with your message.
          </p>
        </Fragment>
      ),
      props: { EuiSelectableMessage },
      demo: <SelectableMessages />,
      snippet: '<EuiSelectableMessage>You have no spice</EuiSelectableMessage>',
    },
    {
      title: 'Rendering the options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableCustomRenderSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableCustomRenderHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            There are two object properties you can add to enhance the content
            of you options, <EuiCode>option.prepend</EuiCode> and{' '}
            <EuiCode>option.append</EuiCode>. These will add nodes before and
            after the option label respectively. They will not be included in
            the searchable content as this only matches against the label
            property.
          </p>
          <h3>Selection icons</h3>
          <p>
            You can choose not to display the check and cross icons indicating
            selection by passing <EuiCode>showIcons=false</EuiCode>. This is
            useful for instances that navigate elsewhere on selection or hide
            their selected options from the list.
          </p>
          <h3>Group labels</h3>
          <p>
            An option is allowed to be passed that is just a header for the
            options that follow it. It takes no mouse handlers and renders
            similar to a title. Add one of these by setting the{' '}
            <EuiCode>option.isGroupLabel</EuiCode> to true.{' '}
          </p>
          <h3>Custom content</h3>
          <p>
            While it is best to stick to the{' '}
            <EuiCode>option.label, option.append, option.prepend</EuiCode> and{' '}
            <EuiCode>showIcons</EuiCode> props, you can pass a custom{' '}
            <EuiCode>renderOption</EuiCode> function which will pass back the
            single <EuiCode>option</EuiCode> object and the{' '}
            <EuiCode>searchValue</EuiCode> to use for highlighting.
          </p>
          <p>
            In order for the list to know how to scroll to the selected or
            highlighted option, it must also know the height of the rows. It
            applies this pixel height directly to options. If your custom
            content is taller than the default of <EuiCode>32px</EuiCode> tall,
            you will need to recalculate this height and apply it via{' '}
            <EuiCode>listProps.rowHeight</EuiCode>.
          </p>
          <p>
            <strong>Every row must be the same height.</strong>
          </p>
        </Fragment>
      ),
      demo: <SelectableCustomRender />,
      snippet: `<EuiSelectable
  searchable
  options={[]}
  onChange={() => this.onChange(options)}
  height={240}
  renderOption={this.renderCountryOption}
  listProps={{
    rowHeight: 50,
    showIcons: false,
  }}
>
  {(list, search) => (
    <Fragment>
      {search}
      {list}
    </Fragment>
  )}
</EuiSelectable>`,
    },
  ],
};
