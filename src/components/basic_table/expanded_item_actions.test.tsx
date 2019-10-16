import React from 'react';
import { shallow } from 'enzyme';
import { ExpandedItemActions, Props } from './expanded_item_actions';

describe('ExpandedItemActions', () => {
  test('render', () => {
    const props: Props<{ id: string }> = {
      actions: [
        {
          name: 'default1',
          description: 'default 1',
          onClick: () => {},
        },
        {
          name: 'custom1',
          description: 'custom 1',
          render: () => {},
        },
      ],
      itemId: 'xyz',
      item: { id: 'xyz' },
      actionEnabled: () => true,
    };

    const component = shallow(<ExpandedItemActions {...props} />);

    expect(component).toMatchSnapshot();
  });
});
