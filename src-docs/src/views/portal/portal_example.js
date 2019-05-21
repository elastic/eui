import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiPortal } from '../../../../src/components';

import { Portal } from './portal';
const portalSource = require('!!raw-loader!./portal');
const portalHtml = renderToHtml(Portal);

import { PortalInsert } from './portal_insert';
const portalInsertSource = require('!!raw-loader!./portal_insert');
const portalInsertHtml = renderToHtml(PortalInsert);

export const PortalExample = {
  title: 'Portal',
  sections: [
    {
      title: 'Portal',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: portalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: portalHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>EuiPortal</EuiCode> allows you to append its contained
          children onto the document body. It is useful for moving fixed
          elements like modals, tooltips or toasts when you are worried about a
          z-index or overflow conflict.
        </p>
      ),
      components: { EuiPortal },
      demo: <Portal />,
    },
    {
      title: 'Inserting Portals',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: portalInsertSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: portalInsertHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            There is an optional <EuiCode>insert</EuiCode> prop that can specify
            the portal&apos;s location in the DOM. When used, it is important to
            consider how the location relates to the component lifecycle, as it
            could be removed from the DOM by another component update.
          </p>
          <p>
            <EuiCode>insert</EuiCode> is an object with two key-value pairs:{' '}
            <EuiCode>sibling</EuiCode> and <EuiCode>position</EuiCode>.
            <EuiCode>sibling</EuiCode> is the React node or HTMLElement to
            insert the portal next to, and <EuiCode>position</EuiCode> specifies
            the portal&apos;s relative position, either{' '}
            <EuiCode>before</EuiCode> or
            <EuiCode>after</EuiCode>.
          </p>
        </React.Fragment>
      ),
      props: { EuiPortal },
      demo: <PortalInsert />,
    },
  ],
};
