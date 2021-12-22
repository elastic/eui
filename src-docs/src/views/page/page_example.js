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
import { PageDemo } from './_page_demo';

import { PageContentDemo } from './components/page_content_demo';
const PageContentSource = require('!!raw-loader!./components/page_content');

const PageSource = require('!!raw-loader!./page');
import PageBody from './page_body';
const PageBodySource = require('!!raw-loader!./page_body');
import PageSidebar from './page_sidebar';
const PageSidebarSource = require('!!raw-loader!./page_sidebar');

import PageCenteredContent from './components/page_content_body';
// const PageCenteredContentSource = require('!!raw-loader!./page_centered_content');

import PageLegacy from './page';
const PageLegacySource = require('!!raw-loader!./page');

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
      text: (
        <>
          <p>
            <strong>EuiPage</strong> is simply a flex wrapper with built in
            <EuiCode>paddingSize</EuiCode> which controls the outer padding and
            the gap size between children. When wrapped in another flex box it
            will automatically <EuiCode>grow</EuiCode> to fill the height.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageSource,
        },
      ],
      demo: (
        <div className="guideDemo__highlightLayout">
          <PageLegacy />
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
            <EuiCode>border</EuiCode> prop. When using in conjunction with{' '}
            <EuiCode>restrictWidth</EuiCode>, you&apos;ll may want to consider
            the extended border version which will ensure the border touches the
            sides of the parent.
          </p>
          <p>
            You can also use the same <EuiCode>template</EuiCode> and{' '}
            <EuiCode>restrictWidth</EuiCode> options as EuiPageTemplate.
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
    {
      title: 'Page content body',
      text: (
        <p>
          <strong>EuiPageContentBody</strong> is simply an{' '}
          <Link>
            <strong>EuiPanel</strong>
          </Link>{' '}
          with added support for <EuiCode>restrictWidth</EuiCode> and
          vertical/horizontal centering. You should wrap every direct child of{' '}
          <strong>EuiPageContent</strong> with this component, matching settings
          for <EuiCode>restrictWidth</EuiCode>.
        </p>
      ),
      demo: (
        <PageDemo
          slug="centered-content"
          centered
          pattern={PageCenteredContent}
          highlight="euiPageContentBody"
        />
      ),
      props: {
        EuiPageContentBody,
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
