import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiLink,
  EuiSkipLink,
  EuiScreenReaderLive,
  EuiScreenReaderOnly,
  EuiScreenReaderStatus,
  EuiSpacer,
} from '../../../../src';

import ScreenReaderLive from './screen_reader_live';
import ScreenReaderOnly from './screen_reader';
import ScreenReaderFocus from './screen_reader_focus';
import ScreenReaderStatus from './screen_reader_status';
import SkipLink from './skip_link';
import StylesHelpers from './styles_helpers';

const screenReaderLiveSource = require('!!raw-loader!./screen_reader_live');
const screenReaderOnlySource = require('!!raw-loader!./screen_reader');

const screenReaderFocusSource = require('!!raw-loader!./screen_reader_focus');
const screenReaderStatusSource = require('!!raw-loader!./screen_reader_status');
const screenReaderStatusSnippet = [
  '<EuiScreenReaderStatus statusMessage="User-defined message" />',
  '<EuiScreenReaderStatus statusMessage="User-defined message" shouldReceiveFocus />',
];

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
      title: 'Screen reader live region',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: screenReaderLiveSource,
        },
      ],
      text: (
        <>
          <p>
            Use <EuiCode>EuiScreenReaderLive</EuiCode> to announce dynamic
            content, such as status changes based on user interaction.
          </p>
          <p>
            The configurable <EuiCode>role</EuiCode> and{' '}
            <EuiCode>aria-live</EuiCode> props default to{' '}
            <EuiCode>status</EuiCode> and <EuiCode>polite</EuiCode> respectively
            for unintrusive but timely update announcements. When not using the
            default values, be sure to follow{' '}
            <EuiLink
              href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions"
              external
            >
              ARIA guidelines
            </EuiLink>{' '}
            for <EuiCode>role</EuiCode> to <EuiCode>aria-live</EuiCode> mapping.
          </p>
          <p>
            Also consider other live region guidelines, such as that live
            regions must be present on initial page load, and should not be in a
            conditional JSX wrapper.
          </p>
        </>
      ),
      props: {
        EuiScreenReaderLive,
      },
      demo: <ScreenReaderLive />,
    },
    {
      title: 'Screen reader status',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: screenReaderStatusSource,
        },
      ],
      text: (
        <>
          <p>
            Use <EuiCode>EuiScreenReaderStatus</EuiCode> to announce status
            changes such as content being loaded or client-side route changes.
          </p>
          <p>
            The configurable <EuiCode>statusMessage</EuiCode> and{' '}
            <EuiCode>shouldReceiveFocus</EuiCode> props default to{' '}
            <EuiCode>document.title</EuiCode> and <EuiCode>false</EuiCode>{' '}
            respectively.
          </p>
          <p>
            Most users will want to pass a string to{' '}
            <EuiCode>statusMessage</EuiCode>. This will add a non-focusable
            status block to the page. This status will be read by screen readers
            when there is a natural pause.
          </p>
          <p>
            Passing <EuiCode>shouldReceiveFocus</EuiCode> sets keyboard focus on
            the status block when
            <EuiCode>EuiScreenReaderStatus</EuiCode> mounts, or the{' '}
            <EuiCode>statusMessage</EuiCode> prop updates. Passing{' '}
            <EuiCode>shouldReceiveFocus</EuiCode> also removes the live region.
            This is useful for announcing client-side route changes to screen
            readers and should <strong>only</strong> be used when the status
            block is at the top of the HTML source order.
          </p>
          <p>
            To learn more about the <EuiCode>status</EuiCode> role make sure to
            read the{' '}
            <EuiLink
              href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role"
              external
            >
              ARIA guidelines
            </EuiLink>
            .
          </p>
        </>
      ),
      props: {
        EuiScreenReaderStatus,
      },
      snippet: screenReaderStatusSnippet,
      demo: <ScreenReaderStatus />,
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
    {
      title: 'Styles helpers',
      wrapText: false,
      color: 'subdued',
      text: <StylesHelpers />,
    },
  ],
};
