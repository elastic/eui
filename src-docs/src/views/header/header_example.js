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
      text: <p>The header is made up of several individual components.</p>,
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
      title: 'Alerts',
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
