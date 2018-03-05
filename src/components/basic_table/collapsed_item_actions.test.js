import React from 'react';
import { shallow } from 'enzyme';
import { CollapsedItemActions } from './collapsed_item_actions';

describe('CollapsedItemActions', () => {

  test('render', () => {

    const props = {
      actions: [
        {
          name: 'default1',
          description: 'default 1',
          onClick: () => {
          }
        },
        {
          name: 'custom1',
          description: 'custom 1',
          render: () => {
          }
        }
      ],
      visible: true,
      itemId: 'id',
      item: { id: 'xyz' },
      actionEnabled: () => true,
      onFocus: () => {}
    };

    const component = shallow(
      <CollapsedItemActions {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
