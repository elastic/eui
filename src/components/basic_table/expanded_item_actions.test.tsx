/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

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
          render: (_item) => <></>,
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
