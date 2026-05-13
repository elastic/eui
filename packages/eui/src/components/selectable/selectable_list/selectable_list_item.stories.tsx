/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
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

type EuiSelectableListItemStoryProps = EuiSelectableListItemProps & {
  checkedSingle: 'on' | undefined;
};

/* Story HOC to pass the correct `checked` control value to the component, since we're
conditionally switching between `checked` and `checkedSingle` to advocate expected usage */
const StoryRender = ({
  checkedSingle,
  checked,
  singleSelection,
  ...args
}: EuiSelectableListItemStoryProps & {
  checkedSingle: any;
}) => {
  return (
    <EuiSelectableListItem
      {...(args as EuiSelectableListItemProps)}
      singleSelection={singleSelection}
      checked={singleSelection !== false ? checkedSingle : checked}
    />
  );
};

const meta: Meta<EuiSelectableListItemProps> = {
  title: 'Forms/EuiSelectable/Subcomponents/EuiSelectableListItem',
  component: EuiSelectableListItem,
  argTypes: {
    checked: {
      control: 'radio',
      options: [undefined, ...OPTION_CHECKED_STATES],
      if: { arg: 'singleSelection', truthy: false }, // show for multi selection only
    },
    // @ts-expect-error - custom variant of `checked` control that isn't a standalone prop
    checkedSingle: {
      name: 'checked',
      control: 'radio',
      options: ['on', undefined],
      if: { arg: 'singleSelection' }, // show for single selection only
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
    allowExclusions: {
      if: { arg: 'singleSelection', truthy: false }, // show for multi selection only
    },
  },
  args: {
    showIcons: true,
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
  render: (args) => (
    <StoryRender {...(args as EuiSelectableListItemStoryProps)} />
  ),
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
    // @ts-expect-error - custom storybook-only variant of `checked` control
    checkedSingle: 'on',
    prepend: <EuiIcon type="info" />,
    append: <EuiBadge color="hollow">Badge</EuiBadge>,
  },
  render: function Render(args) {
    const { checkedSingle, checked, ...rest } =
      args as EuiSelectableListItemStoryProps;

    return (
      <EuiFlexGroup direction="column" gutterSize="l">
        <div>
          <EuiCode>singleSelection=true/always</EuiCode>
        </div>
        <EuiSelectableListItem
          {...rest}
          checked={checkedSingle}
          singleSelection
        />
        <div>
          <EuiCode>singleSelection=false</EuiCode>
        </div>
        <EuiSelectableListItem
          {...rest}
          checked={checkedSingle}
          singleSelection={false}
        />
      </EuiFlexGroup>
    );
  },
};

export const Truncate: Story = {
  tags: ['vrt-only'],
  name: 'textWrap: truncate',
  args: {
    children: 'Selectable list item with long label that should be truncated',
    textWrap: 'truncate',
  },
  render: function Render(args: EuiSelectableListItemProps) {
    return (
      <div
        css={css`
          inline-size: 250px;
        `}
      >
        <EuiSelectableListItem {...args} />
      </div>
    );
  },
};

export const TextWrap: Story = {
  tags: ['vrt-only'],
  name: 'textWrap: wrap',
  args: {
    children: 'Selectable list item with long label that should be wrapped',
    textWrap: 'wrap',
  },
  render: function Render(args: EuiSelectableListItemProps) {
    return (
      <div
        css={css`
          inline-size: 250px;
        `}
      >
        <EuiSelectableListItem {...args} />
      </div>
    );
  },
};
