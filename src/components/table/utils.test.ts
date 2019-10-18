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
    });
  });
  describe('with style and width', () => {
    it('returns style overriding width', () => {
      const style = { width: '20%', color: 'red' };
      expect(resolveWidthAsStyle(style, '10%')).toEqual(style);
    });
    it('returns style merged with width', () => {
      const style = { color: 'red' };
      expect(resolveWidthAsStyle(style, '10%')).toEqual({
        width: '10%',
        color: 'red',
      });
    });
  });
});
