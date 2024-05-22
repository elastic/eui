/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../../.storybook/utils';
import { EuiIcon } from '../../icon';
import { EuiFieldSearch, EuiFieldSearchProps } from './field_search';

const meta: Meta<EuiFieldSearchProps> = {
  title: 'Forms/EuiFieldSearch',
  component: EuiFieldSearch,
  argTypes: {
    append: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Appened',
        undefined: undefined,
      },
    },
    prepend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Prepended',
        undefined: undefined,
      },
    },
  },
  args: {
    isLoading: false,
    incremental: false,
    compressed: false,
    isClearable: true,
    // set up for easier testing/QA
    fullWidth: false,
    isInvalid: false,
    id: '',
    name: '',
    placeholder: '',
  },
};
// adding onChange for visibility
enableFunctionToggleControls(meta, ['onSearch', 'onChange']);
disableStorybookControls(meta, ['inputRef']);

export default meta;
type Story = StoryObj<EuiFieldSearchProps>;

export const Playground: Story = {
  args: {},
};
