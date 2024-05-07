/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { useEuiTextDiff, EuiTextDiffProps } from './text_diff';

const meta: Meta<EuiTextDiffProps> = {
  title: 'Utilities/useEuiTextDiff',
  // casting here to match story output while preserving component docgen information
  component: useEuiTextDiff as unknown as () => ReactElement,
  argTypes: {
    insertComponent: { control: 'text' },
    deleteComponent: { control: 'text' },
    sameComponent: { control: 'text' },
  },
  args: {
    insertComponent: 'ins',
    deleteComponent: 'del',
    beforeText: '',
    afterText: '',
    timeout: 0.1,
    // @ts-ignore - set up for easier testing/QA
    sameComponent: '',
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiTextDiffProps>;

export const Playground: Story = {
  args: {
    beforeText: 'Lorem dolor sit ipsum.',
    afterText: 'Lorem ipsum dolor sit.',
  },
  render: (args) => <StatefulPlayground {...args} />,
};

const StatefulPlayground = ({
  beforeText,
  afterText,
  ...rest
}: EuiTextDiffProps) => {
  const [rendered] = useEuiTextDiff({
    beforeText,
    afterText,
    ...rest,
  });

  return rendered;
};
