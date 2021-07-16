/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FocusEvent } from 'react';
import { render, shallow } from 'enzyme';
import { CollapsedItemActions } from './collapsed_item_actions';
import { Action } from './action_types';

describe('CollapsedItemActions', () => {
  test('render', () => {
    const props = {
      actions: [
        {
          name: (item: { id: string }) => `default${item.id}`,
          description: 'default 1',
          onClick: () => {},
        },
        {
          name: 'custom1',
          description: 'custom 1',
          render: () => <div />,
        },
      ],
      itemId: 'id',
      item: { id: '1' },
      actionEnabled: (_: Action<{ id: string }>) => true,
      onFocus: (_: FocusEvent) => {},
      onBlur: () => {},
    };

    const component = render(<CollapsedItemActions {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render with href and _target provided', () => {
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
          render: () => <div />,
        },
        {
          name: 'default2',
          description: 'default 2',
          href: 'https://www.elastic.co/',
          target: '_blank',
        },
      ],
      itemId: 'id',
      item: { id: 'xyz' },
      actionEnabled: (_: Action<{ id: string }>) => true,
      onFocus: (_: FocusEvent) => {},
      onBlur: () => {},
    };

    const component = shallow(<CollapsedItemActions {...props} />);
    component.setState({ popoverOpen: true });

    expect(component).toMatchSnapshot();
  });
});
