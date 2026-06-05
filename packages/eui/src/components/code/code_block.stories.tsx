/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj, ReactRenderer } from '@storybook/react';
import type { PlayFunctionContext } from '@storybook/csf';
import { css } from '@emotion/react';

import { within } from '../../../.storybook/test';
import { VRT_SELECTORS, playDecorator } from '../../../.storybook/vrt';
import { mathWithUnits } from '../../global_styling';

import { EuiCodeBlock, EuiCodeBlockProps } from './code_block';
import { expect, userEvent, waitFor } from '@storybook/test';
import { EuiButton } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';

const meta: Meta<EuiCodeBlockProps> = {
  title: 'Editors & Syntax/EuiCodeBlock',
  component: EuiCodeBlock,
  argTypes: {
    lineNumbers: { control: 'object' },
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
    vrt: { selector: VRT_SELECTORS.portal },
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

export const Highlight: Story = {
  tags: ['vrt-only'],
  args: {
    children: `<p>
  <!-- Hello world -->
  Lorem ipsum
</p>`,
    lineNumbers: {
      start: 1,
      highlight: '2-3',
      annotations: { 3: 'A special note about this line' },
    },
  },
};

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: {
    whiteSpace: 'pre',
    language: 'json',
    lineNumbers: {
      start: 32,
      highlight: '32, 34-37, 40',
      annotations: {
        34: (
          <>
            A <b>special</b> note about this line
          </>
        ),
        38: 'Also accepts quick plaintext notes',
      },
    },
    children: `"OriginLocation": [
  {
    "coordinates": [
      -97.43309784,
      37.64989853
    ],
    "type": "Point"
  }
],`,
  },
};

/* This Story verifies that updated data in a virtualized code block is
rendered correctly and not cut-off after scrolling */
export const VirtualizedCodeBlockScrolling: Story = {
  tags: ['vrt-only'],
  parameters: {
    vrt: {
      selector: VRT_SELECTORS.portal,
    },
    codeSnippet: {
      skip: true,
    },
  },
  play: playDecorator(async ({ canvasElement }) => {
    // Wait for the virtualized code block to render the content.
    await waitFor(
      () =>
        expect(
          canvasElement.querySelector('.euiCodeBlock__pre')?.textContent
        ).toContain('Post title'),
      { timeout: 5000 }
    );
  }),
  // Use dark mode to better visualize container boundaries
  globals: { colorMode: 'dark' },
  render: function Render() {
    const [response, setResponse] = useState('{}');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
      setIsLoading(true);
      const data = Array.from({ length: 100 }, (_, i) => ({
        userId: Math.floor(i / 10) + 1,
        id: i + 1,
        title: `Post title ${i + 1}`,
        body: `This is the body of post ${
          i + 1
        }. It contains enough text to make the code block tall enough to require virtualization and scrolling.`,
      }));

      // Delay to keep VRT images more stable
      setTimeout(() => {
        setResponse(JSON.stringify(data, null, 2));
        setIsLoading(false);
      }, 75);
    };

    useEffect(() => {
      handleSubmit();
    }, []);

    useEffect(() => {
      // Scroll the code block after response updates to test if virtualization
      // Calculates the scroll height and position correctly
      const pre = document.querySelector('.euiCodeBlock__pre');
      if (pre) {
        pre.scrollBy({
          top: 75,
        });

        // Trigger a second load after scroll to simulate potential issues
        setTimeout(() => {
          handleSubmit();
        }, 10);
      }
    }, [response]);

    return (
      <EuiFlexGroup
        direction="row"
        gutterSize="m"
        css={({ euiTheme }) => css`
          block-size: calc(
            100vh - ${mathWithUnits(euiTheme.size.base, (x) => x * 2)}
          );
        `}
      >
        <EuiFlexItem grow={false}>
          <EuiButton
            type="submit"
            iconType="sortRight"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiCodeBlock
            language="json"
            fontSize="s"
            paddingSize="m"
            isCopyable={true}
            lineNumbers
            isVirtualized
            overflowHeight="100%"
          >
            {response}
          </EuiCodeBlock>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  },
};
