import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiBreadcrumbs } from './breadcrumbs';
import { EuiPopover } from '../popover';

describe('EuiBreadcrumbs', () => {
  test('is rendered', () => {
    const breadcrumbs = [{
      text: <span>Animals</span>,
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
      text: 'Reptiles',
    }, {
      text: 'Boa constrictor',
    }, {
      text: 'Edit',
    }];

    describe('responsive', () => {
      test('is rendered', () => {
        const component = render(<EuiBreadcrumbs breadcrumbs={breadcrumbs} responsive />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('truncate', () => {
      test('is rendered', () => {
        const component = render(<EuiBreadcrumbs breadcrumbs={breadcrumbs} truncate />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('max', () => {
      test('renders 1 item', () => {
        const component = render(<EuiBreadcrumbs breadcrumbs={breadcrumbs} max={1} />);
        expect(component).toMatchSnapshot();
      });

      test('renders 2 items', () => {
        const component = render(<EuiBreadcrumbs breadcrumbs={breadcrumbs} max={2} />);
        expect(component).toMatchSnapshot();
      });

      test('renders 3 items', () => {
        const component = render(<EuiBreadcrumbs breadcrumbs={breadcrumbs} max={3} />);
        expect(component).toMatchSnapshot();
      });

      test(`doesn't break when max exceeds the number of breadcrumbs`, () => {
        const component = render(<EuiBreadcrumbs breadcrumbs={breadcrumbs} max={20} />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('mutiple popover', () => {
      const breadcrumbsWithDropdowns = [{
        text: 'Animals',
      }, {
        text: '',
        component: (
          <EuiPopover
            closePopover={() => {}}
            button={<button />}
            {...requiredProps}
          >
            Reptiles
          </EuiPopover>
        ),
      }, {
        text: 'Boa constrictor',
      }, {
        text: '',
        component: (
          <EuiPopover
            closePopover={() => {}}
            button={<button />}
            {...requiredProps}
          >
            Edit
          </EuiPopover>
        ),
      }];

      test('is rendered', () => {
        const component = render(<EuiBreadcrumbs breadcrumbs={breadcrumbsWithDropdowns} />);
        expect(component).toMatchSnapshot();
      });
    });
  });
});
