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

/**
 * Returns whether the parameter is an object
 * @param {any} obj - Anything
 */
const isObject = (obj: any) => obj && typeof obj === 'object';

/**
 * Returns whether the provided color mode is `inverse`
 * @param {string} colorMode - `light`, `dark`, or `inverse`
 */
export const isInverseColorMode = (colorMode?: EuiThemeColorMode) => {
  return colorMode === COLOR_MODES_INVERSE;
};

/**
 * Returns the color mode configured in the current EuiThemeProvider.
 * Returns the parent color mode if none is explicity set.
 * @param {string} coloMode - `light`, `dark`, or `inverse`
 * @param {string} parentColorMode - `light`, `dark`, or `inverse`; used as the fallback
 */
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

/**
 * Returns a value at a given path on an object.
 * If `colorMode` is provided, will scope the value to the appropriate color mode key (LIGHT\DARK)
 * @param {object} model - Object
 * @param {string} _path - Dot-notated string to a path on the object
 * @param {string} colorMode - `light` or `dark`
 */
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

/**
 * Sets a value at a given path on an object.
 * @param {object} model - Object
 * @param {string} _path - Dot-notated string to a path on the object
 * @param {any} string -  The value to set
 */
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

/**
 * Creates a class to store the `computer` method and its eventual parameters.
 * Allows for on-demand computation with up-to-date parameters via `getValue` method.
 * @constructor
 * @param {function} computer - Function to be computed
 * @param {string | array} dependencies - Dependencies passed to the `computer` as parameters
 */
export class Computed<T> {
  constructor(
    public computer: (...values: any[]) => T,
    public dependencies: string | string[] = []
  ) {}

  /**
   * Executes the `computer` method with the current state of the theme
   * by taking into account previously computed values and modifications.
   * @param {Proxy | object} base - Computed or uncomputed theme
   * @param {Proxy | object} modifications - Theme value overrides
   * @param {object} working - Partially computed theme
   * @param {string} colorMode - `light` or `dark`
   */
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

/**
 * Returns a Class (`Computed`) that stores the arbitrary computer method
 * and references to its optional dependecies.
 * @param {function} computer - Arbitrary method to be called at compute time.
 * @param {string | array} dependencies - Values that will be provided to `computer` at compute time.
 */
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

/**
 * Takes an uncomputed theme, and computes and returns all values taking
 * into consideration value overrides and configured color mode.
 * Overrides take precedence, and only values in the current color mode
 * are computed and returned.
 * @param {Proxy} base - Object to transform into Proxy
 * @param {Proxy | object} over - Unique identifier or name
 * @param {string} colorMode - `light` or `dark`
 */
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

/**
 * Builds a Proxy with a custom `handler` designed to self-reference values
 * and prevent arbitrary value overrides.
 * @param {object} model - Object to transform into Proxy
 * @param {string} key - Unique identifier or name
 */
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

/**
 * Deeply merges two objects, using `source` values whenever possible.
 * @param {object} _target - Object with fallback values
 * @param {object} source - Object with desired values
 */
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
