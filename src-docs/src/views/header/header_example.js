import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

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
} from '../../../../src/components';

import Header from './header';
const headerSource = require('!!raw-loader!./header');
const headerHtml = renderToHtml(Header);

import HeaderLinks from './header_links';
const headerLinksSource = require('!!raw-loader!./header_links');
const headerLinksHtml = renderToHtml(HeaderLinks);

export const HeaderExample = {
  title: 'Header',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: headerSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: headerHtml,
    }],
    text: (
      <p>
        The header is made up of several individual components.
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
    demo: <Header />,
  },{
    title: "Links",
    source: [{
      type: GuideSectionTypes.JS,
      code: headerLinksSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: headerLinksHtml,
    }],
    text: (
      <p>
        Kibana should and will eventually always use the breadcrumb style of header.
        However, in some rare cases where EUI is being used as a one-off site or page,
        you can use <EuiCode>EuiHeaderLinks</EuiCode>, <EuiCode>EuiHeaderLink</EuiCode>s instead of breadcrumbs.
      </p>
    ),
    props: {
      EuiHeaderLinks,
      EuiHeaderLink
    },
    demo: <HeaderLinks />,
  }],
};
