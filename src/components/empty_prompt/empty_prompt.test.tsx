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

import { EuiEmptyPrompt } from './empty_prompt';

describe('EuiEmptyPrompt', () => {
  test('is rendered', () => {
    const component = render(
      <EuiEmptyPrompt
        iconType="arrowUp"
        title={<h2>Title</h2>}
        body={<p>Body</p>}
        actions={<div>Actions</div>}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType', () => {
      test('renders alone', () => {
        const component = render(<EuiEmptyPrompt iconType="arrowUp" />);
        expect(component).toMatchSnapshot();
      });

      test('renders with iconColor', () => {
        const component = render(
          <EuiEmptyPrompt iconType="arrowUp" iconColor="danger" />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      test('renders alone', () => {
        const component = render(
          <EuiEmptyPrompt icon={<span>Custom icon</span>} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('title', () => {
      test('renders alone', () => {
        const component = render(<EuiEmptyPrompt title={<div>title</div>} />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('body', () => {
      test('renders alone', () => {
        const component = render(<EuiEmptyPrompt body="body" />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('actions', () => {
      test('renders alone', () => {
        const component = render(<EuiEmptyPrompt actions="actions" />);
        expect(component).toMatchSnapshot();
      });

      test('renders an array', () => {
        const component = render(
          <EuiEmptyPrompt actions={['action1', 'action2']} />
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
