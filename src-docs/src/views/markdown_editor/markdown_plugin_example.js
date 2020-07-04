import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiMarkdownFormat,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownFormat from './markdown_format';
const markdownFormatSource = require('!!raw-loader!./markdown_format');
const markdownFormatHtml = renderToHtml(MarkdownFormat);

import MarkdownFormatSink from './markdown_format_sink';
const markdownFormatSinkSource = require('!!raw-loader!./markdown_format_sink');
const markdownFormatSinkHtml = renderToHtml(MarkdownFormatSink);

export const MarkdownPluginExample = {
  title: 'Markdown plugins',
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
          <Link to="">markdown plugins</Link>.
        </p>
      </EuiText>
      <EuiSpacer size="xxl" />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownFormatSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownFormatHtml,
        },
      ],
      title: 'Built in plugins',
      text: (
        <p>
          <strong>EuiMarkdownFormat</strong> is a wrapper that will render
          Markdown provided. EuiMarkdownFormat uses{' '}
          <Link to="https://github.com/remarkjs/remark)">Remark</Link> by
          default. The translation layer automatically substitutes raw HTML
          output with their EUI equivilant. This means anchor and code blocks
          will become <strong>EuiLink</strong> and <strong>EuiCodeBlock</strong>{' '}
          components respectively.
        </p>
      ),
      props: {
        EuiMarkdownFormat,
      },
      demo: <MarkdownFormat />,
    },
  ],
};
