/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { keyframes, css, SerializedStyles } from '@emotion/react';
import createCache, { type EmotionCache } from '@emotion/cache';

import { euiStylisPrefixer } from './prefixer';

describe('euiStylisPrefixer', () => {
  let cache: EmotionCache;
  const sheetInsert = jest.fn();

  beforeEach(() => {
    cache = createCache({
      key: 'test',
      stylisPlugins: [euiStylisPrefixer],
    });
    sheetInsert.mockReset();
    cache.sheet.insert = sheetInsert;
  });

  const insert = (styles: SerializedStyles) => {
    cache.insert('', styles, cache.sheet, false);

    const rules = sheetInsert.mock.calls.map((call) => call[0]);
    if (rules.length > 1) {
      return rules;
    }

    return rules[0];
  };

  describe('does prefix', () => {
    test('user-select', () => {
      expect(
        insert(
          css`
            user-select: none;
          `
        )
      ).toEqual('-webkit-user-select:none;user-select:none;');
    });

    test('text-decoration', () => {
      expect(
        insert(css`
          text-decoration: line-through dashed blue;
          text-decoration-line: underline overline;
          text-decoration-style: wavy;
          text-decoration-color: red;
          text-decoration-skip: objects;
        `)
      ).toEqual([
        '-webkit-text-decoration:line-through dashed blue;text-decoration:line-through dashed blue;',
        'text-decoration-line:underline overline;',
        'text-decoration-style:wavy;',
        'text-decoration-color:red;',
        'text-decoration-skip:objects;',
      ]);
    });

    test('text-size-adjust', () => {
      expect(
        insert(
          css`
            text-size-adjust: 80%;
          `
        )
      ).toEqual('-webkit-text-size-adjust:80%;text-size-adjust:80%;');
    });

    test('box-decoration-break', () => {
      expect(
        insert(
          css`
            box-decoration-break: slice;
          `
        )
      ).toEqual(
        '-webkit-box-decoration-break:slice;box-decoration-break:slice;'
      );
    });

    test('mask CSS', () => {
      expect(
        insert(
          css`
            mask: url(mask.svg);
            mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
            mask-clip: border-box;
            mask-origin: padding-box;
            mask-composite: subtract;
            mask-mode: alpha;
            mask-position: center;
            mask-repeat: repeat-x;
            mask-size: contain;
          `
        )
      ).toEqual([
        '-webkit-mask:url(mask.svg);mask:url(mask.svg);',
        '-webkit-mask-image:linear-gradient(rgba(0, 0, 0, 1), transparent);mask-image:linear-gradient(rgba(0, 0, 0, 1), transparent);',
        '-webkit-mask-clip:border-box;mask-clip:border-box;',
        '-webkit-mask-origin:padding-box;mask-origin:padding-box;',
        '-webkit-mask-composite:subtract;mask-composite:subtract;',
        '-webkit-mask-mode:alpha;mask-mode:alpha;',
        '-webkit-mask-position:center;mask-position:center;',
        '-webkit-mask-repeat:repeat-x;mask-repeat:repeat-x;',
        '-webkit-mask-size:contain;mask-size:contain;',
      ]);
    });

    test('background-clip text', () => {
      expect(
        insert(css`
          background-clip: content-box;
          background-clip: text;
        `)
      ).toEqual([
        'background-clip:content-box;',
        '-webkit-background-clip:text;background-clip:text;',
      ]);
    });

    test('print-color-adjust', () => {
      expect(
        insert(
          css`
            print-color-adjust: economy;
          `
        )
      ).toEqual(
        '-webkit-print-color-adjust:economy;print-color-adjust:economy;'
      );
    });

    test('max-content, min-content, fit-content, and stretch sizing values', () => {
      expect(
        insert(css`
          height: max-content;
          width: min-content;
          max-inline-size: fit-content;
          min-block-size: stretch;
        `)
      ).toEqual([
        'height:max-content;',
        'width:min-content;',
        'max-inline-size:fit-content;',
        'min-block-size:-webkit-fill-available;min-block-size:-moz-available;min-block-size:stretch;',
      ]);
    });
  });

  describe('does not prefix', () => {
    test('flex CSS', () => {
      expect(
        insert(css`
          display: flex;
          display: inline-flex;
          align-items: center;
          align-content: center;
          align-self: center;
          justify-content: center;
          flex-shrink: 0;
          flex-grow: 0;
          flex-basis: 100%;
          flex: 1;
          flex-direction: column;
          order: 2;
        `)
      ).toEqual([
        'display:flex;',
        'display:inline-flex;',
        'align-items:center;',
        'align-content:center;',
        'align-self:center;',
        'justify-content:center;',
        'flex-shrink:0;',
        'flex-grow:0;',
        'flex-basis:100%;',
        'flex:1;',
        'flex-direction:column;',
        'order:2;',
      ]);
    });

    test('transform & transition CSS', () => {
      expect(
        insert(css`
          transform: translateY(-1px);
          transition: transform 2s linear;
        `)
      ).toEqual([
        'transform:translateY(-1px);',
        'transition:transform 2s linear;',
      ]);
    });

    test('animation CSS', () => {
      const testAnimation = keyframes`
          from { opacity: 0; }
          to { opacity: 1; }
        `;

      expect(
        insert(css`
          animation: ${testAnimation};
          animation-name: test;
          animation-delay: 1s;
          animation-direction: reverse;
          animation-duration: 50ms;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
          animation-play-state: paused;
          animation-timing-function: ease-in-out;
        `)
      ).toEqual([
        `animation:${testAnimation.name};`,
        'animation-name:test;',
        'animation-delay:1s;',
        'animation-direction:reverse;',
        'animation-duration:50ms;',
        'animation-fill-mode:both;',
        'animation-iteration-count:infinite;',
        'animation-play-state:paused;',
        'animation-timing-function:ease-in-out;',
      ]);
    });

    test('position sticky', () => {
      expect(
        insert(
          css`
            position: sticky;
          `
        )
      ).toEqual('position:sticky;');
    });

    test('writing mode CSS', () => {
      expect(
        insert(css`
          writing-mode: vertical-lr;
          writing-mode: vertical-rl;
          writing-mode: horizontal-tb;
        `)
      ).toEqual([
        'writing-mode:vertical-lr;',
        'writing-mode:vertical-rl;',
        'writing-mode:horizontal-tb;',
      ]);
    });

    test('inline logical properties CSS', () => {
      expect(
        insert(css`
          padding-inline-start: 1rem;
          margin-inline-end: 2em;
        `)
      ).toEqual(['padding-inline-start:1rem;', 'margin-inline-end:2em;']);
    });

    test('columns CSS', () => {
      expect(
        insert(css`
          columns: 3;
          column-count: 5;
          column-fill: balance;
          column-gap: 10px;
          column-width: 20px;
          column-span: all;
          column-rule: blue dotted 2px;
        `)
      ).toEqual([
        'columns:3;',
        'column-count:5;',
        'column-fill:balance;',
        'column-gap:10px;',
        'column-width:20px;',
        'column-span:all;',
        'column-rule:blue dotted 2px;',
      ]);
    });

    test('misc text effect CSS', () => {
      expect(
        insert(css`
          appearance: none;
          hyphens: auto;
          cursor: grab;
        `)
      ).toEqual(['appearance:none;', 'hyphens:auto;', 'cursor:grab;']);
    });

    test('misc filter/effect/image CSS', () => {
      expect(
        insert(css`
          filter: grayscale(1);
          clip-path: url(#foo);
          backface-visibility: visible;
          background: image-set(
            linear-gradient(blue, white) 1x,
            linear-gradient(blue, green) 2x
          );
        `)
      ).toEqual([
        'filter:grayscale(1);',
        'clip-path:url(#foo);',
        'backface-visibility:visible;',
        `background:image-set(
            linear-gradient(blue, white) 1x,
            linear-gradient(blue, green) 2x
          );`,
      ]);
    });

    test('misc selectors', () => {
      expect(
        insert(css`
          ::placeholder,
          :read-only,
          :read-write {
            color: red;
          }
        `)
      ).toEqual('::placeholder,:read-only,:read-write{color:red;}');
    });
  });
});
