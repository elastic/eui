import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiCopy,
} from '../../../../src/components';

import Copy from './copy';
const copySource = require('!!raw-loader!./copy');
const copyHtml = renderToHtml(Copy);

export const CopyExample = {
  title: 'Copy',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: copySource,
    }, {
      type: GuideSectionTypes.HTML,
      code: copyHtml,
    }],
    text: (
      <p>
        The <EuiCode>EuiCopy</EuiCode> component is a simplified utility for copying text to clipboard.
      </p>
    ),
    components: { EuiCopy },
    demo: <Copy />,
    props: { EuiCopy },
  }],
};
