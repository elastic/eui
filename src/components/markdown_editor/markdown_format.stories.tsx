/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  hideStorybookControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { EuiMarkdownFormat, EuiMarkdownFormatProps } from './markdown_format';
import {
  defaultParsingPlugins,
  defaultProcessingPlugins,
} from './plugins/markdown_default_plugins';
import { ALIGNMENTS } from '../text/text_align';

const initialContent = `## Hello world!

Basic "GitHub flavored" markdown will work as you'd expect.

The editor also ships with some built in plugins. For example it can handle checkboxes. Notice how they toggle state even in the preview mode.

- [ ] Checkboxes
- [x] Can be filled
- [ ] Or empty

It can also handle emojis! :smile:

And it can render !{tooltip[tooltips like this](Look! I'm a very helpful tooltip content!)}
`;

const meta: Meta<EuiMarkdownFormatProps> = {
  title: 'Editors & Syntax/EuiMarkdownEditor/EuiMarkdownFormat',
  component: EuiMarkdownFormat,
  argTypes: {
    color: { control: { type: 'text' } },
    grow: { control: { type: 'boolean' } },
    textAlign: {
      control: { type: 'radio' },
      options: [undefined, ...ALIGNMENTS],
    },
  },
  // Component defaults
  args: {
    textSize: 'm',
    parsingPluginList: defaultParsingPlugins,
    processingPluginList: defaultProcessingPlugins,
  },
};

export default meta;
type Story = StoryObj<EuiMarkdownFormatProps>;

export const Playground: Story = {
  // TODO: move this to the component level once utils are updated to fully support merged configs (#7583)
  argTypes: {
    ...moveStorybookControlsToCategory(
      ['textAlign', 'color', 'grow'],
      'EuiText props'
    ),
    ...hideStorybookControls(['aria-label']),
  },
  args: {
    children: initialContent,
  },
};
