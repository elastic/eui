/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { EuiFlexGroup } from '../flex';
import { EuiButton } from '../button';

import { EuiToolTip, EuiToolTipProps } from './tool_tip';

type Story = StoryObj<EuiToolTipProps>;

export const Playground: Story = {
  args: {
    // using autoFocus here as small trick to ensure showing the tooltip on load (e.g. for VRT)
    // TODO: uncomment loki play() interactions and remove autoFocus once #7747 is merged
    children: <EuiButton autoFocus>Tooltip trigger</EuiButton>,
    content: 'tooltip content',
  },
  render: (props) => <EuiToolTip {...props} />,
  // play: lokiPlayDecorator(async (context) => {
  //   const { bodyElement, step } = context;

  //   const canvas = within(bodyElement);

  //   await step('show tooltip on click', async () => {
  //     await userEvent.click(canvas.getByRole('button'));
  //     await waitFor(() => {
  //       expect(canvas.getByRole('tooltip')).toBeVisible();
  //     });
  //   });
  // }),
};

const meta: Meta<EuiToolTipProps> = {
  title: 'Display/EuiToolTip',
  component: EuiToolTip,
  parameters: {
    layout: 'fullscreen',
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=32039-390707&node-type=frame&m=dev',
      examples: [Playground],
      props: {
        content: figma.string('Description'),
        position: figma.enum('Direction', {
          '12:00 ↑': 'bottom',
          '11:00': 'bottom',
          '10:00': 'right',
          '8:00': 'right',
          '7:00': 'top',
          '6:00 ↓': 'top',
          '5:00': 'top',
          '4:00': 'left',
          '3:00 →': 'left',
          '2:00': 'left',
          '1::00': 'bottom',
          '9:00 ←': 'right',
        }),
        title: figma.boolean('Title', {
          true: figma.string('⮑ Title'),
          false: undefined,
        }),
      },
    },
  },
  decorators: [
    (Story, { args }) => (
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        css={{
          blockSize: '100vh',
        }}
      >
        <Story {...args} />
      </EuiFlexGroup>
    ),
  ],
  args: {
    position: 'top',
    delay: 'regular',
    display: 'inlineBlock',
    // set up for easier testing/QA
    anchorClassName: '',
    repositionOnScroll: false,
    title: '',
  },
};
enableFunctionToggleControls(meta, ['onMouseOut']);

export default meta;
