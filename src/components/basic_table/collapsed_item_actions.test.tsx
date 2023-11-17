/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import {
  render,
  waitForEuiPopoverOpen,
  waitForEuiPopoverClose,
} from '../../test/rtl';

import { CollapsedItemActions } from './collapsed_item_actions';

type Item = { id: string };

describe('CollapsedItemActions', () => {
  it('renders', () => {
    const props = {
      actions: [
        {
          name: (item: Item) => `default${item.id}`,
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
      actionEnabled: () => true,
    };

    const { container } = render(<CollapsedItemActions {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('default actions', async () => {
    const props = {
      actions: [
        {
          name: 'default1',
          description: 'default 1',
          onClick: () => {},
          'data-test-subj': 'defaultAction',
        },
        {
          name: ({ id }: Item) => `name ${id}`,
          description: ({ id }: Item) => `description ${id}`,
          href: ({ id }: Item) => `#/${id}`,
          target: '_blank',
          'data-test-subj': ({ id }: Item) => `${id}-link`,
        },
      ],
      itemId: 'id',
      item: { id: 'xyz' },
      actionEnabled: () => true,
    };

    const { getByTestSubject, baseElement } = render(
      <CollapsedItemActions {...props} />
    );
    fireEvent.click(getByTestSubject('euiCollapsedItemActionsButton'));
    await waitForEuiPopoverOpen();

    expect(baseElement).toMatchSnapshot();

    expect(getByTestSubject('link-xyz')).toHaveAttribute('href', '#/xyz');
    expect(getByTestSubject('link-xyz')).toHaveTextContent('name xyz');

    fireEvent.click(getByTestSubject('defaultAction'));
    await waitForEuiPopoverClose();
  });

  test('custom actions', async () => {
    const props = {
      actions: [
        { render: () => <button data-test-subj="customAction">hello</button> },
        { render: () => <a href="#">world</a> },
      ],
      itemId: 'id',
      item: { id: 'xyz' },
      actionEnabled: () => true,
    };

    const { getByTestSubject, baseElement } = render(
      <CollapsedItemActions {...props} />
    );
    fireEvent.click(getByTestSubject('euiCollapsedItemActionsButton'));
    await waitForEuiPopoverOpen();

    expect(
      baseElement.querySelector('.euiBasicTable__collapsedCustomAction')
        ?.nodeName
    ).toEqual('DIV');
    expect(baseElement).toMatchSnapshot();

    fireEvent.click(getByTestSubject('customAction'));
    await waitForEuiPopoverClose();
  });
});
