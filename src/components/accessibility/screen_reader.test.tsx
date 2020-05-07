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

import { EuiScreenReaderOnly } from './screen_reader';

describe('EuiScreenReaderOnly', () => {
  describe('adds an accessibility class to a child element', () => {
    test('when used with no props', () => {
      const $paragraph = render(
        <EuiScreenReaderOnly>
          <p>
            This paragraph is not visibile to sighted users but will be read by
            screenreaders.
          </p>
        </EuiScreenReaderOnly>
      );

      expect($paragraph).toMatchSnapshot();
    });
    test('and combines other classNames (foo, bar) given as props on the child', () => {
      const $paragraph = render(
        <EuiScreenReaderOnly>
          <p className="foo bar">
            This paragraph is not visibile to sighted users but will be read by
            screenreaders.
          </p>
        </EuiScreenReaderOnly>
      );

      expect($paragraph).toMatchSnapshot();
    });
  });

  test('will show on focus', () => {
    const component = render(
      <EuiScreenReaderOnly showOnFocus>
        <a href="#">Link</a>
      </EuiScreenReaderOnly>
    );

    expect(component).toMatchSnapshot();
  });
});
