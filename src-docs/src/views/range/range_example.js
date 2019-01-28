import React, { Fragment } from 'react';

// import {
//   Link,
// } from 'react-router';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCallOut,
  EuiDualRange,
  EuiRange
} from '../../../../src/components';

import DualRangeExample from './dual_range';
const dualRangeSource = require('!!raw-loader!./dual_range');
const dualRangeHtml = renderToHtml(DualRangeExample);

import RangeExample from './range';
const rangeSource = require('!!raw-loader!./range');
const rangeHtml = renderToHtml(RangeExample);

export const RangeControlExample = {
  title: 'Range',
  sections: [
    {
      title: 'Range',
      text: (
        <Fragment>
          <EuiCallOut color="warning" title="Understanding precision">
            <p>
              The single slider should only be used
              when <strong>the precise value is not considered important</strong>. If
              the precise value does matter, add the <code>showInput</code> prop or use
              a <code>EuiFieldNumber</code> instead.
            </p>
          </EuiCallOut>
          <br/>
          <p>
            While currently considered optional, the <code>showLabels</code> property should
            be added to explicitly state the range to the user.
          </p>
        </Fragment>
      ),
      source: [{
        type: GuideSectionTypes.JS,
        code: rangeSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: rangeHtml,
      }],
      props: {
        EuiRange,
      },
      demo: <RangeExample />,
    },
    {
      title: 'DualRange',
      text: (
        <Fragment>
          <EuiCallOut color="warning" title="Understanding precision">
            <p>
            The dual slider should only be used
            when <strong>the precise value is not considered important</strong>. If
            the precise value does matter, add the <code>showInput</code> prop or use
            a <code>EuiFieldNumber</code> instead.
            </p>
          </EuiCallOut>
          <br/>
          <p>
          While currently considered optional, the <code>showLabels</code> property should
          be added to explicitly state the range to the user.
          </p>
        </Fragment>
      ),
      source: [{
        type: GuideSectionTypes.JS,
        code: dualRangeSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: dualRangeHtml,
      }],
      props: {
        EuiDualRange,
      },
      demo: <DualRangeExample />,
    }
  ]
};
