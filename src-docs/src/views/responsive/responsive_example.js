import React from 'react';

import { renderToHtml } from '../../services';
import sizes from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_responsive.scss';

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
  let code = `'${size}': ${sizes.euiBreakpoints[size]}px`;

  if (index < sizes.euiBreakpointKeys.length - 1) {
    code += ` - ${(sizes.euiBreakpoints[sizes.euiBreakpointKeys[index+1]] - 1)}px`;
  } else {
  code += ` +`;
  }

  return (
    <div key={index}>
      {code}
    </div>
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
          Pass an array of named breakpoints to either
          the <EuiCode>EuiShowFor</EuiCode> or <EuiCode>EuiHideFrom</EuiCode> components
          to make them responsive.
        </p>

        <p><strong>The sizing correlates with our <EuiCode>$euiBreakpoints</EuiCode> SASS map.</strong></p>

        <EuiCodeBlock language="scss" paddingSize="s">
          {sizes.euiBreakpointKeys.map(function (size, index) {
            return renderSizes(size, index);
          })}
        </EuiCodeBlock>
      </div>
    ),
    props: { EuiShowFor, EuiHideFrom },
    demo: <Responsive />,
  }],
};
