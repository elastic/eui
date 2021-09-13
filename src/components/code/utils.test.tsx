/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { highlightByLine } from './utils';

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
  });
});
