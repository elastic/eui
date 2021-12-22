import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageSideBar,
  EuiCode,
  EuiPageHeader,
  EuiText,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import { pageContentConfig } from './playground';

import { PageContentDemo } from './components/page_content_demo';
const PageContentSource = require('!!raw-loader!./components/page_content');
import { PageComponentDemo } from './components/page_demo';
const PageSource = require('!!raw-loader!./components/page');
import { PageBodyDemo } from './components/page_body_demo';
const PageBodySource = require('!!raw-loader!./components/page_body');
import { PageSideBarDemo } from './components/page_side_bar_demo';
const PageSidebarSource = require('!!raw-loader!./components/page_side_bar');
import PageLegacy from './components/page_legacy';
const PageLegacySource = require('!!raw-loader!./components/page_legacy');

export const PageExample = {
  title: 'Page components',
  intro: (
    <>
      <EuiText>
        <p>
          Page layouts are modular and fit together in a precise manner, though
          certain parts can also be added or removed as needed. EUI provides
          both the <strong>individual page components</strong> and an{' '}
          <Link to="/templates/page-templates">over-arching template</Link> for
          easily creating some pre-defined layouts.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut
        iconType="document"
        title="The following examples showcase the individual components only."
      >
        <p>
          If you&apos;re looking for full page layout examples, we recommend
          using the <Link to="/templates/page-templates">EuiPageTemplate</Link>{' '}
          and use this page to modify the props of each part of the template.
        </p>
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'Page',
      text: (
        <>
          <p>
            <strong>EuiPage</strong> is simply a flex wrapper that will
            automatically <EuiCode>grow</EuiCode> to fill the height of a flex
            container. You can also control the flex{' '}
            <EuiCode>direction</EuiCode> the maximum width using
            <EuiCode>restrictWidth</EuiCode> which centers the page when it
            reaches the provided value (or <EuiCode>1200px</EuiCode> if set to{' '}
            <EuiCode>true</EuiCode>).
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: PageSource,
        },
      ],
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageComponentDemo />
        </div>
      ),
      demoPanelProps: {
        paddingSize: 'none',
        style: { overflow: 'hidden' },
      },
      props: {
        EuiPage,
      },
    },
    {
      title: 'Page body',
      text: (
        <p>
          Typically you&apos;ll want to wrap all your page contents in{' '}
          <strong>EuiPageBody</strong> and set{' '}
          <EuiCode>{'panelled={true}'}</EuiCode> when you have a side bar.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: PageBodySource,
        },
      ],
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageBodyDemo />
        </div>
      ),
      demoPanelProps: {
        paddingSize: 'none',
        style: { overflow: 'hidden' },
      },
      props: {
        EuiPageBody,
      },
    },
    {
      title: 'Page content',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: PageContentSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiPageContent</strong> is a stackable component that is
            essentially an EuiPanel with props for quickly creating common
            usages. Use <EuiCode>panelled</EuiCode> to quickly turn on/off the
            panel background and other attributes. You&apos;ll need to set{' '}
            <EuiCode>{'grow={false}'}</EuiCode> to any content that you
            don&apos;t want to stretch within the page.
          </p>
          <p>
            To create dividers between contents, use the{' '}
            <EuiCode>bottomBorder</EuiCode> prop. The{' '}
            <EuiCode>{"'extended'"}</EuiCode> version ensures the border touches
            the sides of the parent. It also supports{' '}
            <EuiCode>restrictWidth</EuiCode> and <EuiCode>alignment</EuiCode> to
            align with common usages.
          </p>
          <p>
            When providing these custom properties, the component adds an
            additional wrapper of <strong>EuiPageContentBody</strong> to support
            the configurations. To further expand on this wrappers props, you
            can pass <EuiCode>bodyProps</EuiCode>.
          </p>
        </>
      ),
      demo: <PageContentDemo />,
      demoPanelProps: { paddingSize: 'none', color: 'subdued' },
      props: {
        EuiPageContent,
        EuiPageContentBody,
      },
      playground: pageContentConfig,
    },
    {
      title: 'Page sidebar',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: PageSidebarSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiPageSidebar</strong> doesn&apos;t contain many
            configurations itself, but it does dictate how the rest of the page
            contents should be displayed.
          </p>
          <p>
            For example when <strong>including</strong> a sidebar:
          </p>
          <ul>
            <li>
              <strong>EuiPageHeader</strong> &amp;{' '}
              <strong>EuiPageContent</strong>:{' '}
              <EuiCode>{'bottomBorder={true}'}</EuiCode>
            </li>
            <li>
              <strong>EuiEmptyPrompt</strong> for centered contents:{' '}
              <EuiCode>{'color="subdued"'}</EuiCode>
            </li>
          </ul>
          <p>
            When <strong>not</strong> including a sidebar:
          </p>
          <ul>
            <li>
              <strong>EuiPageHeader</strong> &amp;{' '}
              <strong>EuiPageContent</strong>:{' '}
              <EuiCode>{'bottomBorder="extended"'}</EuiCode>
            </li>
            <li>
              <strong>EuiEmptyPrompt</strong> for centered contents &amp; page
              contents is not panelled: <EuiCode>{'color="plain"'}</EuiCode>
            </li>
          </ul>
        </>
      ),
      demo: <PageSideBarDemo />,
      demoPanelProps: { paddingSize: 'none', style: { overflow: 'hidden' } },
      props: {
        EuiPageSideBar,
      },
    },
    {
      title: 'Legacy layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageLegacySource,
        },
      ],
      text: (
        <p>
          In previous versions of EUI, we emulated page layouts where the{' '}
          <strong>EuiPageContent</strong> had margins all around created by
          padding on <strong>EuiPage</strong>. This layout is still achievable
          but not through <strong>EuiPageTemplate</strong>. You must use the{' '}
          <strong>EuiPage</strong> components manually as seen in this example.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightLayout--legacy">
          <PageLegacy />
        </div>
      ),
      props: {
        EuiPage,
        EuiPageBody,
        EuiPageSideBar,
        EuiPageHeader,
        EuiPageContent,
        EuiPageContentBody,
      },
    },
  ],
};
