/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
          name: 'default1',
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
      item: { id: 'xyz' },
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
