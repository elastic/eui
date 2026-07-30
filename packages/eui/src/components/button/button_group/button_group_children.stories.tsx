/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiToolTip } from '../../tool_tip';
import { EuiPopover } from '../../popover';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiText } from '../../text';
import { EuiSpacer } from '../../spacer';
import { EuiCode } from '../../code';
import { EuiCopy } from '../../copy';
import { EuiButton } from '../button';
import { EuiButtonEmpty } from '../button_empty/button_empty';
import { EuiButtonIcon } from '../button_icon/button_icon';
import {
  EuiButtonGroup as EuiButtonGroupBase,
  EuiButtonGroupProps,
  EuiButtonGroupChildrenProps,
  EuiButtonGroupOptionProps,
  BUTTON_GROUP_GUTTER_SIZES,
} from './button_group';

// Typed proxy — gives react-docgen-typescript a concrete EuiButtonGroupChildrenProps
// type to analyze. Without this, docgen sees the overloaded function and cannot
// extract JSDoc descriptions for the children API props properly.
const EuiButtonGroup: FunctionComponent<EuiButtonGroupChildrenProps> =
  EuiButtonGroupBase;

const meta: Meta<EuiButtonGroupChildrenProps> = {
  title: 'Navigation/EuiButtonGroup',
  // @ts-ignore — EuiButtonGroup is overloaded; Storybook can't infer it directly
  component: EuiButtonGroup,
  argTypes: {
    variant: {
      options: ['default'],
      control: { type: 'radio' },
    },
    gutterSize: {
      options: BUTTON_GROUP_GUTTER_SIZES,
      control: { type: 'select' },
    },
  },
  args: {
    legend: 'EuiButtonGroup',
    buttonSize: 's',
    isDisabled: false,
    hasAriaDisabled: false,
    isFullWidth: false,
    variant: 'default',
    gutterSize: 's',
  },
};

export default meta;
type Story = StoryObj<typeof EuiButtonGroup>;

export const WithChildren: Story = {
  args: {
    legend: 'EuiButtonGroup - Children API',
    children: (
      <>
        <EuiButton color="danger">Delete</EuiButton>
        <EuiButton color="text">Rename</EuiButton>
        <EuiButton color="text">Disable</EuiButton>
        <EuiButton>Duplicate</EuiButton>
        <EuiButton iconType="save" fill>
          Save
        </EuiButton>
      </>
    ),
  },
};

export const WithMixedChildren: Story = {
  args: {
    legend: 'EuiButtonGroup - Children API',
    children: (
      <>
        <EuiButton>Save</EuiButton>
        <EuiToolTip content="Edit" disableScreenReaderOutput>
          <EuiButtonIcon iconType="pencil" aria-label="Edit" color="text" />
        </EuiToolTip>
        <EuiButton color="text" iconType="undo" iconSide="left">
          Undo
        </EuiButton>
        <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
        <EuiToolTip content="Delete" disableScreenReaderOutput>
          <EuiButtonIcon iconType="trash" aria-label="Delete" color="danger" />
        </EuiToolTip>
      </>
    ),
  },
};

const options: EuiButtonGroupOptionProps[] = [
  {
    id: 'button1',
    label: 'Option one',
  },
  {
    id: 'button2',
    label: 'Option two',
  },
  {
    id: 'button3',
    label: 'Option three',
  },
];

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      include: ['isDisabled', 'hasAriaDisabled', 'isFullWidth', 'buttonSize'],
    },
    codeSnippet: {
      skip: true,
    },
  },
  argTypes: {
    // manually add 'compressed' to showcase it's applied to the Options API only
    buttonSize: {
      options: ['s', 'm', 'compressed'],
      control: { type: 'radio' },
    },
  },
  render: function Render({
    buttonSize,
    gutterSize,
    ...rest
  }: EuiButtonGroupChildrenProps) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const buttonSizeChildren =
      // @ts-expect-error - Children API doesn't support 'compressed', but it's added for demonstration with the Options API
      (buttonSize === 'compressed' ? 's' : buttonSize) as 's' | 'm';
    const commonProps = {
      ...rest,
      onChange: () => {},
    };

    const getOptionsProps = (props: Partial<EuiButtonGroupProps>) =>
      ({
        ...commonProps,
        ...props,
        buttonSize,
        options,
      } as EuiButtonGroupProps);

    const renderRow = ({
      content,
      label,
    }: {
      content: ReactNode;
      label: ReactNode;
    }) => (
      <EuiFlexItem>
        <EuiText size="xs">
          <p>{label}</p>
        </EuiText>
        <EuiSpacer size="s" />
        {content}
      </EuiFlexItem>
    );

    return (
      <EuiFlexGroup direction="column" gutterSize="m">
        {renderRow({
          label: (
            <span>
              Options API - <EuiCode>type="single"</EuiCode>
            </span>
          ),
          content: (
            <EuiButtonGroupBase
              {...getOptionsProps({
                type: 'single',
                legend: 'Options API - single',
                idSelected: 'button1',
              })}
            />
          ),
        })}

        {renderRow({
          label: (
            <span>
              Options API - <EuiCode>type="multi"</EuiCode>
            </span>
          ),
          content: (
            <EuiButtonGroupBase
              {...getOptionsProps({
                type: 'multi',
                legend: 'Options API - multi',
                idToSelectedMap: { button1: true, button2: true },
              })}
            />
          ),
        })}

        {renderRow({
          label: (
            <span>
              Children API - <EuiCode>variant="default"</EuiCode>
            </span>
          ),
          content: (
            <EuiButtonGroup
              {...commonProps}
              buttonSize={buttonSizeChildren}
              gutterSize={gutterSize}
              legend="Children API - default"
            >
              <EuiButton size="s">Save</EuiButton>
              <EuiPopover
                aria-label="Actions popover"
                closePopover={() => setIsPopoverOpen(false)}
                isOpen={isPopoverOpen}
                button={
                  <EuiToolTip content="Actions" disableScreenReaderOutput>
                    <EuiButtonIcon
                      iconType="menu"
                      aria-label="Actions"
                      color="text"
                      onClick={() => setIsPopoverOpen((isOpen) => !isOpen)}
                    />
                  </EuiToolTip>
                }
              >
                <p>Popover content</p>
                <EuiButton>Popover action</EuiButton>
              </EuiPopover>
              <EuiButton color="text" iconType="undo" iconSide="left">
                Undo
              </EuiButton>
              <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
              <EuiToolTip content="Delete" disableScreenReaderOutput>
                <EuiButtonIcon
                  iconType="trash"
                  aria-label="Delete"
                  color="danger"
                />
              </EuiToolTip>
              <EuiCopy beforeMessage="Copy to clipboard" textToCopy="Copied!">
                {(copy) => (
                  <EuiButtonIcon
                    iconType="copyClipboard"
                    aria-label="Copy"
                    color="primary"
                    onClick={copy}
                  />
                )}
              </EuiCopy>
            </EuiButtonGroup>
          ),
        })}
      </EuiFlexGroup>
    );
  },
};
