/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { EuiButton } from '../button';
import { EuiCallOut, EuiCallOutProps } from './call_out';
import { EuiFlexGroup } from '../flex';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';

const title = 'Callout title';
const text = 'A short callout text';
const textLong =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const meta: Meta<EuiCallOutProps> = {
  title: 'Display/EuiCallOut',
  component: EuiCallOut,
  argTypes: {
    color: {
      control: 'radio',
      options: [undefined, 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'radio',
      options: ['s', 'm'],
    },
    iconType: {
      control: 'text',
    },
  },
  args: {
    // Component defaults
    color: 'primary',
    heading: 'p',
    size: 'm',
  },
};
enableFunctionToggleControls(meta, ['onDismiss']);

export default meta;
type Story = StoryObj<EuiCallOutProps>;

export const Playground: Story = {
  args: {
    title,
    text,
    // @ts-expect-error - uses storybook specific control type
    onDismiss: false,
  },
};

export const OnDismiss: Story = {
  parameters: {
    controls: {
      include: ['children', 'onDismiss', 'dismissButtonProps'],
    },
  },
  args: {
    title,
    text,
    onDismiss: action('onDismiss'),
    dismissButtonProps: {
      'aria-label': 'Custom aria-label',
    },
  },
};

export const WithActions: Story = {
  parameters: {
    controls: {
      include: ['children', 'onDismiss', 'dismissButtonProps', 'size'],
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

export const AnnounceOnMount: Story = {
  parameters: {
    controls: {
      include: ['children', 'announceOnMount'],
    },
    loki: {
      skip: true,
    },
  },
  args: {
    title,
    text,
    announceOnMount: true,
  },
  render: function Render() {
    const [isShown, setShown] = useState(false);

    return (
      <>
        <EuiButton onClick={() => setShown(!isShown)}>Toggle CallOut</EuiButton>
        {isShown && (
          <EuiCallOut
            title="Callout title"
            text="Callout text"
            announceOnMount
          />
        )}
      </>
    );
  },
};

export const WithCustomChildren: Story = {
  tags: ['vrt-only'],
  args: {
    title,
    children: (
      <ul>
        <li>First item</li>
        <li>Second item</li>
      </ul>
    ),
  },
};

export const KitchenSink: Story = {
  parameters: {
    controls: {
      include: ['type', 'onDismiss'],
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

    const renderCallouts = ({
      size,
      onDismiss,
      actionProps,
    }: {
      size: EuiCallOutProps['size'];
      onDismiss?: boolean;
      actionProps?: EuiCallOutProps['actionProps'];
    }) => {
      const props = {
        ...args,
        size,
        onDismiss: onDismiss ? () => {} : undefined,
        actionProps,
      } as EuiCallOutProps;

      return (
        <>
          <EuiCallOut {...props} color="primary" title="Title" text={text} />
          <EuiCallOut
            {...props}
            color="success"
            title="Title (+ long text)"
            text={textLong}
          />
          <EuiCallOut
            {...props}
            color="warning"
            title="Long title that might span the entire width to see how it behaves (+ long text + children)"
            text={textLong}
          >
            {customContent}
          </EuiCallOut>
          <EuiCallOut {...props} color="danger" title="Title (+ children)">
            {customContent}
          </EuiCallOut>

          <EuiSpacer size="m" />
        </>
      );
    };

    return (
      <EuiFlexGroup direction="column" gutterSize="m">
        <EuiText>
          <p>size="m"</p>
        </EuiText>
        {renderCallouts({ size: 'm' })}
        {renderCallouts({ size: 'm', onDismiss: true })}
        {renderCallouts({
          size: 'm',
          actionProps: {
            primary: actionPrimaryProps,
          },
        })}
        {renderCallouts({
          size: 'm',
          onDismiss: true,
          actionProps: {
            primary: actionPrimaryProps,
            secondary: actionSecondaryProps,
          },
        })}

        <EuiText>
          <p>size="s"</p>
        </EuiText>
        {renderCallouts({ size: 's' })}
        {renderCallouts({ size: 's', onDismiss: true })}
        {renderCallouts({
          size: 's',
          actionProps: {
            primary: actionPrimaryProps,
          },
        })}
        {renderCallouts({
          size: 's',
          onDismiss: true,
          actionProps: {
            primary: actionPrimaryProps,
            secondary: actionSecondaryProps,
          },
        })}
      </EuiFlexGroup>
    );
  },
};

export const KitchenSinkHighContrast: Story = {
  parameters: {
    controls: {
      include: ['type', 'onDismiss'],
    },
  },
  globals: { highContrastMode: true },
  ...KitchenSink,
};
