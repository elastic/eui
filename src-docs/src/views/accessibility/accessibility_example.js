import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiLink,
  EuiKeyboardAccessible,
  EuiSkipLink,
} from '../../../../src/components';

import KeyboardAccessible from './keyboard_accessible';
import ScreenReaderOnly from './screen_reader';
import SkipLink from './skip_link';

const keyboardAccessibleSource = require('!!raw-loader!./keyboard_accessible');
const keyboardAccessibleHtml = renderToHtml(KeyboardAccessible);
const keyboardAccessibleSnippet = `<EuiKeyboardAccessible>
  <!-- interactive child element -->
</EuiKeyboardAccessible>`;

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

import { ScreenReaderOnlyDocsComponent } from './props';

export const AccessibilityExample = {
  title: 'Accessibility',
  sections: [
    {
      title: 'Keyboard accessible',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyboardAccessibleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyboardAccessibleHtml,
        },
      ],
      text: (
        <p>
          You can make interactive elements keyboard-accessible with the{' '}
          <strong>EuiKeyboardAccessible</strong> component. This is necessary
          for non-button elements and <EuiCode>a</EuiCode> tags without{' '}
          <EuiCode>href</EuiCode> attributes.
        </p>
      ),
      props: { EuiKeyboardAccessible },
      snippet: keyboardAccessibleSnippet,
      demo: <KeyboardAccessible />,
    },
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
        EuiScreenReaderOnly: ScreenReaderOnlyDocsComponent,
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
