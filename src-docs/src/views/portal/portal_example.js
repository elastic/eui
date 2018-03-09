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
  }],
};
