import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiBreadcrumbs,
} from '../../../../src/components';

import Breadcrumbs from './breadcrumbs';
const breadcrumbsSource = require('!!raw-loader!./breadcrumbs');
const breadcrumbsHtml = renderToHtml(Breadcrumbs);

import Responsive from './responsive';
const responsiveSource = require('!!raw-loader!./responsive');
const responsiveHtml = renderToHtml(Responsive);

export const BreadcrumbsExample = {
  title: 'Breadcrumbs',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: breadcrumbsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: breadcrumbsHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiBreadcrumbs</EuiCode> let the user track their progress within and back out of
        a UX flow. They work well within <EuiCode>EuiPageContentHeader</EuiCode> but be careful
        not to be use them within an app that also uses <EuiCode>EuiHeaderBreadcrumbs</EuiCode>.
      </p>
    ),
    props: { EuiBreadcrumbs },
    demo: <Breadcrumbs />,
  }, {
    title: 'Responsive',
    source: [{
      type: GuideSectionTypes.JS,
      code: responsiveSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: responsiveHtml,
    }],
    text: (
      <p>
        The <EuiCode>responsive</EuiCode> prop will hide breadcrumbs on narrower screens.
      </p>
    ),
    props: { EuiBreadcrumbs },
    demo: <Responsive />,
  }],
};
