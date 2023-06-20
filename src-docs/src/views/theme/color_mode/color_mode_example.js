import React from 'react';

import { GuideSectionTypes } from '../../../components';

import { EuiCode } from '../../../../../src';

import { ThemeNotice } from '../_components/_theme_notice';
import Intro from './_color_mode_intro';

import Inverse from './inverse';
const InverseSource = require('!!raw-loader!./inverse');

import InverseComplex from './inverse_complex';
const InverseComplexSource = require('!!raw-loader!./inverse_complex');

export const ColorModeExample = {
  title: 'Color mode',
  notice: <ThemeNotice />,
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
          <p>
            When nesting or overriding <strong>EuiThemeProvider</strong>, a
            wrapping <EuiCode>{'<span>'}</EuiCode> element that sets the correct
            default text color (normally set at the global{' '}
            <EuiCode>{'<body>'}</EuiCode> level) will be rendered. You can
            customize the display of this wrapping element by passing{' '}
            <EuiCode>wrapperProps</EuiCode>.
          </p>
          <p>
            Alternatively, if a wrapper will significantly impact the DOM
            layout/flow of your content, and if your child is a single React
            component, you may pass{' '}
            <EuiCode>{'wrapperProps={{ cloneElement: true }}'}</EuiCode> to
            avoid rendering an extra wrapper and to clone the correct color
            classes onto your child content.
          </p>
        </>
      ),
      demo: <Inverse />,
    },
    {
      title: 'Using color tokens in a specific color mode',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: InverseComplexSource,
        },
      ],
      text: (
        <p>
          The following example demonstrates how you can use color tokens in any
          of the color modes: <EuiCode>{'"light"'}</EuiCode>,{' '}
          <EuiCode>{'"dark"'}</EuiCode>, or <EuiCode>{'"inverse"'}</EuiCode>.
        </p>
      ),
      demo: <InverseComplex />,
    },
  ],
};
