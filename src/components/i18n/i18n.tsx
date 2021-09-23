/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Fragment,
  ReactChild,
  FunctionComponent,
  useContext,
  ReactElement,
} from 'react';
import { EuiI18nConsumer } from '../context';
import { ExclusiveUnion } from '../common';
import {
  I18nContext,
  I18nShape,
  Renderable,
  RenderableValues,
} from '../context/context';
import { processStringToChildren } from './i18n_util';

function errorOnMissingValues(token: string): never {
  throw new Error(
    `I18n mapping for token "${token}" is a formatting function but no values were provided.`
  );
}

function lookupToken<
  T extends RenderableValues,
  DEFAULT extends Renderable<T>,
  RESOLVED extends ResolvedType<DEFAULT>
>(
  token: string,
  i18nMapping: I18nShape['mapping'],
  valueDefault: DEFAULT,
  i18nMappingFunc?: (token: string) => string,
  values?: I18nTokenShape<T, DEFAULT>['values']
): RESOLVED {
  let renderable = (i18nMapping && i18nMapping[token]) || valueDefault;

  if (typeof renderable === 'function') {
    if (values === undefined) {
      return errorOnMissingValues(token);
    }
    // @ts-ignore TypeScript complains that `DEFAULT` doesn't have a call signature but we verified `renderable` is a function
    return renderable(values);
  } else if (values === undefined || typeof renderable !== 'string') {
    if (i18nMappingFunc && typeof valueDefault === 'string') {
      renderable = i18nMappingFunc(valueDefault);
    }
    // there's a hole in the typings here as there is no guarantee that i18nMappingFunc
    // returned the same type of the default value, but we need to keep that assumption
    return renderable as RESOLVED;
  }

  const children = processStringToChildren(renderable, values, i18nMappingFunc);
  if (typeof children === 'string') {
    // likewise, `processStringToChildren` returns a string or ReactChild[] depending on
    // the type of `values`, so we will make the assumption that the default value is correct.
    return children as RESOLVED;
  }

  const Component: FunctionComponent<any> = () => {
    return <Fragment>{children}</Fragment>;
  };

  // same reasons as above, we can't promise the transforms match the default's type
  return React.createElement(Component, values) as RESOLVED;
}

type ResolvedType<T> = T extends (...args: any[]) => any ? ReturnType<T> : T;

interface I18nTokenShape<T, DEFAULT extends Renderable<T>> {
  token: string;
  default: DEFAULT;
  children?: (x: ResolvedType<DEFAULT>) => ReactChild;
  values?: T;
}

interface I18nTokensShape<T extends any[]> {
  tokens: string[];
  defaults: T;
  children: (x: Array<T[number]>) => ReactChild;
}

export type EuiI18nProps<
  T,
  DEFAULT extends Renderable<T>,
  DEFAULTS extends any[]
> = ExclusiveUnion<I18nTokenShape<T, DEFAULT>, I18nTokensShape<DEFAULTS>>;

function isI18nTokensShape<T extends any[]>(
  x: EuiI18nProps<any, any, T>
): x is I18nTokensShape<T> {
  return x.tokens != null;
}

// Must use the generics <T extends {}>
// If instead typed with React.FunctionComponent there isn't feedback given back to the dev
// when using a `values` object with a renderer callback.
const EuiI18n = <
  T extends {},
  DEFAULT extends Renderable<T>,
  DEFAULTS extends any[]
>(
  props: EuiI18nProps<T, DEFAULT, DEFAULTS>
) => (
  <EuiI18nConsumer>
    {(i18nConfig) => {
      const { mapping, mappingFunc } = i18nConfig;
      if (isI18nTokensShape(props)) {
        return props.children(
          props.tokens.map((token, idx) =>
            lookupToken(token, mapping, props.defaults[idx], mappingFunc)
          )
        );
      }

      const tokenValue = lookupToken(
        props.token,
        mapping,
        props.default,
        mappingFunc,
        props.values
      );
      if (props.children) {
        return props.children(tokenValue);
      } else {
        return tokenValue;
      }
    }}
  </EuiI18nConsumer>
);

// A single default could be a string, react child, or render function
type DefaultRenderType<T, K extends Renderable<T>> = K extends ReactChild
  ? K
  : K extends () => infer RetValue
  ? RetValue
  : never;

// An array with multiple defaults can only be an array of strings or elements
type DefaultsRenderType<
  K extends Array<string | ReactElement>
> = K extends Array<infer Item> ? Item : never;

function useEuiI18n<T extends {}, DEFAULT extends Renderable<T>>(
  token: string,
  defaultValue: DEFAULT,
  values?: T
): DefaultRenderType<T, DEFAULT>;
function useEuiI18n<DEFAULTS extends Array<string | ReactElement>>(
  tokens: string[],
  defaultValues: DEFAULTS
): Array<DefaultsRenderType<DEFAULTS>>;
function useEuiI18n(...props: any[]) {
  const i18nConfig = useContext(I18nContext);
  const { mapping, mappingFunc } = i18nConfig;

  if (typeof props[0] === 'string') {
    const [token, defaultValue, values] = props;
    return lookupToken(token, mapping, defaultValue, mappingFunc, values);
  } else {
    const [tokens, defaultValues] = props as [string[], string[]];
    return tokens.map((token, idx) =>
      lookupToken(token, mapping, defaultValues[idx], mappingFunc)
    );
  }
}

export { EuiI18n, useEuiI18n };
