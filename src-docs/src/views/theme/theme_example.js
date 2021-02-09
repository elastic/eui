import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiCallOut,
  EuiCode,
} from '../../../../src/components';
import { EuiThemeProvider } from '../../../../src/services';

import Consuming from './consuming';
const consumingSource = require('!!raw-loader!./consuming');
const consumingHtml = renderToHtml(Consuming);

import { ConsumingHOC } from './consuming_hoc';
const consumingHOCSource = require('!!raw-loader!./consuming_hoc');
const consumingHOCHtml = renderToHtml(ConsumingHOC);

export const ThemeExample = {
  title: 'Theme provider',
  intro: (
    <>
      <EuiText>
        <p>
          EUI is in the procress of switching it&apos;s core styles procressor
          from Sass to Emotion. It requires that all consumer applications wrap
          their core application with <strong>EuiThemeProvider</strong>.
        </p>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiCallOut
        size="s"
        title="The following examples assume that you have wrapped your entire application with this provider."
      />
      <EuiSpacer size="xl" />
    </>
  ),
  sections: [
    {
      title: 'EuiThemeProvider',
      text: <p>TODO</p>,
      props: { EuiThemeProvider },
    },
    {
      title: 'Consuming with React hook',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: consumingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: consumingHtml,
        },
      ],
      text: (
        <>
          <p>
            Using the react hook <strong>useEuiTheme()</strong> makes it very
            easy to consume the EUI static variables like colors and sizing. It
            will also automatically update based on the currently used theme.
          </p>
          <p>
            You&apos;ll want to pass these theme variables via the{' '}
            <EuiCode>css</EuiCode> property to take advantage of Emotion&apos;s
            compilation.
          </p>
        </>
      ),
      demo: <Consuming />,
    },
    {
      title: 'Consuming with React HOC',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: consumingHOCSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: consumingHOCHtml,
        },
      ],
      text: (
        <>
          <p>
            When using inside of a React Component, you can wrap your exported
            component with <strong>withEuiTheme()</strong>.
          </p>
        </>
      ),
      demo: <ConsumingHOC />,
    },
  ],
};
