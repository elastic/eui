import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiLink,
  EuiKeyboardAccessible,
  EuiScreenReaderOnly,
} from '../../../../src/components';

import KeyboardAccessible from './keyboard_accessible';
import ScreenReaderOnly from './screen_reader';

const keyboardAccessibleSource = require('!!raw-loader!./keyboard_accessible');
const keyboardAccessibleHtml = renderToHtml(KeyboardAccessible);

const screenReaderOnlyHtml = renderToHtml(ScreenReaderOnly);
const screenReaderOnlySource = require('!!raw-loader!./screen_reader');

export const AccessibilityExample = {
  title: 'Accessibility',
  sections: [
    {
      title: 'KeyboardAccessible',
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
          You can make interactive elements keyboard-accessible with this
          component. This is necessary for non-button elements and{' '}
          <EuiCode>a</EuiCode> tags without
          <EuiCode>href</EuiCode> attributes.
        </p>
      ),
      props: { EuiKeyboardAccessible },
      demo: <KeyboardAccessible />,
    },
    {
      title: 'ScreenReaderOnly',
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
            This class can be useful to add accessibility to older designs that
            are still in use, but it shouldn&rsquo;t be a permanent solution.
            See{' '}
            {
              <EuiLink href="http://webaim.org/techniques/css/invisiblecontent/">
                http://webaim.org/techniques/css/invisiblecontent/
              </EuiLink>
            }{' '}
            for more information.
          </p>
          <p>
            Use a screenreader to verify that there is a second paragraph in
            this example:
          </p>
        </div>
      ),
      props: { EuiScreenReaderOnly },
      demo: <ScreenReaderOnly />,
    },
  ],
};
