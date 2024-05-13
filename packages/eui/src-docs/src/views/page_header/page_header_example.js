import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiText,
} from '../../../../src/components';

import { pageHeaderConfig } from './playground';

import PageHeader from './page_header';
const pageHeaderSource = require('!!raw-loader!./page_header');

import PageHeaderTabs from './page_header_tabs';
const pageHeaderTabsSource = require('!!raw-loader!./page_header_tabs');
import PageHeaderTabsTitle from './page_header_tabs_title';
const pageHeaderTabsTitleSource = require('!!raw-loader!./page_header_tabs_title');

import PageHeaderCustom from './page_header_custom';
const pageHeaderCustomSource = require('!!raw-loader!./page_header_custom');

import PageBreadcrumbs from './page_header_breadcrumbs';
const pageBreadcrumbsSource = require('!!raw-loader!./page_header_breadcrumbs');
import PageBreadcrumbsReturn from './page_header_breadcrumbs_return';
const pageBreadcrumbsReturnSource = require('!!raw-loader!./page_header_breadcrumbs_return');

export const PageHeaderExample = {
  title: 'Page header',
  intro: (
    <EuiText>
      <p>
        While the <strong>EuiPageHeader</strong> component can be placed
        anywhere within your page layout, we recommend using it within the{' '}
        <Link to="/templates/page-template">
          <strong>EuiPageTemplate</strong>
        </Link>{' '}
        component by passing the configuration props as its{' '}
        <EuiCode>pageHeader</EuiCode>.
      </p>
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderSource,
        },
      ],
      playground: pageHeaderConfig,
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
            which, at least one should be primary (adding{' '}
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
      demo: <PageHeader />,
      props: { EuiPageHeader },
    },
    {
      title: 'Tabs in the page header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderTabsTitleSource,
        },
      ],
      text: (
        <>
          <p>
            A set of <EuiCode>tabs</EuiCode> can be displayed inside the page
            header by passing an array of{' '}
            <Link to="/navigation/tabs">
              <strong>EuiTab</strong>
            </Link>{' '}
            objects using the <EuiCode>label</EuiCode> key for the tab content.
            When displaying tabs, the <EuiCode>bottomBorder</EuiCode> prop will
            be enforced to create separation of the header and content.
            You&apos;ll still need to manage the page content and selected tab
            in your own instance.
          </p>
        </>
      ),
      demo: <PageHeaderTabsTitle />,
      props: { EuiPageHeader },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderTabsSource,
        },
      ],
      text: (
        <>
          <p>
            When supplying <EuiCode>tabs</EuiCode> without a{' '}
            <EuiCode>pageTitle</EuiCode>, <strong>EuiPageHeader</strong> will
            promote those tabs as if they are the page title. This means that
            any <EuiCode>description</EuiCode> or <EuiCode>children</EuiCode>{' '}
            will sit <strong>below</strong> the tabs and should used to describe
            the currently selected tab.
          </p>
        </>
      ),
      demo: <PageHeaderTabs />,
      props: { EuiPageHeader },
    },
    {
      title: 'Breadcrumbs in the page header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageBreadcrumbsSource,
        },
      ],
      text: (
        <>
          <p>
            <Link to="/navigation/breadcrumbs">Breadcrumbs</Link> are useful for
            tracking in-page flows that{' '}
            <strong>are not part of the entire application architecture</strong>
            . To make this easy <strong>EuiPageHeader</strong> provides a{' '}
            <EuiCode>breadcrumbs</EuiCode> prop that accepts the same
            configuration as <EuiCode>EuiBreadrumbs.breadcrumbs</EuiCode>.
          </p>
        </>
      ),
      demo: <PageBreadcrumbs />,
      props: { EuiPageHeader },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageBreadcrumbsReturnSource,
        },
      ],
      text: (
        <p>
          A common pattern is to use a single breadcrumb to return the user to a
          listing page from which the current page was navigated to.
        </p>
      ),
      demo: <PageBreadcrumbsReturn />,
      props: { EuiPageHeader },
    },
    {
      title: 'Customizing the page header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderCustomSource,
        },
      ],
      text: (
        <>
          <p>
            The page header content props are helpful props to push content into
            established Elastic page layout patterns. They are completely
            optional and by design, inflexible. If you need a layout that does
            not match these patterns you can pass in your own{' '}
            <EuiCode>children</EuiCode> utilizing the{' '}
            <strong>EuiPageHeaderSection</strong> components.
          </p>
        </>
      ),
      demo: <PageHeaderCustom />,
      props: { EuiPageHeader, EuiPageHeaderSection },
    },
  ],
};
