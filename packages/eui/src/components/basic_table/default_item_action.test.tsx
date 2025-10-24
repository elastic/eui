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

  it('is described by the tooltip via aria-describedby', async () => {
    const actionWithDifferentNameAndDescription: EmptyButtonAction<Item> = {
      name: 'same',
      description: 'different',
      'data-test-subj': 'different',
      type: 'button',
      onClick: () => {},
    };
    const { getByTestSubject, getByRole } = render(
      <DefaultItemAction
        action={actionWithDifferentNameAndDescription}
        enabled={true}
        item={{ id: 'differentId' }}
      />
    );

    const action = getByTestSubject('different');
    fireEvent.mouseOver(action);
    await waitForEuiToolTipVisible();
    const tooltip = getByRole('tooltip');
    expect(tooltip).toHaveTextContent('different');
    expect(tooltip).toBeInTheDocument();
    expect(action).toHaveAttribute('aria-describedby');
    expect(action.getAttribute('aria-describedby')).toEqual(tooltip.id);
  });

  // If `name` and `description` are exactly the same
  // we don't want screen readers announcing the same text twice
  it('has visual-only tooltip when `name` equals `description`', async () => {
    const actionWithEqualNameAndDescription: EmptyButtonAction<Item> = {
      name: 'same',
      description: 'same',
      'data-test-subj': 'same',
      type: 'button',
      onClick: () => {},
    };
    const { getByTestSubject, getByRole } = render(
      <DefaultItemAction
        action={actionWithEqualNameAndDescription}
        enabled={true}
        item={{ id: 'sameId' }}
      />
    );

    const action = getByTestSubject('same');
    fireEvent.mouseOver(action);
    await waitForEuiToolTipVisible();
    const tooltip = getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('same');
    expect(action).not.toHaveAttribute('aria-describedby');
  });

  it('passes back the original click event as well as the row item to onClick', () => {
    const onClick = jest.fn((item, event) => {
      event.preventDefault();
    });

    const action: EmptyButtonAction<Item> = {
      name: 'onClick',
      description: 'test',
      onClick,
      'data-test-subj': 'onClick',
    };
    const props = {
      action,
      enabled: true,
      item: { id: 'xyz' },
    };

    const { getByTestSubject } = render(<DefaultItemAction {...props} />);

    fireEvent.click(getByTestSubject('onClick'));
    expect(onClick).toHaveBeenCalledWith(
      props.item,
      expect.objectContaining({ preventDefault: expect.any(Function) })
    );
  });
});
