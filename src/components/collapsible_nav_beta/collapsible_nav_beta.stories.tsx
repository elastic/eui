/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiHeader, EuiHeaderSection, EuiHeaderSectionItem } from '../header';
import { EuiPageTemplate } from '../page_template';
import { EuiFlyout, EuiFlyoutBody, EuiFlyoutFooter } from '../flyout';
import { EuiButton } from '../button';

import { EuiCollapsibleNavItem } from './collapsible_nav_item';
import {
  EuiCollapsibleNavBeta,
  EuiCollapsibleNavBetaProps,
} from './collapsible_nav_beta';

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

export const KibanaExample: Story = {
  render: ({ ...args }) => (
    <OpenCollapsibleNav {...args}>
      <EuiFlyoutBody scrollableTabIndex={-1}>
        <EuiCollapsibleNavItem title="Home" icon="home" isSelected href="#" />
        <EuiCollapsibleNavItem
          title="Recent"
          icon="clock"
          items={[
            { title: 'Lorem ipsum', icon: 'visMapRegion', href: '#' },
            { title: 'Consectetur cursus', icon: 'visPie', href: '#' },
            { title: 'Ultricies tellus', icon: 'visMetric', href: '#' },
          ]}
        />
        <EuiCollapsibleNavItem
          title="Elasticsearch"
          icon="logoElasticsearch"
          href="#"
          items={[
            { title: 'Get started', href: '#' },
            { title: 'Explore', isGroupTitle: true },
            { title: 'Discover', href: '#' },
            { title: 'Dashboards', href: '#' },
            { title: 'Visualize library', href: '#' },
            { title: 'Content', isGroupTitle: true },
            { title: 'Indices', href: '#' },
            { title: 'Transforms', href: '#' },
            { title: 'Indexing API', href: '#' },
            { title: 'Security', isGroupTitle: true },
            { title: 'API keys', href: '#' },
          ]}
        />
        <EuiCollapsibleNavItem
          title="Enterprise Search"
          icon="logoEnterpriseSearch"
          href="#"
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
        <EuiCollapsibleNavItem
          title="Observability"
          icon="logoObservability"
          href="#"
          items={[
            { title: 'Get started', href: '#' },
            { title: 'Alerts', href: '#' },
            { title: 'Cases', href: '#' },
            { title: 'SLOs', href: '#' },
            { title: 'Signals', isGroupTitle: true },
            { title: 'Logs', href: '#' },
            {
              title: 'Tracing',
              href: '#',
              items: [
                { title: 'Services', href: '#' },
                { title: 'Traces', href: '#' },
                { title: 'Dependencies', href: '#' },
              ],
            },
            { title: 'Toolbox', isGroupTitle: true },
            { title: 'Visualize library', href: '#' },
            { title: 'Dashboards', href: '#' },
            {
              title: 'AIOps',
              href: '#',
              items: [
                { title: 'Anomaly detection', href: '#' },
                { title: 'Spike analysis', href: '#' },
                { title: 'Change point detection', href: '#' },
                { title: 'Notifications', href: '#' },
              ],
            },
            { title: 'Add data', href: '#' },
          ]}
        />
        <EuiCollapsibleNavItem
          title="Security"
          icon="logoSecurity"
          href="#"
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
              href: '#',
              items: [
                { title: 'Host', href: '#' },
                { title: 'Users', href: '#' },
                { title: 'Network', href: '#' },
              ],
            },
            { title: 'Assets', href: '#' },
            {
              title: 'Rules',
              href: '#',
              items: [
                { title: 'SIEM rules', href: '#' },
                { title: 'Shared exception list', href: '#' },
                { title: 'CIS benchmark rules', href: '#' },
                { title: 'Defend rules', href: '#' },
              ],
            },
            {
              title: 'Machine learning',
              href: '#',
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
              href: '#',
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
        <EuiCollapsibleNavItem
          title="Analytics"
          icon="stats"
          href="#"
          items={[
            { title: 'Discover', href: '#' },
            { title: 'Dashboard', href: '#' },
            { title: 'Visualize library', href: '#' },
          ]}
        />
        <EuiCollapsibleNavItem
          title="Machine learning"
          icon="indexMapping"
          href="#"
          items={[
            { title: 'Overview', href: '#' },
            { title: 'Notifications', href: '#' },
            { title: 'Memory usage', href: '#' },
            { title: 'Anomaly detection', isGroupTitle: true },
            { title: 'Jobs', href: '#' },
            { title: 'Anomaly explorer', href: '#' },
            { title: 'Single metric viewer', href: '#' },
            { title: 'Settings', href: '#' },
            { title: 'Data frame analytics', isGroupTitle: true },
            { title: 'Jobs', href: '#' },
            { title: 'Results explorer', href: '#' },
            { title: 'Analytics map', href: '#' },
            { title: 'Model management', isGroupTitle: true },
            { title: 'Trained models', href: '#' },
            { title: 'Data visualizer', isGroupTitle: true },
            { title: 'File', href: '#' },
            { title: 'Data view', href: '#' },
          ]}
        />
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiCollapsibleNavItem
          title="Developer tools"
          icon="editorCodeBlock"
          href="#"
          items={[
            { title: 'Console', href: '#' },
            { title: 'Search profiler', href: '#' },
            { title: 'Grok debugger', href: '#' },
            { title: 'Painless lab', href: '#' },
          ]}
        />
        <EuiCollapsibleNavItem
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
        <EuiCollapsibleNavItem
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
      </EuiFlyoutFooter>
    </OpenCollapsibleNav>
  ),
};

// Security has a very custom nav
export const SecurityExample: Story = {
  render: ({ ...args }) => (
    <OpenCollapsibleNav {...args}>
      <EuiFlyoutBody scrollableTabIndex={-1}>
        <EuiCollapsibleNavItem
          title="Recent"
          icon="clock"
          items={[
            { title: 'Lorem ipsum', icon: 'visMapRegion', href: '#' },
            { title: 'Consectetur cursus', icon: 'visPie', href: '#' },
            { title: 'Ultricies tellus', icon: 'visMetric', href: '#' },
          ]}
        />
        <EuiCollapsibleNavItem
          isSelected
          title="Security"
          icon="logoSecurity"
          href="#"
          // Workaround to always display this section as open and remove the accordion toggle
          // Rather than baking in a top-level prop to support this behavior, this is likely
          // the path we'd recommend to Security instead if their use-case isn't standard
          accordionProps={{
            forceState: 'open',
            arrowProps: { css: { display: 'none' } },
          }}
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
              href: '#',
              items: [
                { title: 'Host', href: '#' },
                { title: 'Users', href: '#' },
                { title: 'Network', href: '#' },
              ],
            },
            { title: 'Assets', href: '#' },
            {
              title: 'Rules',
              href: '#',
              items: [
                { title: 'SIEM rules', href: '#' },
                { title: 'Shared exception list', href: '#' },
                { title: 'CIS benchmark rules', href: '#' },
                { title: 'Defend rules', href: '#' },
              ],
            },
            {
              title: 'Machine learning',
              href: '#',
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
              href: '#',
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
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiCollapsibleNavItem
          title="Developer tools"
          icon="editorCodeBlock"
          href="#"
        />
        <EuiCollapsibleNavItem
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
      </EuiFlyoutFooter>
    </OpenCollapsibleNav>
  ),
};

export const MultipleFixedHeaders: Story = {
  render: ({ ...args }) => (
    <>
      <EuiHeader position="fixed">First header</EuiHeader>
      <EuiHeader position="fixed">
        <EuiHeaderSection>
          <EuiCollapsibleNavBeta {...args}>
            This story tests that EuiCollapsibleNav's fixed header detection &
            offsetting works as expected
          </EuiCollapsibleNavBeta>
          Second header
        </EuiHeaderSection>
      </EuiHeader>
    </>
  ),
};

const MockConsumerFlyout: FunctionComponent = () => {
  const [flyoutIsOpen, setFlyoutOpen] = useState(false);
  return (
    <>
      <EuiButton size="s" onClick={() => setFlyoutOpen(!flyoutIsOpen)}>
        Toggle a flyout
      </EuiButton>
      {flyoutIsOpen && (
        <EuiFlyout onClose={() => setFlyoutOpen(false)}>
          <EuiFlyoutBody>
            Some other mock consumer flyout that <strong>should</strong> overlap
            EuiCollapsibleNav
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

export const FlyoutInFixedHeaders: Story = {
  render: ({ ...args }) => {
    return (
      <EuiHeader position="fixed">
        <EuiHeaderSection>
          <EuiCollapsibleNavBeta {...args}>Nav content</EuiCollapsibleNavBeta>
        </EuiHeaderSection>
        <EuiHeaderSection>
          <EuiHeaderSectionItem>
            <MockConsumerFlyout />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    );
  },
};
