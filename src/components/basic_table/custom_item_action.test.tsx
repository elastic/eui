import React from 'react';
import { shallow } from 'enzyme';
import { CustomItemAction, CustomItemActionProps } from './custom_item_action';

describe('CustomItemAction', () => {
  test('render', () => {
    const props: CustomItemActionProps<{ id: string }> = {
      action: {
        render: () => <span>test</span>,
      },
      enabled: true,
      item: { id: 'xyz' },
      className: 'test',
    };

    const component = shallow(<CustomItemAction {...props} />);

    expect(component).toMatchSnapshot();
  });
});
