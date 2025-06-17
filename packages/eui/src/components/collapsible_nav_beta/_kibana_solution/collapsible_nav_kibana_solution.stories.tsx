/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiButtonEmpty } from '../../button';
import { EuiCollapsibleNavGroup } from '../../collapsible_nav/collapsible_nav_group';
import { EuiImage } from '../../image';
import { EuiSideNav } from '../../side_nav';
import { EuiSpacer } from '../../spacer';
import { EuiSkeletonRectangle } from '../../skeleton';
import { EuiHeader, EuiHeaderSection } from '../../header';
import { EuiPageTemplate } from '../../page_template';
import { EuiTitle } from '../../title';

import {
  EuiCollapsibleNavBeta,
  EuiCollapsibleNavItemProps,
} from '../';

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
    title: 'Rules',
    icon: 'broom',
    items: [
      // { title: 'Discover', href: '#' },
      // { title: 'Dashboards', href: '#' },
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
      const [sideNavIsOpen, setSideNavIsOpen] = useState(false);

      function handleNavClick(isOpen: boolean) {
        setSideNavIsOpen(isOpen);
      }

      return (
      <>
        <EuiHeader position="fixed">
          <EuiHeaderSection>
            <EuiCollapsibleNavBeta>
              <EuiCollapsibleNavBeta.Body>
                <EuiCollapsibleNavBeta.Item
                  title="Security"
                  icon="logoSecurity"
                />
                <EuiCollapsibleNavBeta.Item
                  title="Discover"
                  icon="discoverApp"
                  href="#"
                  onClick={() => handleNavClick(false)}
                />
                <EuiCollapsibleNavBeta.Item
                  title="Dashboards"
                  icon="dashboardApp"
                  onClick={() => handleNavClick(true)}
                />
                <EuiCollapsibleNavBeta.Item
                  title="Detections"
                  icon="securitySignal"
                  isCollapsible={true}
                  items={[
                    ...renderGroup('Content', [
                      { title: 'Attack discovery', href: '#' },
                      { title: 'Alerts', href: '#' },
                    ]),
                  ]}
                />
                <EuiCollapsibleNavBeta.Item
                  title="Vulnerabilities"
                  icon="warning"
                  onClick={() => handleNavClick(false)}
                />
                <EuiCollapsibleNavBeta.Item
                  title="Compliance"
                  icon="inspect"
                  onClick={() => handleNavClick(false)}
                />
                <EuiCollapsibleNavBeta.Item
                  title="Cases"
                  icon="casesApp"
                  onClick={() => handleNavClick(false)}
                />
                <EuiCollapsibleNavBeta.Item
                  title="Rules"
                  icon="flag"
                  isCollapsible={true}
                  items={[
                    ...renderGroup('Content', [
                      { title: 'Detection rules', href: '#' },
                      { title: 'Coverage', href: '#' },
                      { title: 'Exceptions', href: '#' },
                    ]),
                  ]}
                />
                <EuiCollapsibleNavBeta.Item
                  title="Inventory"
                  icon="grid"
                  onClick={() => handleNavClick(false)}
                />
                <EuiCollapsibleNavBeta.Item
                  title="Timeline"
                  icon="timeline"
                  onClick={() => handleNavClick(false)}
                />
                <EuiCollapsibleNavBeta.Item
                  title="More"
                  icon="boxesHorizontal"
                  isCollapsible={true}
                  items={[
                    ...renderGroup('Content', [
                      { title: 'Explore', href: '#' },
                      { title: 'Machine Learning', href: '#' },
                      { title: 'Thread Intel', href: '#' },
                    ]),
                  ]}
                />
                {/* <Story /> */}
                {/* <EuiCollapsibleNavBeta.Item
                  title="Elasticsearch"
                  icon="logoElasticsearch"
                  isCollapsible={false}
                  items={[
                    { title: 'Get started', href: '#', icon: 'launch' },
                    ...renderGroup('Explore', [
                      {
                        title: 'Discover',
                        onClick: () => action('Discover')('clicked!'),
                        icon: 'info',
                      },
                      { title: 'Dashboards', href: '#', icon: 'info' },
                      { title: 'Visualize library', href: '#', icon: 'info' },
                    ]),
                    {
                      title: 'Machine learning',
                      icon: 'info',
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
                        icon: 'info',
                      },
                    ]),
                    ...renderGroup('Content', [
                      { title: 'Indices', href: '#', icon: 'info' },
                      { title: 'Transforms', href: '#', icon: 'info' },
                      { title: 'Indexing API', href: '#', icon: 'info' },
                    ]),
                    ...renderGroup('Security', [
                      { title: 'API keys', href: '#', icon: 'gear' },
                    ]),
                  ]}
                /> */}
              </EuiCollapsibleNavBeta.Body>
              <EuiCollapsibleNavBeta.Footer>
                {/* <EuiCollapsibleNavBeta.Item
                  title="Recents"
                  icon="clock"
                  href="#"
                /> */}
                <EuiCollapsibleNavBeta.Item
                  title="Get started"
                  icon="launch"
                  onClick={() => handleNavClick(false)}
                />
                <EuiCollapsibleNavBeta.Item
                  title="Developer tools"
                  icon="code"
                  onClick={() => handleNavClick(false)}
                />
                <EuiCollapsibleNavBeta.Item
                  title="Management"
                  icon="gear"
                  onClick={() => handleNavClick(false)}
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
        {sideNavIsOpen && (
          <EuiPageTemplate
            panelled
            restrictWidth
            bottomBorder
            offset={48}
            grow={true}
          >
            <EuiPageTemplate.Sidebar>
              <EuiSideNav
                heading="My dashboards"
                css={{ width: 192 }}
                items={[
                  {
                    name: 'Dashboard name 1',
                    id: 1,
                    onClick: () => {},
                    style: { marginBlockStart: 0, paddingBlock: 0 },
                  },
                  {
                    name: 'Dashboard name 2',
                    id: 2,
                    href: '#/navigation/side-nav',
                    style: { marginBlockStart: 0, paddingBlock: 0 },
                  },
                  {
                    name: 'Dashboard name 3',
                    id: 3,
                    onClick: () => {},
                    isSelected: true,
                    style: { marginBlockStart: 0, paddingBlock: 0 },
                  },
                  {
                    name: 'Dashboard name 4',
                    id: 4,
                    style: { marginBlockStart: 0, paddingBlock: 0 },
                  },
                ]}
              />
            </EuiPageTemplate.Sidebar>
            <EuiPageTemplate.Header
              pageTitle="This is a dashboard"
              // rightSideItems={[<EuiButton>Right side item</EuiButton>]}
            />
            <EuiPageTemplate.Section
              grow={false}
              bottomBorder
            >
              <EuiSkeletonRectangle
                contentAriaLabel="Demo skeleton image"
                width={600}
                height={400}
                borderRadius="none">
                <EuiImage
                  width={100}
                  height={100}
                  src="https://picsum.photos/300/300"
                  alt="A randomized image"
                />
              </EuiSkeletonRectangle>
            </EuiPageTemplate.Section>
          </EuiPageTemplate>
        )}
      </>
      );
    },
  ],
};
export default meta;
type Story = StoryObj<KibanaCollapsibleNavSolutionProps>;

const renderGroup = (
  groupTitle: string,
  groupItems: EuiCollapsibleNavItemProps[]
) => {
  return [
    // {
    //   renderItem: () => <EuiSpacer size="m" />,
    // },
    // {
    //   renderItem: () => (
    //     <EuiTitle
    //       size="xxxs"
    //       className="eui-textTruncate"
    //       css={({ euiTheme }) => ({
    //         paddingBlock: euiTheme.size.xs,
    //         paddingInline: euiTheme.size.s,
    //       })}
    //     >
    //       <div>{groupTitle}</div>
    //     </EuiTitle>
    //   ),
    // },
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

export const Playground: Story = {};
