/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps, replaceEmotionPrefix } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiBreadcrumbs, EuiBreadcrumb } from './';

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
    text: 'Metazoans',
  },
  {
    text: 'Chordates',
  },
  {
    text: 'Nebulosa subspecies is also a real mouthful, especially for creatures without mouths',
    truncate: true,
  },
  {
    text: 'Tetrapods',
  },
  {
    text: 'Reptiles',
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      console.log('You clicked Reptiles');
    },
  },
  {
    text: 'Boa constrictor',
    title: 'Boa constrictor has an error',
    href: '#',
    truncate: true,
  },
  {
    text: 'Edit',
  },
];

describe('EuiBreadcrumbs', () => {
  shouldRenderCustomStyles(
    <EuiBreadcrumbs {...requiredProps} breadcrumbs={breadcrumbs} />
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiBreadcrumbs {...requiredProps} breadcrumbs={breadcrumbs} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with final item as link', () => {
    const customBreadcrumbs = [...breadcrumbs, { text: 'test', href: '#' }];
    const { container } = render(
      <EuiBreadcrumbs {...requiredProps} breadcrumbs={customBreadcrumbs} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('truncation', () => {
    test('setting truncate on breadcrumbs parents cascades down to all children', () => {
      const { container } = render(
        <EuiBreadcrumbs
          breadcrumbs={[{ text: 'A' }, { text: 'B' }]}
          truncate={false}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    const getBreadcrumbClass = (element: HTMLElement) =>
      replaceEmotionPrefix(element.className);

    test('child breadcrumbs can override truncate set on parent breadcrumbs', () => {
      const { getByTestSubject } = render(
        <>
          <EuiBreadcrumbs
            breadcrumbs={[
              { text: 'A', 'data-test-subj': 'A', truncate: false },
              { text: 'B', 'data-test-subj': 'B' },
            ]}
            truncate
          />
          <EuiBreadcrumbs
            breadcrumbs={[
              { text: 'C', 'data-test-subj': 'C', truncate: true },
              { text: 'D', 'data-test-subj': 'D' },
            ]}
            truncate={false}
          />
        </>
      );
      expect(getBreadcrumbClass(getByTestSubject('A'))).toEqual(
        'emotion-euiBreadcrumb__content-page-euiTextColor-subdued'
      );
      expect(getBreadcrumbClass(getByTestSubject('C'))).toEqual(
        'emotion-euiBreadcrumb__content-page-isTruncated-euiTextColor-subdued'
      );
    });

    describe('last breadcrumb', () => {
      describe('if the parent truncate is true and the last breadcrumb does not have its own truncate property', () => {
        it('sets a isTruncatedLast style that allows the last breadcrumb to occupy the remaining width of the breadcrumbs line', () => {
          const { getByTestSubject } = render(
            <EuiBreadcrumbs
              breadcrumbs={[
                { text: 'A' },
                { text: 'B', 'data-test-subj': 'last' },
              ]}
              truncate
            />
          );
          expect(getBreadcrumbClass(getByTestSubject('last'))).toEqual(
            'emotion-euiBreadcrumb__content-page-isTruncatedLast-euiTextColor-default'
          );
        });
      });

      describe('if the last breadcrumb has its own truncate property', () => {
        it('uses the normal isTruncated if truncate is true', () => {
          const { getByTestSubject } = render(
            <EuiBreadcrumbs
              breadcrumbs={[
                { text: 'A' },
                { text: 'B', 'data-test-subj': 'last', truncate: true },
              ]}
              truncate
            />
          );
          expect(getBreadcrumbClass(getByTestSubject('last'))).toEqual(
            'emotion-euiBreadcrumb__content-page-isTruncated-euiTextColor-default'
          );
        });

        it('does not set any truncation classes if truncate is false', () => {
          const { getByTestSubject } = render(
            <EuiBreadcrumbs
              breadcrumbs={[
                { text: 'A' },
                { text: 'B', 'data-test-subj': 'last', truncate: false },
              ]}
              truncate
            />
          );
          expect(getBreadcrumbClass(getByTestSubject('last'))).toEqual(
            'emotion-euiBreadcrumb__content-page-euiTextColor-default'
          );
        });
      });
    });
  });

  describe('props', () => {
    describe('responsive', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} responsive />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered as false', () => {
        const { container } = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} responsive={false} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered with custom breakpoints', () => {
        const { container } = render(
          <EuiBreadcrumbs
            breadcrumbs={breadcrumbs}
            responsive={{ xs: 1, s: 1, m: 1, l: 1, xl: 1 }}
          />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('max', () => {
      test('renders 1 item', () => {
        const { container } = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} max={1} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders all items with null', () => {
        const { container } = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} max={null} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      test("doesn't break when max exceeds the number of breadcrumbs", () => {
        const { container } = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} max={20} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
