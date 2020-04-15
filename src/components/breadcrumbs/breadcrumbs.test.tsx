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

describe('EuiBreadcrumbs', () => {
  test('is rendered', () => {
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

    const component = render(
      <EuiBreadcrumbs {...requiredProps} breadcrumbs={breadcrumbs} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    const breadcrumbs = [
      {
        text: 'Animals',
      },
      {
        text: 'Reptiles',
      },
      {
        text: 'Boa constrictor',
      },
      {
        text: 'Edit',
      },
    ];

    describe('responsive', () => {
      test('is rendered', () => {
        const component = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} responsive />
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

      test('renders 2 items', () => {
        const component = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} max={2} />
        );
        expect(component).toMatchSnapshot();
      });

      test('renders 3 items', () => {
        const component = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} max={3} />
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

    describe('render a popover', () => {
      test('is rendered', () => {
        const component = render(
          <EuiBreadcrumbs breadcrumbs={breadcrumbs} max={2} showMaxPopover />
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
