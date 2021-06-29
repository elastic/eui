/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { Timer } from './timer';

describe('Timer', () => {
  describe('constructor', () => {
    test('counts down until time elapses and calls callback', (done) => {
      const callbackSpy = jest.fn();
      new Timer(callbackSpy, 5);

      setTimeout(() => {
        expect(callbackSpy).toBeCalled();
        done();
      }, 8);
    });
  });

  describe('pause', () => {
    test('stops timer', (done) => {
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
    test('starts timer again', (done) => {
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
    test('prevents timer from being called', (done) => {
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
