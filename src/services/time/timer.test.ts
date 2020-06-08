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

import { Timer } from './timer';

describe('Timer', () => {
  describe('constructor', () => {
    test('counts down until time elapses and calls callback', done => {
      const callbackSpy = jest.fn();
      // tslint:disable-next-line:no-unused-expression
      new Timer(callbackSpy, 5);

      setTimeout(() => {
        expect(callbackSpy).toBeCalled();
        done();
      }, 8);
    });
  });

  describe('pause', () => {
    test('stops timer', done => {
      const callbackSpy = jest.fn();
      const timer = new Timer(callbackSpy, 5);
      timer.pause();

      setTimeout(() => {
        expect(callbackSpy).not.toBeCalled();
        done();
      }, 8);
    });
  });

  describe('resume', () => {
    test('starts timer again', done => {
      const callbackSpy = jest.fn();
      const timer = new Timer(callbackSpy, 5);
      timer.pause();
      timer.resume();

      setTimeout(() => {
        expect(callbackSpy).toBeCalled();
        done();
      }, 8);
    });
  });

  describe('clear', () => {
    test('prevents timer from being called', done => {
      const callbackSpy = jest.fn();
      const timer = new Timer(callbackSpy, 5);
      timer.clear();

      setTimeout(() => {
        expect(callbackSpy).not.toBeCalled();
        done();
      }, 8);
    });
  });

  describe('finish', () => {
    test('calls callback immediately', () => {
      const callbackSpy = jest.fn();
      const timer = new Timer(callbackSpy, 5);
      timer.finish();
      expect(callbackSpy).toBeCalled();
    });
  });
});
