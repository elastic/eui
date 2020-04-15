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

import React from 'react';
import { render } from 'enzyme';

import { EuiNavDrawer } from './nav_drawer';
import { EuiNavDrawerGroup, FlyoutMenuItem } from './nav_drawer_group';
import { EuiListGroupItemProps } from '../list_group';

const extraAction: EuiListGroupItemProps['extraAction'] = {
  color: 'subdued',
  iconType: 'pin',
  iconSize: 's',
};

const topLinks: FlyoutMenuItem[] = [
  {
    label: 'Recently viewed',
    iconType: 'clock',
    flyoutMenu: {
      title: 'Recent items',
      listItems: [
        {
          label: 'My dashboard',
          href: '#',
          iconType: 'dashboardApp',
          extraAction,
        },
        {
          label: 'Workpad with title that wraps',
          href: '#',
          iconType: 'canvasApp',
          extraAction,
        },
        {
          label: 'My logs',
          href: '#',
          iconType: 'logsApp',
          'aria-label': 'This is an alternate aria-label',
          extraAction,
        },
      ],
    },
  },
  {
    label: 'Favorites',
    iconType: 'starEmpty',
    flyoutMenu: {
      title: 'Favorite items',
      listItems: [
        {
          label: 'My workpad',
          href: '#',
          iconType: 'canvasApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starFilled',
            iconSize: 's',
            'aria-label': 'Remove from favorites',
            alwaysShow: true,
          },
        },
        {
          label: 'My logs',
          href: '#',
          iconType: 'logsApp',
          extraAction: {
            color: 'subdued',
            iconType: 'starFilled',
            iconSize: 's',
            'aria-label': 'Remove from favorites',
            alwaysShow: true,
          },
        },
      ],
    },
  },
];

const exploreLinks: FlyoutMenuItem[] = [
  {
    label: 'Canvas',
    href: '#',
    iconType: 'canvasApp',
    isActive: true,
    extraAction,
  },
  {
    label: 'Discover',
    href: '#',
    iconType: 'discoverApp',
    extraAction,
  },
  {
    label: 'Visualize',
    href: '#',
    iconType: 'visualizeApp',
    extraAction,
  },
  {
    label: 'Dashboard',
    href: '#',
    iconType: 'dashboardApp',
    extraAction,
  },
  {
    label: 'Machine learning',
    href: '#',
    iconType: 'machineLearningApp',
    extraAction,
  },
  {
    label: 'Custom Plugin (no icon)',
    href: '#',
    extraAction,
  },
];

describe('EuiNavDrawer', () => {
  test('is rendered', () => {
    const component = render(
      <EuiNavDrawer>
        <EuiNavDrawerGroup listItems={topLinks} />
        <EuiNavDrawerGroup listItems={exploreLinks} />
      </EuiNavDrawer>
    );

    expect(component).toMatchSnapshot();
  });

  describe('renders', () => {
    test('with fragments', () => {
      const component = render(
        <EuiNavDrawer>
          <>
            <EuiNavDrawerGroup listItems={topLinks} />
            <EuiNavDrawerGroup listItems={exploreLinks} />
          </>
        </EuiNavDrawer>
      );

      expect(component).toMatchSnapshot();
    });

    test('with falsy children', () => {
      const component = render(
        <EuiNavDrawer>
          {false && <EuiNavDrawerGroup listItems={topLinks} />}
          {true ? undefined : <EuiNavDrawerGroup listItems={topLinks} />}
          <EuiNavDrawerGroup listItems={exploreLinks} />
        </EuiNavDrawer>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
