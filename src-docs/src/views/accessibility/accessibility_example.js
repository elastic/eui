import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiLink,
  EuiSkipLink,
  EuiScreenReaderOnly,
  EuiSpacer,
} from '../../../../src/components';

import ScreenReaderOnly from './screen_reader';
import ScreenReaderFocus from './screen_reader_focus';
import SkipLink from './skip_link';

const screenReaderOnlySource = require('!!raw-loader!./screen_reader');
const screenReaderFocusSource = require('!!raw-loader!./screen_reader_focus');

const skipLinkSource = require('!!raw-loader!./skip_link');
const skipLinkSnippet = [
  `<EuiSkipLink destinationId={myAnchorId}>
  Skip to content
</EuiSkipLink>
`,
  `<EuiSkipLink destinationId={myAnchorId} position="fixed">
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
      ],
      text: (
        <>
          <p>
            Using <strong>EuiScreenReaderOnly</strong> hides the wrapped element
            from the page, but keeps it accessible for screen readers to provide
            more context. It should be used primarily to mask{' '}
            <strong>text</strong> and requires the child to be a single React
            element for cloning.
          </p>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title="WebAIM recommendation for screen reader-only content"
          >
            <p>
              &quot;In most cases, if content (particularly content that
              provides functionality or interactivity) is important enough to
              provide to screen reader users, it should probably be made
              available to all users.&quot;{' '}
              <EuiLink href="http://webaim.org/techniques/css/invisiblecontent/">
                Learn more about invisible content
              </EuiLink>
            </p>
          </EuiCallOut>
          <EuiSpacer />
          <p>
            <em>
              Using a screen reader, verify that there is a second paragraph.
            </em>
          </p>
        </>
      ),
      props: {
        EuiScreenReaderOnly,
      },
      snippet: `<EuiScreenReaderOnly>
  <!-- visually hidden content -->
</EuiScreenReaderOnly>`,
      demo: <ScreenReaderOnly />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: screenReaderFocusSource,
        },
      ],
      text: (
        <>
          <h3>Showing on focus</h3>
          <p>
            If the wrapped element <strong>is focusable</strong>, you must use
            the <EuiCode>showOnFocus</EuiCode> prop to visibly show the element
            to all users when focused.
          </p>
          <p>
            <em>
              Tab through the following example with your keyboard to verify the
              element is visible on focus.
            </em>
          </p>
        </>
      ),
      props: {
        EuiScreenReaderOnly,
      },
      snippet: `<EuiScreenReaderOnly showOnFocus>
  <!-- visually hidden content, displayed on focus -->
</EuiScreenReaderOnly>`,
      demo: <ScreenReaderFocus />,
    },
    {
      title: 'Skip link',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skipLinkSource,
        },
      ],
      text: (
        <>
          <p>
            The <strong>EuiSkipLink</strong> component allows users to bypass
            navigation, or ornamental elements, and quickly reach the main
            content of the page. It requires a <EuiCode>destinationId</EuiCode>{' '}
            which should match the <EuiCode>id</EuiCode> of your main content.
            You can also change the <EuiCode>position</EuiCode> to{' '}
            <EuiCode>fixed</EuiCode>.
          </p>
          <p>
            <em>
              Tab through the following section to verify the{' '}
              <strong>Skip to content</strong> button is visible on focus.
            </em>
          </p>
        </>
      ),
      props: { EuiSkipLink },
      snippet: skipLinkSnippet,
      demo: <SkipLink />,
    },
  ],
};
