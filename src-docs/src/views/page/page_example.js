import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { pageTemplateConfig, pageHeaderConfig } from './playground';
import { PageDemo } from './_page_demo';

import {
  EuiCode,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiText,
  EuiEmptyPrompt,
} from '../../../../src/components';

import Page from './page';
import PageNew from './page_new';
import PageTemplate from './page_template';
const pageNewSource = require('!!raw-loader!./page_new');
const pageNewHtml = renderToHtml(PageNew);

import PageSimple from './page_simple';
import PageSimpleNew from './page_simple_new';
import PageSimpleNewTemplate from './page_simple_new_template';
const pageSimpleNewSource = require('!!raw-loader!./page_simple_new');
const pageSimpleNewHtml = renderToHtml(PageSimpleNew);

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
import PageContentOnlyTemplate from './page_content_only_template';
const pageContentOnlySource = require('!!raw-loader!./page_content_only');
const pageContentOnlyHtml = renderToHtml(PageContentOnly);

import PageCustomContent from './page_custom_content';
import PageCustomContentTemplate from './page_custom_content_template';
const pageCustomContentSource = require('!!raw-loader!./page_custom_content');
const pageCustomContentHtml = renderToHtml(PageCustomContent);

import PageContentCenter from './page_content_center';
import PageContentCenterTemplate from './page_content_center_template';
const pageContentCenterSource = require('!!raw-loader!./page_content_center');
const pageContentCenterHtml = renderToHtml(PageContentCenter);

import PageContentCenterWithSideBar from './page_content_center_with_side_bar';
import PageContentCenterWithSideBarTemplate from './page_content_center_with_side_bar_template';
const PageContentCenterWithSideBarSource = require('!!raw-loader!./page_content_center_with_side_bar');
const PageContentCenterWithSideBarHtml = renderToHtml(
  PageContentCenterWithSideBar
);

import PageSimpleEmptyContent from './page_simple_empty_content';
import PageSimpleEmptyContentTemplate from './page_simple_empty_content_template';
const PageSimpleEmptyContentSource = require('!!raw-loader!./page_simple_empty_content');
const PageSimpleEmptyContentHtml = renderToHtml(PageSimpleEmptyContent);

import PageContentCenterWithSideBarNew from './page_content_center_with_side_bar_new';
import PageContentCenterWithSideBarNewTemplate from './page_content_center_with_side_bar_new_template';
const PageContentCenterWithSideBarNewSource = require('!!raw-loader!./page_content_center_with_side_bar_new');
const PageContentCenterWithSideBarNewHtml = renderToHtml(
  PageContentCenterWithSideBarNew
);

export const PageExample = {
  playground: [pageTemplateConfig, pageHeaderConfig],
  title: 'Page',
  intro: (
    <EuiText>
      <p>
        Page layouts are modular and have the ability to add or remove
        components as needed for the design. These examples are small so we have
        included a full screen view of each and is the only way to showcase the
        sticky nature of the side bar.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'A full page layout with everything on',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageNewSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pageNewHtml,
        },
      ],
      text: (
        <div>
          <p>
            EUI provides a family of components using the{' '}
            <EuiCode>EuiPage</EuiCode> prefix that work together to build
            consistent page layouts that work responsively.
          </p>
          <ul>
            <li>
              <strong>EuiPage</strong> provides the overall wrapper with a
              column flex display.
            </li>
            <li>
              <strong>EuiPageSideBar</strong> provides a way to add side
              navigation that can be made <EuiCode>sticky</EuiCode> to scroll
              independent of the page content. See{' '}
              <Link to="/navigation/side-nav">
                <strong>EuiSideNav</strong>
              </Link>{' '}
              for contents.
            </li>
            <li>
              <strong>EuiPageContent</strong> provides the main content
              container and extends{' '}
              <Link to="/layout/panel">
                <strong>EuiPanel</strong>
              </Link>
              .
            </li>
            <li>
              <strong>EuiPageHeader</strong> provides a title, description,
              section for actions and possible tabs.
            </li>
            <li>
              <strong>EuiPageContentBody</strong> wraps the content that comes
              after the page header.
            </li>
          </ul>
        </div>
      ),
      props: {
        EuiPage,
        EuiPageSideBar,
        EuiPageHeader,
        EuiPageContent,
        EuiPageContentBody,
      },
      demo: (
        <PageDemo>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageTemplate
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            ) : (
              <PageNew
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            )
          }
        </PageDemo>
      ),
    },
    {
      text: <p>TEMPORARY: Old version</p>,
      demo: (
        <div className="guideDemo__highlightLayout">
          <Page />
        </div>
      ),
    },
    {
      title: 'Restricting width',
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
      text: (
        <p>
          Most content does not scale well to the full width of the window. You
          can restrict this to a typical width and center the page by setting
          the <EuiCode>restrictWidth</EuiCode> prop to <EuiCode>true</EuiCode>{' '}
          on <strong>EuiPageHeader</strong> and <strong>EuiPageContent</strong>.
          You can also pass an integer to this property to max out the width at
          a custom pixel value or a string with a custom measurement.
        </p>
      ),
      demo: (
        <PageDemo>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageContentOnlyTemplate
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            ) : (
              <PageContentOnly
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            )
          }
        </PageDemo>
      ),
      props: {
        EuiPage,
        EuiPageSideBar,
        EuiPageHeader,
        EuiPageContent,
        EuiPageContentBody,
      },
    },
    {
      title: 'Centered content',
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
          When the content for the page is minimal or in an empty/pre-setup
          state, the page content can be centered vertically and horizontally.
          We recommend then using the{' '}
          <Link to="/display/empty-prompt">
            <strong>EuiEmptyPrompt</strong>
          </Link>{' '}
          for the content. This setup works with or without the side bar.
        </p>
      ),
      demo: (
        <PageDemo centered>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageContentCenterWithSideBarTemplate
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            ) : (
              <PageContentCenterWithSideBar
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            )
          }
        </PageDemo>
      ),
      props: {
        EuiPage,
        EuiPageSideBar,
        EuiPageContent,
        EuiEmptyPrompt,
      },
    },
    {
      title: 'Empty content with page header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageContentCenterWithSideBarNewSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: PageContentCenterWithSideBarNewHtml,
        },
      ],
      text: (
        <p>
          Similar to the previous example, you can create a centered panel to
          emphasis incompleteness even with a page header. For this setup, we
          recommend using nested <strong>EuiPageContent</strong> components for
          the ease of props available.
        </p>
      ),
      demo: (
        <PageDemo centered>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageContentCenterWithSideBarNewTemplate
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            ) : (
              <PageContentCenterWithSideBarNew
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            )
          }
        </PageDemo>
      ),
      snippet: `<EuiPageTemplate
  template="centeredContent"
  pageContentProps={{ paddingSize: 'none' }}
  sideNav={sideNav}
  pageHeader={{
    iconType: 'logoElastic',
    pageTitle: 'Page title',
    rightSideItems: [button],
  }}>
  <EuiEmptyPrompt title={<span>No spice</span>} body={content} />
</EuiPageTemplate>`,
    },
    {
      title: 'A simple page with a title',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageSimpleNewSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pageSimpleNewHtml,
        },
      ],
      text: (
        <p>
          Some pages don&rsquo;t have sidebars. In this case, we recommend a
          slightly different configuration by pulling the page hader out of the
          EuiPageContent. But you will need to include the change EuiPage&apos;s
          direction to {'column'}. This example has `restricedWidth` set to 75%.
        </p>
      ),
      demo: (
        <PageDemo>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageSimpleNewTemplate
                button={<Button />}
                content={<Content />}
              />
            ) : (
              <PageSimpleNew button={<Button />} content={<Content />} />
            )
          }
        </PageDemo>
      ),
      props: {
        EuiPage,
        EuiPageBody,
        EuiPageHeader,
        EuiPageContent,
        EuiPageContentBody,
      },
    },
    {
      text: <p>TEMPORARY: Old version</p>,
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageSimple />
        </div>
      ),
    },
    {
      title: 'Simple layout with centered content',
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
          When the content for the page is minimal or in an empty/pre-setup
          state, the page content can be centered vertically and horizontally.
          We recommend then using the{' '}
          <Link to="/display/empty-prompt">
            <strong>EuiEmptyPrompt</strong>
          </Link>{' '}
          for the content. This setup works with or without the side bar.
        </p>
      ),
      demo: (
        <PageDemo centered>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageContentCenterTemplate
                button={<Button />}
                content={<Content />}
              />
            ) : (
              <PageContentCenter button={<Button />} content={<Content />} />
            )
          }
        </PageDemo>
      ),
      props: {
        EuiPage,
        EuiPageSideBar,
        EuiPageContent,
        EuiEmptyPrompt,
      },
    },
    {
      title: 'Simple layout with empty inner content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleEmptyContentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: PageSimpleEmptyContentHtml,
        },
      ],
      text: (
        <p>
          Similar to the previous example, you can create a centered panel to
          emphasis incompleteness even with a page header. For this setup, we
          recommend using nested <strong>EuiPageContent</strong> components for
          the ease of props available.
        </p>
      ),
      demo: (
        <PageDemo centered>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageSimpleEmptyContentTemplate
                button={<Button />}
                content={<Content />}
              />
            ) : (
              <PageSimpleEmptyContent
                button={<Button />}
                content={<Content />}
              />
            )
          }
        </PageDemo>
      ),
    },
    {
      title: 'A simple page layout with custom content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageCustomContentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pageCustomContentHtml,
        },
      ],
      text: (
        <p>
          You can replace the inner parts of EuiPageBody with your own content,
          with or without a page header. This allows you to create dashboard
          style layouts with lots of panels. It is not recommended, however, to
          use this setup when you also have side nav.
        </p>
      ),
      demo: (
        <PageDemo>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageCustomContentTemplate button={<Button />} />
            ) : (
              <PageCustomContent button={<Button />} />
            )
          }
        </PageDemo>
      ),
      props: {
        EuiPage,
        EuiPageBody,
        EuiPageHeader,
        EuiPageContentBody,
      },
    },
    {
      title: 'The page header in detail',
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
            <strong>EuiPageHeader</strong> provides props for opinionated,
            consistent formatting of your header. Any combination of{' '}
            <EuiCode>pageTitle</EuiCode>, <EuiCode>description</EuiCode>,{' '}
            <EuiCode>tabs</EuiCode>, or any <EuiCode>children</EuiCode> will
            adjust the layout as needed.
          </p>
          <p>
            An additional prop <EuiCode>rightSideItems</EuiCode> allows for a
            simple <strong>array of nodes</strong> which will layout in a
            flexbox row. This is commonly used for adding multiple buttons, of
            which, at least one should be primary (or{' '}
            <EuiCode language="ts">{'fill="true"'}</EuiCode>). These items are
            also displayed in <strong>reverse order</strong> so that the first
            and primary array item will be displayed on the far right.
          </p>
          <p>
            You can further adjust the display of these content types with an
            optional <EuiCode>iconType</EuiCode> placed to the left of the
            title, <EuiCode>alignItems</EuiCode> for adjusting the vertical
            alignment of the two sides, and <EuiCode>responsiveOrder</EuiCode>{' '}
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
    { label:"Tab 1", isSelected: true },
    { label:"Tab 2" }
  ]}
  description="Example of a description."
  rightSideItems={[
    <EuiButton fill>Button 1</EuiButton>,
    <EuiButton>Button 2</EuiButton>
  ]}
/>`,
    },
    {
      title: 'Tabs in the page header',
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
    { label:"Tab 1", isSelected: true },
    { label:"Tab 2" }
  ]}
  description="Example of a description."
/>`,
    },
    {
      title: 'Customizing the page header',
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
        <div className="guideDemo__highlightLayout--single">
          <PageHeaderCustom />
        </div>
      ),
      props: { EuiPageHeader, EuiPageHeaderSection },
    },
  ],
};
