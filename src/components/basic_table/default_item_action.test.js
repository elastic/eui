import React from 'react';
import { shallow } from 'enzyme';
import { DefaultItemAction } from './default_item_action';
import { Random } from '../../services/random';

const random = new Random();

describe('DefaultItemAction', () => {
  test('render - button', () => {
    const props = {
      action: {
        name: 'action1',
        description: 'action 1',
        type: random.oneOf([undefined, 'button', 'foobar']),
        onClick: () => {},
      },
      enabled: true,
      item: { id: 'xyz' },
    };

    const component = shallow(<DefaultItemAction {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - icon', () => {
    const props = {
      action: {
        name: 'action1',
        description: 'action 1',
        type: 'icon',
        icon: 'trash',
        onClick: () => {},
      },
      enabled: true,
      item: { id: 'xyz' },
    };

    const component = shallow(<DefaultItemAction {...props} />);

    expect(component).toMatchSnapshot();
  });
});
