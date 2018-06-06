import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiShowFor,
  EuiHideFrom,
} from '../../../../src/components';

import Responsive from './responsive';
const responsiveSource = require('!!raw-loader!./responsive');
const responsiveHtml = renderToHtml(Responsive);

export const ResponsiveExample = {
  title: 'Responsive',
  sections: [{
    title: 'EuiShowFor and EuiHideFrom',
    source: [{
      type: GuideSectionTypes.JS,
      code: responsiveSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: responsiveHtml,
    }],
    text: (
      <p>
        Pass an array of screen widths <EuiCode>[xs, s, m, l]</EuiCode> to either
        the <EuiCode>EuiShowFor</EuiCode> or <EuiCode>EuiHideFrom</EuiCode> components
        to make them responsive.
      </p>
    ),
    props: { EuiShowFor, EuiHideFrom },
    demo: <Responsive />,
  }],
};
