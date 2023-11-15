/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  hideStorybookControls,
  hideAllStorybookControls,
} from '../../../.storybook/utils';

import { EuiHeader, EuiHeaderSection, EuiHeaderSectionItem } from '../header';
import { EuiPageTemplate } from '../page_template';
import { EuiBottomBar } from '../bottom_bar';
import { EuiFlyout } from '../flyout';
import { EuiButton } from '../button';
import { EuiTitle } from '../title';

import {
  EuiCollapsibleNavBeta,
  EuiCollapsibleNavBetaProps,
  EuiCollapsibleNavItemProps,
} from './';

const meta: Meta<EuiCollapsibleNavBetaProps> = {
  title: 'EuiCollapsibleNavBeta',
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

const OpenCollapsibleNav: FunctionComponent<
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
      renderItem: () => (
        <EuiTitle
          size="xxxs"
          className="eui-textTruncate"
          css={({ euiTheme }) => ({
            marginTop: euiTheme.size.base,
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

export const KibanaExample: Story = {
  render: ({ ...args }) => (
    <OpenCollapsibleNav {...args}>
      <EuiCollapsibleNavBeta.Body>
        <EuiCollapsibleNavBeta.Item
          title="Home"
          icon="home"
          isSelected
          href="#"
        />
        <EuiCollapsibleNavBeta.Item
          title="Recent"
          icon="clock"
          items={[
            { title: 'Lorem ipsum', icon: 'visMapRegion', href: '#' },
            { title: 'Consectetur cursus', icon: 'visPie', href: '#' },
            { title: 'Ultricies tellus', icon: 'visMetric', href: '#' },
          ]}
        />
        <EuiCollapsibleNavBeta.Item
          title="Elasticsearch"
          icon="logoElasticsearch"
          items={[
            { title: 'Get started', href: '#' },
            ...renderGroup('Explore', [
              { title: 'Discover', href: '#' },
              { title: 'Dashboards', href: '#' },
              { title: 'Visualize library', href: '#' },
            ]),
            ...renderGroup('Content', [
              { title: 'Indices', href: '#' },
              { title: 'Transforms', href: '#' },
              { title: 'Indexing API', href: '#' },
            ]),
            ...renderGroup('Security', [{ title: 'API keys', href: '#' }]),
          ]}
        />
        <EuiCollapsibleNavBeta.Item
          title="Enterprise Search"
          icon="logoEnterpriseSearch"
          items={[
            { title: 'ESRE', href: '#' },
            { title: 'Vector search', href: '#' },
            { title: 'Content', href: '#' },
            { title: 'Search applications', href: '#' },
            { title: 'Behavioral analytics', href: '#' },
            { title: 'Elasticsearch', href: '#' },
            { title: 'App search', href: '#' },
            { title: 'Workplace search', href: '#' },
            { title: 'Search experiences', href: '#' },
          ]}
        />
        <EuiCollapsibleNavBeta.Item
          title="Observability"
          icon="logoObservability"
          items={[
            { title: 'Get started', href: '#' },
            { title: 'Alerts', href: '#' },
            { title: 'Cases', href: '#' },
            { title: 'SLOs', href: '#' },
            ...renderGroup('Signals', [
              { title: 'Logs', href: '#' },
              {
                title: 'Tracing',
                items: [
                  { title: 'Services', href: '#' },
                  { title: 'Traces', href: '#' },
                  { title: 'Dependencies', href: '#' },
                ],
              },
            ]),
            ...renderGroup('Toolbox', [
              { title: 'Visualize library', href: '#' },
              { title: 'Dashboards', href: '#' },
              {
                title: 'AIOps',
                items: [
                  { title: 'Anomaly detection', href: '#' },
                  { title: 'Spike analysis', href: '#' },
                  { title: 'Change point detection', href: '#' },
                  { title: 'Notifications', href: '#' },
                ],
              },
            ]),
          ]}
        />
        <EuiCollapsibleNavBeta.Item
          title="Security"
          icon="logoSecurity"
          items={[
            { title: 'Get started', href: '#' },
            { title: 'Dashboards', href: '#' },
            { title: 'Alerts', href: '#' },
            { title: 'Findings', href: '#' },
            { title: 'Cases', href: '#' },
            { title: 'Investigation', href: '#' },
            { title: 'Intelligence', href: '#' },
            {
              title: 'Explore',
              items: [
                { title: 'Host', href: '#' },
                { title: 'Users', href: '#' },
                { title: 'Network', href: '#' },
              ],
            },
            { title: 'Assets', href: '#' },
            {
              title: 'Rules',
              items: [
                { title: 'SIEM rules', href: '#' },
                { title: 'Shared exception list', href: '#' },
                { title: 'CIS benchmark rules', href: '#' },
                { title: 'Defend rules', href: '#' },
              ],
            },
            {
              title: 'Machine learning',
              items: [
                { title: 'Overview', href: '#' },
                { title: 'Notifications', href: '#' },
                { title: 'Memory usage', href: '#' },
                { title: 'Anomaly detection', href: '#' },
                { title: 'Data frame analytics', href: '#' },
                { title: 'Model management', href: '#' },
              ],
            },
            {
              title: 'Settings',
              items: [
                { title: 'Endpoints', href: '#' },
                { title: 'OS query', href: '#' },
                { title: 'Response actions history', href: '#' },
                { title: 'Event filters', href: '#' },
                { title: 'Host isolation', href: '#' },
              ],
            },
          ]}
        />
        <EuiCollapsibleNavBeta.Item
          title="Analytics"
          icon="stats"
          items={[
            { title: 'Discover', href: '#' },
            { title: 'Dashboard', href: '#' },
            { title: 'Visualize library', href: '#' },
          ]}
        />
        <EuiCollapsibleNavBeta.Item
          title="Machine learning"
          icon="indexMapping"
          items={[
            { title: 'Overview', href: '#' },
            { title: 'Notifications', href: '#' },
            { title: 'Memory usage', href: '#' },
            ...renderGroup('Anomaly detection', [
              { title: 'Jobs', href: '#' },
              { title: 'Anomaly explorer', href: '#' },
              { title: 'Single metric viewer', href: '#' },
              { title: 'Settings', href: '#' },
            ]),
            ...renderGroup('Data frame analytics', [
              { title: 'Jobs', href: '#' },
              { title: 'Results explorer', href: '#' },
              { title: 'Analytics map', href: '#' },
            ]),
            ...renderGroup('Model management', [
              { title: 'Trained models', href: '#' },
            ]),
            ...renderGroup('Data visualizer', [
              { title: 'File', href: '#' },
              { title: 'Data view', href: '#' },
            ]),
          ]}
        />
      </EuiCollapsibleNavBeta.Body>
      <EuiCollapsibleNavBeta.Footer>
        <EuiCollapsibleNavBeta.Item
          title="Developer tools"
          icon="editorCodeBlock"
          items={[
            { title: 'Console', href: '#' },
            { title: 'Search profiler', href: '#' },
            { title: 'Grok debugger', href: '#' },
            { title: 'Painless lab', href: '#' },
          ]}
        />
        <EuiCollapsibleNavBeta.Item
          title="Management"
          icon="gear"
          items={[
            { title: 'Integrations', href: '#' },
            { title: 'Fleet', href: '#' },
            { title: 'Osquery', href: '#' },
            { title: 'Stack monitoring', href: '#' },
            { title: 'Stack management', href: '#' },
          ]}
        />
        <EuiCollapsibleNavBeta.Item
          title="Project settings"
          icon="gear"
          items={[
            { title: 'Management', href: '#' },
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
          ]}
        />
      </EuiCollapsibleNavBeta.Footer>
    </OpenCollapsibleNav>
  ),
};

// Security has a very custom nav
export const SecurityExample: Story = {
  render: ({ ...args }) => (
    <OpenCollapsibleNav {...args}>
      <EuiCollapsibleNavBeta.Body>
        <EuiCollapsibleNavBeta.Group
          title="Security"
          icon="logoSecurity"
          items={[
            { title: 'Get started', href: '#' },
            { title: 'Dashboards', href: '#' },
            { title: 'Alerts', href: '#' },
            { title: 'Findings', href: '#' },
            { title: 'Cases', href: '#' },
            { title: 'Investigation', href: '#' },
            { title: 'Intelligence', href: '#' },
            {
              title: 'Explore',
              items: [
                { title: 'Host', href: '#' },
                { title: 'Users', href: '#', isSelected: true },
                { title: 'Network', href: '#' },
              ],
              isCollapsible: false,
            },
            { title: 'Assets', href: '#' },
            {
              title: 'Rules',
              items: [
                { title: 'SIEM rules', href: '#' },
                { title: 'Shared exception list', href: '#' },
                { title: 'CIS benchmark rules', href: '#' },
                { title: 'Defend rules', href: '#' },
              ],
            },
            {
              title: 'Machine learning',
              items: [
                { title: 'Overview', href: '#' },
                { title: 'Notifications', href: '#' },
                { title: 'Memory usage', href: '#' },
                { title: 'Anomaly detection', href: '#' },
                { title: 'Data frame analytics', href: '#' },
                { title: 'Model management', href: '#' },
              ],
            },
            {
              title: 'Settings',
              items: [
                { title: 'Endpoints', href: '#' },
                { title: 'OS query', href: '#' },
                { title: 'Response actions history', href: '#' },
                { title: 'Event filters', href: '#' },
                { title: 'Host isolation', href: '#' },
              ],
            },
          ]}
        />
      </EuiCollapsibleNavBeta.Body>
      <EuiCollapsibleNavBeta.Footer>
        <EuiCollapsibleNavBeta.Item
          title="Developer tools"
          icon="editorCodeBlock"
          href="#"
        />
        <EuiCollapsibleNavBeta.Item
          title="Project settings"
          icon="gear"
          items={[
            { title: 'Management', href: '#' },
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
          ]}
        />
      </EuiCollapsibleNavBeta.Footer>
    </OpenCollapsibleNav>
  ),
};

export const CollapsedStateInLocalStorage: Story = {
  render: () => {
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
  argTypes: hideStorybookControls(['aria-label', 'side', 'width']),
};

export const GlobalCSSVariable: Story = {
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
  argTypes: hideStorybookControls([
    'aria-label',
    'initialIsCollapsed',
    'onCollapseToggle',
  ]),
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
            nav, on both desktop and mobile
          </EuiCollapsibleNavBeta.Body>
        </EuiFlyout>
      )}
    </>
  );
};

export const FlyoutOverlay: Story = {
  render: (_) => {
    return (
      <EuiHeader position="fixed">
        <EuiHeaderSection>
          <EuiCollapsibleNavBeta>
            Click the "Toggle flyout" button in the top right hand corner
          </EuiCollapsibleNavBeta>
        </EuiHeaderSection>
        <EuiHeaderSection>
          <EuiHeaderSectionItem>
            <MockConsumerFlyout />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    );
  },
  parameters: hideAllStorybookControls,
};
