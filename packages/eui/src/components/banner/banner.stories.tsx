/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { useEuiTheme } from '../../services/theme/hooks';
import { EuiBanner, EuiBannerProps } from './banner';

const title = 'Banner title';
const text =
  'Envision a realm where your dreams manifest like a breathtaking mural. Each stroke of the brush symbolizes a hope yearning to be fulfilled, creating a tapestry of aspirations that come to life.';

const actionProps = {
  primary: {
    children: 'Primary action',
    onClick: action('primary onClick'),
  },
  secondary: {
    children: 'Secondary action',
    onClick: action('secondary onClick'),
  },
};

const Illustration = ({ size }: { size: EuiBannerProps['size'] }) => {
  const { euiTheme } = useEuiTheme();
  const colors =
    `${euiTheme.colors.backgroundBaseDisabled}/${euiTheme.colors.textSubdued}`.replaceAll(
      '#',
      ''
    );

  return (
    <img
      src={
        size === 's'
          ? `https://placehold.co/32x32/${colors}`
          : `https://placehold.co/80x80/${colors}`
      }
      alt=""
      aria-hidden="true"
      css={{ border: euiTheme.border.thin }}
    />
  );
};

const buildBannerProps = (args: EuiBannerProps): EuiBannerProps => {
  const { onDismiss, size, ...rest } = args;
  return {
    ...rest,
    size,
    media: size === 's' ? <Illustration size="s" /> : <Illustration size="m" />,
    onDismiss: onDismiss ? action('onDismiss') : undefined,
  };
};

const meta: Meta<EuiBannerProps> = {
  title: 'Display/EuiBanner',
  component: EuiBanner,
  argTypes: {},
  args: {
    // Component defaults
    headingElement: 'h2',
    size: 'm',
    color: 'highlighted',
  },
  render: (args) => <EuiBanner {...buildBannerProps(args)} />,
};
enableFunctionToggleControls(meta, ['onDismiss']);

export default meta;
type Story = StoryObj<EuiBannerProps>;

export const Playground: Story = {
  args: {
    title,
    text,
  },
};

export const WithActions: Story = {
  args: {
    title,
    text,
    actionProps,
  },
};

export const FilledPrimaryAction: Story = {
  args: {
    title,
    text,
    actionProps: {
      primary: {
        children: 'Primary action',
        fill: true,
      },
    },
  },
};

const ContainerSizesRender = (args: EuiBannerProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {[360, 500, 1000, 1400].map((width) => (
      <div key={width}>
        <div style={{ fontSize: 12, marginBottom: 4 }}>{width}px</div>
        <div style={{ width }}>
          <EuiBanner {...buildBannerProps(args)} />
        </div>
      </div>
    ))}
  </div>
);

export const ContainerSizes: Story = {
  args: {
    title,
    text,
    actionProps,
  },
  render: (args) => <ContainerSizesRender {...args} />,
};
