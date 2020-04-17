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

import { EuiStat, COLORS, ALIGNMENTS } from './stat';
import { TITLE_SIZES } from '../title/title';

jest.mock('./../form/form_row/make_id', () => () => 'generated-id');

describe('EuiStat', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStat title="title" description="description" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('loading is rendered', () => {
      const component = render(
        <EuiStat
          title="title"
          description="description"
          isLoading
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('title and description are reversed', () => {
      const component = render(
        <EuiStat title="title" description="description" reverse />
      );

      expect(component).toMatchSnapshot();
    });

    ALIGNMENTS.forEach(alignment => {
      test(`${alignment} is rendered`, () => {
        const component = render(
          <EuiStat
            title="title"
            description="description"
            textAlign={alignment}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    COLORS.forEach(color => {
      test(`${color} is rendered`, () => {
        const component = render(
          <EuiStat title="title" description="description" titleColor={color} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    TITLE_SIZES.forEach(size => {
      test(`${size} is rendered`, () => {
        const component = render(
          <EuiStat title="title" description="description" titleSize={size} />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
