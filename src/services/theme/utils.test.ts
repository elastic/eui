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

import {
  isInverseColorMode,
  getColorMode,
  getOn,
  setOn,
  computed,
  Computed,
  getComputed,
  buildTheme,
  mergeDeep,
  currentColorModeOnly,
} from './utils';

describe('isInverseColorMode', () => {
  it("true only if 'inverse'", () => {
    expect(isInverseColorMode('light')).toBe(false);
    expect(isInverseColorMode('dark')).toBe(false);
    expect(isInverseColorMode('custom')).toBe(false);
    expect(isInverseColorMode()).toBe(false);
    expect(isInverseColorMode('inverse')).toBe(true);
  });
});

describe('getColorMode', () => {
  it("defaults to 'light'", () => {
    expect(getColorMode()).toEqual('light');
  });
  it('uses `parentMode` as fallback', () => {
    expect(getColorMode(undefined, 'dark')).toEqual('dark');
  });
  it("understands 'inverse'", () => {
    expect(getColorMode('inverse', 'dark')).toEqual('light');
    expect(getColorMode('inverse', 'light')).toEqual('dark');
    expect(getColorMode('inverse')).toEqual('light');
  });
  it('respects custom modes', () => {
    expect(getColorMode('custom')).toEqual('custom');
    expect(getColorMode('custom', 'light')).toEqual('custom');
    expect(getColorMode(undefined, 'custom')).toEqual('custom');
    expect(getColorMode('light', 'custom')).toEqual('light');
  });
});

describe('getOn', () => {
  const obj = {
    parent: {
      child: 'childVal',
    },
    other: {
      thing: {
        string: 'stringVal',
        nested: ['array'],
        number: 0,
        func: () => {},
      },
    },
    colors: {
      light: { primary: '#000' },
      dark: { primary: '#FFF' },
      custom: { primary: '#333' },
    },
  };
  it('gets values at the given path', () => {
    expect(getOn(obj, 'parent', '')).toEqual({
      child: 'childVal',
    });
    expect(getOn(obj, 'parent.child', '')).toEqual('childVal');
    expect(getOn(obj, 'other.thing.string', '')).toEqual('stringVal');
  });
  it('gets values of various kinds', () => {
    expect(getOn(obj, 'other.thing.nested', '')).toEqual(['array']);
    expect(getOn(obj, 'other.thing.number', '')).toEqual(0);
    expect(getOn(obj, 'other.thing.func', '')).toBeInstanceOf(Function);
  });
  it('does can shortcut color modes', () => {
    expect(getOn(obj, 'colors.primary', 'light')).toEqual('#000');
    expect(getOn(obj, 'colors.primary', 'dark')).toEqual('#FFF');
    expect(getOn(obj, 'colors.primary', 'custom')).toEqual('#333');
  });
  it('will not error', () => {
    expect(getOn(obj, 'nope', '')).toBe(undefined);
    expect(getOn(obj, 'other.nope', '')).toBe(undefined);
    expect(getOn(obj, 'other.thing.nope', '')).toBe(undefined);
  });
});

describe('setOn', () => {
  let obj: {};
  beforeEach(() => {
    obj = {
      existing: {
        nested: {
          val: 'value',
        },
      },
    };
  });
  it('sets values at the given path', () => {
    setOn(obj, 'existing.new', 'value');
    expect(obj).toEqual({
      existing: { nested: { val: 'value' }, new: 'value' },
    });
    setOn(obj, 'existing.nested.new', 'value');
    expect(obj).toEqual({
      existing: { nested: { val: 'value', new: 'value' }, new: 'value' },
    });
  });
  it('deep arbitrary creation', () => {
    setOn(obj, 'trail.blazing.happening.now', 'wow');
    expect(obj).toEqual({
      existing: { nested: { val: 'value' } },
      trail: { blazing: { happening: { now: 'wow' } } },
    });
  });
  it('overrides existing path value', () => {
    setOn(obj, 'existing.nested', 'diff');
    expect(obj).toEqual({
      existing: {
        nested: 'diff',
      },
    });
  });
});

describe('computed', () => {
  it('should transform to Computed', () => {
    const output = computed(['path.to'], ([path]) => path);
    expect(output).toBeInstanceOf(Computed);
    expect(output.computer).toBeInstanceOf(Function);
    expect(output.dependencies).toEqual(['path.to']);
  });
});

const theme = buildTheme(
  {
    colors: {
      light: {
        primary: '#000',
        secondary: computed(['colors.primary'], ([primary]) => `${primary}000`),
      },
      dark: {
        primary: '#FFF',
        secondary: computed(['colors.primary'], ([primary]) => `${primary}FFF`),
      },
    },
    sizes: {
      small: 8,
    },
  },
  'minimal'
);
describe('getComputed', () => {
  it('computes all values and returns only the current color mode', () => {
    // @ts-ignore intentionally not using a full EUI theme definition
    expect(getComputed(theme, {}, 'light')).toEqual({
      colors: { primary: '#000', secondary: '#000000' },
      sizes: { small: 8 },
      themeName: 'minimal',
    });
    // @ts-ignore intentionally not using a full EUI theme definition
    expect(getComputed(theme, {}, 'dark')).toEqual({
      colors: { primary: '#FFF', secondary: '#FFFFFF' },
      sizes: { small: 8 },
      themeName: 'minimal',
    });
  });
  it('respects simple overrides', () => {
    expect(
      // @ts-ignore intentionally not using a full EUI theme definition
      getComputed(theme, buildTheme({ sizes: { small: 4 } }, ''), 'light')
    ).toEqual({
      colors: { primary: '#000', secondary: '#000000' },
      sizes: { small: 4 },
      themeName: 'minimal',
    });
  });
  it('respects overrides in computation', () => {
    expect(
      getComputed(
        // @ts-ignore intentionally not using a full EUI theme definition
        theme,
        buildTheme({ colors: { light: { primary: '#CCC' } } }, ''),
        'light'
      )
    ).toEqual({
      colors: { primary: '#CCC', secondary: '#CCC000' },
      sizes: { small: 8 },
      themeName: 'minimal',
    });
  });
});

describe('buildTheme', () => {
  it('builds an EUI theme system', () => {
    // TypeError: 'getOwnPropertyDescriptor' on proxy: trap reported non-configurability for property 'length' which is either non-existant or configurable in the proxy target
    // expect(theme).toEqual(Proxy); // get() trap returns theme.model
    // expect(theme.root).toEqual(Proxy);
    expect(theme.key).toEqual('minimal');
  });
});

describe('mergeDeep', () => {
  it('merge simple objects, second into first', () => {
    expect(mergeDeep({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    expect(mergeDeep({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });
  it('merge complex objects, second into first', () => {
    expect(
      mergeDeep({ a: 1, b: { c: { d: 3 } } }, { b: { c: { d: 4 } } })
    ).toEqual({ a: 1, b: { c: { d: 4 } } });
    expect(
      mergeDeep({ a: 1, b: { c: { d: 3 } } }, { b: { c: { e: 5 } } })
    ).toEqual({ a: 1, b: { c: { d: 3, e: 5 } } });
  });
});

describe('currentColorModeOnly', () => {
  const theme = {
    colors: {
      light: {
        primary: '#000',
      },
      dark: {
        primary: '#FFF',
      },
    },
    sizes: {
      small: 8,
    },
    themeName: 'minimal',
  };
  it('object with only the current color mode colors', () => {
    expect(currentColorModeOnly('light', theme)).toEqual({
      colors: { primary: '#000' },
      sizes: { small: 8 },
      themeName: 'minimal',
    });
    expect(currentColorModeOnly('dark', theme)).toEqual({
      colors: { primary: '#FFF' },
      sizes: { small: 8 },
      themeName: 'minimal',
    });
  });
});
