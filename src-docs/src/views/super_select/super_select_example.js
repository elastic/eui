import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiSuperSelect,
} from '../../../../src/components';

import SuperSelect from './super_select';
const superSelectSource = require('!!raw-loader!./super_select');
const superSelectHtml = renderToHtml(SuperSelect);

export const SuperSelectExample = {
  title: 'SuperSelect',
  sections: [{
    title: 'SuperSelect',
    source: [{
      type: GuideSectionTypes.JS,
      code: superSelectSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: superSelectHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiSuperSelect</EuiCode> component.
      </p>
    ),
    props: { EuiSuperSelect },
    demo: <SuperSelect />,
  }],
};
