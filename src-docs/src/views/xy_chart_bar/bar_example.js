import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import VerticalBarSeriesExample from './vertical_bar_series';
import HorizontalBarSeriesExample from './horizontal_bar_series';
import StackedVerticalBarSeriesExample from './stacked_vertical_bar_series';
import StackedHorizontalBarSeriesExample from './stacked_horizontal_bar_series';
import TimeSeriesExample from './time_series';

import { EuiBadge, EuiCallOut, EuiSpacer, EuiLink, EuiCode } from '../../../../src/components';
import { EuiBarSeries } from '../../../../src/experimental';

export const XYChartBarExample = {
  title: 'Bar charts',
  intro: (
    <Fragment>
      <EuiCallOut
        title="Beta Component"
        color="warning"
      >
        <p>
         This component is still in Beta. We consider it to be reasonably stable, and welcome you to implement it,
         but please be aware that breaking changes can come at any time with this component as such changes on beta
         components does not necessitate a major version bump.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
      <p>
        You can use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiBarSeries</EuiCode> to
        displaying bar charts.
      </p>
      <EuiSpacer size="l" />
      <p>
        The <EuiCode>EuiXYChart</EuiCode> component pass the <EuiCode>orientation</EuiCode> prop to every component child
        to accomodate <EuiCode>vertical</EuiCode> and <EuiCode>horizontal</EuiCode> use cases.
        The default orientation is <EuiCode>vertical</EuiCode>.
      </p>
      <EuiSpacer size="l" />
      <p>
        You should specify <EuiCode>EuiXYChart</EuiCode> prop <EuiCode>xType=&quot;ordinal&quot;</EuiCode>
        to specify the X Axis scale type since you are creating a Bar Chart (read the quote below). <br />
        You can use barchart also with other X axis scale types, but this can lead to misinterpretation
        of your charts (basically because the bar width doesn&#39;t represent a real measure like in the histograms).
      </p>
      <EuiSpacer size="l" />
      <p>
        You can configure the Y-Axis scale type <EuiCode>yType</EuiCode> of <EuiCode>EuiXYChart</EuiCode>
        with the following scales <EuiCode>linear</EuiCode>,<EuiCode>log</EuiCode>,
        <EuiCode>time</EuiCode>, <EuiCode>time-utc</EuiCode>.
      </p>
      <EuiSpacer size="l" />
      <EuiCallOut
        title="What is a bar chart?"
        iconType="pin"
      >
        <Fragment>
          <p>
            A bar chart or bar graph is a chart or graph that presents <em>categorical</em> data with rectangular
            bars with heights or lengths proportional to the values that they represent.
            The bars can be plotted vertically or horizontally. [...]
          </p>
          <p>
            A bar graph shows comparisons among <em>discrete categories</em>. One axis of the chart shows the specific
            categories being compared, and the other axis represents a measured value.
            Some bar graphs present bars clustered in groups of more than one,
            showing the values of more than one measured variable.
          </p>
          <EuiLink href="https://en.wikipedia.org/wiki/Bar_chart">Wikipedia</EuiLink>
        </Fragment>
      </EuiCallOut>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Vertical Bar Chart',
      text: (
        <p>
          You can create out-of-the-box vertical bar charts just adding a <EuiCode>EuiBarSeries</EuiCode>
          component into your <EuiCode>EuiXYChart</EuiCode>.
        </p>
      ),
      props: { EuiBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./vertical_bar_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <VerticalBarSeriesExample />,
    },
    {
      title: 'Stacked Vertical Bar Chart',
      text: (
        <p>
          To display a vertical stacked bar charts specify <EuiCode>stackBy=&quot;y&quot;</EuiCode>.
          If <EuiCode>stackBy</EuiCode> is not specified, bars are clustered together depending on
          the X value.
        </p>
      ),
      props: { EuiBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_vertical_bar_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <StackedVerticalBarSeriesExample />,
    },
    {
      title: 'Horizontal Bar Chart',
      text: (
        <p>
          <EuiBadge color="warning">
            experimental
          </EuiBadge> To display an horizontal bar chart specify <EuiCode>orientation=&quot;horizontal&quot;</EuiCode>.
          Since you are rotating the chart, you also have to invert <EuiCode>x</EuiCode> and <EuiCode>y</EuiCode>
          values in your data. The <EuiCode>y</EuiCode> becomes your ordinal/categorial axis and the
          <EuiCode>x</EuiCode> becomes your measure/value axis.
        </p>
      ),
      props: { EuiBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./horizontal_bar_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <HorizontalBarSeriesExample />,
    },
    {
      title: 'Stacked Horizontal Bar Chart',
      text: (
        <p>
          <EuiBadge color="warning">
            experimental
          </EuiBadge> To display an horizontal stacked bar charts specify <EuiCode>stackBy=&quot;x&quot;</EuiCode>
          together with <EuiCode>orientation=&quot;horizontal&quot;</EuiCode>.
          If <EuiCode>stackBy</EuiCode> is not specified, bars are clustered together depending on
          the Y value.
        </p>
      ),
      props: { EuiBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_horizontal_bar_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <StackedHorizontalBarSeriesExample />,
    },

    {
      title: 'Time Series',
      text: (
        <p>
          Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>xType=&apos;time&apos;</EuiCode>
          to display a time series bar chart.
        </p>
      ),
      props: { EuiBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./time_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <TimeSeriesExample />,
    },
  ],
};
