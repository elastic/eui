import { getSecureRelForTarget } from './get_secure_rel_for_target';

describe('getSecureRelForTarget', () => {
  describe('returns rel', () => {
    test('when target is not supplied', () => {
      expect(getSecureRelForTarget(undefined, 'hello')).toBe('hello');
    });

    test('when target is empty', () => {
      expect(getSecureRelForTarget('', 'hello')).toBe('hello');
    });

    test('when target is not _blank', () => {
      expect(getSecureRelForTarget('_self', 'hello')).toBe('hello');
    });

    test('when target is undefined', () => {
      expect(getSecureRelForTarget('_self', 'hello')).toBe('hello');
    });
  });

  describe('returns noopener noreferrer', () => {
    test('when rel contains neither', () => {
      expect(getSecureRelForTarget('_blank')).toBe('noopener noreferrer');
    });

    test('when rel contains both', () => {
      expect(getSecureRelForTarget('_blank', 'noopener noreferrer')).toBe(
        'noopener noreferrer'
      );
    });

    test('when rel contains noopener', () => {
      expect(getSecureRelForTarget('_blank', 'noopener')).toBe(
        'noopener noreferrer'
      );
    });

    test('when rel contains noreferrer', () => {
      expect(getSecureRelForTarget('_blank', 'noreferrer')).toBe(
        'noreferrer noopener'
      );
    });

    test('including the original rel value', () => {
      expect(getSecureRelForTarget('_blank', 'nofollow')).toBe(
        'nofollow noopener noreferrer'
      );
    });
  });
});
