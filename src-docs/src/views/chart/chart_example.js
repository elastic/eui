import React from 'react';
import { GuideSectionTypes } from '../../components';
import { EuiCallOut, EuiSpacer, EuiCode } from '../../../../src/components';
import ChartExampleCode from './examples';

const examplesSource = require('!!raw-loader!./examples');
console.log(EuiCode);
export const ChartExample = {
  title: 'SeriesChart',
  intro: (
    <div>
      <EuiCallOut title="Work in progress" color="warning">
        <p>
          This component is still undergoing active development and is of Alpha quality, while we currently feel the API is stable, the
          implementation is still subject to change.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </div>
  ),
  sections: [
    {
      title: 'Complex example',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiChart</EuiCode> to display line, bar, area, and stream charts. Note that charts are composed with{' '}
            <EuiCode>EuiLine</EuiCode>, <EuiCode>EuiArea</EuiCode>, <EuiCode>EuiBar</EuiCode>, and <EuiCode>EuiStream</EuiCode> being child
            components.
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: examplesSource
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <ChartExampleCode />
        </div>
      )
    },
    {
      title: 'Bar Series',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiChart</EuiCode> to display line, bar, area, and stream charts. Note that charts are composed with{' '}
            <EuiCode>EuiLine</EuiCode>, <EuiCode>EuiArea</EuiCode>, <EuiCode>EuiBar</EuiCode>, and <EuiCode>EuiStream</EuiCode> being child
            components.
          </p>
        </div>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: examplesSource
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <ChartExampleCode />
        </div>
      )
    }
  ]
};
