import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCallOut,
  EuiDualRange,
  EuiRange,
  EuiSpacer
} from '../../../../src/components';

import DualRangeExample from './dual_range';
const dualRangeSource = require('!!raw-loader!./dual_range');
const dualRangeHtml = renderToHtml(DualRangeExample);

import RangeExample from './range';
const rangeSource = require('!!raw-loader!./range');
const rangeHtml = renderToHtml(RangeExample);

export const RangeControlExample = {
  title: 'Range',
  intro: (
    <Fragment>
      <EuiCallOut color="warning" title="Understanding precision">
        <p>
        Range sliders should only be used
        when <strong>the precise value is not considered important</strong>. If
        the precise value does matter, add the <code>showInput</code> prop or use
        a <code>EuiFieldNumber</code> instead.
        </p>
        <p>
        While currently considered optional, the <code>showLabels</code> property should
        be added to explicitly state the range to the user.
        </p>
      </EuiCallOut>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Range',
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
          <EuiCallOut color="warning" title="Retrieving field values">
            <p>
            Two-value <code>input[type=range]</code> elements are not part of the HTML5 specification.
            Because of this support gap, <code>EuiDualRange</code> cannot expose a native <code>value</code> property
            for native <code>form</code> to consumption.
              <strong>
                The React <code>onChange</code> prop is the recommended method
                for retrieving the upper and lower values.
              </strong>
            </p>
            <p>
              <code>EuiDualRange</code> does use native <code>input</code>s to help validate step values
            and range limits. These may be used as <code>form</code> values when <code>showInput</code> is in use.
            The alternative is to store values in <code>input[type=hidden]</code>.
            </p>
          </EuiCallOut>
          <EuiSpacer size="l" />
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
