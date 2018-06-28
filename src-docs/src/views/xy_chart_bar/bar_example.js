import React from 'react';
import { GuideSectionTypes } from '../../components';
import VerticalBarSeriesExample from './vertical_bar_series';
import HorizontalBarSeriesExample from './horizontal_bar_series';
import StackedVerticalBarSeriesExample from './stacked_vertical_bar_series';
import StackedHorizontalBarSeriesExample from './stacked_horizontal_bar_series';
import TimeSeriesExample from './time_series';

import { EuiCode, EuiVerticalBarSeries, EuiHorizontalBarSeries } from '../../../../src/components';

export const XYChartBarExample = {
  title: 'Bar chart',
  sections: [
    {
      title: 'Vertical Bar Chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiVerticalBarSeries</EuiCode> for
            displaying vertical bar charts.
          </p>
          <p>
            Specify <EuiCode>EuiXYChart</EuiCode> prop <EuiCode>xType=&quot;ordinal&quot;</EuiCode>
            because we are creating a Bar Chart.
          </p>
          <p>
            The Y-Axis can be configured with <EuiCode>linear</EuiCode>,<EuiCode>log</EuiCode>,
            <EuiCode>time</EuiCode>, <EuiCode>time-utc</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiVerticalBarSeries },
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
      demo: (
        <div style={{ margin: 60 }}>
          <VerticalBarSeriesExample />
        </div>
      ),
    },
    {
      title: 'Stacked Vertical Bar Chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiVerticalBarSeries</EuiCode> for
            displaying vertical stacked bar charts. Specify <EuiCode>EuiXYChart</EuiCode> props like
            the following:
          </p>
          <ul>
            <li>
              <EuiCode>xType=&quot;ordinal&quot;</EuiCode> because we are creating a Bar Chart
            </li>
            <li>
              <EuiCode>stackBy=&quot;y&quot;</EuiCode> to stack bars one above the other. If{' '}
              <EuiCode>stackBy</EuiCode> is not specified, bars are clustered together depending on
              the X value
            </li>
          </ul>
        </div>
      ),
      props: { EuiVerticalBarSeries },
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
      demo: (
        <div style={{ margin: 60 }}>
          <StackedVerticalBarSeriesExample />
        </div>
      ),
    },
    {
      title: 'Horizontal Bar Chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiHorizontalBarSeries</EuiCode> for
            displaying horizontal bar charts.
          </p>
          <p>
            Specify <EuiCode>EuiXYChart</EuiCode> prop <EuiCode>yType=&quot;ordinal&quot;</EuiCode>
            because we are creating a Bar Chart.
          </p>
          <p>
            The X-Axis can be configured with <EuiCode>linear</EuiCode>,<EuiCode>log</EuiCode>,
            <EuiCode>time</EuiCode>, <EuiCode>time-utc</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiHorizontalBarSeries },
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
      demo: (
        <div style={{ margin: 60 }}>
          <HorizontalBarSeriesExample />
        </div>
      ),
    },
    {
      title: 'Stacked Horizontal Bar Chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiHorizontalBarSeries</EuiCode> for
            displaying horizontal stacked bar charts. Specify <EuiCode>EuiXYChart</EuiCode> props
            like the following:
          </p>
          <ul>
            <li>
              <EuiCode>yType=&quot;ordinal&quot;</EuiCode> because we are creating a Bar Chart
            </li>
            <li>
              <EuiCode>stackBy=&quot;x&quot;</EuiCode> to stack bars one above the other. If{' '}
              <EuiCode>stackBy</EuiCode> is not specified, bars are clustered together depending on
              the Y value
            </li>
          </ul>
        </div>
      ),
      props: { EuiHorizontalBarSeries },
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
      demo: (
        <div style={{ margin: 60 }}>
          <StackedHorizontalBarSeriesExample />
        </div>
      ),
    },

    {
      title: 'Time Series',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiVerticalBarSeries</EuiCode>
            with the
            <EuiCode>xType=&apos;time&apos;</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiVerticalBarSeries },
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
      demo: (
        <div style={{ margin: 60 }}>
          <TimeSeriesExample />
        </div>
      ),
    },
  ],
};
