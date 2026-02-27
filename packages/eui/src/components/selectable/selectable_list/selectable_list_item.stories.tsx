/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiIcon } from '../../icon';
import { EuiBadge } from '../../badge';
import { EuiFlexGroup } from '../../flex';
import { EuiCode } from '../../code';
import { OPTION_CHECKED_STATES } from '../selectable_option';
import {
  EuiSelectableListItem,
  EuiSelectableListItemProps,
} from './selectable_list_item';

const meta: Meta<EuiSelectableListItemProps> = {
  title: 'Forms/EuiSelectable/Subcomponents/EuiSelectableListItem',
  component: EuiSelectableListItem,
  argTypes: {
    checked: {
      control: 'radio',
      options: [undefined, ...OPTION_CHECKED_STATES],
    },
    append: {
      control: 'boolean',
      description: 'Use the control to toggle showing an appended example',
      mapping: {
        true: <span>Append</span>,
        false: undefined,
      },
    },
    prepend: {
      control: 'boolean',
      description: 'Use the control to toggle showing an prepended example',
      mapping: {
        true: <span>Prepend</span>,
        false: undefined,
      },
    },
  },
  args: {
    showIcons: true,
    paddingSize: 's',
    onFocusBadge: false,
    textWrap: 'truncate',
    // set up for easier testing/QA
    allowExclusions: false,
    searchable: false,
    disabled: false,
    isFocused: false,
    append: false,
    prepend: false,
    singleSelection: true,
  },
};

export default meta;
type Story = StoryObj<EuiSelectableListItemProps>;

export const Playground: Story = {
  args: {
    children: 'Selectable list item',
  },
};

export const SingleSelection: Story = {
  name: 'singleSelection',
  parameters: {
    controls: {
      include: ['showIcons', 'checked', 'disabled', 'isFocused'],
    },
  },
  args: {
    children: 'Selectable list item',
    showIcons: true,
    checked: 'on',
    prepend: <EuiIcon type="info" />,
    append: <EuiBadge color="hollow">Badge</EuiBadge>,
  },
  render: function Render(args: EuiSelectableListItemProps) {
    return (
      <EuiFlexGroup direction="column" gutterSize="l">
        <div>
          <EuiCode>singleSelection=true/always</EuiCode>
        </div>
        <EuiSelectableListItem {...args} singleSelection />
        <div>
          <EuiCode>singleSelection=false</EuiCode>
        </div>
        <EuiSelectableListItem {...args} singleSelection={false} />
      </EuiFlexGroup>
    );
  },
};
