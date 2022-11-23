/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { logicalShorthandCSS } from '../functions/logical_shorthands';

describe('logicalShorthandCSS', () => {
  it('returns the shorthand property as-is if only one value is being set for all 4 sides', () => {
    expect(logicalShorthandCSS('margin', 0)).toEqual('margin: 0;');
  });

  describe('returns `-block` and `-inline` properties if 2-4 values are passed', () => {
    it('handles 2 values', () => {
      expect(logicalShorthandCSS('padding', '10px 20px'))
        .toMatchInlineSnapshot(`
        "
            padding-block: 10px;
            padding-inline: 20px;
            "
      `);
    });

    it('handles 3 values', () => {
      expect(logicalShorthandCSS('border-width', '10px 20px 30px'))
        .toMatchInlineSnapshot(`
        "
            border-block-width: 10px 30px;
            border-inline-width: 20px;
            "
      `);
    });

    it('handles 4 values', () => {
      expect(logicalShorthandCSS('padding', '10px 20px 30px 40px'))
        .toMatchInlineSnapshot(`
        "
            padding-block: 10px 30px;
            padding-inline: 40px 20px;
            "
      `);
    });

    it('ignores extra spaces between values', () => {
      expect(logicalShorthandCSS('border-color', 'red  green   blue    yellow'))
        .toMatchInlineSnapshot(`
        "
            border-block-color: red blue;
            border-inline-color: yellow green;
            "
      `);
    });
  });

  it('throws an error if the passed property is not a shorthand property', () => {
    expect(() => logicalShorthandCSS('border', 'inherit')).toThrow();
  });
});
