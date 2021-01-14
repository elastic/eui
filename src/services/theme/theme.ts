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

// interface Store {
//   parent: {
//     child?: {
//       age: number;
//       siblings?: number;
//     };
//   };
//   other: false;
//   name?: string;
// }

// type primitive = string | number | boolean | undefined | null;

// class Undefined<T> {
//   constructor(private t: T) {}
// }

// type RequiredKeys<T> = {
//   [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
// }[keyof T];
// type Accessor<Shape, ForceOptional = false> = {
//   [key in keyof Shape]-?: Shape[key] extends primitive
//     ? key extends RequiredKeys<Shape>
//       ? // required
//         ForceOptional extends false
//         ? Shape[key]
//         : Shape[key] | undefined
//       : // optional
//         // Any `undefined` added here would be removed if --strictNullChecks mode is enabled
//         // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
//         // >> Note that in --strictNullChecks mode, when a homomorphic mapped type removes a ? modifier from a property in the underlying type it also removes undefined from the type of that property:
//         // instead, we can return a private class and convert it back to
//         // `undefined` when the time comes to interpret the output type
//         Undefined<Shape[key]> // note there is no `| undefined` here, as the type already includes it from being optional
//     : key extends RequiredKeys<Shape>
//     ? Accessor<Shape[key], ForceOptional> // required
//     : Accessor<Shape[key], true>; // optional
// };

// type TypeFromAccessor<T> = T extends primitive
//   ? T
//   : T extends Undefined<infer U>
//   ? U
//   : T extends Accessor<infer Shape, infer ForceOptional>
//   ? ForceOptional extends true
//     ? Shape | undefined
//     : Shape
//   : never;

// const storeAccessor: TypeFromAccessor<Accessor<Store>> = null as any;
// storeAccessor.name; // string | undefined
// storeAccessor.other; // false
// storeAccessor.parent; // object
// storeAccessor.parent.child; // object | undefined

// const otherAccessor: TypeFromAccessor<Accessor<Store>['other']> = null as any; // false
// const nameAccessor: TypeFromAccessor<Accessor<Store>['name']> = null as any; // string | undefined

// const parentAccessor: TypeFromAccessor<Accessor<Store>['parent']> = null as any;
// parentAccessor.child; // object | undefined

// const childAccessor: TypeFromAccessor<
//   Accessor<Store>['parent']['child']
// > = null as any;
// childAccessor.age; // good error - possibly undefined
// childAccessor!.age; // number
// childAccessor!.siblings; // number | undefined

// const ageAccessor: TypeFromAccessor<
//   Accessor<Store>['parent']['child']['age']
// > = null as any;
// ageAccessor; // number | undefined
// ageAccessor.toString(); // good error - possibly undefined
// const siblingsAccessor: TypeFromAccessor<
//   Accessor<Store>['parent']['child']['siblings']
// > = null as any;
// siblingsAccessor; // number || undefined
// siblingsAccessor.toString(); // good error

///
///
///

export function getOn(model: { [key: string]: any }, _path: string) {
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
}

export function setOn(
  model: { [key: string]: any },
  _path: string,
  value: any
) {
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
}

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

export function computed<T>(
  dependencies: any[],
  computer: (values: any[]) => T
): T {
  return (new Computed(dependencies, computer) as unknown) as T;
}

export const createTheme = (model: any) => {
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

    // TODO: FIGURE THIS OUT
    // getOwnPropertyDescriptor(target, key) {
    //   return Reflect.getOwnPropertyDescriptor(target.model, key);
    // },

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
