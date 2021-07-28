import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiLink } from '../../../../src/components';

import linkConfig from './playground';

import LinkDemo from './link';
const linkSource = require('!!raw-loader!./link');

import LinkExternal from './link_external';
const linkExternalSource = require('!!raw-loader!./link_external');

import LinkColor from './link_color';
const linkColorSource = require('!!raw-loader!./link_color');

import { LinkDisable } from './link_disable';
const linkDisableSource = require('!!raw-loader!./link_disable');

import { LinkValidation } from './link_validation';
const linkValidationSource = require('!!raw-loader!./link_validation');

export const LinkExample = {
  title: 'Link',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkSource,
        },
      ],
      text: (
        <p>
          <strong>EuiLink</strong> is any anchor or button element that is
          designed to display nicely within a block of text. It also provides
          more anchor-specific styling onto links and makes sure they are
          accessible.
        </p>
      ),
      props: { EuiLink },
      snippet: '<EuiLink href="#"><!-- Link text --></EuiLink>',
      demo: <LinkDemo />,
      playground: linkConfig,
    },
    {
      title: 'External links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkExternalSource,
        },
      ],
      text: (
        <p>
          Setting <EuiCode language="tsx">{'target="_blank"'}</EuiCode> defaults
          to <EuiCode language="tsx">{'external={true}'}</EuiCode>. This adds an
          icon indicator instructing users that a new window will open. You can
          also manually apply this icon in case you handle the target behavior
          by other means.
        </p>
      ),
      props: { EuiLink },
      demo: <LinkExternal />,
      snippet: [
        `<EuiLink href="#" target="_blank">
  <!-- Automatically external -->
</EuiLink>`,
        `<EuiLink href="#" external>
  <!-- Manual external -->
</EuiLink>`,
      ],
    },
    {
      title: 'Coloring links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkColorSource,
        },
      ],
      text: (
        <p>
          Like any other <Link to="/navigation/button">button component</Link>,
          links can be passed a <EuiCode>color</EuiCode>. Note that the{' '}
          <EuiCode>ghost</EuiCode> type should only be used on dark backgrounds
          (regardless of theming) as it will always create a white link.
        </p>
      ),
      props: { EuiLink },
      demo: <LinkColor />,
      snippet: `<EuiLink href="#" color="success">
  <!-- Colored link text -->
</EuiLink>`,
    },
    {
      title: 'Disabled links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkDisableSource,
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
      snippet: `<EuiLink onClick={function} disabled>
  <!-- Disabled link text -->
</EuiLink>`,
    },
    {
      title: 'Link validation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkValidationSource,
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
};
