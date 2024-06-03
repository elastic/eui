/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test';
import { render } from '../../test/rtl';

import { EuiHighlight } from './highlight';

describe('EuiHighlight', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiHighlight {...requiredProps} search="va">
        value
      </EuiHighlight>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('behavior', () => {
    describe('matching', () => {
      test('only applies to first match', () => {
        const { container } = render(
          <EuiHighlight search="match">match match match</EuiHighlight>
        );

        expect(container.querySelectorAll('mark')).toHaveLength(1);
        expect(container.querySelector('mark')).toHaveTextContent('match');
      });

      test('applies to all matches', () => {
        const { container } = render(
          <EuiHighlight search="match" highlightAll>
            match match match
          </EuiHighlight>
        );

        expect(container.querySelectorAll('mark')).toHaveLength(3);
      });

      describe('array of search strings', () => {
        it('returns results for each word in the array', () => {
          const { container } = render(
            <EuiHighlight search={['dog', 'fox']} highlightAll>
              The quick brown fox jumped over the lazy dog
            </EuiHighlight>
          );

          const results = container.querySelectorAll('mark');
          expect(results).toHaveLength(2);
          expect(results[0]).toHaveTextContent('fox');
          expect(results[1]).toHaveTextContent('dog');
        });

        it('throws an error if `highlightAll` is not set', () => {
          expect(() =>
            render(
              <EuiHighlight search={['dog', 'fox']}>
                The quick brown fox jumped over the lazy dog
              </EuiHighlight>
            )
          ).toThrow();
        });
      });
    });

    describe('loose matching', () => {
      test('matches strings with different casing', () => {
        const { container } = render(
          <EuiHighlight search="CASE">different case match</EuiHighlight>
        );

        expect(container.querySelector('mark')).toBeInTheDocument();
      });
    });

    describe('strict matching', () => {
      test("doesn't match strings with different casing", () => {
        const { container } = render(
          <EuiHighlight search="CASE" strict>
            different case match
          </EuiHighlight>
        );

        expect(container.querySelector('mark')).not.toBeInTheDocument();
      });
    });

    it('does not parse regex characters', () => {
      const { container } = render(
        <EuiHighlight search="(.)+" highlightAll>
          match match match
        </EuiHighlight>
      );

      expect(container.querySelector('mark')).not.toBeInTheDocument();
    });
  });

  test('hasScreenReaderHelpText can be false', () => {
    const { container } = render(
      <EuiHighlight search="match" hasScreenReaderHelpText={false}>
        match match match
      </EuiHighlight>
    );

    expect(container.querySelector('mark')!.className).not.toContain(
      'hasScreenReaderHelpText'
    );
  });
});
