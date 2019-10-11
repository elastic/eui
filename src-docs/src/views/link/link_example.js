import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiLink } from '../../../../src/components';

import Link from './link';
import { LinkDisable } from './link_disable';

const linkSource = require('!!raw-loader!./link');
const linkHtml = renderToHtml(Link);

const linkDisableSource = require('!!raw-loader!./link_disable');
const linkDisableHtml = renderToHtml(LinkDisable);

const linkSnippet = [
  `<EuiLink href="#"><!-- Link text --></EuiLink>
`,
  `<EuiLink href="#" color="secondary">
  <!-- Colored link text -->
</EuiLink>
`,
];

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
      snippet: linkSnippet,
      demo: <Link />,
    },
    {
      title: 'Disabled Links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkDisableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: linkDisableHtml,
        },
      ],
      text: (
        <p>
          Holy moly
        </p>
      ),
      props: { EuiLink },
      demo: <LinkDisable />,
    },
  ],
};
