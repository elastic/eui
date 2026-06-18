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

import {
  enableFunctionToggleControls,
  disableStorybookControls,
} from '../../../.storybook/utils';
import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { EuiButton } from '../button';
import { EuiCallOut, EuiCallOutProps } from './call_out';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';
import { EuiPanel } from '../panel';
import { EuiPopover } from '../popover';
import { EuiTitle } from '../title';

const title = 'Callout title';
const text = 'A short callout text';
const textLong =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const defaultActionProps = {
  primary: {
    children: 'Primary action',
    onClick: action('primary onClick'),
  },
  secondary: {
    children: 'Secondary action',
    onClick: action('secondary onClick'),
  },
};

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
      include: ['title', 'text', 'color', 'onDismiss', 'dismissButtonProps'],
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
      include: ['title', 'text', 'onDismiss', 'dismissButtonProps', 'size'],
    },
  },
  args: {
    title,
    text,
    actionProps: defaultActionProps,
  },
};

export const WithTooltips: Story = {
  parameters: {
    controls: {
      include: ['actionProps'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    title,
    onDismiss: undefined,
    actionProps: {
      primary: {
        children: 'Primary action',
        onClick: action('primary onClick'),
        tooltipProps: {
          content: 'Tooltip for primary action',
        },
        autoFocus: true,
      },
    },
  },
};
disableStorybookControls(WithTooltips, ['onDismiss']);

export const WithPopover: Story = {
  parameters: {
    controls: {
      include: ['actionProps'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    title,
    actionProps: {
      primary: {
        children: 'Primary action',
        onClick: action('primary onClick'),
        popoverProps: {
          isOpen: true,
          closePopover: () => {},
          children: 'Popover content',
        },
      },
    },
  },
  render: function Render(args) {
    const { actionProps: _actionProps, ...rest } = args;
    const [isPopoverOpen, setPopoverOpen] = useState(true);

    const actionProps = {
      primary: {
        ..._actionProps?.primary,
        onClick: () => setPopoverOpen(!isPopoverOpen),
        popoverProps: {
          ..._actionProps?.primary?.popoverProps,
          isOpen: isPopoverOpen,
          closePopover: () => setPopoverOpen(false),
        },
      },
    };

    return <EuiCallOut {...rest} actionProps={actionProps} />;
  },
};
disableStorybookControls(WithPopover, ['onDismiss']);

export const AnnounceOnMount: Story = {
  parameters: {
    controls: {
      include: ['title', 'text', 'announceOnMount'],
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
      disable: true,
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
  globals: { highContrastMode: true },
  ...KitchenSink,
};

export const KitchenSinkCustomChildren: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  tags: ['vrt-only'],
  args: {
    title,
    text: textLong,
    children: (
      <ul>
        <li>First item</li>
        <li>Second item</li>
      </ul>
    ),
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
  render: (_args) => {
    return (
      <>
        <EuiCallOut {..._args} actionProps={{}} />
        <br />
        <EuiCallOut {..._args} />
        <br />
        <EuiCallOut {..._args} actionProps={{}} text="" />
        <br />
        <EuiCallOut {..._args} text="" />
      </>
    );
  },
};

export const WrapperKitchenSink: Story = {
  tags: ['vrt-only'],
  render: function Render() {
    return (
      <div>
        <EuiTitle size="s">
          <p>within EuiPanel</p>
        </EuiTitle>

        <EuiPanel>
          <EuiCallOut
            title={title}
            text={textLong}
            actionProps={defaultActionProps}
          />
        </EuiPanel>

        <EuiSpacer size="xxl" />

        <EuiTitle size="s">
          <p>within EuiPopover</p>
        </EuiTitle>

        <EuiPopover
          button={<EuiButton>Show popover</EuiButton>}
          isOpen
          anchorPosition="downCenter"
          closePopover={() => {}}
          aria-label="Popover containing a CallOut"
        >
          <EuiCallOut
            title={title}
            text={textLong}
            actionProps={defaultActionProps}
          />
          <p>{textLong}</p>
        </EuiPopover>

        <div style={{ height: 250 }} />

        <EuiPopover
          button={<EuiButton>Show popover</EuiButton>}
          isOpen
          anchorPosition="downCenter"
          closePopover={() => {}}
          aria-label="Popover containing a CallOut"
        >
          <EuiCallOut
            title={title}
            text={textLong}
            actionProps={defaultActionProps}
          />
        </EuiPopover>

        <div style={{ height: 250 }} />

        <EuiTitle size="s">
          <p>within EuiFlexGroup</p>
        </EuiTitle>

        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiCallOut
              title={title}
              text={textLong}
              actionProps={defaultActionProps}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiCallOut
              title={title}
              text={textLong}
              actionProps={defaultActionProps}
            />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xxl" />

        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiCallOut
              title={title}
              text={textLong}
              actionProps={defaultActionProps}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCallOut
              title={title}
              text={textLong}
              actionProps={defaultActionProps}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  },
};
