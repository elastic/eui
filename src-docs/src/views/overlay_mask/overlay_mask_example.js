import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiOverlayMask, EuiCode } from '../../../../src/components';

import OverlayMask from './overlay_mask';
const overlayMaskSource = require('!!raw-loader!./overlay_mask');
const overlayMaskHtml = renderToHtml(OverlayMask);

const overlayMaskSnippet = `<EuiOverlayMask>
  <!-- Content goes here -->
</EuiOverlayMask>`;

export const OverlayMaskExample = {
  title: 'Overlay Mask',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: overlayMaskSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: overlayMaskHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiOverlayMask</EuiCode> is an useful component to create
            an overlay effect. It can be used to pop up messages. Best use of an
            overlay mask is to wrap it on <EuiCode>EuiModal</EuiCode>. See
            examples <a href="http://localhost:8030/#/layout/modal">Here</a>.
          </p>
          <p>
            <EuiCode>EuiOverlayMask</EuiCode> accepts <EuiCode>onClick</EuiCode>
            as prop, where function can be passed.
          </p>
        </div>
      ),
      props: { EuiOverlayMask },
      snippet: overlayMaskSnippet,
      demo: <OverlayMask />,
    },
  ],
};
