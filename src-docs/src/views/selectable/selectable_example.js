import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiSelectable,
  EuiSelectableMessage,
  EuiText,
  EuiSpacer,
  EuiSelectableTemplateSitewide,
  EuiCodeBlock,
  EuiAccordion,
} from '../../../../src/components';

import {
  EuiSelectableOptionProps,
  EuiSelectableOptionsList,
  Options,
  MetaData,
} from './props';

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

import SearchOption from './sitewide_option';
import Search from './search';
import { EuiCallOut } from '../../../../src/components/call_out';
const searchSource = require('!!raw-loader!./search');
const searchHtml = renderToHtml(Search);

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
        {
          type: GuideSectionTypes.HTML,
          code: selectableHtml,
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
            the actual <strong>EuiFieldSearch</strong> used.
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
        {
          type: GuideSectionTypes.HTML,
          code: selectableMessagesHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            The component comes with pre-composed messages for loading, empty,
            and no search result states. To display your own messages, pass{' '}
            <EuiCode>loadingMessage</EuiCode>, <EuiCode>emptyMessage</EuiCode>,
            or <EuiCode>noMatchesMessage</EuiCode> respectively. Alternatively,
            you can replace the entire <EuiCode>list</EuiCode> display with your
            own message for any state. In which case, we recommend wrapping your
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
    {
      title: 'Sitewide search template',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: searchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: searchHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>EuiSelectableTemplateSitewide</strong> is an opinionated
            wrapper around <strong>EuiSelectable</strong> to provide a reusable
            template across the Elastic products that will share the same global
            search capabilities. It creates the search input that triggers a
            popover containing the list of options.
          </p>
          <h3>Search input</h3>
          <p>
            The search ability of EuiSelectable is still hooked up to the
            options provided. It will highlight the portion of the label that
            matches the search string.
          </p>
          <EuiCallOut
            size="s"
            iconType="keyboardShortcut"
            title="The demo showcases the possibility to allow a keyboard shortcut (command + K) to trigger the search input focus, but the template does not come with this ability."
          />
          <h3>Popover</h3>
          <p>
            The popover itself allows you to display a{' '}
            <EuiCode>popoverTitle</EuiCode> node,{' '}
            <EuiCode>popoverFooter</EuiCode> node, or pass any of the{' '}
            <EuiCode>popoverProps</EuiCode> to the{' '}
            <Link to="/layout/popover">
              <strong>EuiPopover</strong>
            </Link>{' '}
            component.
          </p>
          <h3>Options</h3>
          <p>
            The <EuiCode>options</EuiCode> are the most opinionated portion of
            the template. Their display is determined by the props passed in and
            extends the normal <EuiCode>EuiSelectable.option</EuiCode> type. All
            parts are optional with the exception of the label (B).
          </p>

          <SearchOption />
          <EuiSpacer size="xs" />
          <EuiAccordion
            id="optionSnippet"
            buttonContent={<small>Code snippet</small>}
          >
            <EuiSpacer size="xs" />
            <EuiCodeBlock language="ts" isCopyable paddingSize="s">
              {`const options: EuiSelectableTemplateSitewideOption[] = [
  {
    label: 'Label',
    icon: {
      type: 'logoKibana'
    }
    avatar: {
      name: 'Default',
    },
    meta: [
      {
        text: 'Meta',
        type: 'application',
      },
      {
        text: 'Deployment',
        type: 'deployment',
      },
      {
        text: 'Default display',
      },
    ],
  }
]`}
            </EuiCodeBlock>
          </EuiAccordion>
          <EuiSpacer />
          <ul style={{ listStyleType: 'upper-alpha' }}>
            <li>
              <EuiCode>label</EuiCode> (required): The name of the item itself.
              By default, the search box will only use this to match the search
              term against, but you can supply a separate{' '}
              <EuiCode>searchableLabel</EuiCode> that combines the label and
              meta data to search on.
            </li>
            <li>
              <EuiCode>icon</EuiCode>: Only display the solution or
              application&apos;s logo when the option links to the application
              itself (Dashboard app) and not lower-level items such as
              individual dashboards. Size and color are predetermined but can be
              overridden.
            </li>
            <li>
              <EuiCode>avatar</EuiCode>: Represents the Kibana Space that the
              item is located in, <strong>if</strong> multiple spaces are
              present. Type and size are predetermined but can be overridden.
            </li>
            <li>
              <EuiCode>meta</EuiCode>: This bottom line should only contain
              items if the option is a lower-level item (individual dashboard).
              The display of which defaults to simple text, but if you pass one
              of the predetermined <EuiCode>types</EuiCode>, they will be styled
              according to the design pattern.
            </li>
          </ul>
          <EuiCallOut
            size="s"
            iconType="clock"
            title="The demo shows how you can temporarily replace the icon for a subset of options to display a short list of recently viewed options."
          />
          <h3>Selection</h3>
          <p>
            The options themselves are simply rendered as list items with no
            interactive behavior like buttons or links. You must handle the
            interaction when the component passes back the altered array of
            options with the selected option having{' '}
            <EuiCode>{"checked: 'on'"}</EuiCode>.
          </p>
          <h3>Popover toggle and responsiveness</h3>
          <p>
            The default display is to render the search input inline which
            triggers a popover with the results. Or you can decide to trigger
            the whole selectable component from a single button. By passing your
            own button to <EuiCode>popoverButton</EuiCode>, the component will
            use this to trigger the popover, putting the search inside.
          </p>
          <p>
            This is a great way to handle reducing the size of the component for
            smaller screens. The component offers a helper prop called{' '}
            <EuiCode>popoverButtonBreakpoints</EuiCode> which will only render
            the <EuiCode>popoverButton</EuiCode> if the window size matches
            named breakpoint(s).
          </p>
        </Fragment>
      ),
      props: { EuiSelectableTemplateSitewide, Options, MetaData },
      demo: <Search />,
    },
  ],
};
