import React from 'react';

import { renderToHtml } from '../../services';
import sizes from '!!sass-vars-to-js-loader!../../../../src/global_styling/mixins/_responsive.scss';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiShowFor,
  EuiHideFrom,
  EuiCodeBlock,
} from '../../../../src/components';

import Responsive from './responsive';
const responsiveSource = require('!!raw-loader!./responsive');
const responsiveHtml = renderToHtml(Responsive);

function renderSizes(size, index) {
  return (
    <span key={index}>
      {size}: {sizes.breakpoints[size]}px &emsp;
    </span>
  )
}

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
      <div>
        <p>
          Pass an array of screen widths <EuiCode>[xs, s, m, l]</EuiCode> to either
          the <EuiCode>EuiShowFor</EuiCode> or <EuiCode>EuiHideFrom</EuiCode> components
          to make them responsive.
        </p>

        <p><strong>The sizing correlates with our SASS variables.</strong></p>

        <EuiCodeBlock language="scss" paddingSize="s">
          {Object.keys(sizes.breakpoints).map(function (size, index) {
            return renderSizes(size, index);
          })}
        </EuiCodeBlock>
      </div>
    ),
    props: { EuiShowFor, EuiHideFrom },
    demo: <Responsive />,
  }],
};
