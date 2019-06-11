import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import { renderToHtml } from '../../services';

import Bars from './simple_bars';
const barsSource = require('!!raw-loader!./simple_bars');
const barsHtml = renderToHtml(Bars);

import Lines from './line';
const linesSource = require('!!raw-loader!./line');
const linesHtml = renderToHtml(Bars);

import Area from './area';
const areaSource = require('!!raw-loader!./area');
const areaHtml = renderToHtml(Area);

// import '!!style-loader!css-loader!@elastic/charts/dist/theme_light.css';

import {
  EuiSpacer,
  EuiCode,
} from '../../../../src/components';

export const ElasticChartsTypesExample = {
  title: 'Types',
  intro: (
    <Fragment>
      <p>
        You can use <EuiCode>Elastic-Charts</EuiCode>.
      </p>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Bar',
      text: (
        <p>
          You can create out-of-the-box vertical bar charts just adding a{' '}
          <EuiCode>BarSeries</EuiCode>
          component into your <EuiCode>Chart</EuiCode>.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: barsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: barsHtml,
        },
      ],
      demo: <Bars />,
    },
    {
      title: 'Line',
      text: (
        <p>
          You can create out-of-the-box vertical line charts just adding a{' '}
          <EuiCode>LineSeries</EuiCode>
          component into your <EuiCode>Chart</EuiCode>.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: linesHtml,
        },
      ],
      demo: <Lines />,
    },
    {
      title: 'Area',
      text: (
        <p>
          You can create out-of-the-box vertical area charts just adding a{' '}
          <EuiCode>AreaSeries</EuiCode>
          component into your <EuiCode>Chart</EuiCode>.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: areaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: areaHtml,
        },
      ],
      demo: <Area />,
    },
  ],
};
