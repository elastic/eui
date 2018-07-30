import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import AreaSeriesExample from './area';
import StackedAreaSeriesExample from './stacked_area';
import CurvedAreaExample from './curved_area';
import RangeAreaExample from './range_area';
import { EuiCode, EuiLink, EuiCallOut, EuiSpacer } from '../../../../src/components';
import { EuiAreaSeries } from '../../../../src/experimental';

export const XYChartAreaExample = {
  title: 'Area chart',
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
      demo: <StackedAreaSeriesExample />,
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
      demo: <CurvedAreaExample />,
    },
    {
      title: 'Range area chart',
      text: (
        <p>
          Each point in the chart is specified by two y values <EuiCode>y0</EuiCode> (lower value) and
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
      demo: <RangeAreaExample/>,
    },
  ],
};
