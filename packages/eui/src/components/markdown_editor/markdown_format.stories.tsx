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
import { ALIGNMENTS } from '../text/text_align';

const initialContent = `## Hello world!

Basic "GitHub flavored" markdown will work as you'd expect.

The editor also ships with some built in plugins. For example it can handle checkboxes. Notice how they toggle state even in the preview mode.

- [ ] Checkboxes
- [x] Can be filled
- [ ] Or empty

| Emoji | Color |
| ------ | ----------- |
| :rose:   | Red |
| :apple: | Red |
| :green_heart:    | Green |


It can also handle emojis! :smile:

And it can render !{tooltip[tooltips like this](Look! I'm a very helpful tooltip content!)}
`;

const meta: Meta<EuiMarkdownFormatProps> = {
  title: 'Editors & Syntax/EuiMarkdownFormat',
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
  },
};
moveStorybookControlsToCategory(
  meta,
  ['textAlign', 'color', 'grow'],
  'EuiText props'
);
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiMarkdownFormatProps>;

export const Playground: Story = {
  args: {
    children: initialContent,
  },
};

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  args: {
    children: `# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


### Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


### Horizontal Rules

___

---

***


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

* Item 1
* Item 2
  * Item 2a
  * Item 2b

Ordered

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b


## Task List

- [x] Create a new project
- [x] Give your project a name
* [ ] Add a new column


## Code

Inline \`<Code />\` is awesome!

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`


## Tables

| Option | Description |
| ------: | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica`,
  },
};

export const TextProps: Story = {
  tags: ['vrt-only'],
  args: {
    ...KitchenSink.args,
    color: 'danger',
    textSize: 'xs',
  },
};

export const HighContrast: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};
