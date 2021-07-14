/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { DefaultItemAction } from './default_item_action';
import {
  DefaultItemEmptyButtonAction as EmptyButtonAction,
  DefaultItemIconButtonAction as IconButtonAction,
} from './action_types';

interface Item {
  id: string;
}

describe('DefaultItemAction', () => {
  test('render - default button', () => {
    const action: EmptyButtonAction<Item> = {
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
    const action: EmptyButtonAction<Item> = {
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

  test('render - name', () => {
    const action: EmptyButtonAction<Item> = {
      name: (item) => <span>{item.id}</span>,
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
    const action: IconButtonAction<Item> = {
      name: <span>action1</span>,
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
