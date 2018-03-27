import sinon from 'sinon';

import {
  Timer,
} from './timer';

describe('Timer', () => {
  describe('constructor', () => {
    test('counts down until time elapses and calls callback', done => {
      const callbackSpy = sinon.spy();
      const timer = new Timer(callbackSpy, 5); // eslint-disable-line no-unused-vars

      setTimeout(() => {
        expect(callbackSpy.called).toBe(true);
        done();
      }, 8);
    });
  });

  describe('pause', () => {
    test('stops timer', done => {
      const callbackSpy = sinon.spy();
      const timer = new Timer(callbackSpy, 5);
      timer.pause(0);

      setTimeout(() => {
        expect(callbackSpy.called).toBe(false);
        done();
      }, 8);
    });
  });

  describe('resume', () => {
    test('starts timer again', done => {
      const callbackSpy = sinon.spy();
      const timer = new Timer(callbackSpy, 5);
      timer.pause(0);
      timer.resume();

      setTimeout(() => {
        expect(callbackSpy.called).toBe(true);
        done();
      }, 8);
    });
  });

  describe('clear', () => {
    test('prevents timer from being called', done => {
      const callbackSpy = sinon.spy();
      const timer = new Timer(callbackSpy, 5);
      timer.clear(0);

      setTimeout(() => {
        expect(callbackSpy.called).toBe(false);
        done();
      }, 8);
    });
  });

  describe('finish', () => {
    test('calls callback immediately', () => {
      const callbackSpy = sinon.spy();
      const timer = new Timer(callbackSpy, 5);
      timer.finish();
      expect(callbackSpy.called).toBe(true);
    });
  });
});
