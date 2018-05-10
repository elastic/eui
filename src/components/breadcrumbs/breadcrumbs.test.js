import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiBreadcrumbs } from './breadcrumbs';

describe('EuiBreadcrumbs', () => {
  test('is rendered', () => {
    const breadcrumbs = [{
      text: 'Animals',
      href: '#',
      onClick: (e) => { e.preventDefault(); console.log('You clicked Animals'); },
      'data-test-subj': 'breadcrumbsAnimals',
      className: 'customClass',
    }, {
      text: 'Reptiles',
      onClick: (e) => { e.preventDefault(); console.log('You clicked Reptiles'); },
    }, {
      text: 'Boa constrictor',
      href: '#',
    }, {
      text: 'Edit',
    }];

    const component = render(
      <EuiBreadcrumbs {...requiredProps} breadcrumbs={breadcrumbs} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    const breadcrumbs = [{
      text: 'Animals',
    }, {
      text: 'Edit',
    }];

    describe('responsive', () => {
      test('is rendered', () => {
        const component = render(<EuiBreadcrumbs breadcrumbs={breadcrumbs} responsive />);
        expect(component).toMatchSnapshot();
      });
    });
  });
});
