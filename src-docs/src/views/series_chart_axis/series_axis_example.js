import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import { EuiCode, EuiCallOut, EuiSpacer } from '../../../../src/components';
import { EuiXAxis, EuiYAxis, EuiLineAnnotation } from '../../../../src/experimental';
import SimpleAxisExampleCode from './simple_axis';
import AnnotationExampleCode from './annotations';

export const XYChartAxisExample = {
  title: 'Axis',
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
      demo: <SimpleAxisExampleCode />,
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
      demo: <AnnotationExampleCode />,
    },
  ],
};
