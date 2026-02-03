/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';

import { LOKI_SELECTORS } from '../../../../.storybook/loki';
import { BUTTON_COLORS } from '../../../global_styling';
import { EuiSpacer } from '../../spacer';
import { EuiFlexGroup } from '../../flex';
import { EuiWrappingPopover } from '../../popover';
import { EuiContextMenu } from '../../context_menu';
import { ToolTipDelay } from '../../tool_tip/tool_tip';
import { EuiSplitButton, EuiSplitButtonProps } from './split_button';

const decorators: Meta<EuiSplitButtonProps>['decorators'] = [
  (Story) => (
    <EuiFlexGroup
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Story />
    </EuiFlexGroup>
  ),
];

const meta: Meta<EuiSplitButtonProps> = {
  title: 'Navigation/EuiSplitButton',
  component: EuiSplitButton,
  args: {
    // Component defaults
    color: 'primary',
    size: 'm',
    fill: false,
    isDisabled: false,
    hasAriaDisabled: false,
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<EuiSplitButtonProps>;

export const Playground: Story = {
  args: {
    children: [
      <EuiSplitButton.ActionPrimary>Button</EuiSplitButton.ActionPrimary>,
      <EuiSplitButton.ActionSecondary
        iconType="arrowDown"
        aria-label="Secondary action"
      />,
    ],
  },
};

export const SingleSecondaryAction: Story = {
  args: {
    children: [
      <EuiSplitButton.ActionPrimary>Button</EuiSplitButton.ActionPrimary>,
      <EuiSplitButton.ActionSecondary
        iconType="play"
        aria-label="Secondary action"
      />,
    ],
  },
};

export const WithTooltip: Story = {
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    children: [
      <EuiSplitButton.ActionPrimary
        tooltipProps={{ content: 'Tooltip content' }}
      >
        Button
      </EuiSplitButton.ActionPrimary>,
      <EuiSplitButton.ActionSecondary
        iconType="arrowDown"
        aria-label="Secondary action"
        tooltipProps={{
          content: 'Tooltip content',
          delay: 'none' as ToolTipDelay, // passing a not (yet) supported value to hackishly force a lower delay for VRT
        }}
        autoFocus={true} // VRT-only workaround to ensure an opened tooltip
      />,
    ],
  },
};

export const WithPopover: Story = {
  decorators,
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    children: [
      <EuiSplitButton.ActionPrimary>Button</EuiSplitButton.ActionPrimary>,
      <EuiSplitButton.ActionSecondary
        iconType="arrowDown"
        aria-label="Secondary action"
        popoverProps={{
          isOpen: true,
          panelPaddingSize: 'none',
          children: (
            <EuiContextMenu
              initialPanelId={0}
              panels={[
                {
                  id: 0,
                  items: [
                    {
                      name: 'Action 1 (click)',
                      icon: 'search',
                      onClick: () => {},
                    },
                    {
                      name: 'Action 2 (link)',
                      icon: 'user',
                      href: 'http://elastic.co',
                      target: '_blank',
                    },
                    {
                      name: 'Action 3 (tooltip)',
                      icon: 'document',
                      toolTipContent: 'Optional content for a tooltip',
                      toolTipProps: {
                        title: 'Optional tooltip title',
                        position: 'right',
                      },
                      onClick: () => {},
                    },
                  ],
                },
              ]}
            />
          ),
          closePopover: () => {},
        }}
      />,
    ],
  },
  render: function Render({ children, ...rest }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(true);

    const [primaryAction, secondaryAction] = children;

    const popoverProps = {
      ...secondaryAction.props.popoverProps,
      isOpen: isPopoverOpen,
      closePopover: () => setIsPopoverOpen(false),
    };

    return (
      <EuiSplitButton {...rest}>
        {primaryAction}
        {React.cloneElement(secondaryAction, {
          onClick: () => {
            setIsPopoverOpen(!isPopoverOpen);
          },
          popoverProps: popoverProps,
        })}
      </EuiSplitButton>
    );
  },
};

export const WithWrappingPopover: Story = {
  decorators,
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
    codeSnippet: {
      skip: true,
    },
  },
  args: {
    children: [
      <EuiSplitButton.ActionPrimary>Button</EuiSplitButton.ActionPrimary>,
      <EuiSplitButton.ActionSecondary iconType="arrowDown" />,
    ],
  },
  render: function Render({ children, ...rest }) {
    const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(true);

    const [primaryAction, secondaryAction] = children;

    useEffect(() => {
      if (!isPopoverOpen) {
        buttonRef?.focus();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPopoverOpen]);

    return (
      <>
        <EuiSplitButton {...rest}>
          {primaryAction}
          {React.cloneElement(secondaryAction, {
            buttonRef: (node: HTMLButtonElement) => setButtonRef(node),
            onClick: () => setIsPopoverOpen(!isPopoverOpen),
          })}
        </EuiSplitButton>
        {isPopoverOpen && buttonRef && (
          <EuiWrappingPopover
            isOpen
            button={buttonRef}
            closePopover={() => setIsPopoverOpen(false)}
            anchorPosition="downCenter"
          >
            Popover content
          </EuiWrappingPopover>
        )}
      </>
    );
  },
};

/* VRT only */

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  parameters: {
    codeSnippet: {
      skip: true,
    },
  },
  render: function Render(_args) {
    const label = 'Button';
    const secondaryLabel = 'Secondary Button';
    const primaryIconType = 'faceHappy';
    const secondaryIconType = 'arrowDown';

    const variants = BUTTON_COLORS;

    const actionPrimary = ({
      isDisabled = false,
      isLoading = false,
    }: {
      isDisabled?: boolean;
      isLoading?: boolean;
    } = {}) => (
      <EuiSplitButton.ActionPrimary
        isDisabled={isDisabled}
        isLoading={isLoading}
      >
        {label}
      </EuiSplitButton.ActionPrimary>
    );

    const actionPrimaryWithIcon = (
      <EuiSplitButton.ActionPrimary iconType={primaryIconType}>
        {label}
      </EuiSplitButton.ActionPrimary>
    );

    const actionPrimaryIconOnly = (
      <EuiSplitButton.ActionPrimary
        iconType={primaryIconType}
        isIconOnly
        aria-label={label}
      />
    );

    const actionSecondary = ({
      isDisabled = false,
      isLoading = false,
    }: {
      isDisabled?: boolean;
      isLoading?: boolean;
    } = {}) => (
      <EuiSplitButton.ActionSecondary
        isDisabled={isDisabled}
        isLoading={isLoading}
        iconType={secondaryIconType}
        aria-label={secondaryLabel}
      />
    );

    const defaultActions = [actionPrimary(), actionSecondary()];
    const withIconActions = [actionPrimaryWithIcon, actionSecondary()];
    const iconOnlyActions = [actionPrimaryIconOnly, actionSecondary()];

    const examples: EuiSplitButtonProps[][] = [
      variants
        .map((color) => [
          {
            color,
            fill: false,
            children: defaultActions,
          } as EuiSplitButtonProps,
          {
            color,
            fill: true,
            children: defaultActions,
          } as EuiSplitButtonProps,
        ])
        .flat(),
      variants
        .map((color) => [
          {
            color,
            fill: false,
            children: withIconActions,
          } as EuiSplitButtonProps,
          {
            color,
            fill: true,
            children: withIconActions,
          } as EuiSplitButtonProps,
        ])
        .flat(),
      variants
        .map((color) => [
          {
            color,
            fill: false,
            children: iconOnlyActions,
          } as EuiSplitButtonProps,
          {
            color,
            fill: true,
            children: iconOnlyActions,
          } as EuiSplitButtonProps,
        ])
        .flat(),
      [
        {
          fill: false,
          children: [actionPrimary(), actionSecondary()],
        } as EuiSplitButtonProps,
        {
          fill: false,
          children: [actionPrimary({ isDisabled: true }), actionSecondary()],
        } as EuiSplitButtonProps,
        {
          fill: false,
          children: [actionPrimary(), actionSecondary({ isDisabled: true })],
        } as EuiSplitButtonProps,

        {
          fill: true,
          children: [actionPrimary(), actionSecondary()],
        },
        {
          fill: true,
          children: [actionPrimary({ isDisabled: true }), actionSecondary()],
        },
        {
          fill: true,
          children: [actionPrimary(), actionSecondary({ isDisabled: true })],
        },
        {
          fill: false,
          color: 'text',
          children: [actionPrimary(), actionSecondary()],
        } as EuiSplitButtonProps,
        {
          fill: false,
          color: 'text',
          children: [actionPrimary({ isDisabled: true }), actionSecondary()],
        } as EuiSplitButtonProps,
        {
          fill: false,
          color: 'text',
          children: [actionPrimary(), actionSecondary({ isDisabled: true })],
        } as EuiSplitButtonProps,
        {
          fill: true,
          color: 'text',
          children: [actionPrimary(), actionSecondary()],
        } as EuiSplitButtonProps,
        {
          fill: true,
          color: 'text',
          children: [actionPrimary({ isDisabled: true }), actionSecondary()],
        },
        {
          fill: true,
          color: 'text',
          children: [actionPrimary(), actionSecondary({ isDisabled: true })],
        },
      ],
      [
        {
          fill: false,
          isDisabled: true,
          children: [actionPrimary(), actionSecondary()],
        } as EuiSplitButtonProps,
        {
          fill: true,
          isDisabled: true,
          children: [actionPrimary(), actionSecondary()],
        },
        {
          fill: false,
          color: 'text',
          children: [
            actionPrimary({ isDisabled: true }),
            actionSecondary({ isDisabled: true }),
          ],
        } as EuiSplitButtonProps,
        {
          fill: true,
          color: 'text',
          children: [
            actionPrimary({ isDisabled: true }),
            actionSecondary({ isDisabled: true }),
          ],
        },
      ],
      [
        {
          fill: false,
          isLoading: true,
          children: [actionPrimary(), actionSecondary()],
        } as EuiSplitButtonProps,
        {
          fill: true,
          isLoading: true,
          children: [actionPrimary(), actionSecondary()],
        },
        {
          fill: false,
          children: [actionPrimary({ isLoading: true }), actionSecondary()],
        } as EuiSplitButtonProps,
        {
          fill: true,
          children: [actionPrimary(), actionSecondary({ isLoading: true })],
        },
      ],
    ];

    return (
      <EuiFlexGroup direction="row" gutterSize="l">
        {examples.map((example) => {
          return (
            <EuiFlexGroup
              direction="column"
              gutterSize="xs"
              css={css`
                flex-grow: 0;
              `}
            >
              {example.map((variant) => (
                <EuiSplitButton {...variant} />
              ))}
              <EuiSpacer />
            </EuiFlexGroup>
          );
        })}
      </EuiFlexGroup>
    );
  },
};

export const DarkMode: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { colorMode: 'DARK' },
};

export const HighContrastMode: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};

export const HighContrastModeDark: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true, colorMode: 'DARK' },
};
