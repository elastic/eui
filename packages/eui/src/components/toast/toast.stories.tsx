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
import { css } from '@emotion/react';

import {
  enableFunctionToggleControls,
  hideStorybookControls,
} from '../../../.storybook/utils';
import { EuiFlexGroup } from '../flex';
import { EuiSpacer } from '../spacer';
import { EuiToast, EuiToastProps } from './toast';
import { COLORS } from './types';
import { EuiButton } from '../button';

const title = "It's a toast!";
const text = 'A short toast text';
const textLong =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const meta: Meta<EuiToastProps> = {
  title: 'Display/EuiToast',
  component: EuiToast,
  argTypes: {
    children: {
      control: 'text',
      // @ts-ignore - overwritten to output proper type as inferred type is not correct
      type: 'ReactNode',
    },
    color: { control: 'select', options: [undefined, ...COLORS] },
    title: { control: 'text' },
    iconType: { control: 'text' },
  },
  args: {
    // set up for easier testing/QA
    color: 'primary',
  },
};
enableFunctionToggleControls(meta, ['onClose']);
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiToastProps>;

export const Playground: Story = {
  args: {
    title,
    text,
    // @ts-ignore - using story specific types
    onClose: false, // overwriting to false to mimick the default state without close button
  },
};

export const OnDismiss: Story = {
  parameters: {
    controls: {
      include: ['title', 'text', 'onClose'],
    },
  },
  args: {
    title,
    text,
    onClose: action('onClose'),
  },
};

export const WithActions: Story = {
  parameters: {
    controls: {
      include: ['title', 'text', 'actionProps', 'color', 'onClose'],
    },
  },
  args: {
    title,
    text,
    actionProps: {
      primary: {
        children: 'Primary action',
        onClick: action('primary onClick'),
      },
      secondary: {
        children: 'Secondary action',
        onClick: action('secondary onClick'),
      },
    },
  },
};

export const WithAnimation: Story = {
  parameters: {
    controls: {
      include: ['animationMs'],
    },
    loki: {
      skip: true, // functional story only
    },
  },
  args: {
    title,
    text,
    animationMs: 3000,
  },
  render: function Render({ animationMs: _animationMs, ...rest }) {
    const [animationMs, setAnimationMs] = React.useState<number | undefined>(
      undefined
    );

    return (
      <EuiFlexGroup direction="column" gutterSize="m">
        <EuiButton
          css={css`
            max-inline-size: max-content;
          `}
          onClick={() => setAnimationMs(animationMs ? undefined : 3000)}
        >
          {animationMs != null ? 'Reset animation' : 'Start animation'}
        </EuiButton>
        <EuiToast
          {...rest}
          animationMs={animationMs}
          title={title}
          text={text}
        />
      </EuiFlexGroup>
    );
  },
};

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      include: [],
    },
  },
  render: function Render(args) {
    const customContent = <i>Some additional custom content</i>;
    const actionPrimaryProps = {
      children: 'Primary action',
    };
    const actionSecondaryProps = {
      children: 'Secondary action',
    };

    const renderToasts = ({
      onClose,
      actionProps,
    }: {
      onClose?: boolean;
      actionProps?: EuiToastProps['actionProps'];
    }) => {
      const props = {
        ...args,
        onClose: onClose ? () => {} : undefined,
        actionProps,
      } as EuiToastProps;

      return (
        <>
          <EuiToast {...props} color="primary" title="Title" text={text} />
          <EuiToast
            {...props}
            color="success"
            title="Title (+ long text)"
            text={textLong}
          />
          <EuiToast
            {...props}
            color="warning"
            title="Long title that might span the entire width to see how it behaves (+ long text + children)"
            text={textLong}
          >
            {customContent}
          </EuiToast>
          <EuiToast {...props} color="danger" title="Title (+ children)">
            {customContent}
          </EuiToast>

          <EuiSpacer size="m" />
        </>
      );
    };

    return (
      <EuiFlexGroup direction="column" gutterSize="m">
        {renderToasts({})}
        {renderToasts({ onClose: true })}
        {renderToasts({
          actionProps: {
            primary: actionPrimaryProps,
          },
        })}
        {renderToasts({
          onClose: true,
          actionProps: {
            primary: actionPrimaryProps,
            secondary: actionSecondaryProps,
          },
        })}
      </EuiFlexGroup>
    );
  },
};
