/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
} from './utils';

describe('isInverseColorMode', () => {
  it("true only if 'inverse'", () => {
    expect(isInverseColorMode('LIGHT')).toBe(false);
    expect(isInverseColorMode('DARK')).toBe(false);
    expect(isInverseColorMode('custom')).toBe(false);
    expect(isInverseColorMode()).toBe(false);
    expect(isInverseColorMode('INVERSE')).toBe(true);
  });
});

describe('getColorMode', () => {
  it("defaults to 'LIGHT'", () => {
    expect(getColorMode()).toEqual('LIGHT');
  });
  it('uses `parentMode` as fallback', () => {
    expect(getColorMode(undefined, 'DARK')).toEqual('DARK');
  });
  it("understands 'INVERSE'", () => {
    expect(getColorMode('INVERSE', 'DARK')).toEqual('LIGHT');
    expect(getColorMode('INVERSE', 'LIGHT')).toEqual('DARK');
    expect(getColorMode('INVERSE')).toEqual('LIGHT');
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
      LIGHT: { primary: '#000' },
      DARK: { primary: '#FFF' },
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
  it('can shortcut color modes', () => {
    expect(getOn(obj, 'colors.primary', 'LIGHT')).toEqual('#000');
    expect(getOn(obj, 'colors.primary', 'DARK')).toEqual('#FFF');
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
  it('should transform to Computed with dependencies array', () => {
    const output = computed(([path]) => path, ['path.to']);
    expect(output).toBeInstanceOf(Computed);
    expect(output.computer).toBeInstanceOf(Function);
    expect(output.dependencies).toEqual(['path.to']);
  });
  it('should transform to Computed with single dependency', () => {
    const output = computed((path) => path, 'path.to');
    expect(output).toBeInstanceOf(Computed);
    expect(output.computer).toBeInstanceOf(Function);
    expect(output.dependencies).toEqual('path.to');
  });
  it('should transform to Computed without dependencies array', () => {
    const output = computed((path) => path);
    expect(output).toBeInstanceOf(Computed);
  });
});

const theme = buildTheme(
  {
    colors: {
      LIGHT: {
        primary: '#000',
        secondary: computed(([primary]) => `${primary}000`, ['colors.primary']),
      },
      DARK: {
        primary: '#FFF',
        secondary: computed((theme) => `${theme.colors.primary}FFF`),
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
    // @ts-expect-error intentionally not using a full EUI theme definition
    expect(getComputed(theme, {}, 'LIGHT')).toEqual({
      colors: { primary: '#000', secondary: '#000000' },
      sizes: { small: 8 },
      themeName: 'minimal',
    });
    // @ts-expect-error intentionally not using a full EUI theme definition
    expect(getComputed(theme, {}, 'DARK')).toEqual({
      colors: { primary: '#FFF', secondary: '#FFFFFF' },
      sizes: { small: 8 },
      themeName: 'minimal',
    });
  });
  it('respects simple overrides', () => {
    expect(
      // @ts-expect-error intentionally not using a full EUI theme definition
      getComputed(theme, buildTheme({ sizes: { small: 4 } }, ''), 'LIGHT')
    ).toEqual({
      colors: { primary: '#000', secondary: '#000000' },
      sizes: { small: 4 },
      themeName: 'minimal',
    });
  });
  it('respects overrides in computation', () => {
    expect(
      getComputed(
        // @ts-expect-error intentionally not using a full EUI theme definition
        theme,
        buildTheme({ colors: { LIGHT: { primary: '#CCC' } } }, ''),
        'LIGHT'
      )
    ).toEqual({
      colors: { primary: '#CCC', secondary: '#CCC000' },
      sizes: { small: 8 },
      themeName: 'minimal',
    });
  });
  it('respects property extensions', () => {
    expect(
      getComputed(
        // @ts-expect-error intentionally not using a full EUI theme definition
        theme,
        buildTheme({ colors: { LIGHT: { tertiary: '#333' } } }, ''),
        'LIGHT'
      )
    ).toEqual({
      colors: { primary: '#000', secondary: '#000000', tertiary: '#333' },
      sizes: { small: 8 },
      themeName: 'minimal',
    });
  });
  it('respects section extensions', () => {
    expect(
      getComputed(
        // @ts-expect-error intentionally not using a full EUI theme definition
        theme,
        buildTheme({ custom: { myProp: '#333' } }, ''),
        'LIGHT'
      )
    ).toEqual({
      colors: { primary: '#000', secondary: '#000000' },
      sizes: { small: 8 },
      custom: { myProp: '#333' },
      themeName: 'minimal',
    });
  });
  it('respects extensions in computation', () => {
    expect(
      getComputed(
        // @ts-expect-error intentionally not using a full EUI theme definition
        theme,
        buildTheme(
          {
            colors: {
              LIGHT: {
                tertiary: computed(([primary]) => `${primary}333`, [
                  'colors.primary',
                ]),
              },
            },
          },
          ''
        ),
        'LIGHT'
      )
    ).toEqual({
      colors: { primary: '#000', secondary: '#000000', tertiary: '#000333' },
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
