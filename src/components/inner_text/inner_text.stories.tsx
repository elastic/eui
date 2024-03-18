/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiInnerText, EuiInnerTextProps } from './inner_text';
import { EuiSpacer } from '../spacer';
import { EuiCode } from '../code';

const meta: Meta<EuiInnerTextProps> = {
  title: 'Utilities/EuiInnerText',
  component: EuiInnerText,
};

export default meta;
type Story = StoryObj<EuiInnerTextProps>;

export const Playground: Story = {
  parameters: {
    docs: {
      source: { language: 'tsx' },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    fallback: { control: { type: 'text' } },
  },
  args: {
    children: 'Simple text' as unknown as any, // overwrite the type to allow for a useable playground
  },
  render: ({ children, fallback }) => {
    const content = children as unknown as string;

    return (
      <EuiInnerText>
        {(ref, innerText) => (
          <>
            <span ref={ref} title={innerText}>
              {content || fallback}
            </span>
            <EuiSpacer />
            <p className="eui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <EuiCode>{innerText}</EuiCode>
          </>
        )}
      </EuiInnerText>
    );
  },
};
