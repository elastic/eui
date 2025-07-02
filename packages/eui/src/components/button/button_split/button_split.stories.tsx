/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EuiButtonSplit, EuiButtonSplitProps } from './button_split';
import { EuiListGroup } from '../../list_group';

const meta: Meta<EuiButtonSplitProps> = {
  title: 'Navigation/EuiButtonSplit',
  component: EuiButtonSplit,
  args: {
    color: 'text',
    fill: false,
    size: 's',
    isDisabled: false,
    buttonProps: {
      children: 'Add panel',
      onClick: () => alert('Main button clicked!'),
    },
    iconButtonProps: {
      iconType: 'arrowDown',
      'aria-label': 'More actions',
    },
    popoverMenu: (closePopover) => (
      <EuiListGroup
        style={{ minWidth: 120 }}
        listItems={[
          {
            label: 'Open Lens',
            onClick: () => {
              alert('Open Lens clicked!');
              closePopover();
            },
            iconType: 'visualizeApp',
          },
          {
            label: 'Open Maps',
            onClick: () => {
              alert('Open Maps clicked!');
              closePopover();
            },
            iconType: 'gisApp',
          },
        ]}
        showToolTips={false}
      />
    ),
    // panelPaddingSize intentionally omitted to show default
  },
};

export default meta;
type Story = StoryObj<EuiButtonSplitProps>;

export const Playground: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
This split button demonstrates custom border radius and spacing:
- The right edge of the left button and the left edge of the right button have zero border radius, making them join seamlessly.
- There is a 1px space between the two buttons for visual clarity.

**panelPaddingSize** can be set to control the popover's padding. The default is 'm'. Example with custom padding:

\`\`\`tsx
<EuiButtonSplit
  color="primary"
  fill
  size="m"
  buttonProps={{ children: 'Custom padding' }}
  iconButtonProps={{ iconType: 'arrowDown', 'aria-label': 'More actions' }}
  popoverMenu={<EuiListGroup listItems={[{ label: 'Item' }]} />}
  panelPaddingSize="l"
/>
\`\`\`
        `,
      },
    },
  },
  render: (args) => (
    <div style={{ padding: 24 }}>
      <EuiButtonSplit {...args} />
    </div>
  ),
};
