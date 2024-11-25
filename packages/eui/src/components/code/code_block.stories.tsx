/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj, ReactRenderer } from '@storybook/react';
import type { PlayFunctionContext } from '@storybook/csf';

import { within } from '../../../.storybook/test';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

import { EuiCodeBlock, EuiCodeBlockProps } from './code_block';
import { expect, userEvent } from '@storybook/test';

const meta: Meta<EuiCodeBlockProps> = {
  title: 'Editors & Syntax/EuiCodeBlock',
  component: EuiCodeBlock,
  argTypes: {
    lineNumbers: { control: 'boolean' },
    overflowHeight: { control: 'number' },
  },
  args: {
    // Component defaults
    fontSize: 's',
    paddingSize: 'l',
    whiteSpace: 'pre-wrap',
    lineNumbers: false,
    isCopyable: false,
    isVirtualized: false,
    transparentBackground: false,
  },
};

export default meta;
type Story = StoryObj<EuiCodeBlockProps>;

const htmlCode = `<p>
  <!-- Hello world -->
</p>`;

const pythonCode = `import antigravity

def procrastinate():
    print("I'll do it later...")

procrastinate()`;

export const Playground: Story = {
  args: {
    children: htmlCode,
  },
};

export const StartValue: Story = {
  args: {
    children: htmlCode,
    language: 'html',
    lineNumbers: {
      start: 10,
    },
  },
  argTypes: {
    lineNumbers: { table: { disable: true } },
  },
};

export const HighlightedLines: Story = {
  args: {
    children: htmlCode,
    language: 'html',
    lineNumbers: {
      highlight: '1,3',
    },
  },
  argTypes: {
    lineNumbers: { table: { disable: true } },
  },
};

export const Annotations: Story = {
  args: {
    children: htmlCode,
    language: 'html',
    lineNumbers: {
      annotations: {
        2: 'Hello world',
      },
    },
  },
  argTypes: {
    lineNumbers: { table: { disable: true } },
  },
  parameters: {
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
  play: async ({ canvasElement }: PlayFunctionContext<ReactRenderer>) => {
    const canvas = within(canvasElement);
    const annotationButton = await canvas.findByRole('button', {
      name: 'Click to view a code annotation for line 2',
    });

    userEvent.click(annotationButton);

    const dialog = await canvas.findByRole('dialog');

    expect(dialog).toHaveTextContent('Hello world');
  },
};

/**
 * VRT tests only
 */

export const SmallFontSize: Story = {
  tags: ['vrt-only'],
  args: {
    children: htmlCode,
    language: 'html',
    fontSize: 's',
  },
};

export const MediumFontSize: Story = {
  tags: ['vrt-only'],
  args: {
    children: htmlCode,
    language: 'html',
    fontSize: 'm',
  },
};

export const LargeFontSize: Story = {
  tags: ['vrt-only'],
  args: {
    children: htmlCode,
    language: 'html',
    fontSize: 'l',
  },
};

export const NoPaddingSize: Story = {
  tags: ['vrt-only'],
  args: {
    children: htmlCode,
    language: 'html',
    paddingSize: 'none',
  },
};

export const SmallPaddingSize: Story = {
  tags: ['vrt-only'],
  args: {
    children: htmlCode,
    language: 'html',
    paddingSize: 's',
  },
};

export const MediumPaddingSize: Story = {
  tags: ['vrt-only'],
  args: {
    children: htmlCode,
    language: 'html',
    paddingSize: 'm',
  },
};

export const LargePaddingSize: Story = {
  tags: ['vrt-only'],
  args: {
    children: htmlCode,
    language: 'html',
    paddingSize: 'l',
  },
};

export const OverflowHeight: Story = {
  tags: ['vrt-only'],
  args: {
    children: pythonCode,
    language: 'python',
    overflowHeight: 100,
  },
};

export const TransparentBackground: Story = {
  tags: ['vrt-only'],
  args: {
    children: htmlCode,
    language: 'html',
    transparentBackground: true,
  },
};
