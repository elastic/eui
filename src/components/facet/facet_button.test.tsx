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
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiFacetButton } from './facet_button';
import { EuiIcon } from '../icon';

describe('EuiFacetButton', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFacetButton {...requiredProps}>Content</EuiFacetButton>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFacetButton isDisabled>Content</EuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFacetButton isLoading>Content</EuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFacetButton isSelected>Content</EuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('quantity', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFacetButton quantity={60}>Content</EuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFacetButton icon={<EuiIcon type="dot" />}>Content</EuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiFacetButton onClick={handler}>Content</EuiFacetButton>
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });
  });
});
