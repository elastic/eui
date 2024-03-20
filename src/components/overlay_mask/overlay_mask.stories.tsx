/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { disableStorybookControls } from '../../../.storybook/utils';
import { EuiButton } from '../button';
import { EuiHeader } from '../header';
import { EuiSpacer } from '../spacer';
import { EuiOverlayMask, EuiOverlayMaskProps } from './overlay_mask';

const meta: Meta<EuiOverlayMaskProps> = {
  title: 'Utilities/EuiOverlayMask',
  component: EuiOverlayMask,
  argTypes: disableStorybookControls(['maskRef']),
  // Component defaults
  args: {
    headerZindexLocation: 'above',
  },
};

export default meta;
type Story = StoryObj<EuiOverlayMaskProps>;

const StatefulPlayground = (props: EuiOverlayMaskProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <EuiHeader position="fixed" />
      <EuiSpacer size="xxl" />
      <EuiButton size="s" onClick={() => setIsOpen(!isOpen)}>
        Toggle Overlay
      </EuiButton>
      {isOpen && (
        <EuiOverlayMask {...props}>
          {props.children ?? (
            <EuiButton onClick={() => setIsOpen(false)}>
              Close Overlay
            </EuiButton>
          )}
        </EuiOverlayMask>
      )}
    </div>
  );
};

export const Playground: Story = {
  render: (args) => <StatefulPlayground {...args} />,
};
