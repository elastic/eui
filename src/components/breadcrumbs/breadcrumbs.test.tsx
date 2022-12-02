/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps, replaceEmotionPrefix } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

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
    text:
      'Nebulosa subspecies is also a real mouthful, especially for creatures without mouths',
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
    const component = render(
      <EuiBreadcrumbs {...requiredProps} breadcrumbs={breadcrumbs} />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with final item as link', () => {
    const customBreadcrumbs = [...breadcrumbs, { text: 'test', href: '#' }];
    const component = render(
      <EuiBreadcrumbs {...requiredProps} breadcrumbs={customBreadcrumbs} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('truncation', () => {
    test('setting truncate on breadcrumbs parents cascades down to all children', () => {
      const component = render(
        <EuiBreadcrumbs
          breadcrumbs={[{ text: 'A' }, { text: 'B' }]}
          truncate={false}
        />
      );
      expect(component).toMatchSnapshot();
    });

    const getBreadcrumbClass = (component: Cheerio, dataTestSubj: string) =>
      replaceEmotionPrefix(
        component.find(`[data-test-subj=${dataTestSubj}]`).attr('class')
      );

    test('child breadcrumbs can override truncate set on parent breadcrumbs', () => {
      const component = render(
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
      expect(getBreadcrumbClass(component, 'A')).toEqual(
        'emotion-euiBreadcrumb__content-page-euiTextColor-subdued'
      );
      expect(getBreadcrumbClass(component, 'C')).toEqual(
        'emotion-euiBreadcrumb__content-page-isTruncated-euiTextColor-subdued'
      );
    });

    describe('last breadcrumb', () => {
      describe('if the parent truncate is true and the last breadcrumb does not have its own truncate property', () => {
        it('sets a isTruncatedLast style that allows the last breadcrumb to occupy the remaining width of the breadcrumbs line', () => {
          const component = render(
            <EuiBreadcrumbs
              breadcrumbs={[
                { text: 'A' },
                { text: 'B', 'data-test-subj': 'last' },
              ]}
              truncate
            />
          );
          expect(getBreadcrumbClass(component, 'last')).toEqual(
            'emotion-euiBreadcrumb__content-page-isTruncatedLast-euiTextColor-default'
          );
        });
      });

      describe('if the last breadcrumb has its own truncate property', () => {
        it('uses the normal isTruncated if truncate is true', () => {
          const component = render(
            <EuiBreadcrumbs
              breadcrumbs={[
                { text: 'A' },
                { text: 'B', 'data-test-subj': 'last', truncate: true },
              ]}
              truncate
            />
          );
          expect(getBreadcrumbClass(component, 'last')).toEqual(
            'emotion-euiBreadcrumb__content-page-isTruncated-euiTextColor-default'
          );
        });

        it('does not set any truncation classes if truncate is false', () => {
          const component = render(
            <EuiBreadcrumbs
              breadcrumbs={[
                { text: 'A' },
                { text: 'B', 'data-test-subj': 'last', truncate: false },
              ]}
              truncate
            />
          );
          expect(getBreadcrumbClass(component, 'last')).toEqual(
            'emotion-euiBreadcrumb__content-page-euiTextColor-default'
          );
        });
      });
    });
  });

  describe('props', () => {
    describe('responsive', () => {
      test('is rendered', () => {
        const component = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} responsive />
        );
        expect(component).toMatchSnapshot();
      });

      test('is rendered as false', () => {
        const component = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} responsive={false} />
        );
        expect(component).toMatchSnapshot();
      });

      test('is rendered with custom breakpoints', () => {
        const component = render(
          <EuiBreadcrumbs
            breadcrumbs={breadcrumbs}
            responsive={{ xs: 1, s: 1, m: 1, l: 1, xl: 1 }}
          />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('max', () => {
      test('renders 1 item', () => {
        const component = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} max={1} />
        );
        expect(component).toMatchSnapshot();
      });

      test('renders all items with null', () => {
        const component = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} max={null} />
        );
        expect(component).toMatchSnapshot();
      });

      test("doesn't break when max exceeds the number of breadcrumbs", () => {
        const component = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} max={20} />
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
