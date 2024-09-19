/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { EuiText } from '../text';
import {
  EuiResizableContainer,
  EuiResizableContainerProps,
} from './resizable_container';

faker.seed(42);

const placeholderText = (
  <>
    <p>{faker.lorem.sentences(5)}</p>
    <p>{faker.lorem.sentences(5)}</p>
    <p>{faker.lorem.sentences(5)}</p>
  </>
);

const TwoColumns: EuiResizableContainerProps['children'] = (
  EuiResizablePanel,
  EuiResizableButton
) => (
  <>
    <EuiResizablePanel initialSize={50} tabIndex={0}>
      <EuiText>{placeholderText}</EuiText>
    </EuiResizablePanel>

    <EuiResizableButton accountForScrollbars="both" />

    <EuiResizablePanel initialSize={50} tabIndex={0}>
      <EuiText>{placeholderText}</EuiText>
    </EuiResizablePanel>
  </>
);

const ThreeColumns: EuiResizableContainerProps['children'] = (
  EuiResizablePanel,
  EuiResizableButton
) => (
  <>
    <EuiResizablePanel initialSize={40} tabIndex={0}>
      <EuiText>{placeholderText}</EuiText>
    </EuiResizablePanel>

    <EuiResizableButton accountForScrollbars="both" />

    <EuiResizablePanel initialSize={40} tabIndex={0}>
      <EuiText>{placeholderText}</EuiText>
    </EuiResizablePanel>

    <EuiResizableButton accountForScrollbars="both" />

    <EuiResizablePanel initialSize={20} tabIndex={0}>
      <EuiText>{placeholderText}</EuiText>
    </EuiResizablePanel>
  </>
);

const WithMinSize: EuiResizableContainerProps['children'] = (
  EuiResizablePanel,
  EuiResizableButton
) => (
  <>
    <EuiResizablePanel initialSize={50} minSize="200px" tabIndex={0}>
      <EuiText>
        {placeholderText}
        {placeholderText}
        {placeholderText}
      </EuiText>
    </EuiResizablePanel>

    <EuiResizableButton accountForScrollbars="both" />

    <EuiResizablePanel initialSize={50} minSize="200px" tabIndex={0}>
      <EuiText>
        {placeholderText}
        {placeholderText}
        {placeholderText}
      </EuiText>
    </EuiResizablePanel>
  </>
);

const SingleCollapsible: EuiResizableContainerProps['children'] = (
  EuiResizablePanel,
  EuiResizableButton
) => (
  <>
    <EuiResizablePanel mode="collapsible" initialSize={30}>
      <EuiText>
        {placeholderText}
        {placeholderText}
        {placeholderText}
      </EuiText>
    </EuiResizablePanel>

    <EuiResizableButton accountForScrollbars="both" />

    <EuiResizablePanel initialSize={70} mode="main">
      <EuiText>
        {placeholderText}
        {placeholderText}
        {placeholderText}
      </EuiText>
    </EuiResizablePanel>
  </>
);

const MultiCollapsible: EuiResizableContainerProps['children'] = (
  EuiResizablePanel,
  EuiResizableButton
) => (
  <>
    <EuiResizablePanel initialSize={20} mode="collapsible">
      <EuiText>
        {placeholderText}
        {placeholderText}
        {placeholderText}
      </EuiText>
    </EuiResizablePanel>

    <EuiResizableButton accountForScrollbars="both" />

    <EuiResizablePanel initialSize={60} mode="main">
      <EuiText>
        {placeholderText}
        {placeholderText}
        {placeholderText}
      </EuiText>
    </EuiResizablePanel>

    <EuiResizableButton accountForScrollbars="both" />

    <EuiResizablePanel initialSize={20} mode="collapsible">
      <EuiText>
        {placeholderText}
        {placeholderText}
        {placeholderText}
      </EuiText>
    </EuiResizablePanel>
  </>
);

const meta: Meta<EuiResizableContainerProps> = {
  title: 'Layout/EuiResizableContainer/EuiResizableContainer',
  component: EuiResizableContainer,
  parameters: {
    codeSnippet: {
      // TODO: enable once render functions are supported
      skip: true,
    },
  },
  args: {
    direction: 'horizontal',
  },
};
enableFunctionToggleControls(meta, [
  'onPanelWidthChange',
  'onToggleCollapsed',
  'onResizeStart',
  'onResizeEnd',
]);

export default meta;
type Story = StoryObj<EuiResizableContainerProps>;

export const Playground: Story = {
  argTypes: {
    children: {
      control: 'select',
      options: ['2 columns', '3 columns', 'With MinSize'],
      description:
        'Select an option to show examples using EuiResizablePanel and EuiResizableButton',
      mapping: {
        '2 columns': TwoColumns,
        '3 columns': ThreeColumns,
        'With MinSize': WithMinSize,
      },
    },
  },
  args: {
    children: '2 columns' as unknown as any, // overwriting expected type to use children select control instead of function
    style: { height: '50vh' },
  },
};

export const CollapsiblePanels: Story = {
  argTypes: {
    children: {
      control: 'radio',
      options: ['Single', 'Multiple'],
      description:
        'Select an option to show examples of EuiResizablePanel with mode={"collapsible" | "main"}. Click the resizable button element to collapse a column.',
      mapping: {
        Single: SingleCollapsible,
        Multiple: MultiCollapsible,
      },
    },
  },
  args: {
    children: 'Single' as unknown as any,
    style: { height: '50vh' },
  },
};
