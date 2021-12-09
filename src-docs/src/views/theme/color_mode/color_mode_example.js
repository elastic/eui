import React from 'react';

import { GuideSectionTypes } from '../../../components';

import { EuiCode } from '../../../../../src';

import { ThemeNotice } from '../_components/_theme_notice';
import Intro from './_color_mode_intro';

import Inverse from './inverse';
const InverseSource = require('!!raw-loader!./inverse');

export const ColorModeExample = {
  title: 'Color mode',
  notice: <ThemeNotice type="both" />,
  isNew: true,
  beta: true,
  intro: <Intro />,
  sections: [
    {
      title: 'Rendering a specific color mode',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: InverseSource,
        },
      ],
      text: (
        <>
          <p>
            While it is usually best to keep all consumptions of the global
            variables rendering in the same light or dark color mode, some
            instances benefit from an exaggerated change in contrast from the
            current theme. For this you can specify{' '}
            <strong>EuiThemeProvider</strong>&apos;s{' '}
            <EuiCode>colorMode</EuiCode> to always be{' '}
            <EuiCode>{'"light"'}</EuiCode>, <EuiCode>{'"dark"'}</EuiCode>, or{' '}
            <EuiCode>{'"inverse"'}</EuiCode> which sets it to the opposite of
            the current color mode.
          </p>
        </>
      ),
      demo: <Inverse />,
    },
  ],
};
