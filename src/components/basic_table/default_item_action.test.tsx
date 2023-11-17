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
  waitForEuiToolTipVisible,
  waitForEuiToolTipHidden,
} from '../../test/rtl';

import { DefaultItemAction } from './default_item_action';
import {
  DefaultItemEmptyButtonAction as EmptyButtonAction,
  DefaultItemIconButtonAction as IconButtonAction,
} from './action_types';

interface Item {
  id: string;
}

describe('DefaultItemAction', () => {
  it('renders an EuiButtonEmpty when `type="button"', () => {
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

    const { container } = render(<DefaultItemAction {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders an EuiButtonIcon with screen reader text when `type="icon"`', () => {
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

    const { container } = render(<DefaultItemAction {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('renders an EuiButtonEmpty if no type is specified', () => {
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

    const { container } = render(<DefaultItemAction {...props} />);

    expect(container.querySelector('.euiButtonEmpty')).toBeInTheDocument();
  });

  test('props that can be functions', async () => {
    const action: EmptyButtonAction<Item> = {
      name: ({ id }) =>
        id === 'hello' ? <span>Hello</span> : <span>world</span>,
      description: ({ id }) =>
        id === 'hello' ? 'hello tooltip' : 'goodbye tooltip',
      href: ({ id }) => `#/${id}`,
      'data-test-subj': ({ id }) => `action-${id}`,
    };

    const { getByTestSubject, getByText } = render(
      <>
        <DefaultItemAction
          action={action}
          enabled={true}
          item={{ id: 'hello' }}
        />
        <DefaultItemAction
          action={action}
          enabled={true}
          item={{ id: 'world' }}
        />
      </>
    );

    const firstAction = getByTestSubject('action-hello');
    expect(firstAction).toHaveTextContent('Hello');
    expect(firstAction).toHaveAttribute('href', '#/hello');

    const secondAction = getByTestSubject('action-world');
    expect(secondAction).toHaveTextContent('world');
    expect(secondAction).toHaveAttribute('href', '#/world');

    fireEvent.mouseOver(firstAction);
    await waitForEuiToolTipVisible();
    expect(getByText('hello tooltip')).toBeInTheDocument();
    fireEvent.mouseOut(firstAction);
    await waitForEuiToolTipHidden();

    fireEvent.mouseOver(secondAction);
    await waitForEuiToolTipVisible();
    expect(getByText('goodbye tooltip')).toBeInTheDocument();
  });
});
