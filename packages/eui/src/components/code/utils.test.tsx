/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { renderHook } from '../../test/rtl';
import { useEuiTheme } from '../../services';

import {
  checkSupportedLanguage,
  getHtmlContent,
  isAstElement,
  nodeToHtml,
  highlightByLine,
  parseLineRanges,
} from './utils';

describe('shared utils', () => {
  describe('checkSupportedLanguage', () => {
    it('returns the language if included in the list of supported languages', () => {
      expect(checkSupportedLanguage('html')).toEqual('html');
    });

    it('otherwise, returns text language as a default', () => {
      expect(checkSupportedLanguage('fake language')).toEqual('text');
    });
  });

  describe('getHtmlContent', () => {
    it('returns the passed children as-is if data is not an array', () => {
      // @ts-expect-error we're passing a type we don't expect to get in prod for the sake of the test
      expect(getHtmlContent(undefined, 'children')).toEqual('children');
    });

    it('returns the passed children as-is if data is empty', () => {
      expect(getHtmlContent([], 'children')).toEqual('children');
    });
  });

  describe('isAstElement', () => {
    it('checks if a passed node type is `element`', () => {
      expect(isAstElement({ type: 'element' } as any)).toEqual(true);
      expect(isAstElement({ type: 'text' } as any)).toEqual(false);
    });
  });

  describe('nodeToHtml', () => {
    it('recursively converts refactor nodes to React JSX', () => {
      const output = nodeToHtml(
        {
          type: 'element',
          tagName: 'span',
          children: [
            {
              type: 'text',
              value: 'Hello world',
            },
          ],
          properties: { className: ['hello-world'] },
        },
        0,
        []
      );
      const component = shallow(<div>{output}</div>);
      expect(component).toMatchSnapshot();
    });

    it('handles rendering custom annotation types', () => {
      const output = nodeToHtml(
        {
          type: 'element',
          tagName: 'span',
          children: [
            {
              // @ts-ignore - custom annotation type
              type: 'annotation',
              lineNumber: 3,
              annotation: 'Hello world',
            },
          ],
          properties: { className: ['hello-world'] },
        },
        0,
        []
      );
      const component = shallow(<div>{output}</div>);
      expect(component).toMatchSnapshot();
    });
  });
});

describe('line utils', () => {
  const jsonCode = `{
    "id": "1",
  }`;

  describe('highlightByLine', () => {
    // Hook helper required in order to call `highlightByLine` with euiTheme
    const highlightByLineWithTheme = (config: any) =>
      renderHook(() => {
        const euiTheme = useEuiTheme();
        return highlightByLine(jsonCode, 'json', config, euiTheme);
      }).result.current;

    describe('without line numbers', () => {
      it('renders a single .euiCodeBlock__line element per line', () => {
        const highlight = highlightByLineWithTheme({
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
        const highlight = highlightByLineWithTheme({
          show: true,
          start: 1,
        });
        expect(highlight).toMatchSnapshot();
        // @ts-expect-error RefractorNode
        expect(highlight[0].children.length).toBe(2);
      });

      describe('with a custom starting number', () => {
        it('adds the starting lineNumber to each node', () => {
          const highlight = highlightByLineWithTheme({
            show: true,
            start: 10,
          });
          expect(highlight).toMatchSnapshot();
          expect(
            // @ts-expect-error RefractorNode
            highlight[0].children[0].children[0].properties['data-line-number']
          ).toBe(10);
        });
      });

      describe('with highlighted lines', () => {
        it('adds a class to the specified lines', () => {
          const highlight = highlightByLineWithTheme({
            show: true,
            start: 1,
            highlight: '1-2',
          });
          expect(highlight).toMatchSnapshot();
          expect(
            // @ts-expect-error RefractorNode
            highlight[0].children[1].properties.className[1].includes(
              'euiCodeBlock__lineText-isHighlighted'
            )
          ).toBe(true);
        });
      });

      describe('with annotations', () => {
        it('adds a custom annotation object after the lineNumber object', () => {
          const annotation = highlightByLineWithTheme({
            show: true,
            start: 1,
            annotations: { 1: 'Hello world' },
          });
          expect(annotation).toMatchSnapshot();
          // @ts-expect-error RefractorNode
          expect(annotation[0].children[0].children[1]).toEqual({
            type: 'annotation',
            lineNumber: 1,
            annotation: 'Hello world',
          });
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
});
