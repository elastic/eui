/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SPREAD_STORY_ARGS_MARKER } from '../../../.storybook/addons/code-snippet/constants';

import { EuiPanel } from '../panel';
import { EuiCode } from '../code';

import { EuiProvider, EuiProviderProps } from './provider';

const meta: Meta<EuiProviderProps<{}>> = {
  title: 'Theming/EuiProvider',
  component: EuiProvider,
  argTypes: {
    colorMode: {
      control: 'select',
      options: [
        undefined,
        'light',
        'dark',
        'inverse',
        'LIGHT',
        'DARK',
        'INVERSE',
      ],
    },
    highContrastMode: {
      control: 'select',
      options: [undefined, true, false],
    },
    modify: { control: 'object' },
    componentDefaults: { control: 'object' },
    globalStyles: {
      control: 'boolean',
      mapping: { true: undefined, false: false },
    },
    utilityClasses: {
      control: 'boolean',
      mapping: { true: undefined, false: false },
    },
  },
  parameters: {
    codeSnippet: {
      snippet: `
      <EuiProvider ${SPREAD_STORY_ARGS_MARKER} />
      `,
    },
  },
};

export default meta;
type Story = StoryObj<EuiProviderProps<{}>>;

export const Playground: Story = {
  render: () => (
    <>
      <EuiPanel>
        Setting <EuiCode>globalStyles</EuiCode> to false will remove all body
        and font styles, but retain component styles (e.g. this{' '}
        <EuiCode>EuiPanel</EuiCode>).
      </EuiPanel>
      <EuiPanel color="transparent" className="eui-textCenter">
        Setting <EuiCode>utilityClasses</EuiCode> to false will remove the
        centering on this text, which has <EuiCode>.eui-textCenter</EuiCode>{' '}
        applied.
      </EuiPanel>
    </>
  ),
};

export const SystemDefaults: Story = {
  parameters: {
    controls: {
      include: ['colorMode', 'highContrastMode'],
    },
  },
  argTypes: {
    colorMode: {
      control: 'radio',
      options: [undefined, 'light', 'dark'],
    },
    highContrastMode: {
      control: 'radio',
      options: [undefined, false, true],
    },
  },
  args: {
    colorMode: undefined,
    highContrastMode: undefined,
  },
  // _args is needed (even if unused) for controls.include to work as expected
  // see https://github.com/storybookjs/storybook/issues/23343
  render: (_args) => (
    <EuiPanel>
      When undefined, <EuiCode>colorMode</EuiCode> and{' '}
      <EuiCode>highContrastMode</EuiCode> will inherit from the user's OS/system
      settings.
    </EuiPanel>
  ),
};

export const FontDefaultUnits: Story = {
  parameters: {
    controls: { include: ['modify'] },
  },
  args: {
    modify: { font: { defaultUnits: 'rem' } },
  },
  render: (_args) => (
    <>
      Change <strong>`modify.font.defaultUnits`</strong> to{' '}
      <strong>`rem`, `em`, or `px`</strong> and then inspect this demo's `html`
      CSS
    </>
  ),
};
