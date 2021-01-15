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

export const isInverseColorMode = (colorMode?: string) => {
  return colorMode === 'inverse';
};

export const getColorMode = (colorMode?: string, parentColorMode?: string) => {
  if (colorMode == null) {
    return parentColorMode || 'light';
  } else if (isInverseColorMode(colorMode)) {
    return parentColorMode === 'dark' || parentColorMode === undefined
      ? 'light'
      : 'dark';
  } else {
    return colorMode;
  }
};

export const getOn = (model: { [key: string]: any }, _path: string) => {
  const path = _path.split('.');
  let node = model;

  while (path.length) {
    const segment = path.shift()!;
    if (node.hasOwnProperty(segment) === false) return undefined;
    if (node[segment] instanceof Computed) {
      node = node[segment].getValue(model);
    } else {
      node = node[segment];
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
    public dependencies: any[],
    public computer: (...values: any[]) => T
  ) {}

  getValue(model: any, overrides = {}, working: any) {
    return this.computer(
      this.dependencies.map((dependency) => {
        if (working) {
          return getOn(working, dependency);
        }
        return getOn(overrides, dependency) ?? getOn(model, dependency);
      })
    );
  }
}

export const computed = <T>(
  dependencies: any[],
  computer: (values: any[]) => T
) => {
  return (new Computed(dependencies, computer) as unknown) as T;
};

export const getComputed = (base: any, over: any) => {
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
};

export const buildTheme = (model: any) => {
  const handler = {
    getPrototypeOf(target: any) {
      return Reflect.getPrototypeOf(target.model);
    },

    setPrototypeOf(target: any, prototype: any) {
      return Reflect.setPrototypeOf(target.model, prototype);
    },

    isExtensible(target: any) {
      return Reflect.isExtensible(target);
    },

    preventExtensions(target: any) {
      return Reflect.preventExtensions(target.model);
    },

    // TODO: Figure this out
    // JSON.stringify errors on this
    // getOwnPropertyDescriptor(target, key) {
    //   return Reflect.getOwnPropertyDescriptor(target.model, key);
    // },

    // TODO: Is this ok?
    getOwnPropertyDescriptor(target: any, key: any) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        target.model,
        key
      ) || {
        value: handler.get(target, key),
      };

      Object.defineProperty(target, key, descriptor);
      return descriptor;
    },

    defineProperty(target: any, property: any, attributes: any) {
      return Reflect.defineProperty(target.model, property, attributes);
    },

    has(target: any, property: any) {
      return Reflect.has(target.model, property);
    },

    get(_target: any, property: any): any {
      const target = property === 'root' ? _target : _target.model || _target;
      if (typeof target[property] === 'object' && target[property] !== null) {
        return new Proxy(
          { model: target[property], root: _target.root },
          handler
        );
      } else {
        return target[property];
      }
    },

    set(target: any) {
      return target;
    },

    deleteProperty(target: any, property: any) {
      return Reflect.deleteProperty(target.model, property);
    },

    ownKeys(target: any) {
      return Reflect.ownKeys(target.model);
    },

    apply(target: any, thisArg: any, argumentList: any) {
      console.log('apply');
      return Reflect.apply(target.model, thisArg, argumentList);
    },

    construct(target: any, argumentsList: any, newTarget: any) {
      return Reflect.construct(target.model, argumentsList, newTarget);
    },
  };
  const themeProxy = new Proxy({ model, root: model }, handler);

  return themeProxy;
};

export const mergeDeep = (_target: any, source: any) => {
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
