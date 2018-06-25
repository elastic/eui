import React from 'react';
import { GuideSectionTypes } from '../../components';
import { EuiCode, EuiXAxis, EuiYAxis, EuiLineAnnotation } from '../../../../src/components';
import SimpleAxisExampleCode from './simple_axis';
import AnnotationExampleCode from './annotations';

export const XYChartAxisExample = {
  title: 'Axis',
  sections: [
    {
      title: 'Complex Axis example',
      text: (
        <div>
          <p>
            <EuiCode>EuiYAxis</EuiCode> and <EuiCode>EuiXAxis</EuiCode> can be used instead of the{' '}
            <EuiCode>EuiDefaultAxis</EuiCode> to allow higher axis customization. See the JS example
            to check the available properties.
          </p>
        </div>
      ),
      props: { EuiXAxis, EuiYAxis },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./simple_axis'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <SimpleAxisExampleCode />
        </div>
      ),
    },
    {
      title: 'Annotations',
      text: (
        <div>
          <p>
            <EuiCode>EuiLineAnnotation</EuiCode> can be used to add annotation lines with optional text
            on the chart.
          </p>
        </div>
      ),
      props: { EuiLineAnnotation },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./simple_axis'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <AnnotationExampleCode />
        </div>
      ),
    },
  ],
};
