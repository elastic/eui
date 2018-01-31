import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiFilterSelect,
} from '../../../../src/components';

import FilterSelect from './filter_select';
const filterSelectSource = require('!!raw-loader!./filter_select');
const filterSelectHtml = renderToHtml(FilterSelect);

export const FilterSelectExample = {
  title: 'FilterSelect',
  sections: [{
    title: 'FilterSelect',
    source: [{
      type: GuideSectionTypes.JS,
      code: filterSelectSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: filterSelectHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiFilterSelect</EuiCode> component.
      </p>
    ),
    components: { EuiFilterSelect },
    demo: <FilterSelect />,
  }],
};
