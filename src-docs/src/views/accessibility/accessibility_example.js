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

const screenReaderOnlyHtml = renderToHtml(ScreenReaderOnly);
const screenReaderOnlySource = require('!!raw-loader!./screen_reader');

const skipLinkHtml = renderToHtml(SkipLink);
const skipLinkSource = require('!!raw-loader!./skip_link');

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
          <EuiCode>EuiKeyboardAccessible</EuiCode> component. This is necessary
          for non-button elements and <EuiCode>a</EuiCode> tags without{' '}
          <EuiCode>href</EuiCode> attributes.
        </p>
      ),
      props: { EuiKeyboardAccessible },
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
            Use the <EuiCode>EuiScreenReaderOnly</EuiCode> component to visually
            hide elements while still allowing them to be read by screen
            readers.
          </p>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title="WebAIM recommendation for screen reader-only content">
            <p>
              In most cases, if content (particularly content that provides
              functionality or interactivity) is important enough to provide to
              screen reader users, it should probably be made available to all
              users.{' '}
              <EuiLink href="http://webaim.org/techniques/css/invisiblecontent/">
                Learn more
              </EuiLink>
            </p>
          </EuiCallOut>
        </div>
      ),
      props: {
        EuiScreenReaderOnly: ScreenReaderOnlyDocsComponent,
      },
      demo: <ScreenReaderOnly />,
    },
    {
      title: 'Skip to main content',
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
          The <EuiCode>EuiSkipLink</EuiCode> component allows users to bypass
          navigation and quickly reach the main content of the page.
        </p>
      ),
      props: { EuiSkipLink },
      demo: <SkipLink />,
    },
  ],
};
