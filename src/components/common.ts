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

// utility types:

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

/*
https://github.com/Microsoft/TypeScript/issues/28339
Problem: Pick and Omit do not distribute over union types, which manifests when
optional values become required after a Pick or Omit operation. These
Distributive forms correctly operate on union types, preseving optionality.
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
still propogate down to the span's props, which is invalid. The following two utility types provide a solution for
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
  [P in Exclude<keyof T, keyof U>]?: never
};

/**
 * Allow either T or U, preventing any additional keys of the other type from being present
 */
export type ExclusiveUnion<T, U> = (T | U) extends object // if there are any shared keys between T and U
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
 * type ComponentProps = ExlcusiveUnion<AnchorLike, ButtonLike>
 * const Component: FunctionComponent<ComponentProps> ...
 */
export type PropsForAnchor<T, P = {}> = T &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  } & P;

export type PropsForButton<T, P = {}> = T &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
  } & P;

/**
 * We have a common pattern of requiring `aria-label` XOR `aria-labelledby`
 * where one is required, but the other cannot be present
 * This utility extracts that functionality into a call like
 *
 * type AccessibleDivProps = PropsAXorB<HTMLAttributes<HTMLDivElement>, { 'aria-label': string }, { 'aria-labelledby': string }>
 *
 * This can also be used to make multiple properties required when unioned together:
 *
 * PropsAXorB<ButtonLink, { 'aria-label': string; role: string }, { 'aria-labelledby': string }>
 */
export type PropsAXorB<Base, A, B> = Omit<Base, keyof A | keyof B> &
  ((A & { [key in keyof B]?: never }) | (B & { [key in keyof A]?: never }));
