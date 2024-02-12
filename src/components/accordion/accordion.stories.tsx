/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiAccordion, EuiAccordionProps } from './accordion';

const meta: Meta<EuiAccordionProps> = {
  title: 'EuiAccordion',
  component: EuiAccordion,
  argTypes: {
    forceState: {
      options: [undefined, 'closed', 'open'],
    },
  },
  args: {
    // Component defaults
    role: 'group',
    element: 'div',
    buttonElement: 'button',
    arrowDisplay: 'left',
    borders: 'none',
    initialIsOpen: false,
    isDisabled: false,
    isLoading: false,
    isLoadingMessage: '',
  },
};

export default meta;
type Story = StoryObj<EuiAccordionProps>;

export const Playground: Story = {
  args: {
    buttonContent: 'Accordion toggle content',
    children: 'Accordion content',
  },
};
