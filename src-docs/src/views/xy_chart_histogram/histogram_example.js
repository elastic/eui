import React from 'react';
import { GuideSectionTypes } from '../../components';
import VerticalRectSeriesExample from './vertical_rect_series';
import StackedVerticalRectSeriesExample from './stacked_vertical_rect_series';
import HorizontalRectSeriesExample from './horizontal_rect_series';
import StackedHorizontalRectSeriesExample from './stacked_horizontal_rect_series';

import {
  EuiCode,
  EuiVerticalRectSeries,
  EuiHorizontalRectSeries,
} from '../../../../src/components';

export const XYChartHistogramExample = {
  title: 'XYChart Histogram',
  sections: [
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
