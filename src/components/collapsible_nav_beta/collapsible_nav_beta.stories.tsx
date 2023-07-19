/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFlyoutBody, EuiFlyoutFooter } from '../flyout';

import { EuiCollapsibleNavItem } from './collapsible_nav_item';
import { EuiCollapsibleNavBeta } from './collapsible_nav_beta';

// TODO: EuiCollapsibleNavBetaProps
const meta: Meta<{}> = {
  title: 'EuiCollapsibleNavBeta',
};
export default meta;
type Story = StoryObj<{}>;

// TODO: Make this a stateful component in upcoming EuiCollapsibleNavBeta work
const OpenCollapsibleNav: FunctionComponent<{}> = ({ children }) => {
  return (
    <EuiCollapsibleNavBeta isOpen={true} onClose={() => {}}>
      {children}
    </EuiCollapsibleNavBeta>
  );
};

export const KibanaExample: Story = {
  render: () => (
    <OpenCollapsibleNav>
      <EuiFlyoutBody>
        <EuiCollapsibleNavItem
          title="Home"
          iconType="home"
          isSelected
          href="#"
        />
        <EuiCollapsibleNavItem
          title="Recent"
          iconType="clock"
          items={[
            { title: 'Lorem ipsum', iconType: 'visMapRegion', href: '#' },
            { title: 'Consectetur cursus', iconType: 'visPie', href: '#' },
            { title: 'Ultricies tellus', iconType: 'visMetric', href: '#' },
          ]}
        />
        <EuiCollapsibleNavItem
          title="Elasticsearch"
          iconType="logoElasticsearch"
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
          iconType="logoEnterpriseSearch"
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
          iconType="logoObservability"
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
          iconType="logoSecurity"
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
          iconType="stats"
          href="#"
          items={[
            { title: 'Discover', href: '#' },
            { title: 'Dashboard', href: '#' },
            { title: 'Visualize library', href: '#' },
          ]}
        />
        <EuiCollapsibleNavItem
          title="Machine learning"
          iconType="indexMapping"
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
          iconType="editorCodeBlock"
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
          iconType="gear"
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
          iconType="gear"
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
  render: () => (
    <OpenCollapsibleNav>
      <EuiFlyoutBody>
        <EuiCollapsibleNavItem
          title="Recent"
          iconType="clock"
          items={[
            { title: 'Lorem ipsum', iconType: 'visMapRegion', href: '#' },
            { title: 'Consectetur cursus', iconType: 'visPie', href: '#' },
            { title: 'Ultricies tellus', iconType: 'visMetric', href: '#' },
          ]}
        />
        <EuiCollapsibleNavItem
          isSelected
          title="Security"
          iconType="logoSecurity"
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
          iconType="editorCodeBlock"
          href="#"
        />
        <EuiCollapsibleNavItem
          title="Project settings"
          iconType="gear"
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
