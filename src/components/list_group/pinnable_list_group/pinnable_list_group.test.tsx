import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import {
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
} from './pinnable_list_group';

const someListItems: EuiPinnableListGroupItemProps[] = [
  {
    label: 'Label with iconType',
    iconType: 'stop',
  },
  {
    label: 'Custom extra action',
    extraAction: {
      iconType: 'bell',
      alwaysShow: true,
      'aria-label': 'bell',
    },
  },
  {
    label: 'Active link',
    isActive: true,
    href: '#',
  },
  {
    label: 'Button with onClick',
    pinned: true,
    onClick: e => {
      console.log('Visualize clicked', e);
    },
  },
  {
    label: 'Link with href',
    href: '#',
  },
];

describe('EuiPinnableListGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiPinnableListGroup
        {...requiredProps}
        listItems={someListItems}
        onPinClick={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
