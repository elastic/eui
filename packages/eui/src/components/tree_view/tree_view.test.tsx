/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';

import { EuiIcon } from '../icon';
import { EuiToken } from '../token';

import { EuiTreeView, Node } from './tree_view';

const getItems = (): Node[] => [
  {
    label: 'Item One',
    id: 'item_one',
    icon: <EuiIcon type="folderClosed" />,
    iconWhenExpanded: <EuiIcon type="folderOpen" />,
    isExpanded: true,
    children: [
      {
        label: 'Item A',
        id: 'item_a',
        icon: <EuiIcon type="document" />,
      },
      {
        label: 'Item B',
        id: 'item_b',
        icon: <EuiIcon type="chevronSingleRight" />,
        iconWhenExpanded: <EuiIcon type="chevronSingleDown" />,
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
        icon: <EuiIcon type="chevronSingleRight" />,
        iconWhenExpanded: <EuiIcon type="chevronSingleDown" />,
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

const getCharacterizationItems = (): Node[] => [
  {
    label: 'Branch One',
    id: 'branch_one',
    children: [
      {
        label: 'Child Leaf',
        id: 'child_leaf',
      },
      {
        label: 'Child Branch',
        id: 'child_branch',
        children: [
          {
            label: 'Grandchild Leaf',
            id: 'grandchild_leaf',
          },
        ],
      },
    ],
  },
  {
    label: 'Branch Two',
    id: 'branch_two',
    children: [
      {
        label: 'Second Child',
        id: 'second_child',
      },
    ],
  },
  {
    label: 'Root Leaf',
    id: 'root_leaf',
  },
];

describe('EuiTreeView', () => {
  shouldRenderCustomStyles(
    <EuiTreeView items={getItems()} aria-label="Tree" />
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiTreeView items={getItems()} {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });

  test('forwards its ref to the root list', () => {
    const ref = React.createRef<HTMLUListElement>();
    const { container, unmount } = render(
      <EuiTreeView ref={ref} items={getItems()} aria-label="Tree" />
    );

    expect(ref.current).toBe(container.querySelector('ul'));

    unmount();
    expect(ref.current).toBeNull();
  });

  describe('uncontrolled expansion', () => {
    test('isExpanded seeds branch state only on initial mount', () => {
      const items = getCharacterizationItems();
      items[0].isExpanded = true;
      items[2].isExpanded = true;

      const { getByRole } = render(
        <EuiTreeView items={items} aria-label="Tree" />
      );

      expect(getByRole('button', { name: 'Branch One' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByRole('button', { name: 'Branch Two' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
      expect(getByRole('button', { name: 'Root Leaf' })).not.toHaveAttribute(
        'aria-expanded'
      );
    });

    test('isExpanded prop changes do not resynchronize open state', () => {
      const initialItems = getCharacterizationItems();
      initialItems[0].isExpanded = true;
      const { getByRole, rerender } = render(
        <EuiTreeView items={initialItems} aria-label="Tree" />
      );

      const updatedItems = getCharacterizationItems();
      updatedItems[0].isExpanded = false;
      updatedItems[1].isExpanded = true;
      rerender(<EuiTreeView items={updatedItems} aria-label="Tree" />);

      expect(getByRole('button', { name: 'Branch One' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByRole('button', { name: 'Branch Two' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    test('expandByDefault recursively expands every branch on initialization', () => {
      const { getByRole, getByText } = render(
        <EuiTreeView
          items={getCharacterizationItems()}
          expandByDefault
          aria-label="Tree"
        />
      );

      expect(getByRole('button', { name: 'Branch One' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByRole('button', { name: 'Child Branch' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByRole('button', { name: 'Branch Two' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByText('Grandchild Leaf')).toBeInTheDocument();
    });

    test('expandByDefault is not applied when enabled after mount', () => {
      const items = getCharacterizationItems();
      const { getByRole, queryByText, rerender } = render(
        <EuiTreeView items={items} aria-label="Tree" />
      );

      rerender(<EuiTreeView items={items} expandByDefault aria-label="Tree" />);

      expect(getByRole('button', { name: 'Branch One' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
      expect(queryByText('Child Leaf')).not.toBeInTheDocument();
    });

    test('rerenders do not reapply expandByDefault after a branch is closed', () => {
      const items = getCharacterizationItems();
      const { getByRole, queryByText, rerender } = render(
        <EuiTreeView items={items} expandByDefault aria-label="Tree" />
      );
      fireEvent.click(getByRole('button', { name: 'Branch One' }));

      rerender(
        <EuiTreeView
          items={items}
          expandByDefault
          aria-label="Updated tree label"
        />
      );

      expect(getByRole('button', { name: 'Branch One' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
      expect(queryByText('Child Leaf')).not.toBeInTheDocument();
    });

    test('multiple sibling branches remain open simultaneously', () => {
      const { getByRole, getByText } = render(
        <EuiTreeView items={getCharacterizationItems()} aria-label="Tree" />
      );

      fireEvent.click(getByRole('button', { name: 'Branch One' }));
      fireEvent.click(getByRole('button', { name: 'Branch Two' }));

      expect(getByText('Child Leaf')).toBeInTheDocument();
      expect(getByText('Second Child')).toBeInTheDocument();
    });

    test('reopening an ancestor restores descendant expansion from mutated nodes', () => {
      const items = getCharacterizationItems();
      items[0].isExpanded = true;
      const { getByRole, getByText, queryByText } = render(
        <EuiTreeView items={items} aria-label="Tree" />
      );

      fireEvent.click(getByRole('button', { name: 'Child Branch' }));
      expect(getByText('Grandchild Leaf')).toBeInTheDocument();

      fireEvent.click(getByRole('button', { name: 'Branch One' }));
      expect(queryByText('Child Branch')).not.toBeInTheDocument();
      expect(queryByText('Grandchild Leaf')).not.toBeInTheDocument();

      fireEvent.click(getByRole('button', { name: 'Branch One' }));
      expect(getByRole('button', { name: 'Child Branch' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(getByText('Grandchild Leaf')).toBeInTheDocument();
    });

    test('reopening an ancestor does not restore descendants expanded only by expandByDefault', () => {
      const { getByRole, queryByText } = render(
        <EuiTreeView
          items={getCharacterizationItems()}
          expandByDefault
          aria-label="Tree"
        />
      );
      expect(queryByText('Grandchild Leaf')).toBeInTheDocument();

      fireEvent.click(getByRole('button', { name: 'Branch One' }));
      fireEvent.click(getByRole('button', { name: 'Branch One' }));

      expect(getByRole('button', { name: 'Child Branch' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
      expect(queryByText('Grandchild Leaf')).not.toBeInTheDocument();
    });
  });

  describe('node mutation and callbacks', () => {
    test('mouse expansion and collapse mutate isExpanded and call back once', () => {
      const callback = jest.fn(() => 'called');
      const items = getCharacterizationItems();
      items[0].callback = callback;
      const { getByRole } = render(
        <EuiTreeView items={items} aria-label="Tree" />
      );
      const branch = getByRole('button', { name: 'Branch One' });

      fireEvent.click(branch);
      expect(items[0].isExpanded).toBe(true);
      expect(callback).toHaveBeenCalledTimes(1);

      fireEvent.click(branch);
      expect(items[0].isExpanded).toBe(false);
      expect(callback).toHaveBeenCalledTimes(2);
    });

    test('leaf clicks mutate state and call back without adding aria-expanded', () => {
      const callback = jest.fn(() => 'called');
      const items = getCharacterizationItems();
      items[2].callback = callback;
      const { getByRole } = render(
        <EuiTreeView items={items} aria-label="Tree" />
      );
      const leaf = getByRole('button', { name: 'Root Leaf' });

      fireEvent.click(leaf);

      expect(items[2].isExpanded).toBe(true);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(leaf).not.toHaveAttribute('aria-expanded');
      expect(leaf).toHaveClass('euiTreeView__node--active');

      fireEvent.click(leaf);
      expect(items[2].isExpanded).toBe(false);
      expect(callback).toHaveBeenCalledTimes(2);
      expect(leaf).not.toHaveAttribute('aria-expanded');
      expect(leaf).toHaveClass('euiTreeView__node--active');
    });
  });

  describe('active item', () => {
    test('active items are local to recursive tree levels', () => {
      const { getByRole } = render(
        <EuiTreeView items={getCharacterizationItems()} aria-label="Tree" />
      );
      const parent = getByRole('button', { name: 'Branch One' });
      fireEvent.click(parent);
      const child = getByRole('button', { name: 'Child Branch' });
      fireEvent.click(child);

      expect(parent).toHaveClass('euiTreeView__node--active');
      expect(child).toHaveClass('euiTreeView__node--active');
    });
  });

  describe('IDs and prop updates', () => {
    test('generated tree and control IDs remain stable across rerenders', () => {
      const items = getCharacterizationItems();
      const { container, getByRole, rerender } = render(
        <EuiTreeView items={items} aria-label="Tree" />
      );
      const initialTreeId = container.querySelector('ul')!.id;
      const initialControls = getByRole('button', {
        name: 'Branch One',
      }).getAttribute('aria-controls');

      rerender(<EuiTreeView items={items} aria-label="Updated tree" />);

      expect(container.querySelector('ul')).toHaveAttribute(
        'id',
        initialTreeId
      );
      expect(getByRole('button', { name: 'Branch One' })).toHaveAttribute(
        'aria-controls',
        initialControls
      );
      expect(document.getElementById(initialControls!)).toBeInTheDocument();
    });

    test('changing id updates the root and instruction IDs', () => {
      const items = getCharacterizationItems();
      const { container, getByText, rerender } = render(
        <EuiTreeView items={items} id="first-tree" aria-label="Tree" />
      );

      rerender(
        <EuiTreeView items={items} id="second-tree" aria-label="Tree" />
      );

      expect(container.querySelector('ul')).toHaveAttribute(
        'id',
        'second-tree'
      );
      expect(container.querySelector('ul')).toHaveAttribute(
        'aria-describedby',
        'second-tree--instruction'
      );
      expect(getByText(/quickly navigate/)).toHaveAttribute(
        'id',
        'second-tree--instruction'
      );
    });

    test('mounted nested levels retain the original shared navigation ID after root id changes', () => {
      const items = getCharacterizationItems();
      items[0].isExpanded = true;
      const { getByRole, rerender } = render(
        <EuiTreeView items={items} id="first-tree" aria-label="Tree" />
      );

      rerender(
        <EuiTreeView items={items} id="second-tree" aria-label="Tree" />
      );

      expect(getByRole('button', { name: 'Branch One' })).toHaveAttribute(
        'data-test-subj',
        'euiTreeViewButton-second-tree'
      );
      expect(getByRole('button', { name: 'Child Leaf' })).toHaveAttribute(
        'data-test-subj',
        'euiTreeViewButton-first-tree'
      );
    });
  });

  describe('DOM and accessibility semantics', () => {
    test('uses list markup, button controls, and root-only instructions', () => {
      const items = getCharacterizationItems();
      items[0].isExpanded = true;
      const { container, getAllByRole, getByRole, getByText } = render(
        <EuiTreeView items={items} id="tree" aria-label="Tree" />
      );

      const lists = getAllByRole('list');
      expect(lists).toHaveLength(2);
      expect(lists[0]).toHaveAttribute('id', 'tree');
      expect(lists[0]).toHaveAttribute('aria-describedby', 'tree--instruction');
      expect(lists[1]).not.toHaveAttribute('id');
      expect(lists[1]).not.toHaveAttribute('aria-describedby');
      expect(getAllByRole('listitem')).toHaveLength(5);
      expect(getAllByRole('button')).toHaveLength(5);
      expect(getByText(/quickly navigate/)).toHaveAttribute(
        'id',
        'tree--instruction'
      );
      expect(container.querySelectorAll('#tree--instruction')).toHaveLength(1);
      expect(container.querySelector('[role="tree"]')).not.toBeInTheDocument();
      expect(
        container.querySelector('[role="treeitem"]')
      ).not.toBeInTheDocument();
      expect(container.querySelector('[role="group"]')).not.toBeInTheDocument();

      const branch = getByRole('button', { name: 'Branch One' });
      const childWrapper = document.getElementById(
        branch.getAttribute('aria-controls')!
      );
      expect(branch).toHaveAttribute('aria-expanded', 'true');
      expect(childWrapper?.tagName).toBe('DIV');

      const controlIds = getAllByRole('button')
        .map((button) => button.getAttribute('aria-controls'))
        .filter((id): id is string => id !== null);
      expect(new Set(controlIds).size).toBe(controlIds.length);
      expect(controlIds).not.toContain('tree');
      expect(controlIds).not.toContain('tree--instruction');

      const leaf = getByRole('button', { name: 'Root Leaf' });
      expect(leaf).not.toHaveAttribute('aria-expanded');
      expect(leaf).not.toHaveAttribute('aria-controls');
      expect(leaf).not.toHaveAttribute('tabindex');
    });
  });
});
