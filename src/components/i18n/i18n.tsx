import React, { cloneElement, Fragment, ReactChild, ReactElement, SFC } from 'react';
import { EuiI18nConsumer } from '../context';
import { ExclusiveUnion } from '../common';
import { I18nShape, Renderable, RenderableValues } from '../context/context';
import { isBoolean, isString, isNumber } from '../../services/predicate/lodash_predicates';

// <I18n token="foo"/>
// <I18n token="foo">{(foo) => <p>foo</p>}</I18n>
// <I18n tokens=['foo', 'bar']>{([foo, bar]) => <p>{foo}, {bar}</p></I18n>

const hasSymbol = typeof Symbol === 'function' && Symbol.for;
const REACT_ELEMENT_TYPE = hasSymbol
  ? Symbol.for('react.element')
  : 0xeac7;
const isElement = (value: any) => {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.$$typeof === REACT_ELEMENT_TYPE
  );
};

function isPrimitive(value: ReactChild) {
  return isBoolean(value) || isString(value) || isNumber(value);
}

function processStringToChildren(input: string, values: RenderableValues): string | ReactChild[] {
  const children: ReactChild[] = [];

  let child;
  let encounteredNonPrimitive = false;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '{') {
      if (child !== undefined) {
        children.push(child);
      }
      // @ts-ignore
      child = {propName: ''};
    } else if (char === '}') {
      // @ts-ignore
      const propName = child.propName;
      if (!values.hasOwnProperty(propName)) {
        throw new Error(`Key "${propName}" not found in ${JSON.stringify(values, null, 2)}`);
      }
      const propValue = values[propName];
      encounteredNonPrimitive = encounteredNonPrimitive || !(isPrimitive(propValue));
      // tslint:disable-next-line
      if (isElement(propValue)) {
        children.push(cloneElement(
          propValue,
          { key: children.length }
        ));
      } else {
        children.push(propValue);
      }
      child = undefined;
    } else {
      if (child === undefined) {
        child = char;
      } else if (typeof child === 'string') {
        child = child + char;
      } else {
        child.propName = child.propName + char;
      }
    }
  }

  if (child !== undefined) {
    children.push(child);
  }

  return encounteredNonPrimitive ? children : children.join('');
}

function lookupToken(
  token: string,
  i18nMapping: I18nShape['mapping'],
  valueDefault: Renderable,
  values?: I18nTokenShape['values']
): ReactChild {
  const renderable = (i18nMapping && i18nMapping[token]) || valueDefault;
  if (typeof renderable === 'function') {
    return renderable(values || {});
  } else if (values === undefined || typeof renderable !== 'string') {
    return renderable;
  } else {
    const children = processStringToChildren(renderable, values);
    if (typeof children === 'string') {
      return children;
    } else {
      const Component: SFC<any> = () => {
        return <Fragment>{children}</Fragment>;
      };
      return React.createElement(Component, values);
    }
  }
}

interface I18nTokenShape {
  token: string;
  default: Renderable;
  children?: (x: ReactChild) => ReactElement<any>;
  values?: {[key: string]: ReactElement<any>};
}

interface I18nTokensShape {
  tokens: string[];
  defaults: ReactChild[];
  children: (x: ReactChild[]) => ReactElement<any>;
}

type EuiI18nProps = ExclusiveUnion<I18nTokenShape, I18nTokensShape>;

function hasTokens(x: EuiI18nProps): x is I18nTokensShape {
  return x.tokens != null;
}

const EuiI18n: React.SFC<EuiI18nProps> = (props) => (
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
