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
  createTheme,
  computed,
  Computed,
  setOn,
} from '../../../../src/services/theme/theme';

const mergeDeep = (_target: any, source: any) => {
  const isObject = (obj: any) => obj && typeof obj === 'object';
  const target = { ..._target };

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep({ ...targetValue }, { ...sourceValue });
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
};

const DefaultEuiTheme = createTheme({
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

const EuiThemeContext = React.createContext<any>(undefined);
const EuiOverrideContext = React.createContext<any>({});
const EuiColorModeContext = React.createContext<any>(undefined);

export function EuiThemeProvider({
  theme: themeConfig,
  colorMode: _colorMode,
  overrides: _overrides = {},
  children,
}: {
  theme?: any;
  colorMode?: string;
  overrides?: any;
  children: any;
}) {
  const parentSystem = React.useContext(EuiThemeContext);
  const parentOverrides = React.useContext(EuiOverrideContext);
  const parentColorMode = React.useContext(EuiColorModeContext);
  // const isParentThemeProvider = parentSystem === undefined;

  const theme = React.useMemo(() => themeConfig || parentSystem, [
    themeConfig,
    parentSystem,
  ]);

  const colorMode = React.useMemo(
    () => getColorMode(_colorMode, parentColorMode),
    [_colorMode, parentColorMode]
  );
  const overrides = React.useMemo(() => {
    return mergeDeep(parentOverrides, _overrides);
  }, [_overrides, parentOverrides]);

  return (
    <EuiColorModeContext.Provider value={colorMode}>
      <EuiThemeContext.Provider value={theme}>
        <EuiOverrideContext.Provider value={overrides}>
          {children}
        </EuiOverrideContext.Provider>
      </EuiThemeContext.Provider>
    </EuiColorModeContext.Provider>
  );
}

function isInverseColorMode(colorMode?: string) {
  return colorMode === 'inverse';
}

function getColorMode(colorMode?: string, parentColorMode?: string) {
  if (colorMode == null) {
    return parentColorMode || 'light';
  } else if (isInverseColorMode(colorMode)) {
    return parentColorMode === 'dark' || parentColorMode === undefined
      ? 'light'
      : 'dark';
  } else {
    return colorMode;
  }
}

function compute(base: any, over: any) {
  const output = {};

  function loop(base: any, over: any, path?: string) {
    Object.keys(base).forEach((key) => {
      const baseValue =
        base[key] instanceof Computed
          ? base[key].getValue(base.root, over.root, output)
          : base[key];
      const overValue =
        over[key] instanceof Computed
          ? over[key].getValue(base.root, over.root, output)
          : over[key];
      const newPath = path ? `${path}.${key}` : `${key}`;
      if (baseValue && typeof baseValue === 'object') {
        loop(baseValue, overValue ?? {}, newPath);
      } else {
        setOn(output, newPath, overValue ?? baseValue);
      }
    });
  }
  loop(base, over);
  return output;
}

export function useEuiTheme() {
  const theme = React.useContext(EuiThemeContext);
  const overrides = React.useContext(EuiOverrideContext);
  const colorMode = React.useContext(EuiColorModeContext);
  const [values, setValues] = React.useState<any>(() => {
    return compute(theme, createTheme(overrides));
  });
  React.useEffect(() => {
    setValues(compute(theme, createTheme(overrides)));
  }, [theme, overrides]);
  return [values[colorMode], theme, colorMode];
}

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

export const Canopy = () => {
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
        </EuiThemeProvider>
      </EuiThemeProvider>
      <EuiSpacer />
    </>
  );
};
