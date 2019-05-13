import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';

import IsColorDark from './is_color_dark';
const isColorDarkSource = require('!!raw-loader!./is_color_dark');
const isColorDarkHtml = renderToHtml(IsColorDark);

export const IsColorDarkExample = {
  title: 'Is Color Dark',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: isColorDarkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: isColorDarkHtml,
        },
      ],
      text: (
        <p>
          Use <EuiCode>isColorDark</EuiCode> to determine whether or not to use
          light or dark text against a background of a given color.
        </p>
      ),
      demo: <IsColorDark />,
    },
  ],
};
