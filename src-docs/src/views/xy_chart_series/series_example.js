import React from 'react';
import { GuideSectionTypes } from '../../components';
import LineSeriesExample from './line_series';
import BarSeriesExample from './bar_series';
import AreaSeriesExample from './area_series';
import { EuiCode, EuiBar, EuiLine, EuiArea } from '../../../../src/components';

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
      title: 'Bar Series',
      text: (
        <div>
          <p>
            When no data is provided to EuiXYChart, an empty state is displayed
          </p>
        </div>
      ),
      props: { EuiBar },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./bar_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <BarSeriesExample />
        </div>
      )
    }
  ]
};
