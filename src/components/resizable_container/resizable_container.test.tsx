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

import { EuiResizableContainer } from './resizable_container';

jest.mock('../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

describe('EuiResizableContainer', () => {
  test('is rendered', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50}>123</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be vertical', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps} direction="vertical">
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50}>123</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be controlled externally', () => {
    const panel1 = 50;
    const panel2 = 50;
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel size={panel1}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel size={panel2}>123</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have scrollable panels', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50} scrollable>
              Testing
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={50} scrollable>
              123
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have more than two panels', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={33}>Testing</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={33}>123</EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel initialSize={33}>And again</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can adjust button spacing', () => {
    const component = render(
      <EuiResizableContainer {...requiredProps}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel initialSize={50}>Testing</EuiResizablePanel>
            <EuiResizableButton size="s" />
            <EuiResizablePanel initialSize={50}>123</EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });
});
