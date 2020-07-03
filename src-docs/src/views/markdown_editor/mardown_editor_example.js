import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiMarkdownEditor,
  EuiMarkdownFormat,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownEditor from './markdown_editor';
const markdownEditorSource = require('!!raw-loader!./markdown_editor');
const markdownEditorHtml = renderToHtml(MarkdownEditor);

import MarkdownFormat from './markdown_format';
const markdownFormatSource = require('!!raw-loader!./markdown_format');
const markdownFormatHtml = renderToHtml(MarkdownFormat);

import MarkdownEditorWithPlugins from './markdown_editor_with_plugins';
const markdownEditorWithPluginsSource = require('!!raw-loader!./markdown_editor_with_plugins');
const markdownEditorWithPluginsHtml = renderToHtml(MarkdownEditorWithPlugins);

export const MarkdownEditorExample = {
  title: 'Markdown',
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
          default, though you could replace it with your own processor if you
          are feeling adventurous.
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
          code: markdownEditorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorHtml,
        },
      ],
      title: 'Markdown editor',
      text: (
        <p>
          <strong>EuiMarkdownEditor</strong> provides a markdown authoring
          experience for the user. This component consists of a toolbar, text
          area, and optionally a drag-and-drop zone to accept files. It can be
          toggled by the user between editing and preview modes
        </p>
      ),
      props: {
        EuiMarkdownEditor,
      },
      demo: <MarkdownEditor />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownEditorWithPluginsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorWithPluginsHtml,
        },
      ],
      title: 'Markdown plugins',
      text: (
        <p>
          Both <strong>EuiMarkdownEditor</strong> and{' '}
          <strong>EuiMarkdownFormat</strong> can utilize additional plugins to a
          syntax to react render pipeline.
        </p>
      ),
      props: {
        EuiMarkdownEditor,
      },
      demo: <MarkdownEditorWithPlugins />,
    },
  ],
};
