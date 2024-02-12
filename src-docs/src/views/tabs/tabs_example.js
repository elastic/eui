import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiTabs,
  EuiTab,
  EuiTabbedContent,
  EuiText,
} from '../../../../src/components';

import TabsGuidance from './tabs_guidance';
import { tabsConfig } from './playground';

import Tabs from './tabs';
const tabsSource = require('!!raw-loader!./tabs');

import TabsSmall from './tabs_small';
const tabsSmallSource = require('!!raw-loader!./tabs_small');

import TabsFlyout from './tabs_flyout';
const tabsFlyoutSource = require('!!raw-loader!./tabs_flyout');

import TabbedContent from './tabbed_content';
const tabbedContentSource = require('!!raw-loader!./tabbed_content');

import Controlled from './controlled';
const controlledSource = require('!!raw-loader!./controlled');

export const TabsExample = {
  title: 'Tabs',
  guidelines: <TabsGuidance />,
  intro: (
    <EuiText>
      <p>
        Use tabs to organize related but unique content for a single idea or
        subject. Tabs show and hide content using <strong>in-page</strong>{' '}
        navigation UI.
      </p>
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiTabs</strong> is a wrapping component that requires{' '}
            <strong>EuiTab</strong> components as direct children. You control
            the displayed contents and current state through props on EuiTab
            like <EuiCode>isSelected</EuiCode> and <EuiCode>onClick</EuiCode>.
          </p>
          <p>
            Use the <EuiCode>prepend</EuiCode> and <EuiCode>append</EuiCode> tab
            props to add content before and after the tab label respectively.
          </p>
        </>
      ),
      props: {
        EuiTabs,
        EuiTab,
      },
      demo: <Tabs />,
      snippet: [
        `<EuiTabs>
  <EuiTab onClick={onClick}>Example 1</EuiTab>
  <EuiTab onClick={onClick} prepend={icon}>Example 2</EuiTab>
</EuiTabs>`,
      ],
      playground: tabsConfig,
    },
    {
      title: 'Tab sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsSmallSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiTabs</strong> allow a <EuiCode>size</EuiCode> prop. In
            general you should always use the default (medium) size. The small
            size is best for when placing inside popovers or other small
            containers. Reserve using the large size for when using as primary
            page navigation, like inside of{' '}
            <Link to="/layout/page-header">
              <strong>EuiPageHeader</strong>
            </Link>
            .
          </p>
          <p>
            You can also use the <EuiCode>expand</EuiCode> prop to evenly
            stretch each tab horizontally.
          </p>
        </>
      ),
      props: {
        EuiTabs,
        EuiTab,
      },
      demo: <TabsSmall />,
      snippet: `<EuiTabs size="s" expand>
  <EuiTab onClick={onClick}>Example 1</EuiTab>
  <EuiTab onClick={onClick}>Example 2</EuiTab>
</EuiTabs>`,
    },
    {
      title: 'Bottom border',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsFlyoutSource,
        },
      ],
      text: (
        <p>
          The <EuiCode>bottomBorder</EuiCode> helps to separate the tab group
          from the content below and is on by default. However, some components
          like <Link to="/layout/flyout">flyouts</Link> already provide borders
          which can act as the divider. In this case you can turn the border off
          with <EuiCode language="tsx">{'bottomBorder={false}'}</EuiCode>.
        </p>
      ),
      props: {
        EuiTabs,
      },
      demo: <TabsFlyout />,
      snippet: `<EuiTabs bottomBorder={false}>
  <EuiTab onClick={onClick}>Example 1</EuiTab>
  <EuiTab onClick={onClick}>Example 2</EuiTab>
</EuiTabs>`,
    },
    {
      title: 'Tabbed content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabbedContentSource,
        },
      ],
      text: (
        <p>
          <strong>EuiTabbedContent</strong> makes it easier to associate tabs
          with content based on the selected tab. Use the{' '}
          <EuiCode>initialSelectedTab</EuiCode> prop to specify which tab to
          initially select.
        </p>
      ),
      props: {
        EuiTabbedContent,
      },
      demo: <TabbedContent />,
      snippet: `<EuiTabbedContent
  tabs={[
    {
      id: 'example1',
      name: 'Example 1',
      content: 'Example 1 content.',
    },
    {
      id: 'example2',
      name: 'Example 2',
      content: 'Example 2 content.',
    },
  ]}
/>`,
    },
    {
      title: 'Controlled tabbed content',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: controlledSource,
        },
      ],
      text: (
        <p>
          You can also use the <EuiCode>selectedTab</EuiCode> and{' '}
          <EuiCode>onTabClick</EuiCode> props to take complete control over tab
          selection. This can be useful if you want to change tabs based on user
          interaction with another part of the UI.
        </p>
      ),
      props: {
        EuiTabbedContent,
      },
      snippet: `<EuiTabbedContent
  tabs={tabs}
  selectedTab={selectedTab}
  onTabClick={onTabClick}
/>`,
      demo: <Controlled />,
    },
  ],
};
