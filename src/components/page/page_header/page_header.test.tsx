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

import {
  ALIGN_ITEMS,
  EuiPageHeader,
  EuiPageHeaderProps,
  RESPONSIVE_ORDER,
} from './page_header';

const tabs: EuiPageHeaderProps['tabs'] = [
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
];

const rightSideContent: EuiPageHeaderProps['rightSideContent'] = [
  <button>Button 1</button>,
  <button>Button 2</button>,
];

describe('EuiPageHeader', () => {
  test('is rendered', () => {
    const component = render(<EuiPageHeader {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('pageTitle', () => {
      test('is rendered', () => {
        const component = render(<EuiPageHeader pageTitle="Page title" />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered with icon', () => {
        const component = render(
          <EuiPageHeader pageTitle="Page title" iconType="logoKibana" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('tabs', () => {
      test('is rendered', () => {
        const component = render(<EuiPageHeader tabs={tabs} />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered with tabsProps', () => {
        const component = render(
          <EuiPageHeader tabs={tabs} tabsProps={requiredProps} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('leftSideContent', () => {
      test('is rendered', () => {
        const component = render(
          <EuiPageHeader leftSideContent={<p>Anything</p>} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('description', () => {
      test('is rendered', () => {
        const component = render(<EuiPageHeader description="Description" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('rightSideContent', () => {
      test('is rendered', () => {
        const component = render(
          <EuiPageHeader rightSideContent={rightSideContent} />
        );

        expect(component).toMatchSnapshot();
      });

      test('is rendered with rightSideResponsive as true', () => {
        const component = render(
          <EuiPageHeader
            rightSideContent={rightSideContent}
            rightSideResponsive={true}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('children', () => {
      test('is rendered', () => {
        const component = render(<EuiPageHeader>Child</EuiPageHeader>);

        expect(component).toMatchSnapshot();
      });

      test('is rendered even if content props are passed', () => {
        const component = render(
          <EuiPageHeader
            pageTitle="Page title"
            tabs={tabs}
            rightSideContent={rightSideContent}>
            Child
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
              rightSideContent={rightSideContent}
              alignItems={alignment}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('responsiveOrder', () => {
      RESPONSIVE_ORDER.forEach((order) => {
        it(`${order} is rendered`, () => {
          const component = render(
            <EuiPageHeader
              pageTitle="Page title"
              rightSideContent={rightSideContent}
              responsiveOrder={order}
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
    });

    describe('restrictWidth', () => {
      test('is rendered as true', () => {
        const component = render(<EuiPageHeader restrictWidth={true} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
