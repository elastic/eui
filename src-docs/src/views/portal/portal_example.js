import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiPortal,
} from '../../../../src/components';

import { Portal } from './portal';
const portalSource = require('!!raw-loader!./portal');
const portalHtml = renderToHtml(Portal);

import { PortalInsert } from './portal_insert';
const portalInsertSource = require('!!raw-loader!./portal_insert');
const portalInsertHtml = renderToHtml(PortalInsert);

export const PortalExample = {
  title: 'Portal',
  sections: [{
    title: 'Portal',
    source: [{
      type: GuideSectionTypes.JS,
      code: portalSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: portalHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiPortal</EuiCode> allows you to append its contained children
        onto the document body. It is useful for moving fixed elements like modals,
        tooltips or toasts when you are worried about a z-index or overflow conflict.
      </p>
    ),
    components: { EuiPortal },
    demo: <Portal />,
  }, {
    title: 'Inserting Portals',
    source: [{
      type: GuideSectionTypes.JS,
      code: portalInsertSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: portalInsertHtml,
    }],
    text: (
      <p>
        There is an optional <EuiCode>insert</EuiCode> prop that can specify the portal&quot;s
        location in the DOM. When used, it is important to consider how the location relates
        to the component lifecycle, as it could be removed from the DOM by another component
        update.
      </p>
    ),
    demo: <PortalInsert />,
  }],
};
