/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { CustomItemAction, CustomItemActionProps } from './custom_item_action';

describe('CustomItemAction', () => {
  test('render', () => {
    const props: CustomItemActionProps<{ id: string }> = {
      action: {
        render: () => <span>test</span>,
      },
      enabled: true,
      item: { id: 'xyz' },
      className: 'test',
    };

    const component = shallow(<CustomItemAction {...props} />);

    expect(component).toMatchSnapshot();
  });
});
