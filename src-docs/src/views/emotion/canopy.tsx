/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
// import { css } from '@emotion/react';
import chroma from 'chroma-js';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiIcon } from '../../../../src/components/icon';
import {
  buildTheme,
  computed,
  useEuiTheme,
  EuiThemeProvider,
} from '../../../../src/services/theme';

const globalTheme = buildTheme({
  light: {
    colors: {
      primary: '#006BB4',
      secondary: computed(['light.colors.primary'], ([primary]) => {
        return chroma(primary).darken(2).hex();
      }),
      tertiary: computed(['light.colors.secondary'], ([secondary]) => {
        return chroma(secondary).brighten().hex();
      }),
    },
  },
  dark: {
    colors: {
      primary: '#DD0A73',
      secondary: computed(['dark.colors.primary'], ([primary]) => {
        return chroma(primary).brighten(3).hex();
      }),
      tertiary: computed(['dark.colors.secondary'], ([secondary]) => {
        return chroma(secondary).darken().hex();
      }),
    },
  },
});

const View = () => {
  const [theme, , colorMode] = useEuiTheme();
  return (
    <div css={{ display: 'flex' }}>
      <div>
        {colorMode}
        <pre>
          <code>{JSON.stringify(theme, null, 2)}</code>
        </pre>
      </div>
      <div>
        <h3 id={theme.colors.primary}>
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: theme.colors.primary }}
          />
        </h3>
        <h3 id={theme.colors.secondary}>
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: theme.colors.secondary }}
          />
        </h3>
        <h3 id={theme.colors.tertiary}>
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: theme.colors.tertiary }}
          />
        </h3>
      </div>
    </div>
  );
};

const View3 = () => {
  const overrides = {
    light: {
      colors: { primary: '#017D73' },
    },
    dark: {
      colors: { primary: '#F5A700' },
    },
  };
  return (
    <>
      <View />

      <EuiSpacer />
      <EuiThemeProvider overrides={overrides}>
        <em>Overriding primary</em>
        <View />
      </EuiThemeProvider>
    </>
  );
};

const View2 = () => {
  const overrides = {
    light: {
      colors: { secondary: '#017D73' },
    },
    dark: {
      colors: { secondary: '#F5A700' },
    },
  };
  return (
    <>
      <EuiSpacer />
      <EuiThemeProvider overrides={overrides}>
        <em>Overriding secondary</em>
        <View />
      </EuiThemeProvider>
    </>
  );
};

export default () => {
  const [colorMode, setColorMode] = React.useState('light');
  const toggleTheme = () => {
    setColorMode((mode) => (mode === 'light' ? 'dark' : 'light'));
  };
  const [overrides, setOverrides] = React.useState({});
  const lightColors = () => {
    setOverrides({
      ...overrides,
      light: {
        colors: {
          primary: chroma.random().hex(),
        },
      },
    });
  };
  const darkColors = () => {
    setOverrides({
      ...overrides,
      dark: {
        colors: {
          primary: chroma.random().hex(),
        },
      },
    });
  };

  return (
    <>
      <EuiThemeProvider
        theme={globalTheme}
        colorMode={colorMode}
        overrides={overrides}>
        <button type="button" onClick={toggleTheme}>
          Toggle Theme!
        </button>
        <EuiSpacer />
        <button type="button" onClick={lightColors}>
          Randomize Light Primary!
        </button>
        {'    '}
        <button type="button" onClick={darkColors}>
          Randomize Dark Primary!
        </button>

        <EuiSpacer />
        <em>Default view</em>
        <View />
        <View2 />
        <EuiSpacer />
        <EuiThemeProvider colorMode="inverse">
          <em>Inverse colorMode</em>
          <View3 />
        </EuiThemeProvider>
      </EuiThemeProvider>
      <EuiSpacer />
    </>
  );
};
