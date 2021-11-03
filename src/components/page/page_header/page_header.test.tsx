/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
            pageTitleProps={requiredProps}
            iconType="logoKibana"
            iconProps={requiredProps}
            tabs={tabs}
            tabsProps={requiredProps}
            description="Description"
            rightSideItems={rightSideItems}
            rightSideGroupProps={{ responsive: true, ...requiredProps }}
          >
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
