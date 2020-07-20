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
