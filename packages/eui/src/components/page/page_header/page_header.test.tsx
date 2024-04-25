/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiPageHeader, EuiPageHeaderProps } from './page_header';
import { ALIGN_ITEMS } from './page_header_content';
import { EuiBreadcrumb } from '../../breadcrumbs';

export const tabs: EuiPageHeaderProps['tabs'] = [
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
];

const breadcrumbs: EuiBreadcrumb[] = [
  {
    text: 'Animals',
    href: '#',
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      console.log('You clicked Animals');
    },
    'data-test-subj': 'breadcrumbsAnimals',
    className: 'customClass',
    color: 'primary',
  },
  {
    text: 'Edit',
  },
];

export const rightSideItems: EuiPageHeaderProps['rightSideItems'] = [
  <button>Button 1</button>,
  <button>Button 2</button>,
];

describe('EuiPageHeader', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiPageHeader {...requiredProps}>Anything</EuiPageHeader>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('page content props are passed down', () => {
      test('is rendered', () => {
        const { container } = render(
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
            breadcrumbs={breadcrumbs}
            breadcrumbProps={requiredProps}
          >
            <p>Anything</p>
          </EuiPageHeader>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach((alignment) => {
        it(`${alignment} is rendered`, () => {
          const { container } = render(
            <EuiPageHeader
              pageTitle="Page title"
              rightSideItems={rightSideItems}
              alignItems={alignment}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('responsive', () => {
      test('is rendered as false', () => {
        const { container } = render(<EuiPageHeader responsive={false} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered as reverse', () => {
        const { container } = render(<EuiPageHeader responsive={'reverse'} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('restrictWidth', () => {
      test('is rendered as true', () => {
        const { container } = render(<EuiPageHeader restrictWidth={true} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered as custom', () => {
        const { container } = render(<EuiPageHeader restrictWidth={100} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('bottomBorder', () => {
      test('is rendered as true', () => {
        const { container } = render(<EuiPageHeader bottomBorder={true} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered as extended', () => {
        const { container } = render(
          <EuiPageHeader bottomBorder={'extended'} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
