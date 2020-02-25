import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiHeader,
  EuiHeaderAlert,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiCode,
  EuiHeaderLinks,
  EuiHeaderLink,
} from '../../../../src/components';

import Header from './header';
const headerSource = require('!!raw-loader!./header');
const headerHtml = renderToHtml(Header);

import HeaderSections from './header_sections';
const headerSectionsSource = require('!!raw-loader!./header_sections');
const headerSectionsHtml = renderToHtml(HeaderSections);

import HeaderPosition from './header_position';
const headerPositionSource = require('!!raw-loader!./header_position');
const headerPositionHtml = renderToHtml(HeaderPosition);

import HeaderAlert from './header_alert';
const headerAlertSource = require('!!raw-loader!./header_alert');
const headerAlertHtml = renderToHtml(HeaderAlert);

import HeaderLinks from './header_links';
const headerLinksSource = require('!!raw-loader!./header_links');
const headerLinksHtml = renderToHtml(HeaderLinks);

const headerSnippet = `<EuiHeader>
  <EuiHeaderSection grow={false}>
    <EuiHeaderSectionItem border="right">
      <!-- HeaderSectionItem content -->
    </EuiHeaderSectionItem>
  </EuiHeaderSection>

  <!-- You can render breadcrumbs here using EuiHeaderBreadcrumbs -->

  <EuiHeaderSection side="right">
    <EuiHeaderSectionItem>
      <!-- HeaderSectionItem content -->
    </EuiHeaderSectionItem>
  </EuiHeaderSection>
</EuiHeader>`;

const headerSectionsSnippet = `<EuiHeader
  sections={{
    left: [
      {
        children: this.renderLogo(),
        border: 'none',
      },
      { children: this.renderBreadcrumbs() },
    ],
    center: [
      { children: this.renderSearch() },
    ],
    right: [
      { children: this.renderUser() },
    ],
  }}
/>`;

const headerLinksSnippet = `<EuiHeader>
  <EuiHeaderSectionItem border="right">
    <EuiHeaderLogo
      iconType="iconName"
      href="#"
    />
  </EuiHeaderSectionItem>

  <EuiHeaderLinks>
    <EuiHeaderLink href="#" isActive>
      <!-- First link -->
    </EuiHeaderLink>

    <EuiHeaderLink href="#">
      <!-- Second link -->
    </EuiHeaderLink>
  </EuiHeaderLinks>
</EuiHeader>`;

export const HeaderExample = {
  title: 'Header',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerHtml,
        },
      ],
      text: (
        <p>
          The header is made up of <strong>many</strong> individual components.
        </p>
      ),
      props: {
        EuiHeader,
        EuiHeaderBreadcrumbs,
        EuiHeaderSection,
        EuiHeaderSectionItem,
        EuiHeaderSectionItemButton,
        EuiHeaderLogo,
      },
      snippet: headerSnippet,
      demo: <Header />,
    },
    {
      title: 'Sections',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerSectionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerSectionsHtml,
        },
      ],
      text: (
        <>
          <p>
            Alternatively, you can add a <EuiCode>sections</EuiCode> object for{' '}
            <EuiCode>left</EuiCode>, <EuiCode>center</EuiCode>, and{' '}
            <EuiCode>right</EuiCode> EuiHeaderSections which accepts an array of
            EuiHeaderSectionItem props.
          </p>
          <p>
            <strong>Note:</strong> Passing <EuiCode>sections</EuiCode> and{' '}
            <EuiCode>children</EuiCode> will disregard the{' '}
            <EuiCode>children</EuiCode> as it is not easily interpreted at what
            location the children should be placed.
          </p>
        </>
      ),
      props: {
        EuiHeader,
        EuiHeaderSection,
        EuiHeaderSectionItem,
      },
      snippet: headerSectionsSnippet,
      demo: <HeaderSections />,
    },
    {
      title: 'Position',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerPositionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerPositionHtml,
        },
      ],
      text: (
        <>
          <p>
            Most consumer need a header that does not scroll way with the page
            contents. You can apply this display by changing{' '}
            <EuiCode>position</EuiCode> to <EuiCode>fixed</EuiCode>. It will
            also add the appropriate padding to the window body by applying a
            class.
          </p>
        </>
      ),
      snippet: '<EuiHeader position="fixed" />',
      demo: <HeaderPosition />,
    },
    {
      title: 'Links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerLinksSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerLinksHtml,
        },
      ],
      text: (
        <p>
          If you&rsquo;re using EUI in a one-off site or page, you can use{' '}
          <EuiCode>EuiHeaderLinks</EuiCode>, &nbsp;
          <EuiCode>EuiHeaderLink</EuiCode>s instead of breadcrumbs.
        </p>
      ),
      props: {
        EuiHeaderLinks,
        EuiHeaderLink,
      },
      snippet: headerLinksSnippet,
      demo: <HeaderLinks />,
    },
    {
      title: 'Display header alerts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerAlertSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerAlertHtml,
        },
      ],
      text: (
        <p>
          Use an <EuiCode>EuiHeaderSectionItemButton</EuiCode> to display
          additional information in an <EuiCode>EuiPopover</EuiCode> or{' '}
          <EuiCode>EuiFlyout</EuiCode>, such as a user profile or news feed. In
          the latter example, this additional content can be presented in a list
          style format using <EuiCode>EuiHeaderAlert</EuiCode> components, as
          shown below.
        </p>
      ),
      props: {
        EuiHeaderAlert,
      },
      snippet: headerLinksSnippet,
      demo: <HeaderAlert />,
    },
  ],
};
