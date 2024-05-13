/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import {
  ALIGN_ITEMS,
  EuiPageHeaderContent,
  EuiPageHeaderContentProps,
} from './page_header_content';
import { EuiBreadcrumb } from '../../breadcrumbs';

const tabs: EuiPageHeaderContentProps['tabs'] = [
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
];

const rightSideItems: EuiPageHeaderContentProps['rightSideItems'] = [
  <button>Button 1</button>,
  <button>Button 2</button>,
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

describe('EuiPageHeaderContent', () => {
  shouldRenderCustomStyles(
    <EuiPageHeaderContent
      pageTitle="Hello world"
      iconType="logoElastic"
      rightSideItems={[<button />]}
      breadcrumbs={[{ text: 'breadcrumb' }]}
      tabs={[{ label: 'tab' }]}
    />,
    {
      childProps: [
        'pageTitleProps',
        'iconProps',
        'rightSideGroupProps',
        'breadcrumbProps',
        'tabsProps',
      ],
    }
  );

  test('is rendered', () => {
    const { container } = render(<EuiPageHeaderContent {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('pageTitle', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiPageHeaderContent pageTitle="Page title" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered with pageTitleProps', () => {
        const { container } = render(
          <EuiPageHeaderContent
            pageTitle="Page title"
            pageTitleProps={requiredProps}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered with icon', () => {
        const { container } = render(
          <EuiPageHeaderContent pageTitle="Page title" iconType="logoKibana" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered with icon and iconProps', () => {
        const { container } = render(
          <EuiPageHeaderContent
            pageTitle="Page title"
            iconType="logoKibana"
            iconProps={requiredProps}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('tabs', () => {
      test('is rendered', () => {
        const { container } = render(<EuiPageHeaderContent tabs={tabs} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered with tabsProps', () => {
        const { container } = render(
          <EuiPageHeaderContent tabs={tabs} tabsProps={requiredProps} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('breadcrumbs', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiPageHeaderContent
            breadcrumbs={breadcrumbs}
            breadcrumbProps={requiredProps}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('children', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiPageHeaderContent>
            <p>Anything</p>
          </EuiPageHeaderContent>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('description', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiPageHeaderContent description="Description" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('rightSideItems', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiPageHeaderContent rightSideItems={rightSideItems} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered with rightSideGroupProps', () => {
        const { container } = render(
          <EuiPageHeaderContent
            rightSideItems={rightSideItems}
            rightSideGroupProps={{
              responsive: true,
              direction: 'column',
              ...requiredProps,
            }}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('children', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiPageHeaderContent>Child</EuiPageHeaderContent>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered even if content props are passed', () => {
        const { container } = render(
          <EuiPageHeaderContent
            pageTitle="Page title"
            tabs={tabs}
            rightSideItems={rightSideItems}
          >
            Child
          </EuiPageHeaderContent>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach((alignment) => {
        it(`${alignment} is rendered`, () => {
          const { container } = render(
            <EuiPageHeaderContent
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
        const { container } = render(
          <EuiPageHeaderContent responsive={false} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered as reverse', () => {
        const { container } = render(
          <EuiPageHeaderContent responsive={'reverse'} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
