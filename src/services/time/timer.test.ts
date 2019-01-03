import {
  Timer,
} from './timer';

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
