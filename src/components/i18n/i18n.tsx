import React, { Fragment, ReactChild, SFC } from 'react';
import { EuiI18nConsumer } from '../context';
import { ExclusiveUnion } from '../common';
import { I18nShape, Renderable, RenderableValues } from '../context/context';
import { processStringToChildren } from './i18n_util';

function throwError(): never {
  throw new Error('asdf');
}

function lookupToken<T extends RenderableValues>(
  token: string,
  i18nMapping: I18nShape['mapping'],
  valueDefault: Renderable<T>,
  values?: I18nTokenShape<T>['values']
): ReactChild {
  const renderable = (i18nMapping && i18nMapping[token]) || valueDefault;
  if (typeof renderable === 'function') {
    if (values === undefined) {
      return throwError();
    } else {
      return renderable(values);
    }
  } else if (values === undefined || typeof renderable !== 'string') {
    return renderable;
  }

  const children = processStringToChildren(renderable, values);
  if (typeof children === 'string') {
    return children;
  }

  const Component: SFC<any> = () => {
    return <Fragment>{children}</Fragment>;
  };
  return React.createElement(Component, values);
}

interface I18nTokenShape<T> {
  token: string;
  default: Renderable<T>;
  children?: (x: ReactChild) => ReactChild;
  values?: T;
}

interface I18nTokensShape {
  tokens: string[];
  defaults: ReactChild[];
  children: (x: ReactChild[]) => ReactChild;
}

type EuiI18nProps<T> = ExclusiveUnion<I18nTokenShape<T>, I18nTokensShape>;

function hasTokens(x: EuiI18nProps<any>): x is I18nTokensShape {
  return x.tokens != null;
}

// Must use the generics <T extends {}>
// If instead typed with React.SFC there isn't feedback given back to the dev
// when using a `values` object with a renderer callback.
const EuiI18n = <T extends {}>(props: EuiI18nProps<T>) => (
  <EuiI18nConsumer>
    {
      (i18nConfig) => {
        const { mapping } = i18nConfig;
        if (hasTokens(props)) {
          return props.children(props.tokens.map((token, idx) => lookupToken(token, mapping, props.defaults[idx])));
        }

        const tokenValue = lookupToken(props.token, mapping, props.default, props.values);
        if (props.children) {
          return props.children(tokenValue);
        } else {
          return tokenValue;
        }
      }
    }
  </EuiI18nConsumer>
);

export { EuiI18n };
