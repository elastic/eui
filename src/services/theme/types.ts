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

export type EuiThemeInverseColorMode = 'inverse';
export type EuiThemeStandardColorMode = 'light' | 'dark';
export type EuiThemeColorMode =
  | string
  | EuiThemeStandardColorMode
  | EuiThemeInverseColorMode;
// The actual shape of a theme is still in flux
export interface EuiTheme {
  [key: string]: any;
}
