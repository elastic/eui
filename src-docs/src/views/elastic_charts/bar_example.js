import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import ElasticChartExample from './simple_bars';

import {
  EuiCallOut,
  EuiSpacer,
  EuiLink,
  EuiCode,
} from '../../../../src/components';
import { EuiBarSeries } from '../../../../src/experimental';

export const ElasticChartBarExample = {
  title: 'Bar charts',
  intro: (
    <Fragment>
      <p>
        You can use <EuiCode>Elastic-Charts</EuiCode> with{' '}
        <EuiCode>BarSeries</EuiCode> to displaying bar charts.
      </p>
      <EuiSpacer size="l" />
      <EuiCallOut title="What is a bar chart?" iconType="pin">
        <Fragment>
          <p>
            A bar chart or bar graph is a chart or graph that presents{' '}
            <em>categorical</em> data with rectangular bars with heights or
            lengths proportional to the values that they represent. The bars can
            be plotted vertically or horizontally. [...]
          </p>
          <p>
            A bar graph shows comparisons among <em>discrete categories</em>.
            One axis of the chart shows the specific categories being compared,
            and the other axis represents a measured value. Some bar graphs
            present bars clustered in groups of more than one, showing the
            values of more than one measured variable.
          </p>
          <EuiLink href="https://en.wikipedia.org/wiki/Bar_chart">
            Wikipedia
          </EuiLink>
        </Fragment>
      </EuiCallOut>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Simple vertical bar chart',
      text: (
        <p>
          You can create out-of-the-box vertical bar charts just adding a{' '}
          <EuiCode>BarSeries</EuiCode>
          component into your <EuiCode>Chart</EuiCode>.
        </p>
      ),
      props: { EuiBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./simple_bars'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <ElasticChartExample />,
    }
  ],
};
