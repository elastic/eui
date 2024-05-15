/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

faker.seed(42);

const listItems = Array.from({ length: 3 }, () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.sentences(2),
}));
import { EuiDescriptionListProps } from './description_list_types';
import { EuiDescriptionList } from './description_list';

const meta: Meta<EuiDescriptionListProps> = {
  title: 'Display/EuiDescriptionList',
  component: EuiDescriptionList,
  args: {
    align: 'left',
    compressed: false,
    textStyle: 'normal',
    type: 'row',
    rowGutterSize: 's',
    columnGutterSize: 's',
  },
};

export default meta;
type Story = StoryObj<EuiDescriptionListProps>;

export const Playground: Story = {
  args: {
    listItems,
  },
};

export const Column: Story = {
  parameters: {
    controls: {
      include: [
        'align',
        'columngutterSize',
        'columnWidths',
        'compressed',
        'descriptionProps',
        'textStyle',
        'titleProps',
        'type',
      ],
    },
  },
  args: {
    listItems,
    type: 'column',
  },
};

export const Row: Story = {
  parameters: {
    controls: {
      include: [
        'align',
        'compressed',
        'descriptionProps',
        'rowGutterSize',
        'textStyle',
        'titleProps',
        'type',
      ],
    },
  },
  args: {
    listItems,
    type: 'row',
  },
};

export const Inline: Story = {
  parameters: {
    controls: {
      include: ['align', 'compressed', 'descriptionProps', 'titleProps'],
    },
  },
  args: {
    listItems,
    type: 'inline',
  },
};
