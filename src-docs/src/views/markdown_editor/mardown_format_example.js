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

export const MarkdownFormatExample = {
  title: 'Markdown format',
  intro: (
    <Fragment>
      <EuiText>
        <p>
          EUI provides components to both edit and render markdown-like content
          with dynamic previews. The components, built on top of the{' '}
          <Link to="https://github.com/unifiedjs/unified">Unified</Link>{' '}
          framework, are extendible through an optional plugin layer that allows
          for translating additional string syntax into React renders.
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
      title: 'Markdown format',
      text: (
        <p>
          <strong>EuiMarkdownFormat</strong> is a wrapper that will render
          Markdown provided. EuiMarkdownFormat uses{' '}
          <Link to="https://github.com/remarkjs/remark)">Remark</Link> by
          default. The translation layer automatically substitutes raw HTML
          output with their EUI equivilant. This means anchor and code blocks
          will become <strong>EuiLink</strong> and <strong>EuiCodeBlock</strong>{' '}
          components respectively).
        </p>
      ),
      props: {
        EuiMarkdownFormat,
      },
      demo: <MarkdownFormat />,
    },
  ],
};
