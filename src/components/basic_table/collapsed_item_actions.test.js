import React from 'react';
import { render } from 'enzyme';
import { CollapsedItemActions } from './collapsed_item_actions';

describe('CollapsedItemActions', () => {
  test('render', () => {
    const props = {
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
      itemId: 'id',
      item: { id: 'xyz' },
      actionEnabled: () => true,
      onFocus: () => {},
    };

    const component = render(<CollapsedItemActions {...props} />);

    expect(component).toMatchSnapshot();
  });
});
