/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiSpacer } from '../../spacer';
import { EuiButton, EuiButtonEmpty } from '../../button';
import { EuiFlyout } from '../../flyout';
import { EuiHeader, EuiHeaderSection } from '../../header';
import { EuiPageTemplate } from '../../page_template';

import { EuiCollapsibleNavBeta } from '../';
import {
  KibanaCollapsibleNavSolution,
  KibanaCollapsibleNavSolutionProps,
} from './collapsible_nav_kibana_solution';

const navSpacer = () => <EuiSpacer size="m" />;

const meta: Meta<KibanaCollapsibleNavSolutionProps> = {
  title: 'Navigation/EuiCollapsibleNav (beta)/KibanaSolution',
  component: KibanaCollapsibleNavSolution,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Security',
    icon: 'logoSecurity',
    solutions: [
      {
        title: 'Observability',
        icon: 'logoObservability',
        href: '#',
      },
      {
        title: 'Search',
        icon: 'logoElasticsearch',
        href: '#',
      },
      {
        title: 'Security',
        icon: 'logoSecurity',
        href: '#',
        isActive: true,
      },
      {
        title: 'Switch to classic',
        icon: 'logoKibana',
        onClick: () => {},
        isSecondary: true,
      },
    ],
    items: [
      { title: 'Discover', href: '#' },
      { title: 'Dashboards', href: '#' },
      { renderItem: navSpacer },
      {
        title: 'Rules',
        items: [
          { title: 'SIEM rules', href: '#' },
          { title: 'Shared exception list', href: '#' },
          { title: 'CIS benchmark rules', href: '#' },
          { title: 'Defend rules', href: '#' },
        ],
      },
      { title: 'Alerts', href: '#' },
      { title: 'Findings', href: '#' },
      { title: 'Cases', href: '#' },
      { renderItem: navSpacer },
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
      { renderItem: navSpacer },
      { title: 'Assets', href: '#' },
      { renderItem: navSpacer },
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
    ],
  },
  decorators: [
    (Story) => {
      const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
      const openFlyout = () => setIsFlyoutOpen(true);
      const closeFlyout = () => setIsFlyoutOpen(false);
      return (
        <>
          <EuiHeader position="fixed">
            <EuiHeaderSection>
              <EuiCollapsibleNavBeta>
                <EuiCollapsibleNavBeta.Body>
                  <Story />
                </EuiCollapsibleNavBeta.Body>
                <EuiCollapsibleNavBeta.Footer>
                  <EuiCollapsibleNavBeta.Item
                    title="Recents"
                    icon="clock"
                    href="#"
                  />
                  <EuiCollapsibleNavBeta.Item
                    title="Get started"
                    icon="launch"
                    href="#"
                  />
                  <EuiCollapsibleNavBeta.Item
                    title="Developer tools"
                    icon="editorCodeBlock"
                    href="#"
                  />
                  <EuiCollapsibleNavBeta.Item
                    title="Management"
                    icon="gear"
                    items={[
                      { title: 'Users and roles', href: '#' },
                      { title: 'Performance', href: '#' },
                      {
                        title: 'Billing and subscription',
                        href: '#',
                        linkProps: { target: '_blank' },
                      },
                    ]}
                  />
                </EuiCollapsibleNavBeta.Footer>
              </EuiCollapsibleNavBeta>
            </EuiHeaderSection>
          </EuiHeader>
          <EuiPageTemplate>
            <EuiPageTemplate.TopBar paddingSize="m">
              <EuiButtonEmpty iconType="indexOpen" onClick={openFlyout}>
                Add integrations
              </EuiButtonEmpty>
              <EuiButtonEmpty iconType="gear" onClick={openFlyout}>
                Settings
              </EuiButtonEmpty>
            </EuiPageTemplate.TopBar>
            <EuiPageTemplate.Header
              iconType="logoElastic"
              pageTitle="Example Kibana solution"
              rightSideItems={[
                <EuiButton onClick={openFlyout}>Button</EuiButton>,
              ]}
              tabs={[{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }]}
            />
            <EuiPageTemplate.Section
              style={{ blockSize: '100vh' }} // Demos the sticky top bar
            />
          </EuiPageTemplate>
          {isFlyoutOpen && <EuiFlyout onClose={closeFlyout} />}
        </>
      );
    },
  ],
};
export default meta;
type Story = StoryObj<KibanaCollapsibleNavSolutionProps>;

export const Playground: Story = {};
