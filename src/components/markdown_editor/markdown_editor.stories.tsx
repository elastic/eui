/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiMarkdownEditor, EuiMarkdownEditorProps } from './markdown_editor';
import {
  defaultParsingPlugins,
  defaultProcessingPlugins,
  defaultUiPlugins,
} from './plugins/markdown_default_plugins';
import { MODE_EDITING, MODE_VIEWING } from './markdown_modes';

const initialContent = `## Hello world!

Basic "GitHub flavored" markdown will work as you'd expect.

The editor also ships with some built in plugins. For example it can handle checkboxes. Notice how they toggle state even in the preview mode.

- [ ] Checkboxes
- [x] Can be filled
- [ ] Or empty

It can also handle emojis! :smile:

And it can render !{tooltip[tooltips like this](Look! I'm a very helpful tooltip content!)}
`;

const meta: Meta<EuiMarkdownEditorProps> = {
  title: 'Editors & Syntax/EuiMarkdownEditor/EuiMarkdownEditor',
  component: EuiMarkdownEditor,
  // Component defaults
  args: {
    height: 250,
    maxHeight: 500,
    autoExpandPreview: true,
    parsingPluginList: defaultParsingPlugins,
    processingPluginList: defaultProcessingPlugins,
    uiPlugins: defaultUiPlugins,
    errors: [],
    initialViewMode: MODE_EDITING,
    dropHandlers: [],
  },
};

export default meta;
type Story = StoryObj<EuiMarkdownEditorProps>;

export const Playground: Story = {
  args: {
    value: initialContent,
  },
};

export const ViewMode: Story = {
  args: {
    value: initialContent,
    initialViewMode: MODE_VIEWING,
  },
};

export const Errors: Story = {
  args: {
    value: initialContent,
    errors: ['An error happened.', 'Woops, another error happened.'],
  },
};
