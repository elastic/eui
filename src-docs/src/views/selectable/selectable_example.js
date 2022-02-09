import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiSelectable,
  EuiSelectableMessage,
  EuiText,
} from '../../../../src/components';

import {
  EuiSelectableOptionProps,
  EuiSelectableOptionsList,
  EuiSelectableSearchProps,
} from './props';

import Selectable from './selectable';
const selectableSource = require('!!raw-loader!./selectable');

import SelectablePopover from './selectable_popover';
const selectablePopoverSource = require('!!raw-loader!./selectable_popover');

import SelectableSearch from './selectable_search';
const selectableSearchSource = require('!!raw-loader!./selectable_search');

import SelectableSingle from './selectable_single';
const selectableSingleSource = require('!!raw-loader!./selectable_single');

import SelectableExclusion from './selectable_exclusion';
const selectableExclusionSource = require('!!raw-loader!./selectable_exclusion');

import SelectableMessages from './selectable_messages';
const selectableMessagesSource = require('!!raw-loader!./selectable_messages');

import SelectableCustomRender from './selectable_custom_render';
const selectableCustomRenderSource = require('!!raw-loader!./selectable_custom_render');

import { EuiCallOut } from '../../../../src/components/call_out';

export const SelectableExample = {
  title: 'Selectable',
  intro: (
    <EuiText>
      <p>
        <strong>EuiSelectable</strong> aims to make the pattern of a selectable
        list (with or without search) consistent across implementations. It is
        the same concept used in{' '}
        <Link to="/forms/combo-box">
          <strong>EuiComboBox</strong>
        </Link>{' '}
        and{' '}
        <Link to="/forms/filter-group">
          <strong>EuiFilterGroup</strong>
        </Link>
        .{' '}
        <strong>
          This is not intended for{' '}
          <Link to="/display/list-group">primary navigation</Link>
        </strong>{' '}
        but can be used to simplify the construction of popover navigational
        menus; i.e. the spaces menu in the{' '}
        <Link to="/layout/header">header</Link>.
      </p>
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
      ],
      text: (
        <Fragment>
          <p>
            At its simplest, <strong>EuiSelectable</strong> requires an array of{' '}
            <EuiCode>options</EuiCode> and an <EuiCode>onChange</EuiCode>{' '}
            handler which passes back the altered{' '}
            <EuiCode>selectedOptions</EuiCode> array. The{' '}
            <EuiCode>children</EuiCode> is a function that return the{' '}
            <EuiCode>list</EuiCode> and <EuiCode>search</EuiCode> nodes.
          </p>
          <EuiCallOut
            iconType="check"
            title="Selected options are based on the checked = on property"
          >
            <p>
              <strong>EuiSelectable</strong> offers the ability to{' '}
              <strong>exclude</strong> selections. Therefore, the{' '}
              <EuiCode>checked</EuiCode> property is one of{' '}
              <EuiCode>{"undefined | 'on' | 'off'"}</EuiCode>,{' '}
              <EuiCode>{"'on'"}</EuiCode> being the default for selected options
              when <EuiCode>allowExclusions = false</EuiCode>.
            </p>
          </EuiCallOut>
        </Fragment>
      ),
      props: {
        EuiSelectable,
        EuiSelectableOptionProps,
        EuiSelectableOptionsList,
      },
      demo: <Selectable />,
      snippet: `<EuiSelectable
  aria-label="Basic example"
  options={[{ label: '' }, { label: '' }]}
  onChange={newOptions => setOptions(newOptions)}
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
      ],
      text: (
        <Fragment>
          <p>
            To add a search component to the list, simply add the{' '}
            <EuiCode>searchable</EuiCode> prop. You can optionally pass in a{' '}
            <EuiCode>searchProps</EuiCode> object which will get passed down to
            the actual <strong>EuiFieldSearch</strong> used. In this example,
            <EuiCode>onSearch</EuiCode> will return a second parameter, enabling
            you to access the list of filtered items
          </p>
          <EuiCallOut
            iconType="search"
            title={
              <>
                The search is performed as a string match against the{' '}
                <EuiCode>option.label</EuiCode> unless a separate{' '}
                <EuiCode>option.searchableLabel</EuiCode> is provided.
              </>
            }
          />
        </Fragment>
      ),
      props: {
        EuiSelectable,
        EuiSelectableOptionProps,
        EuiSelectableOptionsList,
        EuiSelectableSearchProps,
      },
      demo: <SelectableSearch />,
      snippet: `<EuiSelectable
  aria-label="Searchable example"
  searchable
  searchProps={{
    'data-test-subj': dataTestSubj,
  }}
  options={[]}
  onChange={newOptions => setOptions(newOptions)}>
  {(list, search) => (
    <Fragment>
      {search}
      {list}
    </Fragment>
  )}
</EuiSelectable>`,
    },
    {
      title: 'Single selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSingleSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Selection can be restricted to a single option at a time with the{' '}
            <EuiCode>singleSelection</EuiCode> prop. Passing{' '}
            <EuiCode>true</EuiCode> allows for 0 or 1 option to be selected,
            while <EuiCode language="js">{'"always"'}</EuiCode> requires 1
            option to be selected at all times. The default value is{' '}
            <EuiCode>false</EuiCode>.
          </p>
        </Fragment>
      ),
      props: { EuiSelectable },
      demo: <SelectableSingle />,
      snippet: `
      <EuiSelectable
  aria-label="Single selection example"
  options={options}
  onChange={newOptions => setOptions(newOptions)}
  singleSelection={true}
  listProps={{ bordered: true }}>
  {list => list}
</EuiSelectable>`,
    },
    {
      title: 'Sizing and containers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectablePopoverSource,
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
            Be aware that <EuiCode language="sass">display: flex</EuiCode> with
            column layout is applied to the wrapping container. This is so that
            you can opt in to allow the height of the list stretch to fill its
            container. See the flyout example.
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
  aria-label="Example supporting exclusions"
  allowExclusions
  options={[]}
  onChange={newOptions => setOptions(newOptions)}>
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
      ],
      text: (
        <Fragment>
          <p>
            The component comes with pre-composed messages for loading, empty,
            and no search result states. To display your own messages, pass{' '}
            <EuiCode>loadingMessage</EuiCode>, <EuiCode>emptyMessage</EuiCode>,{' '}
            <EuiCode>errorMessage</EuiCode>, or{' '}
            <EuiCode>noMatchesMessage</EuiCode> respectively. Alternatively, you
            can replace the entire <EuiCode>list</EuiCode> display with your own
            message for any state. In which case, we recommend wrapping your
            custom message in an <strong>EuiSelectableMessage</strong>{' '}
            component.
          </p>
        </Fragment>
      ),
      props: { EuiSelectable, EuiSelectableMessage },
      demo: <SelectableMessages />,
      snippet: [
        `<EuiSelectable
  aria-label="Messaging example"
  options={[]}
  listProps={{ bordered: true }}
  isLoading={isLoading}
  loadingMessage={customLoadingMessage}
  emptyMessage={customEmptyMessage}
  errorMessage={hasError ? errorMessage : undefined}
  noMatchesMessage={customNoMatchesMessage}>
  {list => list}
</EuiSelectable>`,
        `<EuiSelectable
  aria-label="Messaging example"
  options={[]}
  listProps={{ bordered: true }}
  isLoading={isLoading}>
  {list => isLoading ? <EuiSelectableMessage bordered={true}>You have no spice</EuiSelectableMessage> : list}
</EuiSelectable>`,
      ],
    },
    {
      title: 'Rendering the options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableCustomRenderSource,
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
            selection by passing{' '}
            <EuiCode language="js">showIcons=false</EuiCode>. This is useful for
            instances that navigate elsewhere on selection or hide their
            selected options from the list.
          </p>
          <h3>Group labels</h3>
          <p>
            An option is allowed to be passed that is just a header for the
            options that follow it. It takes no mouse handlers and renders
            similar to a title. Add one of these by setting the{' '}
            <EuiCode>option.isGroupLabel</EuiCode> to true.{' '}
          </p>
          <h3>Row height and virtualization</h3>
          <p>
            When virtualization is on,{' '}
            <strong>every row must be the same height</strong> in order for the
            list to know how to scroll to the selected or highlighted option. It
            applies the <EuiCode>listProps.rowHeight</EuiCode> (in pixels)
            directly to each option hiding any overflow.
          </p>
          <p>
            If <EuiCode>listProps.isVirtualized</EuiCode> is set to{' '}
            <EuiCode>false</EuiCode>, each row will fit its contents and removes
            all scrolling. Therefore, we recommend having a large enough
            container to accomodate all optons.
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
            To provide data that can be used by the{' '}
            <EuiCode>renderOption</EuiCode> function that does not match the
            standard option API, use <EuiCode>option.data</EuiCode> which will
            make custom data available in the <EuiCode>option</EuiCode>{' '}
            parameter. See the <EuiCode>secondaryContent</EuiCode> configuration
            in the following example.
          </p>
          <p>
            Also, if your custom content is taller than the default{' '}
            <EuiCode>listProps.rowHeight</EuiCode> of <EuiCode>32px</EuiCode>{' '}
            tall, you will need to pass in a custom value to this prop.
          </p>
        </Fragment>
      ),
      demo: <SelectableCustomRender />,
      snippet: `<EuiSelectable
  searchable
  options={[]}
  onChange={newOptions => setOptions(newOptions)}
  height={240}
  renderOption={renderCountryOption}
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
