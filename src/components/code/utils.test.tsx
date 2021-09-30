/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { highlightByLine, parseLineRanges } from './utils';

const jsonCode = `{
  "id": "1",
}`;

describe('highlightByLine', () => {
  describe('without line numbers', () => {
    it('renders a single .euiCodeBlock__line element per line', () => {
      const highlight = highlightByLine(jsonCode, 'json', {
        show: false,
        start: 1,
      });
      expect(highlight).toMatchSnapshot();
      // @ts-expect-error RefractorNode
      expect(highlight[0].children[0].children.length).toBe(1);
    });
  });

  describe('with line numbers', () => {
    it('renders two elements per line: .euiCodeBlock__lineNumber and .euiCodeBlock__lineText', () => {
      const highlight = highlightByLine(jsonCode, 'json', {
        show: true,
        start: 1,
      });
      expect(highlight).toMatchSnapshot();
      // @ts-expect-error RefractorNode
      expect(highlight[0].children.length).toBe(2);
    });

    describe('with a custom starting number', () => {
      it('adds the starting lineNumber to each node', () => {
        const highlight = highlightByLine(jsonCode, 'json', {
          show: true,
          start: 10,
        });
        expect(highlight).toMatchSnapshot();
        expect(
          // @ts-expect-error RefractorNode
          highlight[0].children[0].properties['data-line-number']
        ).toBe(10);
      });
    });

    describe('with highlighted lines', () => {
      it('adds a class to the specified lines', () => {
        const highlight = highlightByLine(jsonCode, 'json', {
          show: true,
          start: 1,
          highlight: '1-2',
        });
        expect(highlight).toMatchSnapshot();
        expect(
          // @ts-expect-error RefractorNode
          highlight[0].properties.className[0].includes(
            'euiCodeBlock__line--isHighlighted'
          )
        ).toBe(true);
      });
    });
  });
});

describe('parseLineRanges', () => {
  describe('given a comma-separated string of numbers', () => {
    it('outputs an array of numbers', () => {
      const array = parseLineRanges('1, 3, 5, 9');
      expect(array).toEqual([1, 3, 5, 9]);
    });
  });
  describe('given a comma-separated string of ranges', () => {
    it('outputs an array of numbers', () => {
      const array = parseLineRanges('1-5');
      expect(array).toEqual([1, 2, 3, 4, 5]);
    });
  });
  describe('given a comma-separated string of numbers and ranges', () => {
    it('outputs an array of numbers', () => {
      const array = parseLineRanges('1, 3-10, 15');
      expect(array).toEqual([1, 3, 4, 5, 6, 7, 8, 9, 10, 15]);
    });
  });
});
