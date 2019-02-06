import { cloneElement, ReactChild } from 'react';
import {
  isBoolean,
  isString,
  isNumber,
} from '../../services/predicate/lodash_predicates';
import { isElement } from 'react-is';
import { RenderableValues } from '../context/context';

function isPrimitive(value: ReactChild) {
  return isBoolean(value) || isString(value) || isNumber(value);
}

type Child = string | { propName: string } | ReactChild | undefined;

function hasPropName(child: Child): child is { propName: string } {
  return typeof child === 'object' && child.hasOwnProperty('propName');
}

/**
 * Replaces placeholder values in `input` with their matching value in `values`
 * e.g. input:'Hello, {name}' will replace `{name}` with `values[name]`
 * @param {string} input
 * @param {RenderableValues} values
 * @returns {string | React.ReactChild[]}
 */
export function processStringToChildren(
  input: string,
  values: RenderableValues
): string | ReactChild[] {
  const children: ReactChild[] = [];

  let child: Child;

  function appendCharToChild(char: string) {
    if (child === undefined) {
      // starting a new string literal
      child = char;
    } else if (typeof child === 'string') {
      // existing string literal
      child = child + char;
    } else if (hasPropName(child)) {
      // adding to the propName of a values lookup
      child.propName = child.propName + char;
    }
  }

  function appendValueToChildren(value: Child) {
    if (value === undefined) {
      return;
    } else if (isElement(value)) {
      // an array with any ReactElements will be kept as an array
      // so they need to be assigned a key
      children.push(cloneElement(value, { key: children.length }));
    } else if (hasPropName(value)) {
      // this won't be called, propName children are converted to a ReactChild before calling this
    } else {
      // everything else can go straight in
      children.push(value);
    }
  }

  // if we don't encounter a non-primitive
  // then `children` can be concatenated together at the end
  let encounteredNonPrimitive = false;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '\\') {
      // peek at the next character to know if this is an escape
      const nextChar = input[i + 1];
      let charToAdd = char; // if this isn't an escape sequence then we will add the backslash

      if (nextChar === '{' || nextChar === '}') {
        // escaping a brace
        i += 1; // advance passed the brace
        charToAdd = input[i];
      }
      appendCharToChild(charToAdd);
    } else if (char === '{') {
      appendValueToChildren(child);
      child = { propName: '' };
    } else if (char === '}') {
      const propName = (child as { propName: string }).propName;
      if (!values.hasOwnProperty(propName)) {
        throw new Error(
          `Key "${propName}" not found in ${JSON.stringify(values, null, 2)}`
        );
      }
      const propValue = values[propName];
      encounteredNonPrimitive =
        encounteredNonPrimitive || !isPrimitive(propValue);
      appendValueToChildren(propValue);
      child = undefined;
    } else {
      appendCharToChild(char);
    }
  }

  // include any remaining child value
  appendValueToChildren(child);

  return encounteredNonPrimitive ? children : children.join('');
}
