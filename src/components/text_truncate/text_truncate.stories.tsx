/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiHighlight, EuiMark } from '../../components';

import { EuiTextTruncate, EuiTextTruncateProps } from './text_truncate';

const meta: Meta<EuiTextTruncateProps> = {
  title: 'EuiTextTruncate',
  component: EuiTextTruncate,
};

export default meta;
type Story = StoryObj<EuiTextTruncateProps>;

const componentDefaults = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  truncation: 'end',
} as const;

export const Playground: Story = {
  render: (props) => (
    <div css={{ inlineSize: props.width }}>
      <EuiTextTruncate {...props} />
    </div>
  ),
  args: {
    ...componentDefaults,
    truncationOffset: 0,
    ellipsis: '...',
    width: 200,
  },
};

export const ResizeObserver: Story = {
  render: (props) => (
    <>
      <i>
        Drag the corner of the text to resize, and look in the console log to
        see the reported width
      </i>
      <br />
      <br />
      {/* // Width here is just for testing resize behavior and isn't meant to be RTL compliant */}
      <div css={{ width: 200, overflow: 'auto', resize: 'horizontal' }}>
        <EuiTextTruncate {...props} />
      </div>
    </>
  ),
  args: {
    ...componentDefaults,
    onResize: console.log,
  },
  argTypes: {
    width: { control: false },
  },
};

export const StartEndAnchorForSearch: Story = {
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [highlight, setHighlight] = useState('');
    const highlightStartPosition = props.text
      .toLowerCase()
      .indexOf(highlight.toLowerCase());
    const highlightCenterPosition =
      highlightStartPosition + Math.floor(highlight.length / 2);

    return (
      <>
        <i>Type into the below textarea to highlight, e.g. "consec"</i>
        <br />
        <input
          type="textarea"
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
        />
        <br />
        <br />
        <div css={{ inlineSize: props.width }}>
          <EuiTextTruncate
            {...props}
            truncation="startEnd"
            startEndAnchor={highlightCenterPosition}
          >
            {(text) => (
              <>
                {text.length > highlight.length ? (
                  <EuiHighlight search={highlight}>{text}</EuiHighlight>
                ) : (
                  <EuiMark>{text}</EuiMark>
                )}
              </>
            )}
          </EuiTextTruncate>
        </div>
      </>
    );
  },
  args: {
    ...componentDefaults,
    width: 200,
    truncation: 'startEnd',
    startEndAnchor: 30,
  },
  argTypes: {
    // Disable uncontrollable props
    truncation: { table: { disable: true } },
    startEndAnchor: { table: { disable: true } },
    // Disable props that aren't useful for this this demo
    truncationOffset: { table: { disable: true } },
    children: { table: { disable: true } },
    onResize: { table: { disable: true } },
  },
};
