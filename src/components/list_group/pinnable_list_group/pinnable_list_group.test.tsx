/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import {
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
} from './pinnable_list_group';

const someListItems: EuiPinnableListGroupItemProps[] = [
  {
    label: 'Label with iconType',
    iconType: 'stop',
  },
  {
    label: 'Custom extra action',
    extraAction: {
      iconType: 'bell',
      alwaysShow: true,
      'aria-label': 'bell',
    },
  },
  {
    label: 'Active link',
    isActive: true,
    href: '#',
  },
  {
    label: 'Button with onClick',
    pinned: true,
    onClick: (e) => {
      console.log('Visualize clicked', e);
    },
  },
  {
    label: 'Link with href',
    href: '#',
  },
  {
    label: 'Not pinnable',
    href: '#',
    pinnable: false,
  },
];

describe('EuiPinnableListGroup', () => {
  shouldRenderCustomStyles(
    <EuiPinnableListGroup
      {...requiredProps}
      listItems={someListItems}
      onPinClick={() => {}}
    />
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiPinnableListGroup
        {...requiredProps}
        listItems={someListItems}
        onPinClick={() => {}}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can have custom pin icon titles', () => {
    const { container } = render(
      <EuiPinnableListGroup
        {...requiredProps}
        listItems={someListItems}
        onPinClick={() => {}}
        pinTitle={(item: EuiPinnableListGroupItemProps) =>
          `Pin ${item.label} to the top`
        }
        unpinTitle={(item: EuiPinnableListGroupItemProps) =>
          `Unpin ${item.label} to the top`
        }
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
