import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiCallOut,
  EuiCode,
  EuiLink,
} from '../../../../src/components';
import { EuiThemeProvider } from '../../../../src/services';

import Consuming from './consuming';
const consumingSource = require('!!raw-loader!./consuming');

import { ConsumingHOC } from './consuming_hoc';
const consumingHOCSource = require('!!raw-loader!./consuming_hoc');

import Inverse from './inverse';
const InverseSource = require('!!raw-loader!./inverse');

import OverrideSimple from './override_simple';
const overrideSimpleSource = require('!!raw-loader!./override_simple');

import Computed from './computed';
const computedSource = require('!!raw-loader!./computed');

import CreateComputed from './create_computed';
const createComputedSource = require('!!raw-loader!./create_computed');

export const ThemeExample = {
  title: 'Theme provider',
  isNew: true,
  beta: true,
  intro: (
    <>
      <EuiText>
        <p>
          EUI is in the progress of switching it&apos;s core styles processor
          from Sass to <EuiLink to="https://emotion.sh">Emotion</EuiLink>. It
          requires that all consumer applications wrap their core application
          with <strong>EuiThemeProvider</strong>.
        </p>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiCallOut title="The following examples assume that you have wrapped your entire application with this provider." />
    </>
  ),
  sections: [
    {
      title: 'EuiThemeProvider',
      text: (
        <>
          <p>
            The context layer that enables theming (including the default theme
            styles) comes from <EuiCode>EuiThemeProvider</EuiCode>. It is a thin
            wrapper around and caching layer built onto{' '}
            <EuiCode>React.Context.Provider</EuiCode>.
          </p>
          <p>
            Typically your app will only need a single instance at the top level
            and the functionality will flow down the component tree. It is also
            possible to use several nested theme providers. In this case each
            nested provider will inherit from its closest ancestor provider.
          </p>
          <p>
            <EuiCode>EuiThemeProvider</EuiCode> accepts three props, all of
            which have default values and are therefore optional. To use the
            default EUI theme, no configuration is required.
          </p>
          <ul>
            <li>
              <EuiCode language="ts">theme: EuiThemeSystem</EuiCode> Raw theme
              values. Calculated values are acceptable.
            </li>
            <li>
              <EuiCode language="ts">colorMode: EuiThemeColorMode</EuiCode>{' '}
              Simply {"'light'"} or {"'dark'"}
            </li>
            <li>
              <EuiCode language="ts">modify: EuiThemeModifications</EuiCode>{' '}
              Overrides and modifications for theme values.
            </li>
          </ul>
          <p>
            The concept for each prop is explained in subsequent sections. More
            information on the full shape of an EUI theme, see the{' '}
            <EuiLink href="#/theming/global-values">Global Values</EuiLink>{' '}
            page.
          </p>
        </>
      ),
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
            Using the react hook <strong>useEuiTheme()</strong> makes it very
            easy to consume the EUI static and computed variables like colors
            and sizing. It simply passes back an object of the current theme
            which includes
          </p>
          <ul>
            <li>
              <EuiCode language="ts">euiTheme: EuiThemeComputed</EuiCode> All
              the calculated keys including any modifications
            </li>
            <li>
              <EuiCode language="ts">colorMode: EuiThemeColorMode</EuiCode>{' '}
              Simply {"'light'"} or {"'dark'"}
            </li>
            <li>
              <EuiCode language="ts">
                modifications: EuiThemeModifications
              </EuiCode>{' '}
              Only the modification keys
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
      title: 'Understanding computed values',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: computedSource,
        },
      ],
      text: (
        <>
          <p>
            The benefit of EUI&apos;s theme structure is that it only hard-codes
            a few color and size variables. The rest are{' '}
            <strong>computed</strong> values based on this base few. When you
            update a core variable, this will cascade into the other computed
            values.
          </p>
          <p>
            For instance, we compute text variants of our base colors. So
            locally overriding the <EuiCode>colors.primary</EuiCode> color will
            automatically cascade to the <EuiCode>colors.primaryText</EuiCode>.
            You can however, directly override computed values as well by
            passing a custom value to this theme variable.
          </p>
        </>
      ),
      demo: <Computed />,
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
