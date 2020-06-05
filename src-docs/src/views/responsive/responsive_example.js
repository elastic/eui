import React from 'react';

import { renderToHtml } from '../../services';
import sizes from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_responsive.scss';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiShowFor,
  EuiHideFor,
  EuiCodeBlock,
} from '../../../../src/components';

import Responsive from './responsive';
const responsiveSource = require('!!raw-loader!./responsive');
const responsiveHtml = renderToHtml(Responsive);
const responsiveSnippet = [
  `<EuiHideFor sizes={['xs', 's']}>
  <!-- Content to hide from xs and s screens -->
</EuiHideFor>`,
  `<EuiShowFor sizes={['l', 'xl']} display="block">
  <!-- <div>Content only showing for l and xl screens and displaying in block</div> -->
</EuiShowFor>`,
];

function renderSizes(size, index) {
  let code = `'${size}': ${sizes.euiBreakpoints[size]}px`;

  if (index < sizes.euiBreakpointKeys.length - 1) {
    code += ` (to ${sizes.euiBreakpoints[sizes.euiBreakpointKeys[index + 1]] -
      1}px)`;
  } else {
    code += ' +';
  }

  return <div key={index}>{code}</div>;
}

export const ResponsiveExample = {
  title: 'Responsive',
  sections: [
    {
      title: 'EuiShowFor and EuiHideFor',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: responsiveSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: responsiveHtml,
        },
      ],
      text: (
        <div>
          <p>
            Pass an array of named breakpoints to either the{' '}
            <strong>EuiShowFor</strong> or <strong>EuiHideFor</strong>{' '}
            components to make them responsive.
          </p>

          <p>
            The sizing correlates with our{' '}
            <EuiCode language="scss">$euiBreakpoints</EuiCode> SASS map. The
            named breakpoint starts at the pixel value provided and ends before
            the next one.
          </p>

          <EuiCodeBlock language="scss" paddingSize="s">
            {sizes.euiBreakpointKeys.map(function(size, index) {
              return renderSizes(size, index);
            })}
          </EuiCodeBlock>
        </div>
      ),
      snippet: responsiveSnippet,
      props: { EuiShowFor, EuiHideFor },
      demo: <Responsive />,
    },
  ],
};
