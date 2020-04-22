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

import { EuiFilterButton } from './filter_button';

describe('EuiFilterButton', () => {
  test('is rendered', () => {
    const component = render(<EuiFilterButton {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders zero properly', () => {
    const component = render(
      <EuiFilterButton {...requiredProps} numFilters={0} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType and iconSide', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFilterButton iconType="user" iconSide="right" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('numFilters', () => {
      it('is rendered', () => {
        const component = render(<EuiFilterButton numFilters={5} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('numActiveFilters and hasActiveFilters', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFilterButton numActiveFilters={5} hasActiveFilters />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered', () => {
        const component = render(<EuiFilterButton isSelected />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(<EuiFilterButton isDisabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('type', () => {
      it('is rendered', () => {
        const component = render(<EuiFilterButton type="button" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('grow', () => {
      it('can be turned off', () => {
        const component = render(<EuiFilterButton grow={false} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('withNext', () => {
      it('is rendered', () => {
        const component = render(<EuiFilterButton withNext />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
