import { getSecureRelForTarget } from './get_secure_rel_for_target';

describe('getSecureRelForTarget', () => {
  describe('returns rel', () => {
    test('when target is not supplied', () => {
      expect(
        getSecureRelForTarget({
          href: undefined,
          target: undefined,
          rel: 'hello',
        })
      ).toBe('hello');
    });

    test('when target is empty', () => {
      expect(
        getSecureRelForTarget({
          href: undefined,
          target: '',
          rel: 'hello',
        })
      ).toBe('hello');
    });

    test('when target is not _blank', () => {
      expect(
        getSecureRelForTarget({
          href: undefined,
          target: '_self',
          rel: 'hello',
        })
      ).toBe('hello');
    });

    test('when target is undefined', () => {
      expect(
        getSecureRelForTarget({
          href: undefined,
          target: undefined,
          rel: 'hello',
        })
      ).toBe('hello');
    });
  });

  describe('returns noopener noreferrer when domain is unsafe', () => {
    test('when href is not specified', () => {
      expect(
        getSecureRelForTarget({
          href: undefined,
          target: '_blank',
          rel: undefined,
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains neither', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://www.google.com/',
          target: '_blank',
          rel: undefined,
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains both', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://wwwelastic.co/',
          target: '_blank',
          rel: 'noopener noreferrer',
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains noopener', () => {
      expect(
        getSecureRelForTarget({
          href: 'wss://www.elastic.co/',
          target: '_blank',
          rel: 'noopener',
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains noreferrer', () => {
      expect(
        getSecureRelForTarget({
          href: 'smb://www.elastic.co/',
          target: '_blank',
          rel: 'noreferrer',
        })
      ).toBe('noopener noreferrer');
    });

    test('including the original rel value', () => {
      expect(
        getSecureRelForTarget({
          href: '/foo/bar',
          target: '_blank',
          rel: 'nofollow',
        })
      ).toBe('nofollow noopener noreferrer');
    });
  });

  describe('returns noopener when domain is safe', () => {
    test('when rel contains neither', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://www.elastic.co',
          target: '_blank',
          rel: undefined,
        })
      ).toBe('noopener');
    });

    test('when rel contains both', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://www.elastic.co',
          target: '_blank',
          rel: 'noopener noreferrer',
        })
      ).toBe('noopener');
    });

    test('when rel contains noopener', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://docs.elastic.co',
          target: '_blank',
          rel: 'noopener',
        })
      ).toBe('noopener');
    });

    test('when rel contains noreferrer', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://elastic.co',
          target: '_blank',
          rel: 'noreferrer',
        })
      ).toBe('noopener');
    });

    test('including the original rel value', () => {
      expect(
        getSecureRelForTarget({
          href: 'http://discuss.elastic.co',
          target: '_blank',
          rel: 'nofollow',
        })
      ).toBe('nofollow noopener');
    });
  });
});
