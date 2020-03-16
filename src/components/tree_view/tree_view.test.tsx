import React from 'react';
import { EuiIcon } from '../icon';
import { EuiToken } from '../token';
import { render, shallow } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTreeView } from './tree_view';

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => () => 'htmlId',
}));

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
  test('is rendered', () => {
    const component = render(<EuiTreeView items={items} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('length of open items', () => {
    const component = shallow(<EuiTreeView items={items} {...requiredProps} />);
    const instance = component.instance() as EuiTreeView;

    expect(component.state('openItems')).toHaveLength(1);

    instance.handleNodeClick(items[1]);
    expect(component.state('openItems')).toHaveLength(2);
  });

  test('activeItem changes', () => {
    const component = shallow(<EuiTreeView items={items} {...requiredProps} />);
    const instance = component.instance() as EuiTreeView;

    expect(component.state('activeItem')).toBe('');

    instance.handleNodeClick(items[1]);
    expect(component.state('activeItem')).toBe('item_two');
  });

  test('open node changes', () => {
    const component = shallow(<EuiTreeView items={items} {...requiredProps} />);
    const instance = component.instance() as EuiTreeView;

    expect(instance.isNodeOpen(items[1])).toBe(false);

    instance.handleNodeClick(items[1]);
    expect(instance.isNodeOpen(items[1])).toBe(true);

    expect(instance.isNodeOpen(items[0])).toBe(true);

    instance.handleNodeClick(items[0]);
    expect(instance.isNodeOpen(items[0])).toBe(false);
  });
});
