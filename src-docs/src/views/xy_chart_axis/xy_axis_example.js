import React from 'react';
import { GuideSectionTypes } from '../../components';
import { EuiCode, EuiXAxis, EuiYAxis } from '../../../../src/components';
import SimpleAxisExampleCode from './simple_axis';

export const XYChartAxisExample = {
  title: 'Axis',
  sections: [
    {
      title: 'Complex Axis example',
      text: (
        <div>
          <p>
            <EuiCode>EuiYAxis</EuiCode> and <EuiCode>EuiXAxis</EuiCode> can be used
            instead of the <EuiCode>EuiDefaultAxis</EuiCode> to allow higher
            axis customization. See the JS example to check the available properties.
          </p>
        </div>
      ),
      props: { EuiXAxis, EuiYAxis },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./simple_axis')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <SimpleAxisExampleCode />
        </div>
      )
    },
  ]
};
