/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

import {
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiSelectableTemplateSitewide,
  EuiIcon,
  EuiAvatar,
  EuiButton,
  EuiFlyout,
  EuiPageTemplate,
} from '../../components';

import { EuiHeader, EuiHeaderProps } from './header';

const meta: Meta<EuiHeaderProps> = {
  title: 'Layout/EuiHeader/EuiHeader',
  component: EuiHeader,
  args: {
    // Component defaults
    position: 'static',
    theme: 'default',
  },
};

export default meta;
type Story = StoryObj<EuiHeaderProps>;

export const Playground: Story = {};

export const Sections: Story = {
  args: {
    position: 'fixed',
    sections: [
      {
        items: [
          <EuiHeaderLogo
            iconType="logoElastic"
            href="#"
            aria-label="Go to home page"
          />,
          <EuiHeaderSectionItemButton aria-label="Spaces menu">
            <EuiAvatar type="space" name="Sales Team" size="s" />
          </EuiHeaderSectionItemButton>,
        ],
        breadcrumbs: [
          { text: 'Management', href: '#' },
          { text: 'Users', href: '#' },
          { text: 'Create' },
        ],
        breadcrumbProps: {
          'aria-label': 'Header sections breadcrumbs',
        },
      },
      {
        items: [
          <EuiHeaderLinks aria-label="App navigation dark theme example">
            <EuiHeaderLink isActive>Docs</EuiHeaderLink>
            <EuiHeaderLink>Code</EuiHeaderLink>
            <EuiHeaderLink iconType="help"> Help</EuiHeaderLink>
          </EuiHeaderLinks>,
          <EuiHeaderSectionItemButton aria-label="Account menu">
            <EuiAvatar name="John Username" size="s" />
          </EuiHeaderSectionItemButton>,
          <EuiHeaderSectionItemButton
            notification="1"
            aria-label="Apps menu with 1 new app"
          >
            <EuiIcon type="apps" size="m" />
          </EuiHeaderSectionItemButton>,
        ],
      },
    ],
  },
};

export const DarkThemeWithSitewideSearch: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['theme'] },
    loki: { chromeSelector: LOKI_SELECTORS.portal }, // Required to capture the open popover
  },
  args: {
    theme: 'dark',
    position: 'fixed',
    sections: [
      {
        items: [
          <EuiHeaderLogo iconType="logoElastic" href="">
            Elastic
          </EuiHeaderLogo>,
        ],
      },
      {
        items: [
          <EuiSelectableTemplateSitewide
            options={[
              {
                label: 'Welcome dashboards',
                icon: {
                  type: 'clock',
                  color: 'subdued',
                },
                avatar: { name: 'Default Space' },
                meta: [
                  {
                    text: 'Dashboard',
                    type: 'application',
                    highlightSearchString: true,
                  },
                ],
              },
            ]}
            searchProps={{
              append: '⌘K',
              compressed: true,
            }}
            popoverButton={
              <EuiHeaderSectionItemButton aria-label="Sitewide search">
                <EuiIcon type="search" size="m" />
              </EuiHeaderSectionItemButton>
            }
            popoverButtonBreakpoints={['xs', 's']}
            popoverProps={{
              isOpen: true,
              repositionOnScroll: true, // Necessary when placing search in a fixed component
            }}
          />,
        ],
      },
      {
        items: [
          <EuiHeaderSectionItemButton
            notification={true}
            aria-label="Notifications: Updates available"
          >
            <EuiIcon type="cheer" size="m" />
          </EuiHeaderSectionItemButton>,
        ],
      },
    ],
  },
};

const MultipleFixedHeadersExample = () => {
  const [fixedHeadersCount, setFixedHeadersCount] = useState(3);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

  const sections = [
    {
      items: [
        <EuiHeaderLogo
          iconType="logoElastic"
          href="#"
          aria-label="Go to home page"
        />,
      ],
    },
    {
      items: [
        <EuiButton size="s" onClick={() => setIsFlyoutOpen(!isFlyoutOpen)}>
          Toggle flyout
        </EuiButton>,
      ],
    },
  ];

  return (
    <EuiPageTemplate>
      <EuiPageTemplate.Section>
        The page template and flyout should automatically adjust dynamically to
        the number of fixed headers on the page.
        {isFlyoutOpen && (
          <EuiFlyout onClose={() => setIsFlyoutOpen(false)}>
            The flyout position and mask should automatically adjust dynamically
            to the number of fixed headers on the page.
          </EuiFlyout>
        )}
        <br />
        <br />
        <EuiButton
          iconType="minusInCircle"
          disabled={fixedHeadersCount <= 0}
          onClick={() => setFixedHeadersCount((count) => count - 1)}
        >
          Remove a fixed header
        </EuiButton>
        &emsp;
        <EuiButton
          fill
          iconType="plusInCircle"
          onClick={() => setFixedHeadersCount((count) => count + 1)}
        >
          Add a fixed header
        </EuiButton>
        <br />
        <br />
        {/* Always render at least one static header so we can toggle/test the flyout */}
        <EuiHeader
          position={fixedHeadersCount ? 'fixed' : 'static'}
          sections={sections}
        />
        {/* Conditionally render additional fixed headers */}
        {Array.from({ length: fixedHeadersCount - 1 }).map((_, i) => (
          <EuiHeader key={i} position="fixed" sections={sections} />
        ))}
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export const MultipleFixedHeaders: Story = {
  parameters: {
    layout: 'fullscreen',
    codeSnippet: {
      resolveChildren: true,
    },
  },
  render: (args) => <MultipleFixedHeadersExample {...args} />,
};
