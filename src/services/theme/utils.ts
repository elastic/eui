/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  EuiThemeColorMode,
  EuiThemeModifications,
  EuiThemeSystem,
  EuiThemeShape,
  EuiThemeComputed,
  COLOR_MODES_STANDARD,
  COLOR_MODES_INVERSE,
} from './types';

export const DEFAULT_COLOR_MODE = COLOR_MODES_STANDARD.light;

const isObject = (obj: any) => obj && typeof obj === 'object';

export const isInverseColorMode = (colorMode?: EuiThemeColorMode) => {
  return colorMode === COLOR_MODES_INVERSE;
};

export const getColorMode = (
  colorMode?: EuiThemeColorMode,
  parentColorMode?: EuiThemeColorMode
) => {
  const mode = colorMode?.toUpperCase();
  if (mode == null) {
    return parentColorMode || DEFAULT_COLOR_MODE;
  } else if (isInverseColorMode(mode)) {
    return parentColorMode === COLOR_MODES_STANDARD.dark ||
      parentColorMode === undefined
      ? COLOR_MODES_STANDARD.light
      : COLOR_MODES_STANDARD.dark;
  } else {
    return mode;
  }
};

export const getOn = (
  model: { [key: string]: any },
  _path: string,
  colorMode?: EuiThemeColorMode
) => {
  const path = _path.split('.');
  let node = model;
  while (path.length) {
    const segment = path.shift()!;

    if (node.hasOwnProperty(segment) === false) {
      if (
        colorMode &&
        node.hasOwnProperty(colorMode) === true &&
        node[colorMode].hasOwnProperty(segment) === true
      ) {
        if (node[colorMode][segment] instanceof Computed) {
          node = node[colorMode][segment].getValue(null, null, node, colorMode);
        } else {
          node = node[colorMode][segment];
        }
      } else {
        return undefined;
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
    public computer: (...values: any[]) => T,
    public dependencies: string | string[] = []
  ) {}

  getValue(
    base: EuiThemeSystem | EuiThemeShape,
    modifications: EuiThemeModifications = {},
    working: EuiThemeComputed,
    colorMode: EuiThemeColorMode
  ) {
    if (!this.dependencies.length) {
      return this.computer(working);
    }
    if (!Array.isArray(this.dependencies)) {
      return this.computer(
        getOn(working, this.dependencies) ??
          getOn(modifications, this.dependencies, colorMode) ??
          getOn(base, this.dependencies, colorMode)
      );
    }
    return this.computer(
      this.dependencies.map((dependency) => {
        return (
          getOn(working, dependency) ??
          getOn(modifications, dependency, colorMode) ??
          getOn(base, dependency, colorMode)
        );
      })
    );
  }
}

export function computed<T>(computer: (value: EuiThemeComputed) => T): T;
export function computed<T>(
  computer: (value: any[]) => T,
  dependencies: string[]
): T;
export function computed<T>(
  computer: (value: any) => T,
  dependencies: string
): T;
export function computed<T>(
  comp: ((value: T) => T) | ((value: any) => T) | ((value: any[]) => T),
  dep?: string | string[]
) {
  return new Computed<T>(comp, dep);
}

export const getComputed = <T = EuiThemeShape>(
  base: EuiThemeSystem<T>,
  over: Partial<EuiThemeSystem<T>>,
  colorMode: EuiThemeColorMode
): EuiThemeComputed<T> => {
  const output = { themeName: base.key };

  function loop(
    base: { [key: string]: any },
    over: { [key: string]: any },
    checkExisting: boolean = false,
    path?: string
  ) {
    Object.keys(base).forEach((key) => {
      let newPath = path ? `${path}.${key}` : `${key}`;
      if ([...Object.values(COLOR_MODES_STANDARD), colorMode].includes(key)) {
        if (key !== colorMode) {
          return;
        } else {
          const colorModeSegment = new RegExp(
            `(\\.${colorMode}\\b)|(\\b${colorMode}\\.)`
          );
          newPath = newPath.replace(colorModeSegment, '');
        }
      }
      const existing = checkExisting && getOn(output, newPath);
      if (!existing || isObject(existing)) {
        const baseValue =
          base[key] instanceof Computed
            ? base[key].getValue(base.root, over.root, output, colorMode)
            : base[key];
        const overValue =
          over[key] instanceof Computed
            ? over[key].getValue(base.root, over.root, output, colorMode)
            : over[key];
        if (isObject(baseValue) && !Array.isArray(baseValue)) {
          loop(baseValue, overValue ?? {}, checkExisting, newPath);
        } else {
          setOn(output, newPath, overValue ?? baseValue);
        }
      }
    });
  }
  // Compute standard theme values and apply overrides
  loop(base, over);
  // Compute and apply extension values only
  loop(over, {}, true);
  return output as EuiThemeComputed<T>;
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
      if (isObject(value) && !Array.isArray(value)) {
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
