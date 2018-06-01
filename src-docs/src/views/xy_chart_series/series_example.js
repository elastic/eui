import React from 'react';
import { GuideSectionTypes } from '../../components';
import LineSeriesExample from './line_series';
import VerticalBarSeriesExample from './vertical_bar_series';
import HorizontalBarSeriesExample from './horizontal_bar_series';
import StackedHorizontalBarSeriesExample from './stacked_horizontal_bar_series';
import StackedHorizontalRectSeriesExample from './stacked_horizontal_rect_series';
import StackedVerticalBarSeriesExample from './stacked_vertical_bar_series';
import StackedVerticalRectSeriesExample from './stacked_vertical_rect_series';
import VerticalRectSeriesExample from './vertical_rect_series';
import HorizontalRectSeriesExample from './horizontal_rect_series';
import AreaSeriesExample from './area_series';
import {
  EuiCode,
  EuiVerticalBarSeries,
  EuiVerticalRectSeries,
  EuiHorizontalBarSeries,
  EuiHorizontalRectSeries,
  EuiLine,
  EuiArea,
} from '../../../../src/components';

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
            vertical bar charts.
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
            horizontal bar charts.
          </p>
          <p>
            Specify <EuiCode>EuiXYChart</EuiCode> prop <EuiCode>yType=&quot;ordinal&quot;</EuiCode>
            because we are creating a Bar Chart.
          </p>
          <p>The X-Axis can be configured with <EuiCode>linear</EuiCode>,<EuiCode>log</EuiCode>,
            <EuiCode>time</EuiCode>, <EuiCode>time-utc</EuiCode>.
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
            The Y-Axis needs can be configured with <EuiCode>linear</EuiCode>,<EuiCode>log</EuiCode>,
            <EuiCode>time</EuiCode>, <EuiCode>time-utc</EuiCode>.
            The same for X-Axis.
          </p>
        </div>
      ),
      props: { EuiVerticalRectSeries },
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
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiHorizontalRectSeries</EuiCode> for displaying
            horizontal histograms.
            The Y-Axis needs can be configured as <EuiCode>linear</EuiCode>,<EuiCode>log</EuiCode>,
            <EuiCode>time</EuiCode>, <EuiCode>time-utc</EuiCode>.
            The same for X-Axis.
          </p>
        </div>
      ),
      props: { EuiHorizontalRectSeries },
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
            horizontal stacked bar charts.
            Specify <EuiCode>EuiXYChart</EuiCode> props like the following:
          </p>
          <ul>
            <li>
              <EuiCode>yType=&quot;ordinal&quot;</EuiCode> because we are creating a Bar Chart
            </li>
            <li>
              <EuiCode>stackBy=&quot;x&quot;</EuiCode> to stack bars one above the other.
              If <EuiCode>stackBy</EuiCode> is not specified, bars are clustered together depending on the Y value
            </li>
          </ul>
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
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiVerticalBarSeries</EuiCode> for displaying
            vertical stacked bar charts.
            Specify <EuiCode>EuiXYChart</EuiCode> props like the following:
          </p>
          <ul>
            <li>
              <EuiCode>xType=&quot;ordinal&quot;</EuiCode> because we are creating a Bar Chart
            </li>
            <li>
              <EuiCode>stackBy=&quot;y&quot;</EuiCode> to stack bars one above the other.
              If <EuiCode>stackBy</EuiCode> is not specified, bars are clustered together depending on the X value
            </li>
          </ul>
        </div>
      ),
      props: { EuiVerticalBarSeries },
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
    {
      title: 'Stacked Vertical Histogram',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiVerticalRectSeries</EuiCode> for displaying
            stacked vedrtical histograms.
          </p>
          <p>Specify <EuiCode>stackBy=&quot;x&quot;</EuiCode> to stack bars together.</p>
          <p>Note: Is not possible to &quot;cluster&quot; bars by the same X value.</p>
        </div>
      ),
      props: { EuiVerticalRectSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_vertical_rect_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <StackedVerticalRectSeriesExample />
        </div>
      )
    },
    {
      title: 'Stacked Horizontal Histogram',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiHorizontalRectSeries</EuiCode> to display
            stacked horizontal histograms.
          </p>
          <p>Specify <EuiCode>stackBy=&quot;x&quot;</EuiCode> to stack bars together.</p>
          <p>Note: Is not possible to &quot;cluster&quot; bars by the same Y value.</p>
        </div>
      ),
      props: { EuiHorizontalRectSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_horizontal_rect_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <StackedHorizontalRectSeriesExample />
        </div>
      )
    },
  ]
};
