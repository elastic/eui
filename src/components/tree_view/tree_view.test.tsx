import React from 'react';
import { EuiIcon } from '../icon';
import { EuiToken } from '../token';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTreeView } from './tree_view';

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => () => 'htmlId',
}));

describe('EuiTreeView', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTreeView
        items={[
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
        ]}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
