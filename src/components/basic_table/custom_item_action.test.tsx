import React from 'react';
import { shallow } from 'enzyme';
import { CustomItemAction } from './custom_item_action';

describe('CustomItemAction', () => {
  test('render', () => {
    const props = {
      action: {
        render: () => 'test',
      },
      enabled: true,
      item: { id: 'xyz' },
      className: 'test',
    };

    const component = shallow(<CustomItemAction {...props} />);

    expect(component).toMatchSnapshot();
  });
});
