import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiSelectable,
  EuiSelectableMessage,
  EuiText,
  EuiCallOut,
} from '../../../../src';

import {
  EuiSelectableOptionProps,
  EuiSelectableOptionsList,
  EuiSelectableSearchProps,
} from './props';
import Selectable from './selectable';
const selectableSource = require('!!raw-loader!./selectable');

import SelectableSearch from './selectable_search';
const selectableSearchSource = require('!!raw-loader!./selectable_search');

import SelectableSingle from './selectable_single';
const selectableSingleSource = require('!!raw-loader!./selectable_single');

import SelectableExclusion from './selectable_exclusion';
const selectableExclusionSource = require('!!raw-loader!./selectable_exclusion');

import SelectableMessages from './selectable_messages';
const selectableMessagesSource = require('!!raw-loader!./selectable_messages');

import SelectableSizing from './selectable_sizing';
const selectableSizingSource = require('!!raw-loader!./selectable_sizing');

import SelectableCustomRender from './selectable_custom_render';
const selectableCustomRenderSource = require('!!raw-loader!./selectable_custom_render');

const props = {
  EuiSelectable,
  EuiSelectableOptionProps,
  EuiSelectableOptionsList,
  EuiSelectableSearchProps,
};

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
          type: GuideSectionTypes.TSX,
          code: selectableSource,
        },
      ],
      text: (
        <>
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
        </>
      ),
      props,
      demo: <Selectable />,
      snippet: `<EuiSelectable
  aria-label="Basic example"
  options={[{ label: '' }, { label: '' }]}
  onChange={newOptions => setOptions(newOptions)}
  listProps={{ bordered: true }}
>
  {list => list}
</EuiSelectable>`,
    },
    {
      title: 'Searchable',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: selectableSearchSource,
        },
      ],
      text: (
        <>
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
        </>
      ),
      props,
      demo: <SelectableSearch />,
      snippet: `<EuiSelectable
  aria-label="Searchable example"
  options={[
    { label: 'Alpha' },
    { label: 'B', searchableLabel: 'Beta' },
  ]}
  onChange={newOptions => setOptions(newOptions)}
  searchable
  searchProps={{
    'data-test-subj': dataTestSubj,
  }}
>
  {(list, search) => (
    <>
      {search}
      {list}
    </>
  )}
</EuiSelectable>`,
    },
    {
      title: 'Single selection',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: selectableSingleSource,
        },
      ],
      text: (
        <>
          <p>
            Selection can be restricted to a single option at a time with the{' '}
            <EuiCode>singleSelection</EuiCode> prop. Passing{' '}
            <EuiCode>true</EuiCode> allows for 0 or 1 option to be selected,
            while <EuiCode language="js">{'"always"'}</EuiCode> requires 1
            option to be selected at all times. The default value is{' '}
            <EuiCode>false</EuiCode>.
          </p>
        </>
      ),
      props,
      demo: <SelectableSingle />,
      snippet: [
        `<EuiSelectable
  aria-label="Single selection example"
  options={[]}
  onChange={newOptions => setOptions(newOptions)}
  singleSelection
>
  {list => list}
</EuiSelectable>`,
        `<EuiSelectable
  aria-label="Single selection always example"
  options={[]}
  onChange={newOptions => setOptions(newOptions)}
  singleSelection="always"
>
  {list => list}
</EuiSelectable>`,
      ],
    },
    {
      title: 'Options can be excluded',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: selectableExclusionSource,
        },
      ],
      text: (
        <>
          <p>
            Currently, adding <EuiCode>allowExclusions</EuiCode> simply allows
            cycling through the checked options (on {'-> off ->'} undefined).
          </p>
        </>
      ),
      props,
      demo: <SelectableExclusion />,
      snippet: `<EuiSelectable
  aria-label="Example supporting exclusions"
  options={[]}
  onChange={newOptions => setOptions(newOptions)}
  allowExclusions
>
  {list => list}
</EuiSelectable>`,
    },
    {
      title: 'Messages and loading',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: selectableMessagesSource,
        },
      ],
      text: (
        <>
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
        </>
      ),
      props: { EuiSelectableMessage, ...props },
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
  noMatchesMessage={customNoMatchesMessage}
>
  {list => list}
</EuiSelectable>`,
        `<EuiSelectable
  aria-label="Messaging example"
  options={[]}
  isLoading={isLoading}
>
  {list => isLoading
    ? <EuiSelectableMessage bordered={true}>You have no spice</EuiSelectableMessage>
    : list
  }
</EuiSelectable>`,
      ],
    },
    {
      title: 'Sizing and containers',
      text: (
        <>
          <p>
            The component&apos;s children, <EuiCode>list, search</EuiCode>, are
            returned via the <EuiCode>children</EuiCode> function, which means
            you can wrap the indivial elements in anything you want.
          </p>
          <h3>Width and height</h3>
          <p>
            The width has been made to always be 100% of its container,
            including stretching the search input. When used inside of{' '}
            <Link to="/layout/popover">
              <strong>EuiPopover</strong>
            </Link>
            , we recommend setting a width (or min/max values) via CSS on the
            element containing the list to avoid expansion and contraction. By
            default, the height is capped at showing up to 7.5 items. It shows
            half of the last one to help indicate that there are more options to
            scroll to. To stretch the box to fill its container, pass
            &apos;full&apos; to the <EuiCode>height</EuiCode> prop.
          </p>
          <h3>Flexbox</h3>
          <p>
            Be aware that <EuiCode language="sass">display: flex</EuiCode> with
            column layout is applied to the wrapping container. This is so that
            you can opt in to allow the height of the list stretch to fill its
            container. See the flyout example.
          </p>
        </>
      ),
      demo: <SelectableSizing />,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: selectableSizingSource,
        },
      ],
      props,
      snippet: `<EuiSelectable
  options={[]}
  onChange={newOptions => setOptions(newOptions)}
  height="full"
  listProps={{
    bordered: true,
    paddingSize: 'none',
  }}
>
  {list => list}
</EuiSelectable>`,
    },
    {
      title: 'Rendering the options',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: selectableCustomRenderSource,
        },
      ],
      text: (
        <>
          <p>
            There are two object properties you can add to enhance the content
            of your options, <EuiCode>option.prepend</EuiCode> and{' '}
            <EuiCode>option.append</EuiCode>. These will add nodes before and
            after the option label respectively. They will not be included in
            the searchable content as this only matches against the label
            property.
          </p>
          <h3>Selection icons</h3>
          <p>
            You can choose not to display the check and cross icons indicating
            selection by setting{' '}
            <EuiCode language="js">listProps.showIcons</EuiCode> to false. This
            is useful for instances that navigate elsewhere on selection or hide
            their selected options from the list.
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
            container to accommodate all options. You can also remove truncation
            by setting <EuiCode>{'textWrap="wrap"'}</EuiCode> when
            virtualization is off.
          </p>
          <h3>Custom content</h3>
          <p>
            While it is best to stick to the{' '}
            <EuiCode>option.label, option.append, option.prepend</EuiCode> and{' '}
            <EuiCode>listProps.showIcons</EuiCode> props, you can pass a custom{' '}
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
        </>
      ),
      demo: <SelectableCustomRender />,
      snippet: `<EuiSelectable
  options={[]}
  onChange={newOptions => setOptions(newOptions)}
  renderOption={renderCountryOption}
  listProps={{
    rowHeight: 50,
    showIcons: false,
  }}
>
  {list => list}
</EuiSelectable>`,
      props,
    },
  ],
};
