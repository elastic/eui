import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiLink,
  EuiCode,
  EuiCallOut,
  EuiTextTruncate,
} from '../../../../src/components';

import Truncation from './truncation';
const truncationSource = require('!!raw-loader!./truncation');

import Ellipsis from './ellipsis';
const ellipsisSource = require('!!raw-loader!./ellipsis');

import TruncationOffset from './truncation_offset';
const truncationOffsetSource = require('!!raw-loader!./truncation_offset');

import TruncationPosition from './truncation_position';
const truncationPositionSource = require('!!raw-loader!./truncation_position');

import RenderProp from './render_prop';
const renderPropSource = require('!!raw-loader!./render_prop');

export const TextTruncateExample = {
  title: 'Text truncation',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: truncationSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiTextTruncate</strong> provides customizable and
            size-aware single line text truncation.
          </p>
          <p>
            The four truncation styles supported are <EuiCode>start</EuiCode>,{' '}
            <EuiCode>end</EuiCode>, <EuiCode>startEnd</EuiCode>, and{' '}
            <EuiCode>middle</EuiCode>. Resize the below demo to see how
            different truncation styles respond to dynamic width changes.
          </p>
        </>
      ),
      demo: <Truncation />,
      props: { EuiTextTruncate },
      snippet: `<EuiTextTruncate text="Hello world" />`,
    },
    {
      text: (
        <>
          <EuiCallOut
            iconType="accessibility"
            title="Accessibility and comparison to text-overflow"
          >
            <p>
              <strong>EuiTextTruncate</strong> attempts to mimic the behavior of{' '}
              <EuiCode>text-overflow: ellipsis</EuiCode> as closely as possible,
              although there may be edge cases and cross-browser issues, as this
              is essentially a{' '}
              <EuiLink
                href="https://github.com/w3c/csswg-drafts/issues/3937"
                target="_blank"
              >
                browser implementation
              </EuiLink>{' '}
              we are trying to polyfill.
            </p>
            <ul>
              <li>
                Screen readers should ignore the truncated text and only read
                out the full text.
              </li>
              <li>
                Sighted mouse users will be able to briefly hover over the
                truncated text and read the full text in a native browser title
                tooltip.
              </li>
              <li>
                For mouse users, double clicking to select the truncated line
                should allow copying the full untruncated text.
              </li>
            </ul>
          </EuiCallOut>
        </>
      ),
    },
    {
      title: 'Custom ellipsis',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ellipsisSource,
        },
      ],
      text: (
        <p>
          By default, <strong>EuiTextTruncate</strong> uses the unicode
          character for horizontal ellipis. It can be customized via the{' '}
          <EuiCode>ellipsis</EuiCode> prop as necessary (e.g. for specific
          languages, extra punctuation, etc).
        </p>
      ),
      demo: <Ellipsis />,
      props: { EuiTextTruncate },
      snippet: `<EuiTextTruncate text="Hello world" ellipsis="[...]" />`,
    },
    {
      title: 'Truncation offset',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: truncationOffsetSource,
        },
      ],
      text: (
        <p>
          The <EuiCode>start</EuiCode> and <EuiCode>end</EuiCode> truncation
          types support a <EuiCode>truncationOffset</EuiCode> property that
          allows preserving a specified number of characters at either the start
          or end of the text. Increase or decrease the number control below to
          see the prop in action.
        </p>
      ),
      demo: <TruncationOffset />,
      props: { EuiTextTruncate },
      snippet: `<EuiTextTruncate
  text="Hello world"
  truncation="start"
  truncationOffset={5}
/>`,
    },
    {
      title: 'Truncation position',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: truncationPositionSource,
        },
      ],
      text: (
        <>
          <p>
            The <EuiCode>startEnd</EuiCode> truncation type supports a{' '}
            <EuiCode>truncationPosition</EuiCode> property. By default,{' '}
            <EuiCode>startEnd</EuiCode> anchors the displayed text to the middle
            of the string. However, you may prefer to display a specific
            subsection of the full text closer to the start or end, which this
            prop allows.
          </p>
          <p>
            This behavior will intelligently detect when positions are near
            enough to the start or end of the text to omit leading or trailing
            ellipses when necessary.
          </p>
          <p>
            Increase or decrease the number control below to see the prop in
            action.
          </p>
        </>
      ),
      demo: <TruncationPosition />,
      props: { EuiTextTruncate },
      snippet: `<EuiTextTruncate
  text="Hello world"
  truncation="startEnd"
  truncationPosition={10}
/>`,
    },
    {
      title: 'Render prop',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: renderPropSource,
        },
      ],
      text: (
        <>
          <p>
            By default, <strong>EuiTextTruncate</strong> will automatically
            output the calculated truncated string. You can optionally override
            this by passing a render prop function to{' '}
            <EuiCode>children</EuiCode>, which allows for more flexible text
            rendering.
          </p>
          <p>
            The below example demonstrates a primary use case for the render
            prop and the <EuiCode>truncationPosition</EuiCode> prop. If a user
            is searching for a specific word in truncated text, you can use{' '}
            <Link to="/#/utilities/highlight-and-mark">
              <strong>EuiHighlight</strong> or <strong>EuiMark</strong>
            </Link>{' '}
            to highlight the search term, and passing the index of the found
            word to <EuiCode>truncationPosition</EuiCode> ensures the search
            term is always visible to the user.
          </p>
          <EuiCallOut
            color="warning"
            iconType="warning"
            title="Do not render excessive extra content alongside the text. The sizing logic will not account for it, and the truncation calculations will be off."
          />
        </>
      ),
      demo: <RenderProp />,
      props: { EuiTextTruncate },
      snippet: `<EuiTextTruncate text="Hello world">
  {(text) => <EuiMark>{text}</EuiMark>}
</EuiTextTruncate>`,
    },
  ],
};
