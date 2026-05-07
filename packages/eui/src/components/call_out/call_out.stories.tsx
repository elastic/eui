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

const meta: Meta<EuiCallOutProps> = {
  title: 'Display/EuiCallOut',
  component: EuiCallOut,
  argTypes: {
    type: {
      control: 'radio',
      options: ['neutral', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'radio',
      options: ['s', 'm'],
    },
  },
  args: {
    // Component defaults
    type: 'neutral',
    heading: 'p',
    size: 'm',
  },
};
enableFunctionToggleControls(meta, ['onDismiss']);

export default meta;
type Story = StoryObj<EuiCallOutProps>;

export const Playground: Story = {
  args: {
    title: 'Callout title',
    text: 'Callout text',
    // @ts-expect-error - uses storybook specific control type
    onDismiss: false,
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
    title: 'Callout title',
    text: 'Callout text',
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

export const OnDismiss: Story = {
  parameters: {
    controls: {
      include: ['children', 'onDismiss', 'dismissButtonProps'],
    },
    loki: {
      skip: true,
    },
  },
  args: {
    title: 'Callout title',
    text: 'Callout text',
    onDismiss: action('onDismiss'),
    dismissButtonProps: {
      'aria-label': 'Custom aria-label',
    },
  },
};

export const KitchenSink: Story = {
  parameters: {
    controls: {
      include: ['type', 'onDismiss'],
    },
  },
  render: function Render(args) {
    const text = 'A short callout text';
    const textLong =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

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
          <EuiCallOut {...props} type="neutral" title="Title" text={text} />
          <EuiCallOut {...props} type="neutral" text={`(Text only) ${text}`} />
          <EuiCallOut
            {...props}
            type="success"
            title="Title (+ long text)"
            text={textLong}
          />
          <EuiCallOut
            {...props}
            type="warning"
            title="Title (+ long text + children)"
            text={textLong}
          >
            {customContent}
          </EuiCallOut>
          <EuiCallOut {...props} type="danger" title="Title (+ children)">
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
