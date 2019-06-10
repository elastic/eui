import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiCode,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiCallOut,
} from '../../../../src/components';

import { GlobalFilterBar } from './global_filter_bar';
import GlobalFilterAdd from './global_filter_add';
import GlobalFilterOptions from './global_filter_options';
import GlobalFilterForm from './global_filter_form';
import { GlobalFilterItem } from './global_filter_item';

import Header from './header';
const headerSource = require('!!raw-loader!./header');
const headerHtml = renderToHtml(Header);

import HeaderLinks from './header_links';
const headerLinksSource = require('!!raw-loader!./header_links');
const headerLinksHtml = renderToHtml(HeaderLinks);

import GlobalQuery from './global_query';
const globalQuerySource = require('!!raw-loader!./global_query');
const globalQueryHtml = renderToHtml(GlobalQuery);

const headerSnippet = `<EuiHeader>
  <EuiHeaderSection grow={false}>
    <EuiHeaderSectionItem border="right">
      <!-- HeaderSectionItem goes here -->
    </EuiHeaderSectionItem>
    <EuiHeaderSectionItem border="right">
      <!-- HeaderSectionItem goes here -->
    </EuiHeaderSectionItem>
  </EuiHeaderSection>

  <!-- You can render breadcrumbs here using EuiHeaderBreadcrumbs -->

  <EuiHeaderSection side="right">
    <EuiHeaderSectionItem>
      <!-- HeaderSectionItem goes here -->
      </EuiHeaderSectionItem>
      
      <EuiHeaderSectionItem>
      <!-- HeaderSectionItem goes here -->
    </EuiHeaderSectionItem>
  </EuiHeaderSection>
</EuiHeader>
`;

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

    <EuiHeaderLink href="#">
      <!-- Third link -->
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
      title: 'Global query and filters',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: globalQuerySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: globalQueryHtml,
        },
      ],
      text: (
        <div>
          <EuiCallOut color="warning" title="Demo of visual pattern only">
            <p>
              This documents a <strong>visual</strong> pattern for the eventual
              replacement of Kibana&apos;s global query and filter bars. The
              filter bar has been broken down into multiple components. There
              are still bugs and not all the logic is well-formed.
            </p>
          </EuiCallOut>
        </div>
      ),
      props: {
        GlobalQuery,
        GlobalFilterBar,
        GlobalFilterOptions,
        GlobalFilterAdd,
        GlobalFilterForm,
        GlobalFilterItem,
      },
      demo: <GlobalQuery />,
    },
  ],
};
