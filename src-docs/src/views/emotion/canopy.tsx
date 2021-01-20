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
  useEuiTheme,
  withEuiTheme,
  EuiThemeProvider,
} from '../../../../src/services';
import { DefaultEuiTheme } from '../../../../src/themes';

const View = () => {
  const [theme, colorMode] = useEuiTheme();
  return (
    <div css={{ display: 'flex' }}>
      <div>
        {colorMode}
        <pre>
          <code>{JSON.stringify(theme, null, 2)}</code>
        </pre>
      </div>
      <div>
        <h3>
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: theme.colors.euiColorPrimary }}
          />
        </h3>
        <h3>
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: theme.colors.euiColorSecondary }}
          />
        </h3>
        <h3>
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: theme.colors.euiTextColor }}
          />
        </h3>
      </div>
    </div>
  );
};

const View3 = () => {
  const overrides = {
    light: {
      colors: { euiColorPrimary: '#8A07BD' },
    },
    dark: {
      colors: { euiColorPrimary: '#bd07a5' },
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
      colors: { euiColorSecondary: '#85e89d' },
    },
    dark: {
      colors: { euiColorSecondary: '#f0fff4' },
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

// eslint-disable-next-line react/prefer-stateless-function
class Block extends React.Component<any> {
  render() {
    const { theme, ...props } = this.props;
    return (
      <div {...props}>
        <EuiIcon
          aria-hidden="true"
          type="stopFilled"
          size="xxl"
          css={{ color: theme.theme.colors.euiColorPrimary }}
        />
      </div>
    );
  }
}
const BlockWithTheme = withEuiTheme(Block);

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
          euiColorPrimary: chroma.random().hex(),
        },
      },
    });
  };
  const darkColors = () => {
    setOverrides({
      ...overrides,
      dark: {
        colors: {
          euiColorPrimary: chroma.random().hex(),
        },
      },
    });
  };

  return (
    <>
      <EuiThemeProvider
        theme={DefaultEuiTheme}
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
          <em>withEuiTheme</em>
          <BlockWithTheme />
        </EuiThemeProvider>
      </EuiThemeProvider>
      <EuiSpacer />
    </>
  );
};
