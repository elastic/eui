import React from 'react';
import { shallow } from 'enzyme';
import {
  ExpandedItemActions,
  ExpandedItemActionsProps,
} from './expanded_item_actions';

describe('ExpandedItemActions', () => {
  test('render', () => {
    const props: ExpandedItemActionsProps<{ id: string }> = {
      actions: [
        {
          name: 'default1',
          description: 'default 1',
          onClick: () => {},
        },
        {
          name: 'custom1',
          description: 'custom 1',
          render: _item => <></>,
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
