import React from 'react';
import { GuideSectionTypes } from '../../components';
import { EuiCode } from '../../../../src/components';
import ComplexChartExampleCode from './example-complex';
import EmptyExampleCode from './example-empty';
import MultiAxisChartExampleCode from './example_dual_axis';
import { ExampleCrosshair } from './example-crosshair';

export const XYChartExample = {
  title: 'General',
  sections: [
    {
      title: 'Complex example',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> to display line, bar, area, and stream charts. Note that charts are composed with{' '}
            <EuiCode>EuiLine</EuiCode>, <EuiCode>EuiArea</EuiCode>, <EuiCode>EuiBar</EuiCode>, and <EuiCode>EuiStream</EuiCode> being child
            components.
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./example-complex')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <ComplexChartExampleCode />
        </div>
      )
    },
    {
      title: 'Empty Chart',
      text: (
        <div>
          <p>
            When no data is provided to EuiXYChart, an empty state is displayed
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./example-empty')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <EmptyExampleCode />
        </div>
      )
    },
    {
      title: 'Keep cross-hair in sync',
      text: (
        <div>
          <p>
            When displayed side-by-side with other charts, we need to be able to keep them in sync
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./example-empty')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <ExampleCrosshair />
        </div>
      )
    },
    {
      title: 'Multi Axis',
      text: (
        <div>
          <p>
            If just displaying values is enough, then you can let the chart auto label axis
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./example_dual_axis')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <MultiAxisChartExampleCode />
        </div>
      )
    }
  ]
};
