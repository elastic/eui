import React from 'react';
import { GuideSectionTypes } from '../../components';
import AreaSeriesExample from './area';
import StackedAreaSeriesExample from './stacked_area';
import CurvedAreaExample from './curved_area';

import { EuiCode, EuiAreaSeries, EuiLink } from '../../../../src/components';

export const XYChartAreaExample = {
  title: 'Area chart',
  sections: [
    {
      title: 'Area Series',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiAreaSeries</EuiCode> to display area charts.
          </p>
        </div>
      ),
      props: { EuiAreaSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./area'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <AreaSeriesExample />
        </div>
      ),
    },
    {
      title: 'Stacked Area Series',
      text: (
        <div>
          <p>
            Use multiple <EuiCode>EuiAreaSeries</EuiCode> to display stacked area charts specifying the{' '}
            <EuiCode>stackBy:y</EuiCode> prop on the <EuiCode>EuiXYChart</EuiCode>
            to enable stacking.
          </p>
        </div>
      ),
      props: { EuiAreaSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_area'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <StackedAreaSeriesExample />
        </div>
      ),
    },
    {
      title: 'Curved Area Series',
      text: (
        <div>
          <p>
            Use the <EuiCode>curve</EuiCode> prop to change the curve representation. Visit{' '}
            <EuiLink href="https://github.com/d3/d3-shape#curves" target="_blank">
              d3-shape#curves
            </EuiLink>
            for available values (the bundle curve does not work with area chart).
          </p>
        </div>
      ),
      props: { EuiAreaSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./curved_area'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <CurvedAreaExample />
        </div>
      ),
    },
  ],
};
