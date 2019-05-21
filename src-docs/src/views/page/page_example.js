import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

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
} from '../../../../src/components';

import Page from './page';
const pageSource = require('!!raw-loader!./page');
const pageHtml = renderToHtml(Page);

import PageSimple from './page_simple';
const pageSimpleSource = require('!!raw-loader!./page_simple');
const pageSimpleHtml = renderToHtml(PageSimple);

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
  title: 'Page',
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
            Page layouts are modular and have the ability to add or remove
            components as needed for the design. These examples are colored for
            illustrative purposes only.
          </p>
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
