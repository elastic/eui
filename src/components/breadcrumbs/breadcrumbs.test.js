import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiBreadcrumbs } from './breadcrumbs';

describe('EuiBreadcrumbs', () => {
  const breadcrumbs = [{
    text: 'Animals',
    href: '#',
    onClick: (e) => { e.preventDefault(); console.log('You clicked Animals'); },
    'data-test-subj': 'breadcrumbsAnimals',
    className: 'customClass',
  }, {
    text: 'Reptiles',
    href: '#',
    onClick: (e) => { e.preventDefault(); console.log('You clicked Reptiles'); },
  }, {
    text: 'Boa constrictor',
    href: '#',
    onClick: (e) => { e.preventDefault(); console.log('You clicked Boa constrictor'); },
  }, {
    text: 'Edit',
  }];

  test('is rendered', () => {
    const component = render(
      <EuiBreadcrumbs {...requiredProps} breadcrumbs={breadcrumbs} />
    );

    expect(component).toMatchSnapshot();
  });
});
