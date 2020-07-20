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

import { resolveWidthAsStyle } from './utils';
describe('resolveWidthAsStyle', () => {
  describe('without style or width', () => {
    it('returns empty', () => {
      expect(resolveWidthAsStyle(undefined, undefined)).toEqual({});
      expect(resolveWidthAsStyle({}, undefined)).toEqual({});
    });
  });
  describe('with style; without width', () => {
    it('returns style clone', () => {
      const style = { width: '20%', color: 'red' };
      expect(resolveWidthAsStyle(style, undefined)).toEqual(style);
      expect(resolveWidthAsStyle({}, undefined)).toEqual({});
    });
  });
  describe('without style; with width', () => {
    it('returns style with width', () => {
      const width = '10%';
      const expected = { width: width };
      expect(resolveWidthAsStyle(undefined, width)).toEqual(expected);
      expect(resolveWidthAsStyle({}, width)).toEqual(expected);
      expect(resolveWidthAsStyle(undefined, 100)).toEqual({ width: '100px' });
      expect(resolveWidthAsStyle(undefined, '100')).toEqual({ width: '100px' });
    });
  });
  describe('with style and width', () => {
    const oldConsoleError = console.warn;
    let consoleStub: jest.Mock;

    beforeEach(() => {
      console.warn = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.warn = oldConsoleError;
    });
    const result = {
      width: '10%',
      color: 'red',
    };
    it('returns width overriding style', () => {
      const style = { width: '20%', color: 'red' };
      expect(resolveWidthAsStyle(style, '10%')).toEqual(result);
      expect(consoleStub).toBeCalled();
    });
    it('returns style merged with width', () => {
      const style = { color: 'red' };
      expect(resolveWidthAsStyle(style, '10%')).toEqual(result);
    });
  });
});
