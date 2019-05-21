import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import LineChartExample from './line';
import CustomDomainLineChartExample from './custom_domain_line';
import MultiLineChartExample from './multi_line';
import CurvedLineChartExample from './curved_line';
import CustomStyleLineChartExample from './custom_style_line';
import {
  EuiCode,
  EuiLink,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';
import { EuiLineSeries } from '../../../../src/experimental';

export const XYChartLineExample = {
  title: 'Line chart',
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
      title: 'Line chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiLineSeries</EuiCode> to display line charts. The
            chart domain will cover the whole extent and doesn&apos;t add any
            padding.
          </p>
        </div>
      ),
      props: { EuiLineSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./line'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <LineChartExample />,
    },
    {
      title: 'Custom domain line chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiLineSeries</EuiCode> to display line charts. Specify{' '}
            <EuiCode>xDomain</EuiCode> and/or <EuiCode>yDomain</EuiCode>
            props to use custom domains.
          </p>
        </div>
      ),
      props: { EuiLineSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./custom_domain_line'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <CustomDomainLineChartExample />,
    },
    {
      title: 'Multi Line chart',
      text: (
        <div>
          <p>
            Use multiple <EuiCode>EuiLineSeries</EuiCode> to display a
            milti-line chart.
          </p>
        </div>
      ),
      props: { EuiLineSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./multi_line'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <MultiLineChartExample />,
    },
    {
      title: 'Curved Line chart',
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
            for all possible values.
          </p>
        </div>
      ),
      props: { EuiLineSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./curved_line'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <CurvedLineChartExample />,
    },
    {
      title: 'Custom style Line chart',
      text: (
        <div>
          <p>Use the following props to change the style of the Line Chart</p>
          <ul>
            <li>
              <EuiCode>lineSize</EuiCode> to change the size/width of the line.
            </li>
            <li>
              <EuiCode>lineMarkSize</EuiCode> to change the size/radius of
              marks.
            </li>
            <li>
              <EuiCode>showLine</EuiCode> to show/hide the line.
            </li>
            <li>
              <EuiCode>showLineMarks</EuiCode> to show/hide the line marks.
            </li>
          </ul>
        </div>
      ),
      props: { EuiLineSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./custom_style_line'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: <CustomStyleLineChartExample />,
    },
  ],
};
