import React from 'react';
import { GuideSectionTypes } from '../../components';
import AreaSeriesExample from './area_series';
import StackedAreaSeriesExample from './stacked_area_series';
import {
  EuiCode,
  EuiArea,
} from '../../../../src/components';

export const XYChartAreaExample = {
  title: 'XYChart Area',
  sections: [
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
      title: 'Stacked Area Series',
      text: (
        <div>
          <p>
            TODO
          </p>
        </div>
      ),
      props: { EuiArea },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_area_series')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <StackedAreaSeriesExample />
        </div>
      )
    },
  ]
};
