import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiHeaderBreadcrumbs } from './header_breadcrumbs';

describe('EuiHeaderBreadcrumbs', () => {
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
      },
      {
        text: 'Edit',
      },
    ];

    const component = render(
      <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
