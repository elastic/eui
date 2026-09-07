/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, parse } from '@typescript-eslint/typescript-estree';
import { hasMeaningfulAttr } from './has_meaningful_attr';

/**
 * Parses a single JSX element snippet and returns its opening element.
 */
function getOpeningElement(jsx: string): TSESTree.JSXOpeningElement {
  const program = parse(`${jsx};`, { jsx: true });
  const statement = program.body[0] as TSESTree.ExpressionStatement;
  const element = statement.expression as TSESTree.JSXElement;

  return element.openingElement;
}

const check = (jsx: string, attr = 'value') =>
  hasMeaningfulAttr(getOpeningElement(jsx), attr);

describe('hasMeaningfulAttr', () => {
  describe('meaningful values', () => {
    it.each([
      ['non-empty string literal', '<El value="hello" />'],
      ['non-empty string expression', '<El value={"hello"} />'],
      ['truthy number', '<El value={1} />'],
      ['boolean shorthand', '<El value />'],
      ['explicit true', '<El value={true} />'],
      ['identifier (dynamic)', '<El value={message} />'],
      ['member expression (dynamic)', '<El value={props.message} />'],
      ['function call (dynamic)', '<El value={getMessage()} />'],
      ['template literal (dynamic)', '<El value={`hi ${name}`} />'],
      ['JSX element (dynamic)', '<El value={<Icon />} />'],
      ['ternary (dynamic)', '<El value={cond ? "a" : "b"} />'],
    ])('returns true for %s', (_label, jsx) => {
      expect(check(jsx)).toBe(true);
    });
  });

  describe('missing or statically empty/falsy values', () => {
    it.each([
      ['a missing attribute', '<El other="x" />'],
      ['no attributes at all', '<El />'],
      ['empty string literal', '<El value="" />'],
      ['empty string expression', "<El value={''} />"],
      ['zero', '<El value={0} />'],
      ['false', '<El value={false} />'],
      ['null', '<El value={null} />'],
      ['undefined', '<El value={undefined} />'],
    ])('returns false for %s', (_label, jsx) => {
      expect(check(jsx)).toBe(false);
    });
  });

  it('looks up the requested attribute name', () => {
    const opening = getOpeningElement('<El foo="" bar="baz" />');

    expect(hasMeaningfulAttr(opening, 'foo')).toBe(false);
    expect(hasMeaningfulAttr(opening, 'bar')).toBe(true);
    expect(hasMeaningfulAttr(opening, 'missing')).toBe(false);
  });

  it('ignores spread attributes when matching by name', () => {
    const opening = getOpeningElement('<El {...props} value="ok" />');

    expect(hasMeaningfulAttr(opening, 'value')).toBe(true);
    expect(hasMeaningfulAttr(opening, 'props')).toBe(false);
  });
});
