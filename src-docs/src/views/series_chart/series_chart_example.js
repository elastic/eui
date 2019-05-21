import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import { EuiCode, EuiCallOut, EuiSpacer } from '../../../../src/components';
import { EuiSeriesChart } from '../../../../src/experimental';
import ComplexChartExampleCode from './complex';
import EmptyExampleCode from './empty';
import MultiAxisChartExampleCode from './multi_axis';
import ResponsiveChartExample from './responsive_chart';
import { ExampleCrosshair } from './crosshair_sync';

export const XYChartExample = {
  title: 'General',
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
      title: 'Complex example',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiSeriesChart</EuiCode> to display line, bar, area,
            and stream charts. Note that charts are composed with{' '}
            <EuiCode>EuiLineSeries</EuiCode>, <EuiCode>EuiAreaSeries</EuiCode>,{' '}
            <EuiCode>EuiBar</EuiCode>, and <EuiCode>EuiStream</EuiCode> being
            child components.
          </p>
        </div>
      ),
      props: { EuiSeriesChart },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./complex'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <ComplexChartExampleCode />,
    },
    {
      title: 'Empty Chart',
      text: (
        <div>
          <p>
            When no data is provided to EuiSeriesChart, an empty state is
            displayed
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./empty'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <EmptyExampleCode />,
    },
    {
      title: 'Keep cross-hair in sync',
      text: (
        <div>
          <p>
            When displayed side-by-side with other charts, we need to be able to
            keep them in sync
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./crosshair_sync'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <ExampleCrosshair />,
    },
    {
      title: 'Multi Axis',
      text: (
        <div>
          <p>
            If just displaying values is enough, then you can let the chart auto
            label axis
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./multi_axis'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <MultiAxisChartExampleCode />,
    },
    {
      title: 'Responsive chart',
      text: (
        <div>
          <p>
            You can omit <EuiCode>width</EuiCode> and/or{' '}
            <EuiCode>height</EuiCode>
            prop and the chart takes the full width and/or height of it&apos;s
            parent.
          </p>
          <p>
            The parent container needs to have computed a height and/or width.
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./responsive_chart'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <ResponsiveChartExample />,
    },
    // TODO include the following example when AreasSeries PR (create vertical areachart)
    // will be merged into react-vis and orientation prop semantic will be solved.
    // {
    //   title: 'Horizontal chart',
    //   text: (
    //     <div>
    //       <p>If just displaying values is enough, then you can let the chart auto label axis</p>
    //     </div>
    //   ),
    //   source: [
    //     {
    //       type: GuideSectionTypes.JS,
    //       code: require('!!raw-loader!./horizontal'),
    //     },
    //     {
    //       type: GuideSectionTypes.HTML,
    //       code: 'This component can only be used from React',
    //     },
    //   ],
    //   demo: (
    //     <div style={{ margin: 60 }}>
    //       <HorizontalExampleCode />
    //     </div>
    //   ),
    // },
  ],
};
