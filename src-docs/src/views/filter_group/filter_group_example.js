import React from 'react';

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

export const FilterGroupExample = {
  title: 'Filter Group',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: filterGroupSimpleSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: filterGroupSimpleHtml,
    }],
    text: (
      <p>
        Use <EuiCode>EuiFilterGroup</EuiCode> to wrap <EuiCode>EuiFilterButton</EuiCode>s
        into a container that looks nice against form fields (like search). These buttons
        are used in two different patterns. The most simplest use is that of an on/off pattern to show
        whether a filter is on. Add the prop <EuiCode>withNext</EuiCode> to remove the border between it
        and the next EuiFilterButton to visually group similar or opposite style filters.
      </p>
    ),
    props: { EuiFilterGroup, EuiFilterButton },
    demo: <FilterGroupSimple />,
  },
  {
    title: 'Complex',
    source: [{
      type: GuideSectionTypes.JS,
      code: filterGroupSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: filterGroupHtml,
    }],
    text: (
      <p>
        Use <EuiCode>EuiFilterGroup</EuiCode> to wrap <EuiCode>EuiFilterButton</EuiCode>s
        into a container that looks nice against form fields (like search). These buttons
        are used in two different patterns. The first, as a simple on/off pattern to show
        whether a setting is on. The second is as delivery for a popover for filtering an
        array of passed items. This mostly uses standard popover mechanics, but the
        component <EuiCode>EuiFilterSelectItem</EuiCode> is used for the items themselves.
      </p>
    ),
    components: { EuiFilterGroup },
    props: { EuiFilterGroup, EuiFilterButton, EuiFilterSelectItem },
    demo: <FilterGroup />,
  }],
};
