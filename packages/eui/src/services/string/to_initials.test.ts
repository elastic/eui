/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { toGraphemes, toInitials } from './to_initials';

describe('toInitials', () => {
  const NAMES = [
    'Single',
    'Two words',
    'More Than Two Words',
    'lowercase words',
  ];

  const INITIALS_BY_DEFAULT = ['S', 'Tw', 'MT', 'lw'];
  const INITIALS_BY_2 = ['Si', 'Tw', 'MT', 'lw'];
  const INITIALS_BY_1 = ['S', 'T', 'M', 'l'];

  NAMES.forEach((name, index) => {
    it(`should return only the first letter of each word in '${name}'`, () => {
      expect(toInitials(name)).toBe(INITIALS_BY_DEFAULT[index]);
    });

    it(`should return two letters when initialsLength is 2 for '${name}'`, () => {
      expect(toInitials(name, 2)).toBe(INITIALS_BY_2[index]);
    });

    it(`should return one letter when initialsLength is 1 for '${name}'`, () => {
      expect(toInitials(name, 1)).toBe(INITIALS_BY_1[index]);
    });

    it(`should return the custom initials provided (truncated to 2) instead of '${name}'`, () => {
      expect(toInitials(name, 2, 'INIT')).toBe('IN');
    });
  });

  describe('graphemes', () => {
    const THUMBS_UP = '\u{1F44D}';
    const THUMBS_UP_MEDIUM = '\u{1F44D}\u{1F3FD}';
    const DETECTIVE = '\u{1F575}\u{1F3FB}\u200D\u2642\uFE0F';
    const DEVANAGARI_KSSA = '\u0915\u094D\u0937';
    const E_ACUTE_COMBINING = 'e\u0301';

    it('keeps a single emoji with a modifier whole', () => {
      expect(toInitials('name', undefined, THUMBS_UP_MEDIUM)).toBe(
        THUMBS_UP_MEDIUM
      );
      expect(toInitials('name', 1, THUMBS_UP_MEDIUM)).toBe(THUMBS_UP_MEDIUM);
    });

    it('keeps a single ZWJ emoji sequence whole', () => {
      expect(toInitials('name', 2, DETECTIVE)).toBe(DETECTIVE);
    });

    it('returns two emoji with modifiers', () => {
      const initials = `${THUMBS_UP_MEDIUM}${THUMBS_UP_MEDIUM}`;
      expect(toInitials('name', undefined, initials)).toBe(initials);
    });

    it('truncates to whole graphemes', () => {
      expect(
        toInitials('name', 2, `${THUMBS_UP_MEDIUM}${THUMBS_UP}${THUMBS_UP}`)
      ).toBe(`${THUMBS_UP_MEDIUM}${THUMBS_UP}`);
      expect(toInitials('name', 1, `${THUMBS_UP_MEDIUM}${THUMBS_UP}`)).toBe(
        THUMBS_UP_MEDIUM
      );
    });

    it('does not split a surrogate pair after a letter', () => {
      expect(toInitials('name', undefined, `A${THUMBS_UP}`)).toBe(
        `A${THUMBS_UP}`
      );
      expect(toInitials('name', 1, `A${THUMBS_UP}`)).toBe('A');
    });

    it('keeps combining marks and conjuncts with their base character', () => {
      expect(toInitials('name', 1, DEVANAGARI_KSSA)).toBe(DEVANAGARI_KSSA);
      expect(toInitials('name', 2, `${E_ACUTE_COMBINING}x`)).toBe(
        `${E_ACUTE_COMBINING}x`
      );
      expect(toInitials('name', 1, `${E_ACUTE_COMBINING}x`)).toBe(
        E_ACUTE_COMBINING
      );
    });

    it('truncates a single-word name to whole graphemes', () => {
      expect(toInitials(`${THUMBS_UP_MEDIUM}name`, 1)).toBe(THUMBS_UP_MEDIUM);
      expect(toInitials(`${DEVANAGARI_KSSA}a`, 2)).toBe(`${DEVANAGARI_KSSA}a`);
    });
  });
});

describe('toGraphemes', () => {
  it('splits a string into grapheme clusters', () => {
    expect(toGraphemes('a\u{1F44D}\u{1F3FD}e\u0301')).toEqual([
      'a',
      '\u{1F44D}\u{1F3FD}',
      'e\u0301',
    ]);
  });

  it('falls back to code points without Intl.Segmenter', () => {
    const descriptor = Object.getOwnPropertyDescriptor(Intl, 'Segmenter')!;
    Reflect.deleteProperty(Intl, 'Segmenter');
    try {
      expect(toGraphemes('a\u{1F44D}\u{1F3FD}')).toEqual([
        'a',
        '\u{1F44D}',
        '\u{1F3FD}',
      ]);
    } finally {
      Object.defineProperty(Intl, 'Segmenter', descriptor);
    }
  });
});
