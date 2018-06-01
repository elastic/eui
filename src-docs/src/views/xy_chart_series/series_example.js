import React from 'react';
import { GuideSectionTypes } from '../../components';
import LineSeriesExample from './line_series';
import VerticalBarSeriesExample from './vertical_bar_series';
import HorizontalBarSeriesExample from './horizontal_bar_series';
import StackedHorizontalBarSeriesExample from './stacked_horizontal_bar_series';
import StackedVerticalBarSeriesExample from './stacked_vertical_bar_series';
import VerticalRectSeriesExample from './vertical_rect_series';
import HorizontalRectSeriesExample from './horizontal_rect_series';
import AreaSeriesExample from './area_series';
import { EuiCode, EuiVerticalBarSeries, EuiHorizontalBarSeries, EuiLine, EuiArea } from '../../../../src/components';

export const XYChartSeriesExample = {
  title: 'XYChart Series',
  sections: [
    {
      title: 'Line Series',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> to display line, bar, area, and stream charts. Note that charts are composed with{' '}
            <EuiCode>EuiLine</EuiCode>, <EuiCode>EuiArea</EuiCode>, <EuiCode>EuiBar</EuiCode>, and <EuiCode>EuiStream</EuiCode> being child
            components.
          </p>
        </div>
      ),
      props: { EuiLine },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./line_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <LineSeriesExample />
        </div>
      )
    },
    {
      title: 'Area Series',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> to display line, bar, area, and stream charts. Note that charts are composed with{' '}
            <EuiCode>EuiLine</EuiCode>, <EuiCode>EuiArea</EuiCode>, <EuiCode>EuiBar</EuiCode>, and <EuiCode>EuiStream</EuiCode> being child
            components.
          </p>
        </div>
      ),
      props: { EuiArea },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./area_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <AreaSeriesExample />
        </div>
      )
    },
    {
      title: 'Vertical Bar Chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiVerticalBarSeries</EuiCode> for displaying
            vertical bar charts. Use the appropriate <EuiCode>xType</EuiCode> props to match your
            x value scale. Available values are: <EuiCode>ordinal</EuiCode>,<EuiCode>linear</EuiCode>
          </p>
        </div>
      ),
      props: { EuiVerticalBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./vertical_bar_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <VerticalBarSeriesExample />
        </div>
      )
    },
    {
      title: 'Horizontal Bar Chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiHorizontalBarSeries</EuiCode> for displaying
            horizontal bar charts. Use the appropriate <EuiCode>yType</EuiCode> props to match your
            y value scale. Available values are: <EuiCode>ordinal</EuiCode>,<EuiCode>linear</EuiCode>
          </p>
        </div>
      ),
      props: { EuiHorizontalBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./horizontal_bar_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <HorizontalBarSeriesExample />
        </div>
      )
    },
    {
      title: 'Vertical Histogram',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiVerticalRectSeries</EuiCode> for displaying
            vertical histograms.
          </p>
        </div>
      ),
      props: { EuiVerticalBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./vertical_rect_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <VerticalRectSeriesExample />
        </div>
      )
    },
    {
      title: 'Horizontal Histogram',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiVerticalRectSeries</EuiCode> for displaying
            an horizontal histogram.
          </p>
        </div>
      ),
      props: { EuiVerticalBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./vertical_rect_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <HorizontalRectSeriesExample />
        </div>
      )
    },
    {
      title: 'Stacked Horizontal Bar Chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiHorizontalBarSeries</EuiCode> for displaying
            horizontal bar charts. Use the appropriate <EuiCode>yType</EuiCode> props to match your
            y value scale. Available values are: <EuiCode>ordinal</EuiCode>,<EuiCode>linear</EuiCode>
          </p>
        </div>
      ),
      props: { EuiHorizontalBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_horizontal_bar_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <StackedHorizontalBarSeriesExample />
        </div>
      )
    },
    {
      title: 'Stacked Vertical Bar Chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiHorizontalBarSeries</EuiCode> for displaying
            horizontal bar charts. Use the appropriate <EuiCode>yType</EuiCode> props to match your
            y value scale. Available values are: <EuiCode>ordinal</EuiCode>,<EuiCode>linear</EuiCode>
          </p>
        </div>
      ),
      props: { EuiHorizontalBarSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_vertical_bar_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <StackedVerticalBarSeriesExample />
        </div>
      )
    },
  ]
};
