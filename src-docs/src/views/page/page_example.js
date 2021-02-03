import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import Playground from './playground';

import {
  EuiCode,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

import Page from './page';
const pageSource = require('!!raw-loader!./page');
const pageHtml = renderToHtml(Page);

import PageSimple from './page_simple';
const pageSimpleSource = require('!!raw-loader!./page_simple');
const pageSimpleHtml = renderToHtml(PageSimple);

import PageHeader from './page_header';
const pageHeaderSource = require('!!raw-loader!./page_header');
const pageHeaderHtml = renderToHtml(PageHeader);

import PageHeaderTabs from './page_header_tabs';
const pageHeaderTabsSource = require('!!raw-loader!./page_header_tabs');
const pageHeaderTabsHtml = renderToHtml(PageHeaderTabs);

import PageHeaderCustom from './page_header_custom';
const pageHeaderCustomSource = require('!!raw-loader!./page_header_custom');
const pageHeaderCustomHtml = renderToHtml(PageHeaderCustom);

import PageContentOnly from './page_content_only';
const pageContentOnlySource = require('!!raw-loader!./page_content_only');
const pageContentOnlyHtml = renderToHtml(Page);

import PageContentCenter from './page_content_center';
const pageContentCenterSource = require('!!raw-loader!./page_content_center');
const pageContentCenterHtml = renderToHtml(Page);

import PageContentCenterWithSideBar from './page_content_center_with_side_bar';
const PageContentCenterWithSideBarSource = require('!!raw-loader!./page_content_center_with_side_bar');
const PageContentCenterWithSideBarHtml = renderToHtml(Page);

export const PageExample = {
  playground: Playground,
  title: 'Page',
  intro: (
    <EuiText>
      <p>
        Page layouts are modular and have the ability to add or remove
        components as needed for the design. These examples are colored for
        illustrative purposes only.
      </p>
      <EuiSpacer />
    </EuiText>
  ),
  sections: [
    {
      title: 'Page with everything on',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pageHtml,
        },
      ],
      text: (
        <div>
          <p>
            By default, the entire page will always be 100% of the window&apos;s
            width; to max out the typical width and center the page, set the{' '}
            <EuiCode>restrictWidth</EuiCode> prop to <EuiCode>true</EuiCode>.
            You can also pass an integer to this property to max out the width
            at a custom pixel value or a string with a custom measurement.
          </p>
        </div>
      ),
      props: {
        EuiPage,
        EuiPageBody,
        EuiPageContent,
        EuiPageContentBody,
        EuiPageContentHeader,
        EuiPageContentHeaderSection,
        EuiPageHeader,
        EuiPageHeaderSection,
        EuiPageSideBar,
      },
      demo: (
        <div className="guideDemo__highlightLayout">
          <Page />
        </div>
      ),
    },
    {
      title: 'Simple page with title',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageSimpleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pageSimpleHtml,
        },
      ],
      text: (
        <p>
          Most pages don&rsquo;t have sidebars. A lot of our pages don&rsquo;t
          have extra abilities next to the title. Simply exclude those
          components and everything will still line up.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageSimple />
        </div>
      ),
    },
    {
      title: 'Page header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pageHeaderHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiPageHeader</strong> comes with some pre-determined
            content that you can apply to the left and right sides of the
            component.
          </p>
          <p>
            The left side allows you to pass any combination of{' '}
            <EuiCode>pageTitle</EuiCode>, <EuiCode>description</EuiCode>,{' '}
            <EuiCode>tabs</EuiCode>, or any <EuiCode>children</EuiCode>. The
            order of which are determined by the particular combination.
          </p>
          <p>
            The right side, <EuiCode>rightSideContent</EuiCode>, allows for just
            a simple <strong>array of nodes</strong> which are placed within a
            flexbox row. This is usually in the form of multiple buttons, of
            which, at least one is primary (or{' '}
            <EuiCode language="ts">{'fill="true"'}</EuiCode>). These items are
            also displayed in <strong>reverse order</strong> so that the first
            and primary action will be displayed far right.
          </p>
          <p>
            You can further adjust the display of these content types with an
            optional <EuiCode>iconType</EuiCode> placed to the left of the
            title, <EuiCode>alignItems</EuiCode> for adjusting the vertical
            alignment of the two sides, and <EuiCode>responsiveOrder</EuiCode>
            to determine which content side to display first on smaller screens.
          </p>
        </>
      ),
      demo: (
        <div className="guideDemo__highlightLayout--single">
          <PageHeader />
        </div>
      ),
      props: { EuiPageHeader },
      snippet: `<EuiPageHeader
  pageTitle="Page title"
  tabs={[
    { label:"Tab 1" , isSelected: true },
    { label:"Tab 2" }
  ]}
  description="Example of a description."
  rightSideContent={[
    <EuiButton fill>Button 1</EuiButton>,
    <EuiButton>Button 2</EuiButton>
  ]}
/>`,
    },
    {
      title: 'Page header tabs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderTabsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pageHeaderTabsHtml,
        },
      ],
      text: (
        <>
          <p>
            When using supplying <EuiCode>tabs</EuiCode> without a{' '}
            <EuiCode>pageTitle</EuiCode>, <strong>EuiPageHeader</strong> will
            promote those tabs as if they are the page title. This means that
            any <EuiCode>description</EuiCode>, or <EuiCode>children</EuiCode>{' '}
            will sit <strong>below</strong> the tabs.
          </p>
        </>
      ),
      demo: (
        <div className="guideDemo__highlightLayout--single">
          <PageHeaderTabs />
        </div>
      ),
      props: { EuiPageHeader },
      snippet: `<EuiPageHeader
  tabs={[
    { label:"Tab 1" , isSelected: true },
    { label:"Tab 2" }
  ]}
  description="Example of a description."
/>`,
    },
    {
      title: 'Page header custom',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderCustomSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pageHeaderCustomHtml,
        },
      ],
      text: (
        <>
          <p>
            The page header content props mainly are helpful props to push
            content into established Elastic page layout patterns. They are
            completely optional and by nature, inflexible. If you need a layout
            that does not match these patterns you can simply pass in your own{' '}
            <EuiCode>children</EuiCode> utilizing the{' '}
            <strong>EuiPageHeaderSection</strong> components.
          </p>
        </>
      ),
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageHeaderCustom />
        </div>
      ),
      props: { EuiPageHeader },
    },
    {
      title: 'Page with content only',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageContentOnlySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pageContentOnlyHtml,
        },
      ],
      text: <p>We can further simplify pages by only showing the content.</p>,
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageContentOnly />
        </div>
      ),
    },
    {
      title: 'Page content centered',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageContentCenterSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pageContentCenterHtml,
        },
      ],
      text: (
        <p>
          The page content can be optionally centered either vertically or
          horizontally. This is useful for various empty states.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageContentCenter />
        </div>
      ),
    },
    {
      title: 'Page content centered in a full layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageContentCenterWithSideBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: PageContentCenterWithSideBarHtml,
        },
      ],
      text: (
        <p>
          Centering the content can happen regardless of layout configuration.
          In this example, we&rsquo;re centering within a complex sidebar
          layout.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageContentCenterWithSideBar />
        </div>
      ),
    },
  ],
};
