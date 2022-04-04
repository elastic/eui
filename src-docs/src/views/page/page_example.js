import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiCallOut,
  EuiCode,
  EuiPage,
  EuiPageBody,
  EuiPageSection,
  EuiPageContentBody,
} from '../../../../src';

import { pageConfig, pageSectionConfig } from './components/playground';

import { PageComponentDemo } from './components/page_demo';
const PageSource = require('!!raw-loader!./components/page');
import { PageBodyDemo } from './components/page_body_demo';
const PageBodySource = require('!!raw-loader!./components/page_body');
import { PageSectionDemo } from './components/page_section_demo';
const PageSectionSource = require('!!raw-loader!./components/page_section');

export const PageExample = {
  title: 'Page components',
  intro: (
    <>
      <EuiText>
        <p>
          Page layouts are modular and fit together in a precise manner, though
          certain parts can also be added or removed as needed. EUI provides
          both the <strong>individual page components</strong> and an{' '}
          <Link to="/templates/page-template">over-arching template</Link> for
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
          using the <Link to="/templates/page-template">EuiPageTemplate</Link>{' '}
          and use this page to modify the props of each part of the template.
        </p>
      </EuiCallOut>
      <EuiText>
        <p>
          EUI provides a family of components using the{' '}
          <EuiCode>EuiPage</EuiCode> prefix that work together to build
          consistent page layouts that work responsively.
        </p>
        <ul>
          <li>
            <strong>EuiPage</strong> and <strong>EuiPageBody</strong> provide
            the overall wrapper with a column flex display.
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
            <Link to="/layout/page-header">
              <strong>EuiPageHeader</strong>
            </Link>{' '}
            provides a title, description, section for actions and possible
            tabs.
          </li>
          <li>
            <strong>EuiPageContent</strong> provides the main content container
            and extends{' '}
            <Link to="/layout/panel">
              <strong>EuiPanel</strong>
            </Link>
            .
          </li>
          <li>
            <strong>EuiPageContentBody</strong> wraps the content that comes
            after the page header.
          </li>
        </ul>
      </EuiText>
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
            <EuiCode>direction</EuiCode> and the maximum width using
            <EuiCode>restrictWidth</EuiCode> which centers the page when it
            reaches the provided value (or <EuiCode>1200px</EuiCode> if set to{' '}
            <EuiCode>true</EuiCode>).
          </p>
        </>
      ),
      demo: <PageComponentDemo />,
      demoPanelProps: {
        paddingSize: 'none',
        style: { overflow: 'hidden' },
      },
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: PageSource,
        },
      ],
      props: {
        EuiPage,
      },
      playground: pageConfig,
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
      demo: <PageBodyDemo />,
      demoPanelProps: {
        paddingSize: 'none',
        style: { overflow: 'hidden' },
      },
      props: {
        EuiPageBody,
      },
    },
    {
      title: 'Page section',
      text: (
        <>
          <p>
            <strong>EuiPageSection</strong> is a stackable component that is
            essentially an <strong>EuiPanel</strong> with props for quickly
            creating common usages. Use <EuiCode>panelled</EuiCode> to quickly
            turn on/off the panel background and other attributes. You&apos;ll
            need to set <EuiCode>{'grow={false}'}</EuiCode> to any content that
            you don&apos;t want to stretch within the page.
          </p>
          <p>
            To create dividers between contents, use the{' '}
            <EuiCode>bottomBorder</EuiCode> prop. The{' '}
            <EuiCode>{"'extended'"}</EuiCode> version ensures the border touches
            the sides of the parent. It also supports{' '}
            <EuiCode>restrictWidth</EuiCode> and <EuiCode>alignment</EuiCode> to
            align with common usages.
          </p>
        </>
      ),
      demoPanelProps: { paddingSize: 'none', color: 'subdued' },
      demo: <PageSectionDemo />,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: PageSectionSource,
        },
      ],
      props: {
        EuiPageSection,
        EuiPageContentBody,
      },
      playground: pageSectionConfig,
    },
  ],
};
