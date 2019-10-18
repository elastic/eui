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
