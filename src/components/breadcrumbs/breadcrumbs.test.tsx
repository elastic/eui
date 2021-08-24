/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiBreadcrumbs } from './breadcrumbs';

const breadcrumbs = [
  {
    text: 'Animals',
    href: '#',
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      console.log('You clicked Animals');
    },
    'data-test-subj': 'breadcrumbsAnimals',
    className: 'customClass',
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
    href: '#',
    truncate: true,
  },
  {
    text: 'Edit',
  },
];

describe('EuiBreadcrumbs', () => {
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

    describe('truncate as false', () => {
      test('is rendered', () => {
        const component = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} truncate={false} />
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
