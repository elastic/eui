import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiFilterGroup,
} from '../../../../src/components';

import FilterGroup from './filter_group';
const filterGroupSource = require('!!raw-loader!./filter_group');
const filterGroupHtml = renderToHtml(FilterGroup);

export const FilterGroupExample = {
  title: 'FilterGroup',
  sections: [{
    title: 'FilterGroup',
    source: [{
      type: GuideSectionTypes.JS,
      code: filterGroupSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: filterGroupHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiFilterGroup</EuiCode> component.
      </p>
    ),
    components: { EuiFilterGroup },
    demo: <FilterGroup />,
  }],
};
