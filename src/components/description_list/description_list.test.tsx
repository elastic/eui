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
import { requiredProps } from '../../test/required_props';

import { EuiDescriptionList, TYPES, ALIGNMENTS } from './description_list';

describe('EuiDescriptionList', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDescriptionList {...requiredProps}>Content</EuiDescriptionList>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('listItems', () => {
      test('is rendered as strings and elements', () => {
        const listItems = [
          {
            title: 'Title 1',
            description: 'Description 1',
          },
          {
            title: <em>Title 2</em>,
            description: <code>Description 2</code>,
          },
          {
            title: 'Title 3',
            description: 'Description 3',
          },
        ];

        const component = render(
          <EuiDescriptionList listItems={listItems}>
            listItems will render instead of this content
          </EuiDescriptionList>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('compressed', () => {
      test('is rendered', () => {
        const component = render(<EuiDescriptionList compressed />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('type', () => {
      TYPES.forEach(type => {
        test(`${type} is rendered`, () => {
          const component = render(<EuiDescriptionList type={type} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('align', () => {
      ALIGNMENTS.forEach(alignment => {
        test(`${alignment} is rendered`, () => {
          const component = render(<EuiDescriptionList align={alignment} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
