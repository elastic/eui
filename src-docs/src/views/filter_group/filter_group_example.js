import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiFilterGroup,
  EuiFilterButton,
  EuiFilterSelectItem,
  EuiSpacer,
} from '../../../../src/components';

import FilterGroup from './filter_group';
const filterGroupSource = require('!!raw-loader!./filter_group');
const filterGroupHtml = renderToHtml(FilterGroup);

export const FilterGroupExample = {
  title: 'Filter Group',
  intro: (
    <Fragment>
      <EuiCallOut
        title="Demo of visual pattern only"
        color="warning"
      >
        <p>
          This documents a visual pattern used for filtering (usually page heads next to search).
          The individual components themselves are very simple
          and do not have much functionality on their own. If you are looking for expanded usage
          examples please check out the Table of Records component which uses this more fully and
          can give you a better example of its usage when applied to filtering.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [{
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
