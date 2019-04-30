import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import AreaSeriesExample from './area';
import StackedAreaSeriesExample from './stacked_area';
import CurvedAreaExample from './curved_area';
import RangeAreaExample from './range_area';
import {
  EuiCode,
  EuiLink,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';
import { EuiAreaSeries } from '../../../../src/experimental';

export const XYChartAreaExample = {
  title: 'Area chart',
  intro: (
    <Fragment>
      <EuiCallOut title="Set for deprecation" color="danger">
        <p>
          This component will be replaced in the near future and managed outside
          of EUI. We do not recommend using it at this time and it will be
          removed by June 2019.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </Fragment>
  ),
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
      demo: <AreaSeriesExample />,
    },
    {
      title: 'Stacked Area Series',
      text: (
        <div>
          <p>
            Use multiple <EuiCode>EuiAreaSeries</EuiCode> to display stacked
            area charts specifying the <EuiCode>stackBy:y</EuiCode> prop on the{' '}
            <EuiCode>EuiSeriesChart</EuiCode>
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
      demo: <StackedAreaSeriesExample />,
    },
    {
      title: 'Curved Area Series',
      text: (
        <div>
          <p>
            Use the <EuiCode>curve</EuiCode> prop to change the curve
            representation. Visit{' '}
            <EuiLink
              href="https://github.com/d3/d3-shape#curves"
              target="_blank">
              d3-shape#curves
            </EuiLink>
            for available values (the bundle curve does not work with area
            chart).
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
      demo: <CurvedAreaExample />,
    },
    {
      title: 'Range area chart',
      text: (
        <p>
          Each point in the chart is specified by two y values{' '}
          <EuiCode>y0</EuiCode> (lower value) and
          <EuiCode>y</EuiCode> (upper value) to display a range area chart.
        </p>
      ),
      props: { EuiAreaSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./range_area'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <RangeAreaExample />,
    },
  ],
};
