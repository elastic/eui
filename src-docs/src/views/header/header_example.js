import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiHeader,
  EuiHeaderBreadcrumb,
  EuiHeaderBreadcrumbCollapsed,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
} from '../../../../src/components';

import Header from './header';
const headerSource = require('!!raw-loader!./header');
const headerHtml = renderToHtml(Header);

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
      EuiHeaderBreadcrumb,
      EuiHeaderBreadcrumbCollapsed,
      EuiHeaderBreadcrumbs,
      EuiHeaderSection,
      EuiHeaderSectionItem,
      EuiHeaderSectionItemButton,
      EuiHeaderLogo,
    },
    demo: <Header />,
  }],
};
