import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiLink,
  EuiSkipLink,
  EuiScreenReaderOnly,
} from '../../../../src/components';

import ScreenReaderOnly from './screen_reader';
import SkipLink from './skip_link';

const screenReaderOnlyHtml = renderToHtml(ScreenReaderOnly);
const screenReaderOnlySource = require('!!raw-loader!./screen_reader');
const screenReaderOnlySnippet = [
  `<EuiScreenReaderOnly>
  <!-- visually hidden content -->
</EuiScreenReaderOnly>
`,
  `<EuiScreenReaderOnly showOnFocus>
  <!-- visually hidden content, displayed on focus -->
</EuiScreenReaderOnly>
`,
];

const skipLinkHtml = renderToHtml(SkipLink);
const skipLinkSource = require('!!raw-loader!./skip_link');
const skipLinkSnippet = [
  `<EuiSkipLink destinationId="myAnchorId">
  Skip to content
</EuiSkipLink>
`,
  `<EuiSkipLink destinationId="myAnchorId" position="fixed">
  Skip to main content
</EuiSkipLink>
`,
];

export const AccessibilityExample = {
  title: 'Accessibility',
  sections: [
    {
      title: 'Screen reader only',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: screenReaderOnlySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: screenReaderOnlyHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use the <strong>EuiScreenReaderOnly</strong> component to visually
            hide elements while still allowing them to be read by screen
            readers. In certain cases, you may want to use the{' '}
            <EuiCode>showOnFocus</EuiCode> prop to display screen reader-only
            content when in focus.
          </p>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title="WebAIM recommendation for screen reader-only content">
            <p>
              &quot;In most cases, if content (particularly content that
              provides functionality or interactivity) is important enough to
              provide to screen reader users, it should probably be made
              available to all users.&quot;{' '}
              <EuiLink
                href="http://webaim.org/techniques/css/invisiblecontent/"
                external>
                Learn more about invisible content
              </EuiLink>
            </p>
          </EuiCallOut>
        </div>
      ),
      props: {
        EuiScreenReaderOnly,
      },
      snippet: screenReaderOnlySnippet,
      demo: <ScreenReaderOnly />,
    },
    {
      title: 'Skip link',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skipLinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: skipLinkHtml,
        },
      ],
      text: (
        <p>
          The <strong>EuiSkipLink</strong> component allows users to bypass
          navigation, or ornamental elements, and quickly reach the main content
          of the page.
        </p>
      ),
      props: { EuiSkipLink },
      snippet: skipLinkSnippet,
      demo: <SkipLink />,
    },
  ],
};
