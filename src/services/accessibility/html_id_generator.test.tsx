/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { shallow } from 'enzyme';
import * as uuid from 'uuid';
import { render } from '../../test/rtl';

import { htmlIdGenerator, useGeneratedHtmlId } from './html_id_generator';
import { testOnReactVersion } from '../../test/internal';

const originalUuid = jest.requireActual('uuid');
jest.mock('uuid');
const mockedUuid = uuid as jest.Mocked<typeof originalUuid>;
mockedUuid.v1.mockImplementation(originalUuid.v1);

jest.mock('./html_id_generator', () => {
  return jest.requireActual('./html_id_generator');
});

describe('htmlIdGenerator', () => {
  it('should return a function', () => {
    const fn = htmlIdGenerator();
    expect(typeof fn).toBe('function');
  });

  it('should return an id ending with the specified suffix', () => {
    expect(htmlIdGenerator()('suf')).toMatch(/suf$/);
  });

  it('should return an id beginning with the specified prefix', () => {
    expect(htmlIdGenerator('pref')('foo')).toMatch(/^pref/);
  });

  it('should create the same id for the same suffix', () => {
    const idGenerator = htmlIdGenerator();
    expect(idGenerator('foo')).toBe(idGenerator('foo'));
  });

  it('should create different ids for different suffixes', () => {
    const idGenerator = htmlIdGenerator();
    expect(idGenerator('foo')).not.toBe(idGenerator('bar'));
  });

  it('should generate different ids on different instances', () => {
    const idGenerator1 = htmlIdGenerator();
    const idGenerator2 = htmlIdGenerator();
    expect(idGenerator1('foo')).not.toBe(idGenerator2('foo'));
  });

  it('should generate ids beginning with "i" when not passing a prefix', () => {
    expect(htmlIdGenerator()()).toMatch(/^i/);
  });

  it('should generate different ids if no suffix is passed', () => {
    const generator = htmlIdGenerator();
    expect(generator()).not.toBe(generator());
  });
});

describe('useGeneratedHtmlId', () => {
  it('does not change when a component updates', () => {
    const MockComponent: React.FC = (props) => (
      <div id={useGeneratedHtmlId()} {...props} />
    );
    const component = shallow(<MockComponent />);
    const initialId = component.find('div').prop('id');

    component.setProps({ className: 'test' });
    const rerenderedId = component.find('div').prop('id');

    expect(initialId).toEqual(rerenderedId);
  });

  it('passes prefixes and suffixes to htmlIdGenerator', () => {
    const MockComponent: React.FC = () => (
      <div id={useGeneratedHtmlId({ prefix: 'hello', suffix: 'world' })} />
    );
    const component = shallow(<MockComponent />);
    const id = component.find('div').prop('id');

    expect(id!.startsWith('hello')).toBeTruthy();
    expect(id!.endsWith('world')).toBeTruthy();
  });

  it('allows overriding generated IDs with conditional IDs (typically from props)', () => {
    const MockComponent: React.FC<{ id?: string }> = ({ id, ...props }) => (
      <div id={useGeneratedHtmlId({ conditionalId: id })} {...props} />
    );
    const component = shallow(<MockComponent id="hello" />);
    expect(component.find('div').prop('id')).toEqual('hello');

    component.setProps({ id: 'world' });
    expect(component.find('div').prop('id')).toEqual('world');

    component.setProps({ id: undefined });
    expect(component.find('div').prop('id')).toBeTruthy(); // Should fall back to a generated ID
  });

  describe('version-specific tests', () => {
    let MockComponent: FunctionComponent;

    beforeEach(() => {
      MockComponent = () => (
        <div
          data-test-subj="el"
          id={useGeneratedHtmlId({
            prefix: 'prefix',
            suffix: 'suffix',
          })}
        />
      );
    });

    testOnReactVersion('18')('[React 18] generates correct IDs', () => {
      const { getByTestSubject } = render(<MockComponent />);
      expect(getByTestSubject('el')).toHaveAttribute('id', 'prefix:r0:suffix');
    });

    testOnReactVersion(['16', '17'])(
      '[React 16-17] generates correct IDs',
      () => {
        mockedUuid.v1.mockImplementationOnce(() => 'random-id');

        const { getByTestSubject } = render(<MockComponent />);
        expect(getByTestSubject('el')).toHaveAttribute(
          'id',
          'prefix_random-id_suffix'
        );
      }
    );
  });
});
