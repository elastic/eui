/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  Component,
  FunctionComponent,
  MouseEventHandler,
  SFC,
} from 'react';

export interface CommonProps {
  className?: string;
  'aria-label'?: string;
  'data-test-subj'?: string;
}

export type NoArgCallback<T> = () => T;

export const assertNever = (x: never): never => {
  throw new Error(`Unexpected value ${x}`);
};

// utility types:
/**
 * XOR for some properties applied to a type
 * (XOR is one of these but not both or neither)
 *
 * Usage: OneOf<typeToExtend, one | but | not | multiple | of | these | are | required>
 *
 * To require aria-label or aria-labelledby but not both
 * Example: OneOf<Type, 'aria-label' | 'aria-labelledby'>
 */
export type OneOf<T, K extends keyof T> = Omit<T, K> &
  { [k in K]: Pick<Required<T>, k> & { [k1 in Exclude<K, k>]?: never } }[K];

/**
 * Wraps Object.keys with proper typescript definition of the resulting array
 */
export function keysOf<T, K extends keyof T>(obj: T): K[] {
  return Object.keys(obj) as K[];
}

export type PropsOf<C> = C extends SFC<infer SFCProps>
  ? SFCProps
  : C extends FunctionComponent<infer FunctionProps>
  ? FunctionProps
  : C extends Component<infer ComponentProps>
  ? ComponentProps
  : never;

// Utility methods for ApplyClassComponentDefaults
type ExtractDefaultProps<T> = T extends { defaultProps: infer D } ? D : never;
type ExtractProps<
  C extends new (...args: any) => any,
  IT = InstanceType<C>
> = IT extends Component<infer P> ? P : never;

/**
 * Because of how TypeScript's LibraryManagedAttributes is designed to handle defaultProps (https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#support-for-defaultprops-in-jsx)
 * we can't directly export the props definition as the defaulted values are not made optional,
 * because it isn't processed by LibraryManagedAttributes. To get around this, we:
 * - remove the props which have default values applied
 * - export (Props - Defaults) & Partial<Defaults>
 */
export type ApplyClassComponentDefaults<
  C extends new (...args: any) => any,
  D = ExtractDefaultProps<C>,
  P = ExtractProps<C>
> =
  // definition of Props that are not defaulted
  Omit<P, keyof D> &
    // definition of Props, made optional, that are have keys in defaultProps
    { [K in keyof D]?: K extends keyof P ? P[K] : never };

/*
https://github.com/Microsoft/TypeScript/issues/28339
Problem: Pick and Omit do not distribute over union types, which manifests when
optional values become required after a Pick or Omit operation. These
Distributive forms correctly operate on union types, preserving optionality.
 */
type UnionKeys<T> = T extends any ? keyof T : never;
export type DistributivePick<T, K extends UnionKeys<T>> = T extends any
  ? Pick<T, Extract<keyof T, K>>
  : never;
export type DistributiveOmit<T, K extends UnionKeys<T>> = T extends any
  ? Omit<T, Extract<keyof T, K>>
  : never;

/*
TypeScript's discriminated unions are overly permissive: as long as one type of the union is satisfied
the other types are not validated against. For example:

type Foo = {
  value: string,
  foo: string
};
type Bar = {
  value: number,
  bar: string
}
function what(x: Foo | Bar) {
  return x.value;
}

As you would expect -

what({ value: 'asdf', foo: 'asdf' }); // fine
what({ value: 5, foo: 'asdf' }); // error
what({ value: 5, bar: 'asdf' }); // fine
what({ value: 'asdf', bar: 'asdf' }); // error

However, if Foo is satisfied then you can pass any value you want to Bar's unique properties:
what({ value: 'asdf', foo: 'asdf', bar: false }) // works

TypeScript is okay with this as a type guard would detect the object is Foo and prevent accessing `bar`.
Unfortunately this prevents feedback to the user about potentially unintentional effects, for example:

A common pattern in EUI is to render something as a div OR as a button, depending on if an onClick prop is passed.
passing additional props down through `...rest`, which can be specified as

type Spanlike = HTMLAttributes<HTMLSpanElement>;
type Buttonlike = { onClick: MouseEventHandler<HTMLButtonElement> }; // onClick is the discriminant
React.FunctionComponent<Spanlike | Buttonlike>

Internally, the component would have a type guard to check if props contains `onClick` and resolve to Buttonlike.
Externally, however, you could use the component as

<Component value="buzz"/>

and no error would occur as the Spanlike type is satisfied and the type guard would prevent accessing button attributes.
This prevents immediate feedback to the develop, and would actually lead to React warnings as the `value` prop would
still propagate down to the span's props, which is invalid. The following two utility types provide a solution for
creating exclusive unions:

React.FunctionComponent<ExclusiveUnion<Spanlike, Buttonlike>>
 */

/**
 * Returns member keys in U not present in T set to never
 * T = { 'one', 'two', 'three' }
 * U = { 'three', 'four', 'five' }
 * returns { 'four': never, 'five': never }
 */
export type DisambiguateSet<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never;
};

/**
 * Allow either T or U, preventing any additional keys of the other type from being present
 */
export type ExclusiveUnion<T, U> = T | U extends object // if there are any shared keys between T and U
  ? (DisambiguateSet<T, U> & U) | (DisambiguateSet<U, T> & T) // otherwise the TS union is already unique
  : T | U;

/**
 * For components that conditionally render <button> or <a>
 * Convenience types for extending base props (T) and
 * element-specific props (P) with standard clickable properties
 *
 * These will likely be used together, along with `ExclusiveUnion`:
 *
 * type AnchorLike = PropsForAnchor<BaseProps>
 * type ButtonLike = PropsForButton<BaseProps>
 * type ComponentProps = ExclusiveUnion<AnchorLike, ButtonLike>
 * const Component: FunctionComponent<ComponentProps> ...
 */
export type PropsForAnchor<T, P = {}> = T & {
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  P;

export type PropsForButton<T, P = {}> = T & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  P;

/**
 * Replaces all properties on any type as optional, includes nested types
 *
 * @example
 * ```ts
 * interface Person {
 *  name: string;
 *  age?: number;
 *  spouse: Person;
 *  children: Person[];
 * }
 * type PartialPerson = RecursivePartial<Person>;
 * // results in
 * interface PartialPerson {
 *  name?: string;
 *  age?: number;
 *  spouse?: RecursivePartial<Person>;
 *  children?: RecursivePartial<Person>[]
 * }
 * ```
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends NonAny[] // checks for nested any[]
    ? T[P]
    : T[P] extends readonly NonAny[] // checks for nested ReadonlyArray<any>
    ? T[P]
    : T[P] extends Array<infer U>
    ? Array<RecursivePartial<U>>
    : T[P] extends ReadonlyArray<infer U> // eslint-disable-line @typescript-eslint/array-type
    ? ReadonlyArray<RecursivePartial<U>> // eslint-disable-line @typescript-eslint/array-type
    : T[P] extends Set<infer V> // checks for Sets
    ? Set<RecursivePartial<V>>
    : T[P] extends Map<infer K, infer V> // checks for Maps
    ? Map<K, RecursivePartial<V>>
    : T[P] extends NonAny // checks for primitive values
    ? T[P]
    : RecursivePartial<T[P]>; // recurse for all non-array and non-primitive values
};
type NonAny = number | boolean | string | symbol | null;
