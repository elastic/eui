/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  logicalShorthandCSS,
  logicalBorderRadiusCSS,
} from '../functions/logical_shorthands';

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

describe('logicalBorderRadiusCSS', () => {
  describe('basic non-slash usage', () => {
    it('returns the shorthand property as-is if only one value is being set for all 4 sides', () => {
      expect(logicalBorderRadiusCSS('0')).toEqual('border-radius: 0;');
    });

    it('handles 2 values', () => {
      expect(logicalBorderRadiusCSS('1px 2px')).toMatchInlineSnapshot(`
        "border-start-start-radius: 1px;
        border-start-end-radius: 2px;
        border-end-end-radius: 1px;
        border-end-start-radius: 2px;"
      `);
    });

    it('handles 3 values', () => {
      expect(logicalBorderRadiusCSS('1px 2px 3px')).toMatchInlineSnapshot(`
        "border-start-start-radius: 1px;
        border-start-end-radius: 2px;
        border-end-end-radius: 3px;
        border-end-start-radius: 2px;"
      `);
    });

    it('handles 4 values', () => {
      expect(logicalBorderRadiusCSS('1px 2px 3px 4px')).toMatchInlineSnapshot(`
        "border-start-start-radius: 1px;
        border-start-end-radius: 2px;
        border-end-end-radius: 3px;
        border-end-start-radius: 4px;"
      `);
    });

    describe('ignoreZeroes flag', () => {
      it('does not remove 0 values by default in case the util is being used to override existing border-radius', () => {
        expect(logicalBorderRadiusCSS('3px 0 0 5px')).toMatchInlineSnapshot(`
          "border-start-start-radius: 3px;
          border-start-end-radius: 0;
          border-end-end-radius: 0;
          border-end-start-radius: 5px;"
        `);
      });

      it('trims properties that equate to 0 if ignoreZeroes is true', () => {
        expect(logicalBorderRadiusCSS('0px 10px 0 20px', true))
          .toMatchInlineSnapshot(`
          "border-start-end-radius: 10px;
          border-end-start-radius: 20px;"
        `);
      });
    });
  });

  describe('slash usage', () => {
    it('handles 1 set of values', () => {
      expect(logicalBorderRadiusCSS('10% / 20%')).toMatchInlineSnapshot(`
        "border-start-start-radius: 10% 20%;
        border-start-end-radius: 10% 20%;
        border-end-end-radius: 10% 20%;
        border-end-start-radius: 10% 20%;"
      `);
    });

    it('handles 2 sets of values', () => {
      expect(logicalBorderRadiusCSS('10% 20% / 30% 40%'))
        .toMatchInlineSnapshot(`
        "border-start-start-radius: 10% 30%;
        border-start-end-radius: 20% 40%;
        border-end-end-radius: 10% 30%;
        border-end-start-radius: 20% 40%;"
      `);
    });

    it('handles 3 sets of values', () => {
      expect(logicalBorderRadiusCSS('10% 20% 30% / 40% 50% 60%'))
        .toMatchInlineSnapshot(`
        "border-start-start-radius: 10% 40%;
        border-start-end-radius: 20% 50%;
        border-end-end-radius: 30% 60%;
        border-end-start-radius: 20% 50%;"
      `);
    });

    it('handles 4 sets of values', () => {
      expect(logicalBorderRadiusCSS('10% 20% 30% 40% / 50% 60% 70% 80%'))
        .toMatchInlineSnapshot(`
        "border-start-start-radius: 10% 50%;
        border-start-end-radius: 20% 60%;
        border-end-end-radius: 30% 70%;
        border-end-start-radius: 40% 80%;"
      `);
    });

    it('handles mismatched value amounts', () => {
      expect(logicalBorderRadiusCSS('10px 20px / 30px')).toMatchInlineSnapshot(`
        "border-start-start-radius: 10px 30px;
        border-start-end-radius: 20px 30px;
        border-end-end-radius: 10px 30px;
        border-end-start-radius: 20px 30px;"
      `);

      expect(logicalBorderRadiusCSS('40px / 50px 60px 70px'))
        .toMatchInlineSnapshot(`
        "border-start-start-radius: 40px 50px;
        border-start-end-radius: 40px 60px;
        border-end-end-radius: 40px 70px;
        border-end-start-radius: 40px 60px;"
      `);
    });
  });

  describe('edge cases', () => {
    it('ignores extra spaces between values', () => {
      expect(logicalBorderRadiusCSS('25px    50px')).toMatchInlineSnapshot(`
        "border-start-start-radius: 25px;
        border-start-end-radius: 50px;
        border-end-end-radius: 25px;
        border-end-start-radius: 50px;"
      `);
    });

    it('ignores more than 4 values', () => {
      expect(logicalBorderRadiusCSS('1px 2px 3px 4px 5px'))
        .toMatchInlineSnapshot(`
        "border-start-start-radius: 1px;
        border-start-end-radius: 2px;
        border-end-end-radius: 3px;
        border-end-start-radius: 4px;"
      `);
    });
  });
});
