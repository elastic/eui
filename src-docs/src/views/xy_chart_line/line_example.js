import React from 'react';
import { GuideSectionTypes } from '../../components';
import LineChartExample from './line';
import CustomDomainLineChartExample from './custom_domain_line';
import MultiLineChartExample from './multi_line';
import CurvedLineChartExample from './curved_line';
import CustomStyleLineChartExample from './custom_style_line';
import {
  EuiCode,
  EuiLine,
  EuiLink,
} from '../../../../src/components';

export const XYChartLineExample = {
  title: 'Line chart',
  sections: [
    {
      title: 'Line chart',
      text: (
        <div>
          <p>
            Use <EuiCode>EuiLine</EuiCode> to display line charts. The chart domain
            will cover the whole extent and doesn&apos;t add any padding.
          </p>
        </div>
      ),
      props: { EuiLine },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./line')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <LineChartExample />
        </div>
      )
    },
    {
      title: 'Custom domain line chart',
      text: (
        <div>
          <p>
          Use <EuiCode>EuiLine</EuiCode> to display line charts.
          Specify <EuiCode>xDomain</EuiCode> and/or <EuiCode>yDomain</EuiCode>
          props to use custom domains.
          </p>
        </div>
      ),
      props: { EuiLine },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./custom_domain_line')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <CustomDomainLineChartExample />
        </div>
      )
    },
    {
      title: 'Multi Line chart',
      text: (
        <div>
          <p>
            Use multiple <EuiCode>EuiLine</EuiCode> to display a milti-line chart.
          </p>
        </div>
      ),
      props: { EuiLine },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./multi_line')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <MultiLineChartExample />
        </div>
      )
    },
    {
      title: 'Curved Line chart',
      text: (
        <div>
          <p>
            Use the <EuiCode>curve</EuiCode> prop to change the curve representation.
            Visit <EuiLink href="https://github.com/d3/d3-shape#curves" target="_blank">d3-shape#curves</EuiLink>
            for all possible values.
          </p>
        </div>
      ),
      props: { EuiLine },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./curved_line')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <CurvedLineChartExample />
        </div>
      )
    },
    {
      title: 'Custom style Line chart',
      text: (
        <div>
          <p>Use the following props to change the style of the Line Chart</p>
          <ul>
            <li><EuiCode>lineSize</EuiCode> to change the size/width of the line.</li>
            <li><EuiCode>lineMarkSize</EuiCode> to change the size/radius of marks.</li>
            <li><EuiCode>showLine</EuiCode> to show/hide the line.</li>
            <li><EuiCode>showLineMarks</EuiCode> to show/hide the line marks.</li>
          </ul>
        </div>
      ),
      props: { EuiLine },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./custom_style_line')
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React'
        }
      ],
      demo: (
        <div style={{ margin: 60 }}>
          <CustomStyleLineChartExample />
        </div>
      )
    },
  ]
};
