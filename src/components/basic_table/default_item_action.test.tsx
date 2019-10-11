import React from 'react';
import { shallow } from 'enzyme';
import { DefaultItemAction } from './default_item_action';
import {
  DefaultItemEmptyButtonAction as EmptyButtonAction,
  DefaultItemIconButtonAction as IconButtonAction,
} from './action_types';

describe('DefaultItemAction', () => {
  test('render - default button', () => {
    const action: EmptyButtonAction = {
      name: 'action1',
      description: 'action 1',
      onClick: () => {},
    };
    const props = {
      action,
      enabled: true,
      item: { id: 'xyz' },
    };

    const component = shallow(<DefaultItemAction {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - button', () => {
    const action: EmptyButtonAction = {
      name: 'action1',
      description: 'action 1',
      type: 'button',
      onClick: () => {},
    };
    const props = {
      action,
      enabled: true,
      item: { id: 'xyz' },
    };

    const component = shallow(<DefaultItemAction {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - icon', () => {
    const action: IconButtonAction = {
      name: 'action1',
      description: 'action 1',
      type: 'icon',
      icon: 'trash',
      onClick: () => {},
    };
    const props = {
      action,
      enabled: true,
      item: { id: 'xyz' },
    };

    const component = shallow(<DefaultItemAction {...props} />);

    expect(component).toMatchSnapshot();
  });
});
