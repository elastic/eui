import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiMarkdownEditor,
  EuiText,
  EuiSpacer,
  EuiCode,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownEditor from './markdown_editor';
const markdownEditorSource = require('!!raw-loader!./markdown_editor');
const markdownEditorHtml = renderToHtml(MarkdownEditor);

import MarkdownEditorWithPlugins from './markdown_editor_with_plugins';
const markdownEditorWithPluginsSource = require('!!raw-loader!./markdown_editor_with_plugins');
const markdownEditorWithPluginsHtml = renderToHtml(MarkdownEditorWithPlugins);

import MarkdownEditorErrors from './markdown_editor_errors';
const markdownEditorErrorsSource = require('!!raw-loader!./markdown_editor_errors');
const markdownEditorErrorsHtml = renderToHtml(MarkdownEditorErrors);

export const MarkdownEditorExample = {
  title: 'Markdown editor',
  intro: (
    <Fragment>
      <EuiText>
        <p>
          <strong>EuiMarkdownEditor</strong> provides a markdown authoring
          experience for the user. The component consists of a toolbar, text
          area, and a drag-and-drop zone to accept files. There are two modes: a
          textarea that keeps track of cursor position, and a rendered preview
          mode that is powered by{' '}
          <strong>
            <Link to="/editors-syntax/markdown-format/">EuiMarkdownFormat</Link>
          </strong>
          . State is maintained between the two and it is possible to pass
          changes from the preview area to the text area and vice versa.
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
          code: markdownEditorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorHtml,
        },
      ],
      title: 'Base editor',
      text: (
        <p>
          The base editor can render basic markdown along with some built-in
          plugins.
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
          code: markdownEditorErrorsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorErrorsHtml,
        },
      ],
      title: 'Error handling and feedback',
      text: (
        <p>
          The <EuiCode>errors</EuiCode> prop allows you to pass an array of
          errors if syntax is malformed. Below the tooltip plugin is able to
          provide this message by default. These errors are meant to be
          emphemeral and part of the editing experience. They should not be a
          substitute for{' '}
          <Link to="/forms/form-validation">form validation</Link>.
        </p>
      ),
      props: {
        EuiMarkdownEditor,
      },
      demo: <MarkdownEditorErrors />,
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
      title: 'Adding custom plugins',
      text: (
        <p>
          <strong>EuiMarkdownEditor</strong> can extend its functionality with
          additional plugins. These allow you to add additional toolbar items,
          syntax and rendering abilities. For a more technical overview check
          out the{' '}
          <Link to="/editors-syntax/markdown-plugins">
            plugin documentation
          </Link>
          . The below example shows how to embed charts that can be added
          through a modal GUI and then modified afterwards through syntax.
        </p>
      ),
      props: {
        EuiMarkdownEditor,
      },
      demo: <MarkdownEditorWithPlugins />,
    },
  ],
};
