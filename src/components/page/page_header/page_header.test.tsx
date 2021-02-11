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

import { EuiPageHeader, EuiPageHeaderProps } from './page_header';
import { ALIGN_ITEMS } from './page_header_content';

export const tabs: EuiPageHeaderProps['tabs'] = [
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
];

export const rightSideItems: EuiPageHeaderProps['rightSideItems'] = [
  <button>Button 1</button>,
  <button>Button 2</button>,
];

describe('EuiPageHeader', () => {
  test('is rendered', () => {
    const component = render(
      <EuiPageHeader {...requiredProps}>Anything</EuiPageHeader>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('page content props are passed down', () => {
      test('is rendered', () => {
        const component = render(
          <EuiPageHeader
            pageTitle="Page title"
            iconType="logoKibana"
            iconProps={requiredProps}
            tabs={tabs}
            tabsProps={requiredProps}
            description="Description"
            rightSideItems={rightSideItems}
            rightSideGroupProps={{ responsive: true, ...requiredProps }}>
            <p>Anything</p>
          </EuiPageHeader>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach((alignment) => {
        it(`${alignment} is rendered`, () => {
          const component = render(
            <EuiPageHeader
              pageTitle="Page title"
              rightSideItems={rightSideItems}
              alignItems={alignment}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('responsive', () => {
      test('is rendered as false', () => {
        const component = render(<EuiPageHeader responsive={false} />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered as reverse', () => {
        const component = render(<EuiPageHeader responsive={'reverse'} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('restrictWidth', () => {
      test('is rendered as true', () => {
        const component = render(<EuiPageHeader restrictWidth={true} />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered as custom', () => {
        const component = render(<EuiPageHeader restrictWidth={100} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
