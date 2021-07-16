import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiLink } from '../../../../src/components';

import linkConfig from './playground';

import Link from './link';
import { LinkDisable } from './link_disable';
import { LinkValidation } from './link_validation';

const linkSource = require('!!raw-loader!./link');
const linkHtml = renderToHtml(Link);

const linkDisableSource = require('!!raw-loader!./link_disable');
const linkDisableHtml = renderToHtml(LinkDisable);

const linkValidationSource = require('!!raw-loader!./link_validation');
const linkValidationHtml = renderToHtml(LinkValidation);

const linkSnippet = [
  `<EuiLink href="#"><!-- Link text --></EuiLink>
`,
  `<EuiLink href="#" color="success">
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
          <strong>EuiLink</strong> will apply the correct styling onto links and
          make sure they are accessible. Links can be passed a color. Note that
          the <EuiCode>ghost</EuiCode> type should only be used on dark
          backgrounds (regardless of theming). It will always create a white
          link.
        </p>
      ),
      props: { EuiLink },
      snippet: linkSnippet,
      demo: <Link />,
    },
    {
      title: 'Disabled links',
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
          When an <strong>EuiLink</strong> is passed an{' '}
          <EuiCode>onClick</EuiCode> method, and is not passed an{' '}
          <EuiCode>href</EuiCode>, it can optionally be set to
          <EuiCode>disabled</EuiCode> which disables the click behavior, and
          removes the link styling.
        </p>
      ),
      props: { EuiLink },
      demo: <LinkDisable />,
    },
    {
      title: 'Link validation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkValidationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: linkValidationHtml,
        },
      ],
      text: (
        <p>
          To make links more secure for users, <strong>EuiLink</strong> and
          other components that accept an <EuiCode>href</EuiCode> prop become
          disabled if that <EuiCode>href</EuiCode> uses the{' '}
          <EuiCode>javascript:</EuiCode> protocol. This helps protect consuming
          applications from cross-site scripting (XSS) attacks and mirrors
          React&apos;s{' '}
          <EuiLink
            href="https://github.com/facebook/react/blob/940f48b999a3131e77b2545bd7ae252ef27ae6d1/packages/react-dom/src/shared/sanitizeURL.js#L37"
            target="_blank">
            planned behavior
          </EuiLink>{' '}
          to prevent rendering of <EuiCode>javascript:</EuiCode> links.
        </p>
      ),
      demo: <LinkValidation />,
    },
  ],
  playground: linkConfig,
};
