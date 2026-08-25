/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { EuiToolTip } from '../../tool_tip';
import { EuiPopover } from '../../popover';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiText } from '../../text';
import { EuiSpacer } from '../../spacer';
import { EuiCode } from '../../code';
import { EuiCopy } from '../../copy';
import { EuiFieldSearch } from '../../form';
import { EuiButton } from '../button';
import { EuiButtonEmpty } from '../button_empty/button_empty';
import { EuiButtonIcon } from '../button_icon/button_icon';
import {
  EuiButtonGroup as EuiButtonGroupBase,
  EuiButtonGroupChildren,
  EuiButtonGroupProps,
  EuiButtonGroupChildrenProps,
  EuiButtonGroupOptionProps,
} from './button_group';

// Typed proxy - EuiButtonGroupChildren is exported from the component file so that
// react-docgen-typescript analyzes button_group.tsx directly and picks up
// JSDoc from EuiButtonGroupChildrenProps.
// Can be removed once the Options API is replaced by the Children API.
const EuiButtonGroup = EuiButtonGroupChildren;
const buttons = (
  <>
    <EuiButton>Delete</EuiButton>
    <EuiButton>Rename</EuiButton>
    <EuiButton>Disable</EuiButton>
    <EuiButton>Duplicate</EuiButton>
    <EuiButton fill>Save</EuiButton>
  </>
);
const iconButtons = (
  <>
    <EuiToolTip content="Delete" disableScreenReaderOutput>
      <EuiButtonIcon iconType="trash" aria-label="Delete" />
    </EuiToolTip>
    <EuiToolTip content="Rename" disableScreenReaderOutput>
      <EuiButtonIcon iconType="pencil" aria-label="Rename" />
    </EuiToolTip>
    <EuiToolTip content="Disable" disableScreenReaderOutput>
      <EuiButtonIcon iconType="pause" aria-label="Disable" />
    </EuiToolTip>
    <EuiToolTip content="Duplicate" disableScreenReaderOutput>
      <EuiButtonIcon iconType="copy" aria-label="Duplicate" />
    </EuiToolTip>
    <EuiToolTip content="Save" disableScreenReaderOutput>
      <EuiButtonIcon iconType="save" aria-label="Save" />
    </EuiToolTip>
  </>
);

const meta: Meta<EuiButtonGroupChildrenProps> = {
  title: 'Navigation/EuiButtonGroup',
  // @ts-ignore — EuiButtonGroup is overloaded; Storybook can't infer it directly
  component: EuiButtonGroup,
  args: {
    legend: 'EuiButtonGroup',
    buttonSize: 's',
    isDisabled: false,
    hasAriaDisabled: false,
    isFullWidth: false,
    variant: 'default',
    gutterSize: 's',
    showDividers: false,
    layout: 'horizontal',
    wrap: true,
  },
};

export default meta;
type Story = StoryObj<typeof EuiButtonGroup>;

export const WithChildren: Story = {
  parameters: {
    controls: {
      exclude: [
        'layout',
        'idSelected',
        'idToSelectedMap',
        'type',
        'display',
        'variant',
        'wrap',
        'onChange',
        'showDividers',
      ],
    },
  },
  args: {
    legend: 'EuiButtonGroup - Children API',
    children: (
      <>
        <EuiButton color="danger">Delete</EuiButton>
        <EuiButton color="text">Rename</EuiButton>
        <EuiButton color="text">Disable</EuiButton>
        <EuiButton>Duplicate</EuiButton>
        <EuiButton fill>Save</EuiButton>
      </>
    ),
  },
};

export const WithMixedChildren: Story = {
  parameters: {
    controls: {
      exclude: [
        'layout',
        'idSelected',
        'idToSelectedMap',
        'type',
        'display',
        'variant',
        'wrap',
        'onChange',
        'showDividers',
      ],
    },
  },
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

export const Segmented: Story = {
  parameters: {
    controls: {
      exclude: [
        'layout',
        'idSelected',
        'idToSelectedMap',
        'type',
        'display',
        'gutterSize',
        'onChange',
      ],
    },
  },
  args: {
    legend: 'EuiButtonGroup - Children API - segmented',
    variant: 'segmented',
    children: buttons,
  },
};

export const SegmentedIconOnly: Story = {
  parameters: {
    controls: {
      exclude: [
        'idSelected',
        'idToSelectedMap',
        'type',
        'display',
        'gutterSize',
        'onChange',
      ],
    },
  },
  args: {
    legend: 'EuiButtonGroup - Children API - segmented (icon only)',
    variant: 'segmented',
    children: iconButtons,
  },
};

export const LayoutVertical: Story = {
  parameters: {
    controls: {
      exclude: [
        'idSelected',
        'idToSelectedMap',
        'type',
        'display',
        'gutterSize',
        'onChange',
      ],
    },
  },
  args: {
    legend: 'EuiButtonGroup - Children API - segmented (vertical layout)',
    variant: 'segmented',
    layout: 'vertical',
    children: iconButtons,
  },
};

export const Selection: Story = {
  parameters: {
    controls: {
      exclude: ['gutterSize', 'layout'],
    },
  },
  args: {
    legend: 'EuiButtonGroup - Children API - selection (single)',
    variant: 'selection',
    type: 'single',
  },
  render: function Render(args) {
    const { idSelected: _, idToSelectedMap: __, type, ...controlArgs } = args;
    return (
      <StatefulButtonGroupSelection
        {...controlArgs}
        type={type}
        idSelected={type !== 'multi' ? 'save' : undefined}
        idToSelectedMap={type === 'multi' ? { save: true } : undefined}
      >
        <EuiButton id="save">Save</EuiButton>
        <EuiButton id="edit">Edit</EuiButton>
        <EuiButton id="undo">Undo</EuiButton>
        <EuiButton id="delete">Delete</EuiButton>
      </StatefulButtonGroupSelection>
    );
  },
};

export const SelectionMulti: Story = {
  parameters: {
    controls: {
      exclude: ['gutterSize', 'layout'],
    },
  },
  args: {
    legend: 'EuiButtonGroup - Children API - selection (multi)',
    variant: 'selection',
    type: 'multi',
  },
  render: function Render(args) {
    const { idSelected: _, idToSelectedMap: __, type, ...controlArgs } = args;
    return (
      <StatefulButtonGroupSelection
        {...controlArgs}
        type={type}
        idSelected={type === 'single' ? 'save' : undefined}
        idToSelectedMap={type === 'multi' ? { save: true } : undefined}
      >
        <EuiButton id="save">Save</EuiButton>
        <EuiButton id="edit">Edit</EuiButton>
        <EuiButton id="undo">Undo</EuiButton>
        <EuiButton id="delete">Delete</EuiButton>
      </StatefulButtonGroupSelection>
    );
  },
};

export const SelectionIconOnly: Story = {
  parameters: {
    controls: {
      exclude: ['gutterSize'],
    },
  },
  args: {
    legend: 'EuiButtonGroup - Children API - selection (icon only)',
    variant: 'selection',
    type: 'single',
  },
  render: function Render(args) {
    const { idSelected: _, idToSelectedMap: __, type, ...controlArgs } = args;
    return (
      <StatefulButtonGroupSelection
        {...controlArgs}
        type={type}
        idSelected={type !== 'multi' ? 'grid' : undefined}
        idToSelectedMap={type === 'multi' ? { grid: true } : undefined}
      >
        <EuiToolTip content="Grid view" disableScreenReaderOutput>
          <EuiButtonIcon id="grid" iconType="grid" aria-label="Grid view" />
        </EuiToolTip>
        <EuiToolTip content="List view" disableScreenReaderOutput>
          <EuiButtonIcon id="list" iconType="list" aria-label="List view" />
        </EuiToolTip>
        <EuiToolTip content="Map view" disableScreenReaderOutput>
          <EuiButtonIcon id="map" iconType="mapMarker" aria-label="Map view" />
        </EuiToolTip>
      </StatefulButtonGroupSelection>
    );
  },
};

export const SelectionDisplayInverse: Story = {
  parameters: {
    controls: {
      exclude: ['gutterSize', 'layout'],
    },
  },
  args: {
    display: 'inverse',
    variant: 'selection',
    type: 'multi',
  },
  render: function Render(args) {
    const { idSelected: _, idToSelectedMap: __, type, ...controlArgs } = args;
    return (
      <StatefulButtonGroupSelection
        {...controlArgs}
        type={type}
        idSelected={type !== 'multi' ? 'save' : undefined}
        idToSelectedMap={type === 'multi' ? { save: true } : undefined}
      >
        <EuiButton id="save">Save</EuiButton>
        <EuiButton id="edit">Edit</EuiButton>
        <EuiButton id="undo">Undo</EuiButton>
        <EuiButton id="delete">Delete</EuiButton>
      </StatefulButtonGroupSelection>
    );
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

/* VRT-only */

export const Dividers: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      include: ['showDividers', 'buttonSize', 'isDisabled', 'hasAriaDisabled'],
    },
  },
  args: {
    legend: 'EuiButtonGroup - Children API - segmented (with dividers)',
    variant: 'segmented',
    showDividers: true,
  },
  render: function Render(args) {
    return (
      <EuiFlexGroup direction="column" gutterSize="m">
        <EuiButtonGroup {...args}>{buttons}</EuiButtonGroup>
        <EuiButtonGroup {...args}>{iconButtons}</EuiButtonGroup>
      </EuiFlexGroup>
    );
  },
};

export const PartiallyDisabled: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      include: ['showDividers', 'buttonSize', 'isDisabled', 'hasAriaDisabled'],
    },
  },
  args: {
    legend: 'EuiButtonGroup - Children API - segmented (with dividers)',
    variant: 'segmented',
    showDividers: true,
  },
  render: function Render(args) {
    return (
      <EuiFlexGroup direction="column" gutterSize="m">
        <EuiButtonGroup {...args}>
          <EuiButton color="danger">Delete</EuiButton>
          <EuiButton color="text" isDisabled>
            Rename
          </EuiButton>
          <EuiButton color="text" isDisabled>
            Disable
          </EuiButton>
          <EuiButton>Duplicate</EuiButton>
          <EuiButton fill>Save</EuiButton>
        </EuiButtonGroup>
      </EuiFlexGroup>
    );
  },
};

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      exclude: ['children', 'onChange', 'legend', 'options', 'variant'],
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
    type: _type,
    idSelected: _idSelected,
    idToSelectedMap: _idToSelectedMap,
    onChange: _onChange,
    display: _display,
    ...rest
  }: EuiButtonGroupChildrenProps) {
    const [isPopoverOpenA, setIsPopoverOpenA] = useState(false);
    const [isPopoverOpenB, setIsPopoverOpenB] = useState(false);
    const [isPopoverOpenC, setIsPopoverOpenC] = useState(false);

    const buttonSizeChildren =
      // @ts-expect-error - Children API doesn't support 'compressed', but it's added for demonstration with the Options API
      (buttonSize === 'compressed' ? 's' : buttonSize) as 's' | 'm';
    const commonProps = {
      ...rest,
    };

    const getOptionsProps = (props: Partial<EuiButtonGroupProps>) =>
      ({
        ...commonProps,
        onChange: () => {},
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
              variant="default"
              buttonSize={buttonSizeChildren}
              gutterSize={gutterSize}
              legend="Children API - default"
            >
              <EuiButton>Save</EuiButton>
              <EuiPopover
                aria-label="Actions popover"
                closePopover={() => setIsPopoverOpenA(false)}
                isOpen={isPopoverOpenA}
                button={
                  <EuiToolTip content="Actions" disableScreenReaderOutput>
                    <EuiButtonIcon
                      iconType="menu"
                      aria-label="Actions"
                      color="text"
                      onClick={() => setIsPopoverOpenA((isOpen) => !isOpen)}
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
                    iconType="copy"
                    aria-label="Copy"
                    color="primary"
                    onClick={copy}
                  />
                )}
              </EuiCopy>
            </EuiButtonGroup>
          ),
        })}

        {renderRow({
          label: (
            <span>
              Children API - <EuiCode>variant="segmented"</EuiCode> -{' '}
              <EuiCode>wrap=true</EuiCode>
            </span>
          ),
          content: (
            <EuiFlexGroup direction="column" gutterSize="s">
              <EuiButtonGroup
                {...commonProps}
                variant="segmented"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                legend="Children API - segmented"
                wrap
              >
                <EuiButton>Delete</EuiButton>
                <EuiButton>Rename</EuiButton>
                <EuiButton>Disable</EuiButton>
                <EuiButton>Duplicate</EuiButton>
                <EuiToolTip content="Save" disableScreenReaderOutput>
                  <EuiButton>Save</EuiButton>
                </EuiToolTip>
                <EuiPopover
                  aria-label="Actions popover"
                  closePopover={() => setIsPopoverOpenB(false)}
                  isOpen={isPopoverOpenB}
                  button={
                    <EuiToolTip
                      content="Actions"
                      display="block"
                      disableScreenReaderOutput
                    >
                      <EuiButton
                        onClick={() => setIsPopoverOpenB((isOpen) => !isOpen)}
                      >
                        Actions
                      </EuiButton>
                    </EuiToolTip>
                  }
                >
                  <p>Popover content</p>
                  <EuiButton>Popover action</EuiButton>
                </EuiPopover>
                <EuiButton>Undo</EuiButton>
                <EuiButton>Cancel</EuiButton>
                <EuiCopy beforeMessage="Copy to clipboard" textToCopy="Copied!">
                  {(copy) => <EuiButton onClick={copy}>Copy</EuiButton>}
                </EuiCopy>
              </EuiButtonGroup>

              <EuiButtonGroup
                {...commonProps}
                variant="segmented"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                legend="Children API - segmented"
                wrap
              >
                {iconButtons}

                <EuiPopover
                  aria-label="Actions popover"
                  closePopover={() => setIsPopoverOpenC(false)}
                  isOpen={isPopoverOpenC}
                  button={
                    <EuiToolTip
                      content="Actions"
                      display="block"
                      disableScreenReaderOutput
                    >
                      <EuiButtonIcon
                        iconType="menu"
                        aria-label="Actions"
                        onClick={() => setIsPopoverOpenC((isOpen) => !isOpen)}
                      />
                    </EuiToolTip>
                  }
                >
                  <p>Popover content</p>
                  <EuiButton>Popover action</EuiButton>
                </EuiPopover>

                <EuiToolTip content="Undo" disableScreenReaderOutput>
                  <EuiButtonIcon iconType="undo" aria-label="Undo" />
                </EuiToolTip>

                <EuiCopy beforeMessage="Copy to clipboard" textToCopy="Copied!">
                  {(copy) => (
                    <EuiButtonIcon
                      iconType="copy"
                      aria-label="Copy"
                      onClick={copy}
                    />
                  )}
                </EuiCopy>

                {iconButtons}
              </EuiButtonGroup>
            </EuiFlexGroup>
          ),
        })}

        {renderRow({
          label: (
            <span>
              Children API - <EuiCode>variant="segmented"</EuiCode> -{' '}
              <EuiCode>wrap=false</EuiCode>
            </span>
          ),
          content: (
            <EuiFlexGroup direction="column" gutterSize="s">
              <EuiButtonGroup
                {...commonProps}
                variant="segmented"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                legend="Children API - segmented"
                wrap={false}
              >
                <EuiButton>Delete</EuiButton>
                <EuiButton>Rename</EuiButton>
                <EuiButton>Disable</EuiButton>
                <EuiButton>Duplicate</EuiButton>
                <EuiToolTip content="Save" disableScreenReaderOutput>
                  <EuiButton>Save</EuiButton>
                </EuiToolTip>
                <EuiPopover
                  aria-label="Actions popover"
                  closePopover={() => setIsPopoverOpenB(false)}
                  isOpen={isPopoverOpenB}
                  button={
                    <EuiToolTip
                      content="Actions"
                      display="block"
                      disableScreenReaderOutput
                    >
                      <EuiButton
                        onClick={() => setIsPopoverOpenB((isOpen) => !isOpen)}
                      >
                        Actions
                      </EuiButton>
                    </EuiToolTip>
                  }
                >
                  <p>Popover content</p>
                  <EuiButton>Popover action</EuiButton>
                </EuiPopover>
                <EuiButton>Undo</EuiButton>
                <EuiButton>Cancel</EuiButton>
                <EuiCopy beforeMessage="Copy to clipboard" textToCopy="Copied!">
                  {(copy) => <EuiButton onClick={copy}>Copy</EuiButton>}
                </EuiCopy>
              </EuiButtonGroup>

              <EuiButtonGroup
                {...commonProps}
                variant="segmented"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                legend="Children API - segmented"
                wrap={false}
              >
                {iconButtons}

                <EuiPopover
                  aria-label="Actions popover"
                  closePopover={() => setIsPopoverOpenC(false)}
                  isOpen={isPopoverOpenC}
                  button={
                    <EuiToolTip
                      content="Actions"
                      display="block"
                      disableScreenReaderOutput
                    >
                      <EuiButtonIcon
                        iconType="menu"
                        aria-label="Actions"
                        onClick={() => setIsPopoverOpenC((isOpen) => !isOpen)}
                      />
                    </EuiToolTip>
                  }
                >
                  <p>Popover content</p>
                  <EuiButton>Popover action</EuiButton>
                </EuiPopover>

                <EuiToolTip content="Undo" disableScreenReaderOutput>
                  <EuiButtonIcon iconType="undo" aria-label="Undo" />
                </EuiToolTip>

                <EuiCopy beforeMessage="Copy to clipboard" textToCopy="Copied!">
                  {(copy) => (
                    <EuiButtonIcon
                      iconType="copy"
                      aria-label="Copy"
                      onClick={copy}
                    />
                  )}
                </EuiCopy>

                {iconButtons}
              </EuiButtonGroup>
            </EuiFlexGroup>
          ),
        })}

        {renderRow({
          label: (
            <span>
              Children API - <EuiCode>variant="selection"</EuiCode> -{' '}
              <EuiCode>type="single"</EuiCode>
            </span>
          ),
          content: (
            <EuiFlexGroup direction="column" gutterSize="s">
              <StatefulButtonGroupSelection
                {...commonProps}
                variant="selection"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                idSelected="single-delete"
              >
                <EuiButton id="single-delete">Delete</EuiButton>
                <EuiButton id="single-rename">Rename</EuiButton>
                <EuiButton id="single-save">Save</EuiButton>
              </StatefulButtonGroupSelection>

              <StatefulButtonGroupSelection
                {...commonProps}
                variant="selection"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                idSelected="single-grid"
              >
                <EuiToolTip content="Grid view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="single-grid"
                    iconType="grid"
                    aria-label="Grid view"
                  />
                </EuiToolTip>
                <EuiToolTip content="List view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="single-list"
                    iconType="list"
                    aria-label="List view"
                  />
                </EuiToolTip>
                <EuiToolTip content="Map view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="single-map"
                    iconType="mapMarker"
                    aria-label="Map view"
                  />
                </EuiToolTip>
              </StatefulButtonGroupSelection>
            </EuiFlexGroup>
          ),
        })}

        {renderRow({
          label: (
            <span>
              Children API - <EuiCode>variant="selection"</EuiCode> -{' '}
              <EuiCode>type="multi"</EuiCode>
            </span>
          ),
          content: (
            <EuiFlexGroup direction="column" gutterSize="s">
              <StatefulButtonGroupSelection
                {...commonProps}
                variant="selection"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                type="multi"
                idToSelectedMap={{ 'multi-delete': true, 'multi-rename': true }}
              >
                <EuiButton id="multi-delete">Delete</EuiButton>
                <EuiButton id="multi-rename">Rename</EuiButton>
                <EuiButton id="multi-save">Save</EuiButton>
              </StatefulButtonGroupSelection>

              <StatefulButtonGroupSelection
                {...commonProps}
                variant="selection"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                type="multi"
                idToSelectedMap={{ 'multi-grid': true, 'multi-list': true }}
              >
                <EuiToolTip content="Grid view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="multi-grid"
                    iconType="grid"
                    aria-label="Grid view"
                  />
                </EuiToolTip>
                <EuiToolTip content="List view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="multi-list"
                    iconType="list"
                    aria-label="List view"
                  />
                </EuiToolTip>
                <EuiToolTip content="Map view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="multi-map"
                    iconType="mapMarker"
                    aria-label="Map view"
                  />
                </EuiToolTip>
              </StatefulButtonGroupSelection>
            </EuiFlexGroup>
          ),
        })}

        {renderRow({
          label: (
            <span>
              Children API - <EuiCode>variant="selection"</EuiCode> -{' '}
              <EuiCode>display="highlighted"</EuiCode>
            </span>
          ),
          content: (
            <EuiFlexGroup direction="column" gutterSize="s">
              <StatefulButtonGroupSelection
                {...commonProps}
                variant="selection"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                type="multi"
                idToSelectedMap={{ 'highlighted-delete': true }}
                display="highlighted"
              >
                <EuiButton id="highlighted-delete">Delete</EuiButton>
                <EuiButton id="highlighted-rename">Rename</EuiButton>
                <EuiButton id="highlighted-save">Save</EuiButton>
              </StatefulButtonGroupSelection>

              <StatefulButtonGroupSelection
                {...commonProps}
                variant="selection"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                type="multi"
                idToSelectedMap={{ 'highlighted-grid': true }}
                display="highlighted"
              >
                <EuiToolTip content="Grid view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="highlighted-grid"
                    iconType="grid"
                    aria-label="Grid view"
                  />
                </EuiToolTip>
                <EuiToolTip content="List view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="highlighted-list"
                    iconType="list"
                    aria-label="List view"
                  />
                </EuiToolTip>
                <EuiToolTip content="Map view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="highlighted-map"
                    iconType="mapMarker"
                    aria-label="Map view"
                  />
                </EuiToolTip>
              </StatefulButtonGroupSelection>
            </EuiFlexGroup>
          ),
        })}

        {renderRow({
          label: (
            <span>
              Children API - <EuiCode>variant="selection"</EuiCode> -{' '}
              <EuiCode>display="inverse"</EuiCode>
            </span>
          ),
          content: (
            <EuiFlexGroup direction="column" gutterSize="s">
              <StatefulButtonGroupSelection
                {...commonProps}
                variant="selection"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                type="multi"
                idToSelectedMap={{ 'inverse-delete': true }}
                display="inverse"
              >
                <EuiButton id="inverse-delete">Delete</EuiButton>
                <EuiButton id="inverse-rename">Rename</EuiButton>
                <EuiButton id="inverse-save">Save</EuiButton>
              </StatefulButtonGroupSelection>

              <StatefulButtonGroupSelection
                {...commonProps}
                variant="selection"
                buttonSize={buttonSizeChildren}
                gutterSize={gutterSize}
                type="multi"
                idToSelectedMap={{ 'inverse-grid': true }}
                display="inverse"
              >
                <EuiToolTip content="Grid view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="inverse-grid"
                    iconType="grid"
                    aria-label="Grid view"
                  />
                </EuiToolTip>
                <EuiToolTip content="List view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="inverse-list"
                    iconType="list"
                    aria-label="List view"
                  />
                </EuiToolTip>
                <EuiToolTip content="Map view" disableScreenReaderOutput>
                  <EuiButtonIcon
                    id="inverse-map"
                    iconType="mapMarker"
                    aria-label="Map view"
                  />
                </EuiToolTip>
              </StatefulButtonGroupSelection>
            </EuiFlexGroup>
          ),
        })}
      </EuiFlexGroup>
    );
  },
};

export const FlexLayoutBehavior: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      include: ['showDividers', 'buttonSize', 'isDisabled', 'hasAriaDisabled'],
    },
    codeSnippet: {
      skip: true,
    },
  },
  args: {
    legend: 'EuiButtonGroup - Children API - segmented (with dividers)',
    variant: 'segmented',
    showDividers: true,
  },
  render: function Render(args) {
    const renderTitle = (text: string) => (
      <>
        <EuiText size="s">{text}</EuiText>
        <EuiSpacer size="s" />
      </>
    );
    return (
      <>
        <EuiFlexGroup direction="column" gutterSize="xl">
          <EuiFlexItem>
            {renderTitle(
              'FlexGroup(responsive=false, wrap=false), FlexItem(grow=true), ButtonGroup(wrap=false)'
            )}

            <EuiFlexGroup direction="row" gutterSize="s" responsive={false}>
              <EuiFlexItem>
                <EuiFieldSearch compressed />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButtonGroup {...args} wrap={false}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButtonGroup {...args} wrap={false}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>

            <EuiSpacer size="m" />

            <EuiFlexGroup direction="row" gutterSize="m" responsive={false}>
              <EuiFlexItem>
                <EuiFieldSearch compressed />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButtonGroup {...args} wrap={false}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButtonGroup {...args} wrap={false}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>
          </EuiFlexItem>

          <EuiFlexItem>
            {renderTitle(
              '⭐ FlexGroup(responsive=false, wrap=true), FlexItem(grow=false), ButtonGroup(wrap=true)'
            )}

            <EuiFlexGroup
              direction="row"
              gutterSize="s"
              responsive={false}
              wrap
            >
              <EuiFlexItem grow={false}>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>

            <EuiSpacer size="m" />

            <EuiFlexGroup
              direction="row"
              gutterSize="s"
              responsive={false}
              wrap
            >
              <EuiFlexItem grow={false}>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>
          </EuiFlexItem>

          <EuiFlexItem>
            {renderTitle(
              '🌟 FlexGroup(responsive=false, wrap=true), FlexItem(grow=true + grow=false), ButtonGroup(wrap=true)'
            )}

            <EuiFlexGroup
              direction="row"
              gutterSize="s"
              responsive={false}
              wrap
            >
              <EuiFlexItem>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>

            <EuiSpacer size="m" />

            <EuiFlexGroup
              direction="row"
              gutterSize="s"
              responsive={false}
              wrap
            >
              <EuiFlexItem>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>
          </EuiFlexItem>

          <EuiFlexItem>
            {renderTitle(
              '⭐ FlexGroup(responsive=true, wrap=true), FlexItem(grow=false), ButtonGroup(wrap=true)'
            )}

            <EuiFlexGroup direction="row" gutterSize="s" wrap>
              <EuiFlexItem grow={false}>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>

            <EuiSpacer size="m" />

            <EuiFlexGroup direction="row" gutterSize="s" wrap>
              <EuiFlexItem grow={false}>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>
          </EuiFlexItem>

          <EuiFlexItem>
            {renderTitle(
              '🌟 FlexGroup(responsive=true, wrap=true), FlexItem(grow=true + grow=false), ButtonGroup(wrap=true)'
            )}

            <EuiFlexGroup direction="row" gutterSize="s" wrap>
              <EuiFlexItem>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>

            <EuiSpacer size="m" />

            <EuiFlexGroup direction="row" gutterSize="s" wrap>
              <EuiFlexItem>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={true}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>
          </EuiFlexItem>

          <EuiFlexItem>
            {renderTitle(
              'FlexGroup(responsive=true, wrap=false), FlexItem(grow=false), ButtonGroup(wrap=false)'
            )}

            <EuiFlexGroup direction="row" gutterSize="s">
              <EuiFlexItem grow={false}>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={false}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={false}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>
          </EuiFlexItem>

          <EuiFlexItem>
            {renderTitle(
              'FlexGroup(responsive=true, wrap=true), FlexItem(grow=false), ButtonGroup(wrap=false)'
            )}

            <EuiFlexGroup direction="row" gutterSize="s" wrap>
              <EuiFlexItem grow={false}>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={false}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={false}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>

            <EuiSpacer size="m" />

            <EuiFlexGroup direction="row" gutterSize="s" wrap>
              <EuiFlexItem grow={false}>
                <EuiFieldSearch compressed fullWidth />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={false}>
                  {buttons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonGroup {...args} wrap={false}>
                  {iconButtons}
                </EuiButtonGroup>
              </EuiFlexItem>
              <EuiButton size="s">Action</EuiButton>
            </EuiFlexGroup>
          </EuiFlexItem>

          {/* CUSTOM */}

          <EuiFlexItem>
            {renderTitle('Custom css - button group no shrink')}
            <div
              css={({ euiTheme }) => css`
                display: flex;
                flex-wrap: wrap;
                gap: ${euiTheme.size.s};
              `}
            >
              <EuiFieldSearch compressed />

              <EuiButtonGroup {...args} wrap={false}>
                {iconButtons}
              </EuiButtonGroup>

              <EuiButtonGroup
                {...args}
                css={css`
                  flex-shrink: 0;
                `}
              >
                {buttons}
              </EuiButtonGroup>

              <EuiButton size="s">Action</EuiButton>
            </div>
          </EuiFlexItem>
        </EuiFlexGroup>
      </>
    );
  },
};

const StatefulButtonGroupSelection = ({
  children,
  type,
  idSelected: _idSelected,
  idToSelectedMap: _idToSelectedMap,
  ...props
}: Omit<EuiButtonGroupChildrenProps, 'idSelected' | 'idToSelectedMap'> & {
  idSelected?: string;
  idToSelectedMap?: Record<string, boolean>;
}) => {
  const [idSelected, setIdSelected] = useState(_idSelected ?? '');
  const [idToSelectedMap, setIdToSelectedMap] = useState(
    _idToSelectedMap ?? {}
  );

  if (type === 'multi') {
    return (
      <EuiButtonGroup
        {...(props as Extract<EuiButtonGroupChildrenProps, { type: 'multi' }>)}
        variant="selection"
        type="multi"
        idToSelectedMap={idToSelectedMap}
        onChange={(id) =>
          setIdToSelectedMap((prev) => ({ ...prev, [id]: !prev[id] }))
        }
      >
        {children}
      </EuiButtonGroup>
    );
  }

  return (
    <EuiButtonGroup
      {...props}
      variant="selection"
      type="single"
      idSelected={idSelected}
      onChange={(id) => setIdSelected(id)}
    >
      {children}
    </EuiButtonGroup>
  );
};
