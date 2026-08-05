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
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiPanel } from '../panel';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';
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

const ADAPTIVE_SNIPPET = `import { useEuiTheme } from '@elastic/eui';
import { shoppingCart } from '@elastic/eui-illustrations';

// One string. The ancestor \`color-scheme\` picks which \`light-dark()\` value
// applies. Pin it (\`light\`/\`dark\`), follow the OS \`prefers-color-scheme\`
// (\`light dark\`), or mirror the EUI theme (\`EuiProvider\`).
const PROVIDER_SCHEME = 'EuiProvider';
const SYSTEM_SCHEME = 'system';
const schemes = ['light', 'dark', PROVIDER_SCHEME, SYSTEM_SCHEME] as const;

const AdaptiveIllustrations = () => {
  const { colorMode } = useEuiTheme();
  const providerScheme = colorMode === 'DARK' ? 'dark' : 'light';

  const resolveScheme = (scheme) => {
    if (scheme === PROVIDER_SCHEME) return providerScheme;
    if (scheme === SYSTEM_SCHEME) return 'light dark';
    return scheme;
  };

  return schemes.map((scheme) => (
    <div
      key={scheme}
      style={{ colorScheme: resolveScheme(scheme) }}
      dangerouslySetInnerHTML={{ __html: shoppingCart.adaptive ?? shoppingCart.light }}
    />
  ));
};`;

/**
 * Most assets ship a single \`adaptive\` SVG whose colors resolve via CSS
 * \`light-dark()\`. \`EuiIllustration\` sets \`color-scheme\` from the EUI theme;
 * this story sets it manually so the same string renders pinned \`light\`,
 * pinned \`dark\`, following \`EuiProvider\`, and following the OS
 * (\`light dark\`, via \`prefers-color-scheme\`) at once.
 * \`aerospace\` has no \`adaptive\` variant and cannot adapt.
 */
export const Adaptive: Story = {
  parameters: {
    vrt: { skip: true },
    codeSnippet: { snippet: ADAPTIVE_SNIPPET },
    ...hideAllStorybookControls,
  },
  render: () => <AdaptiveExample />,
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

// Sentinels resolved to real CSS in `AdaptiveExample`: `EuiProvider` to the
// live theme color mode (a module-level const can't read `useEuiTheme()`), and
// `system` to `light dark` (the value that follows `prefers-color-scheme`).
const PROVIDER_SCHEME = 'EuiProvider';
const SYSTEM_SCHEME = 'system';

const ADAPTIVE_COLOR_SCHEMES = [
  { scheme: 'light', label: 'color-scheme: light' },
  { scheme: 'dark', label: 'color-scheme: dark' },
  { scheme: PROVIDER_SCHEME, label: 'color-scheme: EuiProvider' },
  { scheme: SYSTEM_SCHEME, label: 'color-scheme: system' },
] as const;

const AdaptiveCard = ({
  label,
  illustration,
  colorScheme,
}: {
  label: string;
  illustration: EuiIllustrationSource;
  colorScheme: string;
}) => (
  <EuiPanel
    hasBorder
    paddingSize="m"
    css={css`
      color-scheme: ${colorScheme};
    `}
  >
    <EuiText size="xs" color="subdued">
      <code>{label}</code>
    </EuiText>
    <EuiSpacer size="s" />
    <div
      css={css`
        inline-size: 200px;
        padding: 8px;
        border-radius: 4px;
        /* Hardcoded so the surface follows color-scheme, not the EUI theme. */
        background: light-dark(#ffffff, #0b1628);
      `}
      dangerouslySetInnerHTML={{
        __html: illustration.adaptive ?? illustration.light,
      }}
    />
  </EuiPanel>
);

const AdaptiveExample = () => {
  const { colorMode } = useEuiTheme();
  const providerScheme = colorMode === 'DARK' ? 'dark' : 'light';

  const resolveScheme = (scheme: string) => {
    if (scheme === PROVIDER_SCHEME) return providerScheme;
    if (scheme === SYSTEM_SCHEME) return 'light dark';
    return scheme;
  };
  const resolveLabel = (scheme: string, label: string) => {
    if (scheme === PROVIDER_SCHEME) return `${label} (${providerScheme})`;
    if (scheme === SYSTEM_SCHEME) return `${label} (light dark)`;
    return label;
  };

  return (
    <EuiFlexGroup direction="column" gutterSize="l">
      <EuiFlexItem grow={false}>
        <EuiText size="s">
          <p>
            One <code>shopping-cart.adaptive</code> string, rendered under
            several <code>color-scheme</code> values. No theme change or
            re-render — CSS <code>light-dark()</code> does the work. The{' '}
            <code>EuiProvider</code> card mirrors what{' '}
            <strong>EuiIllustration</strong> does: it follows the EUI color mode
            (toggle the theme in the Storybook toolbar). The <code>system</code>{' '}
            card resolves to <code>color-scheme: light dark</code>, following
            the OS/browser <code>prefers-color-scheme</code> instead, regardless
            of the EUI theme.
          </p>
        </EuiText>
        <EuiSpacer size="s" />
        <EuiFlexGroup gutterSize="m">
          {ADAPTIVE_COLOR_SCHEMES.map(({ scheme, label }) => (
            <EuiFlexItem key={label} grow={false}>
              <AdaptiveCard
                label={resolveLabel(scheme, label)}
                illustration={illustrations.shoppingCart}
                colorScheme={resolveScheme(scheme)}
              />
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiText size="s">
          <p>
            <code>aerospace</code> has no <code>adaptive</code> variant, so it
            falls back to the discrete <code>light</code> markup and does not
            respond to <code>color-scheme</code> (shown following{' '}
            <code>EuiProvider</code>).
          </p>
        </EuiText>
        <EuiSpacer size="s" />
        <AdaptiveCard
          label="aerospace.adaptive ?? light"
          illustration={illustrations.aerospace}
          colorScheme={providerScheme}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

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
