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

import { EuiTreeView } from './tree_view';

const items = [
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
        icon: <EuiIcon type="arrowRight" />,
        iconWhenExpanded: <EuiIcon type="arrowDown" />,
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
        icon: <EuiIcon type="arrowRight" />,
        iconWhenExpanded: <EuiIcon type="arrowDown" />,
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
  shouldRenderCustomStyles(<EuiTreeView items={items} />);

  test('is rendered', () => {
    const { container } = render(
      <EuiTreeView items={items} {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });

  test('item expansion', () => {
    const { container, getByText } = render(
      <EuiTreeView items={items} aria-label="Tree" />
    );
    const getExpandedItems = () =>
      container.querySelectorAll('[aria-expanded="true"]');
    expect(getExpandedItems()).toHaveLength(1);

    fireEvent.click(getByText('Item B'));
    expect(getExpandedItems()).toHaveLength(2);
  });

  test('active item', () => {
    const { container, getByText } = render(
      <EuiTreeView items={items} aria-label="Tree" />
    );
    const getActiveItem = () =>
      container.querySelector('.euiTreeView__node--active');
    expect(getActiveItem()).not.toBeInTheDocument();

    fireEvent.click(getByText('Item Two')!);
    expect(getActiveItem()).toBeInTheDocument();
  });

  test('open node changes', () => {
    const { queryByText, getByText } = render(
      <EuiTreeView items={items} aria-label="Tree" />
    );
    expect(queryByText('Item C')).toBeInTheDocument();
    expect(queryByText('Another Bug')).not.toBeInTheDocument();

    fireEvent.click(getByText('Item C'));
    expect(queryByText('Another Bug')).toBeInTheDocument();

    fireEvent.click(getByText('Item One'));
    expect(queryByText('Item C')).not.toBeInTheDocument();
    expect(queryByText('Another Bug')).not.toBeInTheDocument();
  });
});
