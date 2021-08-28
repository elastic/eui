import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageSideBar,
  EuiText,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import Page from './page';
const PageSource = require('!!raw-loader!./page');
import PageBody from './page_body';
const PageBodySource = require('!!raw-loader!./page_body');
import PageContent from './page_content';
const PageContentSource = require('!!raw-loader!./page_content');
import PageSidebar from './page_sidebar';
const PageSidebarSource = require('!!raw-loader!./page_sidebar');

export const PageExample = {
  title: 'Page',
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
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageSource,
        },
      ],
      text: <p />,
      demo: (
        <div className="guideDemo__highlightLayout">
          <Page />
        </div>
      ),
      props: {
        EuiPage,
      },
    },
    {
      title: 'Page body',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageBodySource,
        },
      ],
      text: <p />,
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageBody />
        </div>
      ),
      props: {
        EuiPageBody,
      },
    },
    {
      title: 'Page content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageContentSource,
        },
      ],
      text: <p />,
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageContent />
        </div>
      ),
      props: {
        EuiPageContent,
        EuiPageContentBody,
      },
    },
    {
      title: 'Page sidebar',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageSidebarSource,
        },
      ],
      text: <p />,
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageSidebar />
        </div>
      ),
      props: {
        EuiPageSideBar,
      },
    },
  ],
};
