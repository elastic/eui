/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  disableStorybookControls,
  hideAllStorybookControls,
} from '../../../.storybook/utils';

import { EuiHeader, EuiHeaderSection, EuiHeaderSectionItem } from '../header';
import { EuiPageTemplate } from '../page_template';
import { EuiBottomBar } from '../bottom_bar';
import { EuiFlyout } from '../flyout';
import { EuiButton, EuiButtonEmpty } from '../button';
import { EuiTitle } from '../title';

import {
  EuiCollapsibleNavBeta,
  EuiCollapsibleNavBetaProps,
  EuiCollapsibleNavItemProps,
} from './';
import { EuiSpacer } from '../spacer';

const meta: Meta<EuiCollapsibleNavBetaProps> = {
  title: 'Navigation/EuiCollapsibleNav (beta)/EuiCollapsibleNavBeta',
  component: EuiCollapsibleNavBeta,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    side: {
      control: 'radio',
      options: ['left', 'right'],
    },
  },
  args: {
    // Component defaults
    side: 'left',
    initialIsCollapsed: false,
    width: 248,
  },
};
export default meta;
type Story = StoryObj<EuiCollapsibleNavBetaProps>;

const StatefulCollapsibleNav: FunctionComponent<
  PropsWithChildren & Partial<EuiCollapsibleNavBetaProps>
> = (props) => {
  return (
    <>
      <EuiHeader position="fixed">
        <EuiHeaderSection side={props?.side}>
          <EuiCollapsibleNavBeta {...props} />
        </EuiHeaderSection>
      </EuiHeader>
      <EuiPageTemplate>
        <EuiPageTemplate.Section>Hello world</EuiPageTemplate.Section>
      </EuiPageTemplate>
    </>
  );
};

const renderGroup = (
  groupTitle: string,
  groupItems: EuiCollapsibleNavItemProps[]
) => {
  return [
    {
      renderItem: () => <EuiSpacer size="m" />,
    },
    {
      renderItem: () => (
        <EuiTitle
          size="xxxs"
          className="eui-textTruncate"
          css={({ euiTheme }) => ({
            paddingBlock: euiTheme.size.xs,
            paddingInline: euiTheme.size.s,
          })}
        >
          <div>{groupTitle}</div>
        </EuiTitle>
      ),
    },
    ...groupItems,
  ];
};

const renderSection = (groupItems: EuiCollapsibleNavItemProps[]) => {
  return [
    {
      renderItem: () => <EuiSpacer size="m" />,
    },
    ...groupItems,
  ];
};

export const Playground: Story = {
  render: ({ ...args }) => (
    <StatefulCollapsibleNav {...args}>
      <EuiCollapsibleNavBeta.Body>
        <EuiCollapsibleNavBeta.Item
          title="Elasticsearch"
          icon="logoElasticsearch"
          isCollapsible={false}
          items={[
            { title: 'Get started', href: '#', icon: 'launch' },
            ...renderGroup('Explore', [
              {
                title: 'Discover',
                onClick: () => action('Discover')('clicked!'),
                icon: 'iInCircle',
              },
              { title: 'Dashboards', href: '#', icon: 'iInCircle' },
              { title: 'Visualize library', href: '#', icon: 'iInCircle' },
            ]),
            {
              title: 'Machine learning',
              icon: 'iInCircle',
              items: [
                { title: 'Anomaly detection', href: '#' },
                { title: 'Data frame analytics', href: '#' },
                {
                  title: 'Sub group',
                  items: [
                    { title: 'Sub item 1', href: '#' },
                    { title: 'Sub item 2', href: '#' },
                  ],
                },
              ],
            },
            {
              renderItem: ({ closePortals }) => (
                <EuiButtonEmpty onClick={closePortals} size="s">
                  Custom rendered item
                </EuiButtonEmpty>
              ),
            },
            ...renderSection([
              {
                title: 'Standalone item with long name',
                href: '#',
                icon: 'iInCircle',
              },
            ]),
            ...renderGroup('Content', [
              { title: 'Indices', href: '#', icon: 'iInCircle' },
              { title: 'Transforms', href: '#', icon: 'iInCircle' },
              { title: 'Indexing API', href: '#', icon: 'iInCircle' },
            ]),
            ...renderGroup('Security', [
              { title: 'API keys', href: '#', icon: 'gear' },
            ]),
          ]}
        />
      </EuiCollapsibleNavBeta.Body>
      <EuiCollapsibleNavBeta.Footer>
        <EuiCollapsibleNavBeta.Item
          isCollapsible={false}
          items={[
            {
              title: 'Recent',
              icon: 'clock',
              items: [
                { title: 'Lorem ipsum', icon: 'visMapRegion', href: '#' },
                { title: 'Consectetur cursus', icon: 'visPie', href: '#' },
                { title: 'Ultricies tellus', icon: 'visMetric', href: '#' },
              ],
            },
            { title: 'Developer tools', icon: 'code', href: '#' },
            {
              title: 'Project settings',
              icon: 'gear',
              items: [
                {
                  title: 'Management',
                  items: [
                    { title: 'Integrations', href: '#' },
                    { title: 'Fleet', href: '#' },
                    { title: 'Osquery', href: '#' },
                    { title: 'Stack monitoring', href: '#' },
                    { title: 'Stack management', href: '#' },
                  ],
                },
                {
                  title: 'Users and roles',
                  href: '#',
                  linkProps: { target: '_blank' },
                },
                {
                  title: 'Performance',
                  href: '#',
                  linkProps: { target: '_blank' },
                },
                {
                  title: 'Billing and subscription',
                  href: '#',
                  linkProps: { target: '_blank' },
                },
              ],
            },
          ]}
        />
      </EuiCollapsibleNavBeta.Footer>
    </StatefulCollapsibleNav>
  ),
};

export const CollapsedStateInLocalStorage: Story = {
  parameters: {
    controls: { include: ['initialIsCollapsed', 'onCollapseToggle'] },
  },
  render: (_args) => {
    const key = 'EuiCollapsibleNav__isCollapsed';
    const initialIsCollapsed = window.localStorage.getItem(key) === 'true';
    const onCollapseToggle = (isCollapsed: boolean) =>
      window.localStorage.setItem(key, String(isCollapsed));

    return (
      <>
        <EuiHeader position="fixed">
          <EuiHeaderSection>
            <EuiCollapsibleNavBeta
              initialIsCollapsed={initialIsCollapsed}
              onCollapseToggle={onCollapseToggle}
            />
          </EuiHeaderSection>
        </EuiHeader>
        <EuiPageTemplate>
          <EuiPageTemplate.Section>
            Toggle the collapsed state and refresh the page. The collapsed state
            should have been saved/remembered
          </EuiPageTemplate.Section>
        </EuiPageTemplate>
      </>
    );
  },
};
disableStorybookControls(CollapsedStateInLocalStorage, ['initialIsCollapsed']);

export const GlobalCSSVariable: Story = {
  parameters: {
    controls: { include: ['side', 'width'] },
  },
  render: ({ side, ...args }) => (
    <>
      <EuiHeader position="fixed">
        <EuiHeaderSection side={side}>
          <EuiCollapsibleNavBeta {...args} side={side}>
            This story tests the global `--euiCollapsibleNavOffset` CSS variable
          </EuiCollapsibleNavBeta>
        </EuiHeaderSection>
      </EuiHeader>
      {/* In production, would just be `left="var(--euiCollapsibleNavOffset, 0)"` if the nav isn't changing sides */}
      <EuiBottomBar {...{ [side!]: 'var(--euiCollapsibleNavOffset, 0)' }}>
        This text should be visible at all times and the bar position should
        update dynamically based on the nav width (including on mobile)
      </EuiBottomBar>
    </>
  ),
};

const MockConsumerFlyout: FunctionComponent = () => {
  const [flyoutIsOpen, setFlyoutOpen] = useState(false);
  return (
    <>
      <EuiButton size="s" onClick={() => setFlyoutOpen(!flyoutIsOpen)}>
        Toggle flyout
      </EuiButton>
      {flyoutIsOpen && (
        <EuiFlyout onClose={() => setFlyoutOpen(false)}>
          <EuiCollapsibleNavBeta.Body>
            This flyout's mask should overlay / sit on top of the collapsible
            nav only on mobile. On desktop, the collapsible nav should always be
            visible and reachable.
          </EuiCollapsibleNavBeta.Body>
        </EuiFlyout>
      )}
    </>
  );
};

export const FlyoutOverlay: Story = {
  render: (_) => {
    return (
      <>
        <EuiHeader position="fixed">
          <EuiHeaderSection>
            <EuiCollapsibleNavBeta>
              <EuiCollapsibleNavBeta.Body>
                <EuiCollapsibleNavBeta.Item
                  title="Curabitur ornare"
                  icon="keyboard"
                  isCollapsible={false}
                  items={[
                    { title: 'Quisque', href: '#' },
                    { title: 'Suspendisse euismod', href: '#' },
                    { title: 'Aenean nec', href: '#' },
                    { title: 'Proin porta', href: '#' },
                  ]}
                />
              </EuiCollapsibleNavBeta.Body>
            </EuiCollapsibleNavBeta>
          </EuiHeaderSection>
          <EuiHeaderSection>
            <EuiHeaderSectionItem>
              <MockConsumerFlyout />
            </EuiHeaderSectionItem>
          </EuiHeaderSection>
        </EuiHeader>
        <EuiPageTemplate>
          <EuiPageTemplate.Section>
            Click the "Toggle flyout" button in the top right hand corner, and
            tab through the page
          </EuiPageTemplate.Section>
        </EuiPageTemplate>
      </>
    );
  },
  parameters: hideAllStorybookControls,
};
