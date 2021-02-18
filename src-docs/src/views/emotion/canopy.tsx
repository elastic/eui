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
  EuiThemeModifications,
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
      dark: { euiColorPrimary: '#BD07A5' },
    },
  };
  return (
    <>
      <View />

      <EuiSpacer />
      <EuiThemeProvider modify={overrides}>
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
          () => '#85E89d'
        ),
      },
      dark: { euiColorSecondary: '#F0FFF4' },
    },
  };
  return (
    <>
      <EuiSpacer />
      <EuiThemeProvider modify={overrides}>
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

  // Difference is due to automatic colorMode reduction during value computation.
  // Makes typing slightly inconvenient, but makes consuming values very convenient.
  type ExtensionsUncomputed = {
    colors: { light: { myColor: string }; dark: { myColor: string } };
    custom: {
      colors: {
        light: { customColor: string };
        dark: { customColor: string };
      };
      mySize: number;
    };
  };
  type ExtensionsComputed = {
    colors: { myColor: string };
    custom: { colors: { customColor: string }; mySize: number };
  };

  // Type (EuiThemeModifications<ExtensionsUncomputed>) only necessary if you want IDE autocomplete support here
  const extend: EuiThemeModifications<ExtensionsUncomputed> = {
    colors: {
      light: {
        euiColorPrimary: '#F56407',
        myColor: computed(['colors.euiColorPrimary'], ([primary]) => primary),
      },
      dark: {
        euiColorPrimary: '#FA924F',
        myColor: computed(['colors.euiColorPrimary'], ([primary]) => primary),
      },
    },
    custom: {
      colors: {
        light: { customColor: '#080AEF' },
        dark: { customColor: '#087EEF' },
      },
      mySize: 5,
    },
  };

  const Extend = () => {
    // Generic type (ExtensionsComputed) necessary if accessing extensions/custom properties
    const [{ colors, custom }, colorMode] = useEuiTheme<ExtensionsComputed>();
    return (
      <div css={{ display: 'flex' }}>
        <div>
          {colorMode}
          <pre>
            <code>{JSON.stringify({ colors, custom }, null, 2)}</code>
          </pre>
        </div>
        <div>
          <h3>
            <EuiIcon
              aria-hidden="true"
              type="stopFilled"
              size="xxl"
              css={{ color: colors.myColor }}
            />
          </h3>
          <h3>
            <EuiIcon
              aria-hidden="true"
              type="stopFilled"
              size="xxl"
              css={{ color: colors.myColor }}
            />
          </h3>
          <h3>
            <EuiIcon
              aria-hidden="true"
              type="stopFilled"
              size="xxl"
              css={{
                color: custom.colors.customColor,
              }}
            />
          </h3>
        </div>
      </div>
    );
  };

  return (
    <>
      <EuiThemeProvider
        // theme={DefaultEuiTheme}
        // colorMode={colorMode}
        modify={overrides}>
        <button type="button" onClick={toggleTheme}>
          <del>Toggle Color Mode!</del> Use global config
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
      {/* Generic type is not necessary here. Note that it should be the uncomputed type */}
      <EuiThemeProvider<ExtensionsUncomputed> modify={extend}>
        <em>Extensions</em>
        <Extend />
      </EuiThemeProvider>
    </>
  );
};
