import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import {
  EuiCollapsibleNavList,
  EuiCollapsibleNavListItemProps,
} from './collapsible_nav_list';

const someListItems: EuiCollapsibleNavListItemProps[] = [
  {
    label: 'Label with iconType',
    iconType: 'stop',
  },
  {
    label: 'Custom extra action',
    extraAction: {
      iconType: 'bell',
      alwaysShow: true,
    },
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

describe('EuiCollapsibleNavList', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCollapsibleNavList listItems={someListItems} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders pinning options only if onPinClick is provided', () => {
    const component = render(
      <EuiCollapsibleNavList listItems={someListItems} onPinClick={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });
});
