/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj, StoryContext } from '@storybook/react';
import { css } from '@emotion/react';

import { illustrations } from '@elastic/eui-illustrations';

import { hideAllStorybookControls } from '../../../.storybook/utils';
import { useEuiTheme } from '../../services';
import { EuiButton } from '../button';
import { EuiEmptyPrompt } from '../empty_prompt';
import {
  EuiIllustration,
  EuiIllustrationProps,
  EuiIllustrationSource,
} from './illustration';

const illustrationIds = Object.keys(illustrations);

const meta: Meta<EuiIllustrationProps> = {
  title: 'Display/EuiIllustration',
  component: EuiIllustration,
  argTypes: {
    type: {
      options: illustrationIds,
      mapping: illustrations,
      control: { type: 'select' },
      description: 'The illustration asset from `@elastic/eui-illustrations`',
    },
  },
  args: {
    // @ts-expect-error - `type` is a string in the `argTypes` to allow for selection in Storybook
    type: illustrationIds[0],
    fullWidth: true,
  },
};

export default meta;
type Story = StoryObj<EuiIllustrationProps>;

export const Playground: Story = {
  parameters: {
    // Illustration assets are owned by the independently versioned
    // `@elastic/eui-illustrations` package, so they shouldn't gate EUI VRT.
    vrt: { skip: true },
    codeSnippet: {
      snippet: (context: StoryContext<EuiIllustrationProps>) => {
        const { type, alt, fullWidth } = context.unmappedArgs;
        const props = [`type={${type}}`];

        if (alt != null) props.push(`alt=${JSON.stringify(alt)}`);
        if (fullWidth) props.push('fullWidth');

        return `import { ${type} } from '@elastic/eui-illustrations';
        
        <EuiIllustration ${props.join(' ')} />`;
      },
    },
  },
  args: {
    fullWidth: false,
  },
};

const EUI_EMPTY_PROMPT_SNIPPET = `
import { dashboard } from '@elastic/eui-illustrations';

<EuiEmptyPrompt
  title={<h2>Create your first dashboard</h2>}
  layout="horizontal"
  color="plain"
  icon={<EuiIllustration type={dashboard} alt="" />}
  body={
    <p>
      Dashboards are a great way to visualize and share your data. Start by
      creating a new dashboard or loading a sample data set.
    </p>
  }
  actions={
    <EuiButton color="primary" fill>
      Create dashboard
    </EuiButton>
  }
/>
`;

export const EmptyPrompt: Story = {
  parameters: {
    vrt: { skip: true },
    codeSnippet: {
      snippet: EUI_EMPTY_PROMPT_SNIPPET,
    },
    ...hideAllStorybookControls,
  },
  render: (_args) => (
    <EuiEmptyPrompt
      title={<h2>Create your first dashboard</h2>}
      layout="horizontal"
      color="plain"
      icon={<EuiIllustration type={illustrations.dashboard} alt="" />}
      body={
        <p>
          Dashboards are a great way to visualize and share your data. Start by
          creating a new dashboard or loading a sample data set.
        </p>
      }
      actions={
        <EuiButton color="primary" fill>
          Create dashboard
        </EuiButton>
      }
    />
  ),
};

/**
 * VRT only
 */

export const Sizing: Story = {
  tags: ['vrt-only'],
  parameters: {
    codeSnippet: { skip: true },
    ...hideAllStorybookControls,
  },
  render: (_args) => <SizingExample />,
};

export const SizingFullWidth: Story = {
  tags: ['vrt-only'],
  parameters: {
    codeSnippet: { skip: true },
    ...hideAllStorybookControls,
  },
  render: (_args) => <SizingExample fullWidth />,
};

/**
 * Helpers
 */

/**
 * Fixture SVG for VRT. Uses a fixed width smaller than the parent container
 * so VRT snapshots can verify sizing without depending on `@elastic/eui-illustrations`.
 */
const vrtFixture: EuiIllustrationSource = {
  id: 'vrt-fixture',
  title: 'VRT fixture',
  light: `<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="100" fill="#6B8CFF" />
    <rect x="80" y="30" width="40" height="40" fill="#FFFFFF" />
  </svg>`,
  dark: `<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="100" fill="#1D2A6E" />
    <rect x="80" y="30" width="40" height="40" fill="#6B8CFF" />
  </svg>`,
};

const VRT_CONTAINER_WIDTH = 360;

const SizingExample = ({ fullWidth = false }: { fullWidth?: boolean }) => {
  const { euiTheme } = useEuiTheme();
  const containerStyles = css`
    inline-size: ${VRT_CONTAINER_WIDTH}px;
    padding: ${euiTheme.size.m};
  `;

  return (
    <div css={containerStyles}>
      <EuiIllustration type={vrtFixture} alt="" fullWidth={fullWidth} />
    </div>
  );
};
