import React from 'react';
import { shallow } from 'enzyme';
import { CustomItemAction } from './custom_item_action';

describe('CustomItemAction', () => {
  test('render', () => {
    const props = {
      action: {
        name: 'custom1',
        description: 'custom 1',
        render: () => 'test',
      },
      enabled: true,
      item: { id: 'xyz' },
    };

    const component = shallow(<CustomItemAction {...props} />);

    expect(component).toMatchSnapshot();
  });
});
