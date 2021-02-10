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
  EuiThemeColorMode,
  EuiThemeOverrides,
  EuiThemeSystem,
  EuiThemeShape,
  EuiThemeComputed,
} from './types';

export const COLOR_MODE_KEY = 'colors';
export const DEFAULT_COLOR_MODE = 'light';

const isObject = (obj: any) => obj && typeof obj === 'object';

export const isInverseColorMode = (colorMode?: EuiThemeColorMode) => {
  return colorMode === 'inverse';
};

export const getColorMode = (
  colorMode?: EuiThemeColorMode,
  parentColorMode?: EuiThemeColorMode
) => {
  if (colorMode == null) {
    return parentColorMode || DEFAULT_COLOR_MODE;
  } else if (isInverseColorMode(colorMode)) {
    return parentColorMode === 'dark' || parentColorMode === undefined
      ? 'light'
      : 'dark';
  } else {
    return colorMode;
  }
};

export const getOn = (
  model: { [key: string]: any },
  _path: string,
  colorMode: EuiThemeColorMode
) => {
  const path = _path.split('.');
  let node = model;
  while (path.length) {
    const segment = path.shift()!;
    if (node.hasOwnProperty(segment) === false) {
      return undefined;
    }
    if (segment === COLOR_MODE_KEY) {
      if (node[segment].hasOwnProperty(colorMode) === false) {
        return undefined;
      } else {
        node = node[segment][colorMode];
      }
    } else {
      if (node[segment] instanceof Computed) {
        node = node[segment].getValue(null, null, node, colorMode);
      } else {
        node = node[segment];
      }
    }
  }

  return node;
};

export const setOn = (
  model: { [key: string]: any },
  _path: string,
  value: any
) => {
  const path = _path.split('.');
  const propertyName = path.pop()!;
  let node = model;

  while (path.length) {
    const segment = path.shift()!;
    if (node.hasOwnProperty(segment) === false) {
      node[segment] = {};
    }
    node = node[segment];
  }

  node[propertyName] = value;
  return true;
};

export class Computed<T> {
  constructor(
    public dependencies: string[],
    public computer: (...values: any[]) => T
  ) {}

  getValue(
    base: EuiThemeSystem | EuiThemeShape,
    overrides: EuiThemeOverrides = {},
    working: EuiThemeComputed,
    colorMode: EuiThemeColorMode
  ) {
    return this.computer(
      this.dependencies.map((dependency) => {
        return (
          getOn(working, dependency, colorMode) ??
          getOn(overrides, dependency, colorMode) ??
          getOn(base, dependency, colorMode)
        );
      })
    );
  }
}

export const computed = <T>(
  dependencies: string[],
  computer: (values: any[]) => T
) => {
  return (new Computed(dependencies, computer) as unknown) as T;
};

export const getComputed = <T = EuiThemeShape>(
  base: EuiThemeSystem<T>,
  over: Partial<EuiThemeSystem<T>>,
  colorMode: EuiThemeColorMode
): EuiThemeComputed<T> => {
  const output = { themeName: base.key };

  function loop(
    base: { [key: string]: any },
    over: { [key: string]: any },
    path?: string
  ) {
    Object.keys(base).forEach((key) => {
      const arr = path?.split('.') || [];
      const last = arr[arr.length - 1];
      if (last === COLOR_MODE_KEY && key !== colorMode) {
        // Intentional no-op
      } else {
        const newPath = path ? `${path}.${key}` : `${key}`;
        const baseValue =
          base[key] instanceof Computed
            ? base[key].getValue(base.root, over.root, output, colorMode)
            : base[key];
        const overValue =
          over[key] instanceof Computed
            ? over[key].getValue(base.root, over.root, output, colorMode)
            : over[key];
        if (isObject(baseValue)) {
          loop(baseValue, overValue ?? {}, newPath);
        } else {
          setOn(output, newPath, overValue ?? baseValue);
        }
      }
    });
  }
  loop(base, over);
  return currentColorModeOnly<T>(colorMode, (output as unknown) as T);
};

export const buildTheme = <T extends {}>(model: T, key: string) => {
  const handler: ProxyHandler<EuiThemeSystem<T>> = {
    getPrototypeOf(target) {
      return Reflect.getPrototypeOf(target.model);
    },

    setPrototypeOf(target, prototype) {
      return Reflect.setPrototypeOf(target.model, prototype);
    },

    isExtensible(target) {
      return Reflect.isExtensible(target);
    },

    preventExtensions(target) {
      return Reflect.preventExtensions(target.model);
    },

    getOwnPropertyDescriptor(target, key) {
      return Reflect.getOwnPropertyDescriptor(target.model, key);
    },

    defineProperty(target, property, attributes) {
      return Reflect.defineProperty(target.model, property, attributes);
    },

    has(target, property) {
      return Reflect.has(target.model, property);
    },

    get(_target, property) {
      if (property === 'key') {
        return _target[property];
      }

      // prevent Safari from locking up when the proxy is used in dev tools
      // as it doesn't support getPrototypeOf
      if (property === '__proto__') return {};

      const target = property === 'root' ? _target : _target.model || _target;
      // @ts-ignore `string` index signature
      const value = target[property];
      if (typeof value === 'object' && value !== null) {
        return new Proxy(
          {
            model: value,
            root: _target.root,
            key: `_${_target.key}`,
          },
          handler
        );
      } else {
        return value;
      }
    },

    set(target: any) {
      return target;
    },

    deleteProperty(target: any) {
      return target;
    },

    ownKeys(target) {
      return Reflect.ownKeys(target.model);
    },

    apply(target: any) {
      return target;
    },

    construct(target: any) {
      return target;
    },
  };
  const themeProxy = new Proxy({ model, root: model, key }, handler);

  return themeProxy;
};

export const mergeDeep = (
  _target: { [key: string]: any },
  source: { [key: string]: any } = {}
) => {
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

export const currentColorModeOnly = <T>(
  colorMode: EuiThemeColorMode,
  _theme: { [key: string]: any }
): EuiThemeComputed<T> => {
  const theme: { [key: string]: any } = {};

  Object.keys(_theme).forEach((key) => {
    if (key === COLOR_MODE_KEY) {
      theme[key] = _theme[key][colorMode];
    } else {
      const themeValue = _theme[key];

      if (isObject(themeValue)) {
        theme[key] = currentColorModeOnly(colorMode, themeValue);
      } else {
        theme[key] = themeValue;
      }
    }
  });

  return theme as EuiThemeComputed<T>;
};
