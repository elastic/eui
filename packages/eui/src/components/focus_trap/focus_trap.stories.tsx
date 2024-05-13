/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiButton } from '../button';
import { EuiFieldText } from '../form';
import { EuiSpacer } from '../spacer';
import { EuiPanel } from '../panel';
import { EuiProvider } from '../provider';
import { EuiFocusTrap, EuiFocusTrapProps } from './focus_trap';

const meta: Meta<EuiFocusTrapProps> = {
  title: 'Utilities/EuiFocusTrap',
  // @ts-ignore This still works for Storybook controls, even though Typescript complains
  component: EuiFocusTrap,
  argTypes: {
    returnFocus: { type: 'boolean' },
  },
  args: {
    // Component defaults
    clickOutsideDisables: false,
    closeOnMouseup: false,
    crossFrame: false,
    disabled: false,
    gapMode: 'padding',
    noIsolation: true,
    returnFocus: true,
    scrollLock: false,
  },
  parameters: {
    loki: {
      // There are no visual elements to test
      skip: true,
    },
  },
};
hideStorybookControls(meta, ['style']);

export default meta;
type Story = StoryObj<EuiFocusTrapProps>;

const StatefulFocusTrap = (props: Partial<EuiFocusTrapProps>) => {
  const [disabled, setDisabled] = useState(props.disabled);
  return (
    <>
      <EuiButton size="s" onClick={() => setDisabled(!disabled)}>
        Toggle focus trap
      </EuiButton>
      <EuiSpacer />
      <EuiPanel>
        <EuiFocusTrap
          {...props}
          disabled={disabled}
          onDeactivation={() => setDisabled(true)}
        >
          Focus trap is currently {disabled ? 'disabled' : 'enabled'}
          <EuiFieldText />
          <EuiButton size="s">Button inside focus trap</EuiButton>
        </EuiFocusTrap>
      </EuiPanel>
    </>
  );
};

export const Playground: Story = {
  render: ({ ...args }) => <StatefulFocusTrap {...args} />,
  args: {
    disabled: true,
  },
};

export const Iframe: Story = {
  render: ({ ...args }) => (
    <>
      <EuiFieldText placeholder="Focusable item outside iframe" />
      <EuiSpacer />
      <EuiPanel>
        Iframe content
        <iframe
          title="crossFrame test"
          src={`/iframe.html?id=euifocustrap--playground&crossFrame=${args.crossFrame}`}
          style={{ width: '100%', height: 200 }}
          sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-downloads allow-storage-access-by-user-activation"
        />
      </EuiPanel>
    </>
  ),
  args: { disabled: true, crossFrame: false },
};

export const EuiProviderComponentDefaults: Story = {
  render: ({ ...args }) => (
    <EuiProvider componentDefaults={{ EuiFocusTrap: { ...args } }}>
      <StatefulFocusTrap disabled={true} />
      <EuiSpacer />
      This story is passing all controls and their arguments to EuiProvider's
      `componentDefaults` instead of to EuiFocusTrap directly. It's primarily
      useful for testing that configured defaults behave the same way as
      individual props.
    </EuiProvider>
  ),
};
