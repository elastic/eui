/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  LOGICAL_PROPERTIES,
  LOGICAL_TEXT_ALIGNMENT,
  logicalCSS,
  logicalCSSWithFallback,
  logicalStyle,
  logicalStyles,
  logicalTextAlignCSS,
  logicalTextAlignStyle,
} from '../functions/logicals';

describe('logicalCSS mixin returns a string property', () => {
  describe('for each directional property:', () => {
    LOGICAL_PROPERTIES.forEach((prop) => {
      it(prop, () => {
        expect(logicalCSS(prop, '8px')).toMatchSnapshot();
      });
    });
  });
});

describe('logicalCSSWithFallback', () => {
  it('returns both the original property and the logical property', () => {
    expect(logicalCSSWithFallback('overflow-x', 'auto')).toMatchSnapshot();
  });
});

describe('logicalStyle mixin returns an object property', () => {
  describe('for each directional property:', () => {
    LOGICAL_PROPERTIES.forEach((prop) => {
      it(prop, () => {
        expect(logicalStyle(prop, '8px')).toMatchSnapshot();
      });
    });
  });
});

describe('logicalStyles returns an object property', () => {
  it('converts all properties in an object to their logical equivalent', () => {
    expect(
      logicalStyles({ width: '100%', top: 30, marginRight: '20px' })
    ).toEqual({
      inlineSize: '100%',
      insetBlockStart: 30,
      marginInlineEnd: '20px',
    });
  });

  it('does nothing if no convertible logical CSS properties exist', () => {
    expect(logicalStyles({ color: 'red', backgroundColor: 'blue' })).toEqual({
      color: 'red',
      backgroundColor: 'blue',
    });
  });
});

describe('logicalTextAlignCSS mixin returns a string property', () => {
  describe('for each text align value:', () => {
    LOGICAL_TEXT_ALIGNMENT.forEach((align) => {
      it(align, () => {
        expect(logicalTextAlignCSS(align)).toMatchSnapshot();
      });
    });
  });
});

describe('logicalTextAlignStyle mixin returns a string property', () => {
  describe('for each text align value:', () => {
    LOGICAL_TEXT_ALIGNMENT.forEach((align) => {
      it(align, () => {
        expect(logicalTextAlignStyle(align)).toMatchSnapshot();
      });
    });
  });
});
