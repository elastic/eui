/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import * as uuid from 'uuid';
import { render, renderHook } from '../../test/rtl';
import { testOnReactVersion } from '../../test/internal';

import { htmlIdGenerator, useGeneratedHtmlId } from './html_id_generator';

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

  describe('whitespace warnings', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => {});
    });
    afterEach(() => {
      (console.warn as jest.Mock).mockRestore();
    });

    it('warns when the prefix contains whitespace', () => {
      htmlIdGenerator('Increase field mapping limit');

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          '"Increase field mapping limit" contains whitespace'
        )
      );
    });

    it('warns when the suffix contains whitespace', () => {
      htmlIdGenerator('prefix')('some suffix');

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('"some suffix" contains whitespace')
      );
    });

    it('does not warn for valid prefixes and suffixes', () => {
      htmlIdGenerator('validPrefix')('valid-suffix_1');

      expect(console.warn).not.toHaveBeenCalled();
    });
  });
});

describe('useGeneratedHtmlId', () => {
  it('does not change when a component updates', () => {
    const MockComponent: React.FC<{ className?: string }> = (props) => (
      <div id={useGeneratedHtmlId()} {...props} />
    );
    const { container, rerender } = render(<MockComponent />);
    const initialId = container.firstElementChild!.id;

    rerender(<MockComponent className="test" />);
    const rerenderedId = container.firstElementChild!.id;

    expect(initialId).toEqual(rerenderedId);
  });

  it('passes prefixes and suffixes to htmlIdGenerator', () => {
    const { result } = renderHook(() =>
      useGeneratedHtmlId({ prefix: 'hello', suffix: 'world' })
    );

    expect(result.current.startsWith('hello')).toBeTruthy();
    expect(result.current.endsWith('world')).toBeTruthy();
  });

  it('allows overriding generated IDs with conditional IDs (typically from props)', () => {
    const { result, rerender } = renderHook(useGeneratedHtmlId, {
      initialProps: { conditionalId: 'hello' },
    });
    expect(result.current).toEqual('hello');

    rerender({ conditionalId: 'world' });
    expect(result.current).toEqual('world');

    // @ts-expect-error we need to assign `undefined` to assert the fallback
    rerender({ conditionalId: undefined });
    expect(result.current).toBeTruthy(); // Should fall back to a generated ID
  });

  describe('whitespace warnings', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => {});
    });
    afterEach(() => {
      (console.warn as jest.Mock).mockRestore();
    });

    it('warns when the prefix or suffix contains whitespace', () => {
      renderHook(() =>
        useGeneratedHtmlId({ prefix: 'my prefix', suffix: 'my suffix' })
      );

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('"my prefix" contains whitespace')
      );
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('"my suffix" contains whitespace')
      );
    });

    it('does not warn for valid prefixes and suffixes', () => {
      renderHook(() =>
        useGeneratedHtmlId({ prefix: 'myPrefix', suffix: 'my-suffix' })
      );

      expect(console.warn).not.toHaveBeenCalled();
    });

    it('does not re-warn on rerender when prefix/suffix are unchanged', () => {
      const { rerender } = renderHook(useGeneratedHtmlId, {
        initialProps: { prefix: 'rerender prefix', suffix: 'rerender suffix' },
      });

      expect(console.warn).toHaveBeenCalledTimes(2);

      rerender({ prefix: 'rerender prefix', suffix: 'rerender suffix' });

      expect(console.warn).toHaveBeenCalledTimes(2);
    });

    it('does not warn when a conditionalId takes precedence', () => {
      renderHook(() =>
        useGeneratedHtmlId({ prefix: 'my prefix', conditionalId: 'customId' })
      );

      expect(console.warn).not.toHaveBeenCalled();
    });
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
      // NOTE: the `useId` counter is shared across the whole test file, so this
      // asserts the ID shape rather than an exact (order-dependent) counter
      expect(getByTestSubject('el').id).toMatch(/^prefix:r[0-9a-z]+:suffix$/);
    });

    testOnReactVersion('17')('[React 17] generates correct IDs', () => {
      mockedUuid.v1.mockImplementationOnce(() => 'random-id');

      const { getByTestSubject } = render(<MockComponent />);
      expect(getByTestSubject('el')).toHaveAttribute(
        'id',
        'prefix_random-id_suffix'
      );
    });
  });
});
