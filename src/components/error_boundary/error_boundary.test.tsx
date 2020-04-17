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
import { mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

import { EuiErrorBoundary } from './error_boundary';

const GoodComponent = () => <div>No error</div>;

const errorMessage =
  "I'm here to kick butt and chew bubblegum.\n\nAnd I'm all out of gum.";

const BadComponent = () => {
  throw new Error(errorMessage);
};

describe('EuiErrorBoundary', () => {
  test('is rendered without an error', () => {
    const component = takeMountedSnapshot(
      mount(
        <EuiErrorBoundary {...requiredProps}>
          <GoodComponent />
        </EuiErrorBoundary>
      )
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with an error', () => {
    // Prevent the React boundary error from appearing in the terminal.
    spyOn(console, 'error'); // eslint-disable-line no-undef

    // Because the error contains the stack trace, it's non-deterministic. So we'll just check that
    // it contains our error message.
    const errorText = mount(
      <EuiErrorBoundary {...requiredProps}>
        <BadComponent />
      </EuiErrorBoundary>
    ).text();

    expect(errorText).toContain(errorMessage);
  });
});
