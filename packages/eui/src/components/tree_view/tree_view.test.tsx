/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { userEvent } from '@testing-library/user-event';
import { act } from '@testing-library/react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';

import { EuiIcon } from '../icon';
import { EuiToken } from '../token';

import { EuiTreeView, type Node } from './tree_view';

const click = (element: Element) =>
  act(async () => {
    await userEvent.click(element);
  });

const pressKey = (key: string) =>
  act(async () => {
    await userEvent.keyboard(key);
  });

// EuiTreeView mutates `isExpanded` on the passed nodes, so each test gets a fresh copy
const getItems = (): Node[] => [
  {
    label: 'Item One',
    id: 'item_one',
    icon: <EuiIcon type="folder" aria-hidden={true} />,
    iconWhenExpanded: <EuiIcon type="folderOpen" aria-hidden={true} />,
    isExpanded: true,
    children: [
      {
        label: 'Item A',
        id: 'item_a',
        icon: <EuiIcon type="document" aria-hidden={true} />,
      },
      {
        label: 'Item B',
        id: 'item_b',
        icon: <EuiIcon type="chevronSingleRight" aria-hidden={true} />,
        iconWhenExpanded: (
          <EuiIcon type="chevronSingleDown" aria-hidden={true} />
        ),
        children: [
          {
            label: 'A Cloud',
            id: 'item_cloud',
            icon: <EuiToken iconType="tokenConstant" />,
          },
          {
            label: "I'm a Bug",
            id: 'item_bug',
            icon: <EuiToken iconType="tokenEnum" />,
            className: 'classForBug',
          },
        ],
      },
      {
        label: 'Item C',
        id: 'item_c',
        icon: <EuiIcon type="chevronSingleRight" aria-hidden={true} />,
        iconWhenExpanded: (
          <EuiIcon type="chevronSingleDown" aria-hidden={true} />
        ),
        children: [
          {
            label: 'Another Cloud',
            id: 'item_cloud2',
            icon: <EuiToken iconType="tokenConstant" />,
          },
          {
            label: 'Another Bug',
            id: 'item_bug2',
            icon: <EuiToken iconType="tokenEnum" />,
          },
        ],
      },
    ],
  },
  {
    label: 'Item Two',
    id: 'item_two',
  },
];

describe('EuiTreeView', () => {
  shouldRenderCustomStyles(<EuiTreeView items={getItems()} />);

  test('is rendered', () => {
    const { container } = render(
      <EuiTreeView items={getItems()} {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });

  test('forwards ref to the root list element', () => {
    const ref = React.createRef<HTMLUListElement>();
    const { container } = render(
      <EuiTreeView items={getItems()} aria-label="Tree" ref={ref} />
    );

    expect(ref.current).toBe(container.querySelector('ul.euiTreeView'));
  });

  test('item expansion', async () => {
    const { container, getByText } = render(
      <EuiTreeView items={getItems()} aria-label="Tree" />
    );
    const getExpandedItems = () =>
      container.querySelectorAll('[aria-expanded="true"]');
    expect(getExpandedItems()).toHaveLength(1);

    await click(getByText('Item B'));
    expect(getExpandedItems()).toHaveLength(2);
  });

  test('active item', async () => {
    const { container, getByText } = render(
      <EuiTreeView items={getItems()} aria-label="Tree" />
    );
    const getActiveItem = () =>
      container.querySelector('.euiTreeView__node--active');
    expect(getActiveItem()).not.toBeInTheDocument();

    await click(getByText('Item Two'));
    expect(getActiveItem()).toBeInTheDocument();
  });

  test('open node changes', async () => {
    const { queryByText, getByText } = render(
      <EuiTreeView items={getItems()} aria-label="Tree" />
    );
    expect(queryByText('Item C')).toBeInTheDocument();
    expect(queryByText('Another Bug')).not.toBeInTheDocument();

    await click(getByText('Item C'));
    expect(queryByText('Another Bug')).toBeInTheDocument();

    await click(getByText('Item One'));
    expect(queryByText('Item C')).not.toBeInTheDocument();
    expect(queryByText('Another Bug')).not.toBeInTheDocument();
  });

  describe('expandByDefault', () => {
    it('expands all nodes with children on initial render', () => {
      const { queryByText } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" expandByDefault />
      );

      expect(queryByText('A Cloud')).toBeInTheDocument();
      expect(queryByText('Another Bug')).toBeInTheDocument();
    });

    it('stops expanding newly rendered children after a node is toggled', async () => {
      const { queryByText, getByText } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" expandByDefault />
      );

      await click(getByText('Item One'));
      expect(queryByText('Item B')).not.toBeInTheDocument();

      await click(getByText('Item One'));
      expect(queryByText('Item B')).toBeInTheDocument();
      expect(queryByText('A Cloud')).not.toBeInTheDocument();
    });
  });

  test('isExpanded is respected for nested nodes', () => {
    const nestedItems = getItems();
    nestedItems[0].children![1].isExpanded = true;

    const { queryByText } = render(
      <EuiTreeView items={nestedItems} aria-label="Tree" />
    );

    expect(queryByText('A Cloud')).toBeInTheDocument();
    expect(queryByText('Another Bug')).not.toBeInTheDocument();
  });

  test('nested nodes keep their expanded state when their parent is collapsed and reopened', async () => {
    const { queryByText, getByText } = render(
      <EuiTreeView items={getItems()} aria-label="Tree" />
    );

    await click(getByText('Item B'));
    expect(queryByText('A Cloud')).toBeInTheDocument();

    await click(getByText('Item One'));
    expect(queryByText('A Cloud')).not.toBeInTheDocument();

    await click(getByText('Item One'));
    expect(queryByText('A Cloud')).toBeInTheDocument();
  });

  test('toggling a node mutates its isExpanded property', async () => {
    const mutableItems = getItems();
    const { getByText } = render(
      <EuiTreeView items={mutableItems} aria-label="Tree" />
    );

    await click(getByText('Item One'));
    expect(mutableItems[0].isExpanded).toEqual(false);

    await click(getByText('Item Two'));
    expect(mutableItems[1].isExpanded).toEqual(true);
  });

  describe('callback', () => {
    it('is called when a node is clicked', async () => {
      const callback = jest.fn();
      const callbackItems = getItems();
      callbackItems[1].callback = callback;

      const { getByText } = render(
        <EuiTreeView items={callbackItems} aria-label="Tree" />
      );

      await click(getByText('Item Two'));
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('is not called when a node is toggled with the keyboard arrows', async () => {
      const callback = jest.fn();
      const callbackItems = getItems();
      callbackItems[0].callback = callback;

      const { getByText } = render(
        <EuiTreeView items={callbackItems} aria-label="Tree" />
      );

      getByText('Item One').closest('button')!.focus();
      await pressKey('{ArrowLeft}');
      await pressKey('{ArrowRight}');
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('IDs and ARIA attributes', () => {
    it('uses the id prop for the tree and its nested trees', () => {
      const { container, getByText } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" id="customTree" />
      );

      const rootList = container.querySelector('ul.euiTreeView')!;
      expect(rootList).toHaveAttribute('id', 'customTree');
      expect(rootList).toHaveAttribute(
        'aria-describedby',
        'customTree--instruction'
      );
      expect(
        container.querySelector('#customTree--instruction')
      ).toHaveTextContent(
        'You can quickly navigate this list using arrow keys.'
      );
      expect(getByText('Item A').closest('button')).toHaveAttribute(
        'data-test-subj',
        'euiTreeViewButton-customTree'
      );
    });

    it('generates an id when none is passed', () => {
      const { container } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" />
      );

      const rootList = container.querySelector('ul.euiTreeView')!;
      expect(rootList.id).toMatch(/^euiTreeView/);
      expect(rootList).toHaveAttribute(
        'aria-describedby',
        `${rootList.id}--instruction`
      );
    });

    it('updates the tree id when the id prop changes', () => {
      const { container, rerender } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" id="firstId" />
      );

      rerender(
        <EuiTreeView items={getItems()} aria-label="Tree" id="secondId" />
      );
      expect(container.querySelector('ul.euiTreeView')).toHaveAttribute(
        'id',
        'secondId'
      );
    });

    it('renders the navigation instructions only for the root tree', () => {
      const { container } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" expandByDefault />
      );

      const lists = container.querySelectorAll('ul.euiTreeView');
      expect(lists.length).toBeGreaterThan(1);
      expect(container.querySelectorAll('[id$="--instruction"]')).toHaveLength(
        1
      );
      lists.forEach((list, index) => {
        if (index === 0) return;
        expect(list).not.toHaveAttribute('id');
        expect(list).not.toHaveAttribute('aria-describedby');
      });
    });

    it('sets aria-expanded and aria-controls only on nodes with children', () => {
      const { getByText, container } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" />
      );

      const parentButton = getByText('Item One').closest('button')!;
      expect(parentButton).toHaveAttribute('aria-expanded', 'true');
      const controlsId = parentButton.getAttribute('aria-controls')!;
      expect(container.querySelector(`#${controlsId}`)).toBeInTheDocument();

      const leafButton = getByText('Item Two').closest('button')!;
      expect(leafButton).not.toHaveAttribute('aria-expanded');
      expect(leafButton).not.toHaveAttribute('aria-controls');
    });
  });

  describe('keyboard navigation', () => {
    const getButton = (
      getByText: (text: string) => HTMLElement,
      text: string
    ) => getByText(text).closest('button')!;

    it('moves focus to the next and previous nodes with up and down arrows', async () => {
      const { getByText } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" />
      );

      getButton(getByText, 'Item One').focus();

      await pressKey('{ArrowDown}');
      expect(getButton(getByText, 'Item A')).toHaveFocus();

      await pressKey('{ArrowDown}');
      expect(getButton(getByText, 'Item B')).toHaveFocus();

      await pressKey('{ArrowUp}');
      expect(getButton(getByText, 'Item A')).toHaveFocus();
    });

    it('does not move focus past the first or last node', async () => {
      const { getByText } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" />
      );

      getButton(getByText, 'Item One').focus();
      await pressKey('{ArrowUp}');
      expect(getButton(getByText, 'Item One')).toHaveFocus();

      getButton(getByText, 'Item Two').focus();
      await pressKey('{ArrowDown}');
      expect(getButton(getByText, 'Item Two')).toHaveFocus();
    });

    it('expands a node with the right arrow and collapses it with the left arrow', async () => {
      const { getByText, queryByText } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" />
      );

      getButton(getByText, 'Item B').focus();

      await pressKey('{ArrowRight}');
      expect(queryByText('A Cloud')).toBeInTheDocument();

      await pressKey('{ArrowLeft}');
      expect(queryByText('A Cloud')).not.toBeInTheDocument();
    });

    it('moves focus to the parent node when pressing the left arrow on a child', async () => {
      const { getByText } = render(
        <EuiTreeView items={getItems()} aria-label="Tree" />
      );

      getButton(getByText, 'Item A').focus();
      await pressKey('{ArrowLeft}');

      expect(getButton(getByText, 'Item One')).toHaveFocus();
      expect(getByText('Item A')).toBeInTheDocument();
    });
  });
});
