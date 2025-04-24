import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import { EuiText, EuiThemeProvider, EuiCode, EuiLink } from '../../../../src';

import Provider from './provider';

import Consuming from './consuming';
const consumingSource = require('!!raw-loader!./consuming');

import { ConsumingHOC } from './consuming_hoc';
const consumingHOCSource = require('!!raw-loader!./consuming_hoc');

import ConsumingEmotionTheme from './consuming_emotion_theme';
const consumingEmotionThemeSource = require('!!raw-loader!./consuming_emotion_theme');

import OverrideSimple from './override_simple';
const overrideSimpleSource = require('!!raw-loader!./override_simple');

import CreateComputed from './create_computed';
import { ThemeNotice } from './_components/_theme_notice';
const createComputedSource = require('!!raw-loader!./create_computed');

export const ThemeExample = {
  title: 'Theme provider',
  notice: <ThemeNotice />,
  intro: (
    <>
      <EuiText>
        <p>
          While{' '}
          <EuiLink href="#utilities/provider">
            <strong>EuiProvider</strong>
          </EuiLink>{' '}
          should not be included more than once at the top level of your app,
          you may use multiple nested <strong>EuiThemeProviders</strong> to
          customize section-specific or component-specific{' '}
          <Link to="/theming/color-mode#rendering-a-specific-color-mode">
            color modes
          </Link>{' '}
          or theme overrides.
        </p>
      </EuiText>
    </>
  ),
  sections: [
    {
      title: 'EuiThemeProvider',
      text: (
        <>
          <p>
            The context layer that enables theming comes from{' '}
            <EuiCode>EuiThemeProvider</EuiCode>.{' '}
            <EuiCode>EuiThemeProvider</EuiCode> accepts four main props (all of
            which have default values and are therefore optional):
          </p>
          <ul>
            <li>
              <EuiCode language="ts">theme:</EuiCode> Raw theme values.
              Calculated values are acceptable. For the full shape of an EUI
              theme, see the{' '}
              <EuiLink href="#/theming/customizing-themes">
                global values
              </EuiLink>{' '}
              page.
            </li>
            <li>
              <EuiCode language="ts">modify:</EuiCode> Accepts an object of
              overrides for theme values. For usage examples, see{' '}
              <EuiLink href="#/theming/theme-provider#simple-instance-overrides">
                Simple instance overrides
              </EuiLink>{' '}
              below.
            </li>
            <li>
              <EuiCode language="ts">colorMode:</EuiCode> Accepts 'light',
              'dark', or 'inverse'. For usage, see the{' '}
              <EuiLink href="#/theming/color-mode">Color mode</EuiLink> page.
            </li>
            <li>
              <EuiCode language="ts">highContrastMode:</EuiCode> Accepts a
              true/false boolean. For usage, see the{' '}
              <EuiLink href="#/theming/high-contrast-mode">
                High contrast mode
              </EuiLink>{' '}
              page.
            </li>
          </ul>
          <p>To use the default EUI theme, no configuration is required.</p>
        </>
      ),
      demo: <Provider />,
      props: { EuiThemeProvider },
    },
    {
      title: 'Consuming with the React hook',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: consumingSource,
        },
      ],
      text: (
        <>
          <p>
            Using the React hook <EuiCode>useEuiTheme()</EuiCode> makes it very
            easy to consume EUI's static and computed variables, like colors and
            sizing. It simply passes back an object of the current theme which
            includes:
          </p>
          <ul>
            <li>
              <EuiCode language="ts">euiTheme:</EuiCode> All the calculated keys
              including any modifications
            </li>
            <li>
              <EuiCode language="ts">modifications:</EuiCode> Only the
              modification keys
            </li>
            <li>
              <EuiCode language="ts">colorMode:</EuiCode> Either "LIGHT" or
              "DARK"
            </li>
            <li>
              <EuiCode language="ts">highContrastMode:</EuiCode> Either
              'forced', 'preferred', or <EuiCode>false</EuiCode>
            </li>
          </ul>
          <p>
            When consuming the theme&apos;s keys like{' '}
            <EuiCode>euiTheme.colors.primary</EuiCode>, you&apos;ll want to pass
            them via the <EuiCode>css</EuiCode> property to take advantage of
            Emotion&apos;s compilation.
          </p>
        </>
      ),
      demo: <Consuming />,
    },
    {
      title: 'Consuming with the React HOC',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: consumingHOCSource,
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
    {
      title: "Consuming with Emotion's theming",
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: consumingEmotionThemeSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiThemeProvider</strong> by default sets an{' '}
            <EuiLink href="https://emotion.sh/docs/theming" target="_blank">
              Emotion theme context
            </EuiLink>{' '}
            with the results of <strong>useEuiTheme()</strong>. This is a
            syntactical sugar convenience that allows you to take advantage of
            Emotion's <EuiCode>styled</EuiCode> syntax, or use a function in the{' '}
            <EuiCode>css</EuiCode> prop.
          </p>
          <p>
            If you prefer to use or access your own custom Emotion theme, you
            can completely override EUI's passed theme at any time with your own{' '}
            <EuiCode>ThemeProvider</EuiCode> - see the second box below for an
            example.
          </p>
        </>
      ),
      demo: <ConsumingEmotionTheme />,
    },
    {
      title: 'Simple instance overrides',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: overrideSimpleSource,
        },
      ],
      text: (
        <>
          <p>
            Usually, you won&apos;t need to actually override an EUI theme
            variable at the instance level. Instead, you&apos;d just create a
            new variable local to that component. However, if you cannot alter
            the component that is using the EUI variable then you can wrap that
            component with the <strong>EuiThemeProvider</strong> and pass your
            custom object to <EuiCode>modify</EuiCode>.
          </p>
        </>
      ),
      demo: <OverrideSimple />,
    },
    {
      title: 'Creating custom keys',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: createComputedSource,
        },
      ],
      text: (
        <>
          <p>
            Because of the computed values and possible cascade effects, it may
            not be advisable to locally <strong>override</strong> any EUI
            specific theme variables. Instead, you should append custom keys to
            the theme.
          </p>
        </>
      ),
      demo: <CreateComputed />,
    },
  ],
};
