/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within, expect } from '@storybook/test';

import { VRT_SELECTORS, playDecorator } from '../../../.storybook/vrt';
import { EuiButton } from '../button';
import { EuiSpacer } from '../spacer';
import { EuiPortal, EuiPortalProps } from './portal';

const meta: Meta<EuiPortalProps> = {
  title: 'Utilities/EuiPortal',
  component: EuiPortal,
  parameters: {
    vrt: {
      // content rendered in portal
      selector: VRT_SELECTORS.portal,
    },
  },
  argTypes: {
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<EuiPortalProps>;

export const Playground: Story = {
  args: {
    children: 'This element is appended to the body in the DOM if you inspect',
  },
  render: (args) => <StatefulPlayground {...args} />,
  play: playDecorator(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Toggle portal' })
    );
    await waitFor(() =>
      expect(
        document.body.textContent?.includes(
          'This element is appended to the body'
        )
      ).toBe(true)
    );
  }),
};

const StatefulPlayground = (args: EuiPortalProps) => {
  const [isActive, setActive] = useState(false);

  return (
    <>
      <EuiButton onClick={() => setActive(!isActive)}>Toggle portal</EuiButton>
      {isActive && (
        <>
          <EuiSpacer />
          <EuiPortal {...args} />
        </>
      )}
    </>
  );
};
