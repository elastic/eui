import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiLink } from '../../../../src/components';

import Link from './link';
const linkSource = require('!!raw-loader!./link');
const linkHtml = renderToHtml(Link);

export const LinkExample = {
  title: 'Link',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: linkHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>EuiLink</EuiCode> will apply the correct styling onto links
          and make sure they are accessible. Links can be passed a color. Note
          that the <EuiCode>ghost</EuiCode> type should only be used on dark
          backgrounds (regardless of theming). It will always create a white
          link.
        </p>
      ),
      props: { EuiLink },
      demo: <Link />,
    },
  ],
};
