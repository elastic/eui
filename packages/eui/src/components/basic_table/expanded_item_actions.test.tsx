/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';

import {
  ExpandedItemActions,
  ExpandedItemActionsProps,
} from './expanded_item_actions';

describe('ExpandedItemActions', () => {
  it('renders', () => {
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
        {
          name: 'showOnHover',
          description: 'show on hover',
          href: '#',
          showOnHover: true,
        },
      ],
      itemId: 'xyz',
      item: { id: 'xyz' },
      actionsDisabled: false,
    };
    const { container } = render(<ExpandedItemActions {...props} />);

    expect(container).toMatchSnapshot();
  });
});
