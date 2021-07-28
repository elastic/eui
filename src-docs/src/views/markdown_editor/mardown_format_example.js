import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';

import {
  EuiLink,
  EuiMarkdownFormat,
  EuiText,
  EuiCode,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownFormat from './markdown_format';
const markdownFormatSource = require('!!raw-loader!./markdown_format');

import MarkdownFormatStyles from './markdown_format_styles';
const markdownFormatStylesSource = require('!!raw-loader!./markdown_format_styles');

import MarkdownFormatSink from './markdown_format_sink';
const markdownFormatSinkSource = require('!!raw-loader!./markdown_format_sink');

export const MarkdownFormatExample = {
  title: 'Markdown format',
  beta: true,
  intro: (
    <Fragment>
      <EuiText>
        <p>
          <strong>EuiMarkdownFormat</strong> is a read-only way to render
          markdown-style content in a page. It is a peer component to{' '}
          <strong>
            <Link to="/editors-syntax/markdown-editor/">EuiMarkdownEditor</Link>
          </strong>{' '}
          and has the ability to be modified by additional{' '}
          <Link to="/editors-syntax/markdown-plugins">markdown plugins</Link>.
        </p>
      </EuiText>
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownFormatSource,
        },
      ],
      title: 'Built in plugins',
      text: (
        <p>
          <strong>EuiMarkdownFormat</strong> is a wrapper that will render
          Markdown provided. EuiMarkdownFormat uses{' '}
          <EuiLink target="_blank" href="https://github.com/remarkjs/remark">
            Remark
          </EuiLink>{' '}
          by default. The translation layer automatically substitutes raw HTML
          output with their EUI equivalent. This means anchor, code blocks and
          horizontal rules will become <strong>EuiLink</strong>,{' '}
          <strong>EuiCodeBlock</strong> and <strong>EuiHorizontalRule</strong>{' '}
          components respectively.
        </p>
      ),
      props: {
        EuiMarkdownFormat,
      },
      demo: <MarkdownFormat />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownFormatStylesSource,
        },
      ],
      title: 'Text sizing and coloring',
      text: (
        <p>
          <strong>EuiMarkdownFormat</strong> uses{' '}
          <Link to="/display/text/">EuiText</Link> as a wrapper to handle all
          the CSS styling when rendering the HTML. It also gives the ability to
          control the text size and color with the <EuiCode>textSize</EuiCode>{' '}
          and <EuiCode>color</EuiCode> props, respectively.
        </p>
      ),
      props: {
        EuiMarkdownFormat,
      },
      demo: <MarkdownFormatStyles />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownFormatSinkSource,
        },
      ],
      title: 'Kitchen sink',
      text: (
        <p>
          This example shows of all the styling and markup possibilities. It is
          mostly used for testing.
        </p>
      ),
      props: {
        EuiMarkdownFormat,
      },
      demo: <MarkdownFormatSink />,
    },
  ],
};
