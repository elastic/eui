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
import { css } from '@emotion/react';
import chroma from 'chroma-js';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiIcon } from '../../../../src/components/icon';
import {
  mergeDeep,
  useEuiTheme,
  withEuiTheme,
  EuiThemeProvider,
  computed,
  euiThemeDefault,
  buildTheme,
} from '../../../../src/services';

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
    colors: {
      light: { euiColorPrimary: '#8A07BD' },
      dark: { euiColorPrimary: '#bd07a5' },
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
    colors: {
      light: {
        euiColorSecondary: computed(
          ['colors.euiColorPrimary'],
          () => '#85e89d'
        ),
      },
      dark: { euiColorSecondary: '#f0fff4' },
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
    // TODO: TS autocomplete not working
    const blockStyle = css`
      color: ${theme.theme.colors.euiColorPrimary};
      border-radius: ${theme.theme.borders.euiBorderRadiusSmall};
      border: ${theme.theme.borders.euiBorderEditable};
    `;
    return (
      <div {...props}>
        <EuiIcon
          aria-hidden="true"
          type="stopFilled"
          size="xxl"
          css={blockStyle}
        />
      </div>
    );
  }
}
const BlockWithTheme = withEuiTheme(Block);

export default () => {
  // const [colorMode, setColorMode] = React.useState('light');
  const toggleTheme = () => {
    // setColorMode((mode) => (mode === 'light' ? 'dark' : 'light'));
  };
  const [overrides, setOverrides] = React.useState({});
  const lightColors = () => {
    setOverrides(
      mergeDeep(overrides, {
        colors: {
          light: {
            euiColorPrimary: chroma.random().hex(),
          },
        },
      })
    );
  };
  const darkColors = () => {
    setOverrides(
      mergeDeep(overrides, {
        colors: {
          dark: {
            euiColorPrimary: chroma.random().hex(),
          },
        },
      })
    );
  };

  const newTheme = buildTheme(
    {
      ...euiThemeDefault,
      custom: '#000',
    },
    'CUSTOM'
  );

  return (
    <>
      <EuiThemeProvider
        // theme={DefaultEuiTheme}
        // colorMode={colorMode}
        overrides={overrides}>
        <button type="button" onClick={toggleTheme}>
          {/* @ts-ignore strike */}
          <strike>Toggle Color Mode!</strike> Use global config
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
        <EuiThemeProvider<{ custom: string }>
          theme={newTheme}
          colorMode="inverse">
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
