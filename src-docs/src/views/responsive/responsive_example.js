import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiShowFor,
  EuiHideFor,
  EuiCodeBlock,
} from '../../../../src/components';

import { BREAKPOINTS, BREAKPOINT_KEYS } from '../../../../src/services';
import { EuiBreakpointSize } from '!!prop-loader!../../../../src/services/breakpoint';

import Responsive from './responsive';
const responsiveSource = require('!!raw-loader!./responsive');
const responsiveSnippet = [
  `<EuiHideFor sizes={['xs', 's']}>
  <!-- Content to hide from xs and s screens -->
</EuiHideFor>`,
  `<EuiShowFor sizes={['l', 'xl']}>
  <!-- <div>Content only showing for l and xl screens</div> -->
</EuiShowFor>`,
];

function renderSizes(size, index) {
  let code = `'${size}': ${BREAKPOINTS[size]}px`;

  if (index > 0) {
    code += ` (to ${BREAKPOINTS[BREAKPOINT_KEYS[index - 1]] - 1}px)`;
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
      ],
      text: (
        <div>
          <p>
            These components will either render or not render their children
            based on the current window width. Pass an array of named
            breakpoints to the <EuiCode>sizes</EuiCode> prop to either show or
            hide their children respectively.
          </p>

          <p>
            The sizing options correlate with the keys in the{' '}
            <EuiCode language="ts">EuiBreakpoints</EuiCode> type. The named
            breakpoint starts at the pixel value provided and ends before the
            next one.
          </p>

          <EuiCodeBlock language="scss" paddingSize="s">
            {BREAKPOINT_KEYS.map(function (size, index) {
              return renderSizes(size, index);
            })}
          </EuiCodeBlock>
        </div>
      ),
      snippet: responsiveSnippet,
      props: { EuiShowFor, EuiHideFor, EuiBreakpointSize },
      demo: <Responsive />,
    },
  ],
};
