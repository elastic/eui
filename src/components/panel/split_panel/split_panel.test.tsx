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
import { requiredProps } from '../../../test/required_props';

import { EuiSplitPanel } from './split_panel';

describe('EuiSplitPanel', () => {
  test('is rendered', () => {
    const component = render(<EuiSplitPanel.Outer {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('inner children', () => {
    test('are rendered', () => {
      const component = render(
        <EuiSplitPanel.Outer>
          <EuiSplitPanel.Inner />
        </EuiSplitPanel.Outer>
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('accepts panel props', () => {
    const component = render(
      <EuiSplitPanel.Outer color="primary">
        <EuiSplitPanel.Inner color="success" {...requiredProps} />
      </EuiSplitPanel.Outer>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders as row', () => {
    const component = render(<EuiSplitPanel.Outer direction="row" />);

    expect(component).toMatchSnapshot();
  });

  describe('responsive', () => {
    // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
    beforeAll(() => (window.innerWidth = 520));
    afterAll(() => 1024); // reset to jsdom's default

    test('is rendered at small screens', () => {
      const component = render(<EuiSplitPanel.Outer />);

      expect(component).toMatchSnapshot();
    });

    test('can be false', () => {
      const component = render(<EuiSplitPanel.Outer responsive={false} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('responsive', () => {
    // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
    beforeAll(() => (window.innerWidth = 1000));
    afterAll(() => 1024); // reset to jsdom's default

    test('can be changed to different breakpoints', () => {
      const component = render(<EuiSplitPanel.Outer responsive={['m', 'l']} />);

      expect(component).toMatchSnapshot();
    });
  });
});
