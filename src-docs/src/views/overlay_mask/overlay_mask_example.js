import React from 'react';
import { Link } from 'react-router-dom';

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
            <strong>EuiOverlayMask</strong> is simply a display component used
            to obscure the main content to bring attention to its children or
            other content. It is best used in conjunction with hyper-focus
            content areas like <Link to="/layout/modal">modals</Link> and{' '}
            <Link to="/layout/flyout">flyouts</Link>.
          </p>
          <p>
            There are{' '}
            <a href="https://www.nngroup.com/articles/overuse-of-overlays/">
              many considerations
            </a>{' '}
            to make before choosing to use an overlay. At the very least, you
            must provide a visible button to close the overlay. You can also
            pass an <EuiCode>onClick</EuiCode> handler to handle closing the
            overlay. However, be wary of using <EuiCode>onClick</EuiCode> and{' '}
            <EuiCode>children</EuiCode>, as clicking the{' '}
            <EuiCode>children</EuiCode> will also trigger the{' '}
            <EuiCode>onClick</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiOverlayMask },
      snippet: overlayMaskSnippet,
      demo: <OverlayMask />,
    },
  ],
};
