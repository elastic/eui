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
      <EuiHighlight {...requiredProps} search="">
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

        expect(container.firstChild).toMatchSnapshot();
      });

      test('applies to all matches', () => {
        const { container } = render(
          <EuiHighlight search="match" highlightAll>
            match match match
          </EuiHighlight>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('hasScreenReaderHelpText can be false', () => {
        const { container } = render(
          <EuiHighlight
            search="match"
            highlightAll
            hasScreenReaderHelpText={false}
          >
            match match match
          </EuiHighlight>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('loose matching', () => {
      test('matches strings with different casing', () => {
        const { container } = render(
          <EuiHighlight search="CASE">different case match</EuiHighlight>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('strict matching', () => {
      test("doesn't match strings with different casing", () => {
        const { container } = render(
          <EuiHighlight search="CASE" strict>
            different case match
          </EuiHighlight>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
