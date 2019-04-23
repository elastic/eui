import React, { Fragment } from 'react';

import {
} from 'react-router';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiFilterGroup,
  EuiFilterButton,
  EuiFilterSelectItem,
} from '../../../../src/components';

import FilterGroup from './filter_group';
const filterGroupSource = require('!!raw-loader!./filter_group');
const filterGroupHtml = renderToHtml(FilterGroup);

import FilterGroupSimple from './filter_group_simple';
const filterGroupSimpleSource = require('!!raw-loader!./filter_group_simple');
const filterGroupSimpleHtml = renderToHtml(FilterGroup);

import FilterGroupMulti from './filter_group_multi';
const filterGroupMultiSource = require('!!raw-loader!./filter_group_multi');
const filterGroupMultiHtml = renderToHtml(FilterGroup);

export const FilterGroupExample = {
  title: 'Filter Group',
  sections: [{
    title: 'Filter buttons',
    source: [{
      type: GuideSectionTypes.JS,
      code: filterGroupSimpleSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: filterGroupSimpleHtml,
    }],
    text: (
      <Fragment>
        <p>
          Use <EuiCode>EuiFilterGroup</EuiCode> to wrap <EuiCode>EuiFilterButton</EuiCode>s
          into a container that looks nice against form fields (like search). These buttons
          are used in two different patterns. The most simplest use is that of an on/off pattern to show
          whether a filter is on. Add the prop <EuiCode>withNext</EuiCode> to remove the border between it
          and the next EuiFilterButton to visually group similar or opposite style filters.
        </p>
        <p>
          Add the prop <EuiCode>withNext</EuiCode> to remove the border between it
          and the next EuiFilterButton to visually group similar or opposite style filters.
        </p>
        <p>
          Set <EuiCode>hasActiveFilters</EuiCode> to true when the filter is active.
        </p>
      </Fragment>
    ),
    props: { EuiFilterGroup, EuiFilterButton },
    demo: <FilterGroupSimple />,
    snippet: `<EuiFilterGroup>
  <EuiFilterButton
    hasActiveFilters={this.state.isFilterOn}
    onClick={this.toggleFilter}
  >
    Single filter
  </EuiFilterButton>
</EuiFilterGroup>`
  },
  {
    title: 'Multi-select',
    source: [{
      type: GuideSectionTypes.JS,
      code: filterGroupMultiSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: filterGroupMultiHtml,
    }],
    text: (
      <Fragment>
        <p>
          To provide a long list of grouped filter, use a popover for filtering an
          array of passed items. This mostly uses standard popover mechanics, but the
          component <EuiCode>EuiFilterSelectItem</EuiCode> is used for the items themselves.
        </p>
        <h3>Indicating number of filters</h3>
        <p>
          By passing a number to <EuiCode>numFilters</EuiCode> you can express the number of filters available.
          When the user has applied these filter add the prop <EuiCode>hasActiveFilters</EuiCode> as before
          and this will change the coloring of the indicator. You can also supply a number to <EuiCode>numActiveFilters</EuiCode>
          which will change the number displayed.
        </p>
      </Fragment>
    ),
    props: { EuiFilterButton, EuiFilterSelectItem },
    demo: <FilterGroupMulti />,
    snippet: `<EuiFilterGroup>
  <EuiPopover
    button={
      <EuiFilterButton
        iconType="arrowDown"
        onClick={this.onButtonClick}
        isSelected={this.state.isPopoverOpen}
        numFilters={items.length}
        hasActiveFilters={true}
        numActiveFilters={2}
      >
        Filters
      </EuiFilterButton>
    }
    isOpen={this.state.isPopoverOpen}
    closePopover={this.closePopover}
  >
    ...
  </EuiPopover>
</EuiFilterGroup>`
  },
  {
    title: 'Layout',
    source: [{
      type: GuideSectionTypes.JS,
      code: filterGroupSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: filterGroupHtml,
    }],
    text: (
      <p>
        By default, the bar is auto-widthed based on its contents. To expand the bar to
        fill its parent&apos;s width add <EuiCode>fullWidth</EuiCode>. This will also set
        each button to grow. If you do not want the button to grow, set <EuiCode>grow = false</EuiCode>.
      </p>
    ),
    components: { EuiFilterGroup },
    props: { EuiFilterGroup, EuiFilterButton, EuiFilterSelectItem },
    demo: <FilterGroup />,
    snippet: `<EuiFilterGroup fullWidth>
  <EuiFilterButton>
    Single filter
  </EuiFilterButton>
  <EuiFilterButton grow={false} withNext>
    On
  </EuiFilterButton>
  <EuiFilterButton grow={false}>
    Off
  </EuiFilterButton>
</EuiFilterGroup>`,
  }],
};
