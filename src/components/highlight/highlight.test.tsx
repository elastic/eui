/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiHighlight } from './highlight';

describe('EuiHighlight', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHighlight {...requiredProps} search="">
        value
      </EuiHighlight>
    );

    expect(component).toMatchSnapshot();
  });

  describe('behavior', () => {
    describe('matching', () => {
      test('only applies to first match', () => {
        const component = render(
          <EuiHighlight search="match">match match match</EuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });

      test('applies to all matches', () => {
        const component = render(
          <EuiHighlight search="match" highlightAll>
            match match match
          </EuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('loose matching', () => {
      test('matches strings with different casing', () => {
        const component = render(
          <EuiHighlight search="CASE">different case match</EuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('strict matching', () => {
      test("doesn't match strings with different casing", () => {
        const component = render(
          <EuiHighlight search="CASE" strict>
            different case match
          </EuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
