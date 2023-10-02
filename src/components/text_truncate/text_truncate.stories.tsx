/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';
import {
  hideStorybookControls,
  disableStorybookControls,
} from '../../../.storybook/utils';

import { EuiHighlight, EuiMark } from '../../components';

import { EuiTextTruncate, EuiTextTruncateProps } from './text_truncate';

const meta: Meta<EuiTextTruncateProps> = {
  title: 'EuiTextTruncate',
  component: EuiTextTruncate,
  argTypes: {
    truncationOffset: { if: { arg: 'truncation', neq: 'startEnd' } }, // Should also not show on `middle`, but Storybook doesn't currently support multiple if conditions :(
    truncationPosition: { if: { arg: 'truncation', eq: 'startEnd' } },
  },
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    // Component defaults
    truncation: 'end',
    ellipsis: '…',
  },
};

export default meta;
type Story = StoryObj<EuiTextTruncateProps>;

export const Playground: Story = {
  render: (props) => (
    <div css={{ inlineSize: props.width }}>
      <EuiTextTruncate {...props} />
    </div>
  ),
  args: {
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
      <div
        css={css`
          overflow: auto;
          resize: horizontal;
          resize: inline; /* not yet supported by all browsers, hence the fallback */
          inline-size: 200px;
        `}
      >
        <EuiTextTruncate {...props} />
      </div>
    </>
  ),
  args: {
    onResize: console.log,
  },
  argTypes: disableStorybookControls<EuiTextTruncateProps>(['width']),
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
            truncationPosition={highlightCenterPosition}
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
    width: 200,
    truncation: 'startEnd',
    truncationPosition: 30,
  },
  argTypes: hideStorybookControls<EuiTextTruncateProps>([
    // Disable uncontrollable props
    'truncation',
    'truncationPosition',
    // Disable props that aren't useful for this this demo
    'truncationOffset',
    'children',
    'onResize',
  ]),
};
