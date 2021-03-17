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
  WithEuiThemeProps,
  EuiThemeProvider,
  computed,
  euiThemeDefault,
  buildTheme,
  EuiThemeModifications,
} from '../../../../src/services';
import { EuiCodeBlock } from '../../../../src/components/code';
import { EuiButton } from '../../../../src/components/button';

const View = () => {
  const { euiTheme, colorMode } = useEuiTheme();
  return (
    <div>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: euiTheme.font.family,
        }}>
        <div
          // TODO: FOr docs, add in what a function vs array does in `css` and how to tell if a theme key is returning a single value or a set of properties
          css={[euiTheme.title.xxl, { color: euiTheme.colors.primary }]}>
          <strong>colorMode:</strong> {colorMode}
        </div>
        <div>
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: euiTheme.colors.primary }}
          />
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: euiTheme.colors.success }}
          />
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: euiTheme.colors.text }}
          />
        </div>
      </div>

      <EuiSpacer />
      <EuiCodeBlock>{JSON.stringify(euiTheme, null, 2)}</EuiCodeBlock>
    </div>
  );
};

const View3 = () => {
  const overrides = {
    colors: {
      light: { primary: '#8A07BD' },
      dark: { primary: '#BD07A5' },
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
        success: computed(['colors.primary'], () => '#85E89d'),
      },
      dark: { success: '#F0FFF4' },
    },
  };
  return (
    <>
      <EuiSpacer />
      <EuiThemeProvider modify={overrides}>
        <em>Overriding success</em>
        <View />
      </EuiThemeProvider>
    </>
  );
};

interface BlockProps extends WithEuiThemeProps {
  size?: 'xxl' | 'xl';
}
// eslint-disable-next-line react/prefer-stateless-function
class Block extends React.Component<BlockProps> {
  render() {
    const {
      theme: { euiTheme },
      size = 'xxl',
      ...props
    } = this.props;
    const blockStyle = css`
      color: ${euiTheme.colors.primary};
      border-radius: ${euiTheme.border.radiusSmall};
      border: ${euiTheme.border.editable};
    `;
    return (
      <div {...props}>
        <EuiIcon
          aria-hidden="true"
          type="stopFilled"
          size={size}
          css={blockStyle}
        />
      </div>
    );
  }
}
const BlockWithTheme = withEuiTheme(Block);

export default () => {
  const [overrides, setOverrides] = React.useState({});
  const lightColors = () => {
    setOverrides(
      mergeDeep(overrides, {
        colors: {
          light: {
            primary: chroma.random().hex(),
          },
        },
        base: Math.floor(Math.random() * Math.floor(16)),
        font: {
          family: 'Times',
        },
      })
    );
  };
  const darkColors = () => {
    setOverrides(
      mergeDeep(overrides, {
        colors: {
          dark: {
            primary: chroma.random().hex(),
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
        primary: '#F56407',
        myColor: computed(['colors.primary'], ([primary]) => primary),
      },
      dark: {
        primary: '#FA924F',
        myColor: computed(['colors.primary'], ([primary]) => primary),
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
    const {
      euiTheme: { font, colors, custom, title },
      colorMode,
    } = useEuiTheme<ExtensionsComputed>();
    return (
      <div>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: font.family,
          }}>
          <div
            // TODO: FOr docs, add in what a function vs array does in `css`
            css={[title.xxl, { color: colors.success }]}>
            <strong>colorMode:</strong> {colorMode}
          </div>
          <div>
            <EuiIcon
              aria-hidden="true"
              type="stopFilled"
              size="xxl"
              css={{ color: colors.myColor }}
            />
            <EuiIcon
              aria-hidden="true"
              type="stopFilled"
              size="xxl"
              css={{
                color: custom.colors.customColor,
              }}
            />
          </div>
        </div>

        <EuiSpacer />
        <EuiCodeBlock>
          {JSON.stringify({ colors, custom }, null, 2)}
        </EuiCodeBlock>
      </div>
    );
  };

  return (
    <>
      <EuiThemeProvider
        // theme={DefaultEuiTheme}
        // colorMode={colorMode}
        modify={overrides}>
        <EuiButton onClick={lightColors}>Randomize Light!</EuiButton>{' '}
        <EuiButton color="text" onClick={darkColors}>
          Randomize Dark!
        </EuiButton>
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
          <BlockWithTheme size="xxl" />
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
