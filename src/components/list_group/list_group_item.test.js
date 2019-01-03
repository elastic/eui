import React from 'react';
import { render } from 'enzyme';

import {
  EuiListGroupItem,
} from './list_group_item';

describe('EuiListGroupItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiListGroupItem label="Label" />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('renders href', () => {
    const component = render(
      <EuiListGroupItem label="Label" href="#" />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
