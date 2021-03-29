import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiMarkdownEditor,
  EuiText,
  EuiCode,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownEditor from './markdown_editor';
const markdownEditorSource = require('!!raw-loader!./markdown_editor');
const markdownEditorHtml = renderToHtml(MarkdownEditor);
const markdownEditorSnippet = `<EuiMarkdownEditor
  value={value}
  onChange={setValue}
/>`;

import MarkdownEditorErrors from './markdown_editor_errors';
const markdownEditorErrorsSource = require('!!raw-loader!./markdown_editor_errors');
const markdownEditorErrorsHtml = renderToHtml(MarkdownEditorErrors);
const markdownEditorErrorsSnippet = `<EuiMarkdownEditor
  value={value}
  onChange={setValue}
  onParse={onParse}
  errors={messages}
/>`;

import MarkdownEditorHeight from './markdown_editor_height';
const markdownEditorHeightSource = require('!!raw-loader!./markdown_editor_height');
const markdownEditorHeightHtml = renderToHtml(MarkdownEditorHeight);
const markdownEditorHeightSnippet = [
  `// Custom height with auto-expanding preview
<EuiMarkdownEditor
  value={value}
  onChange={setValue}
  height={200}
/>`,
  `// Height set to full
<EuiMarkdownEditor
  value={value}
  onChange={setValue}
  height="full"
/>`,
  `// Custom height with no auto-expanding preview
<EuiMarkdownEditor
  value={value}
  onChange={setValue}
  height={200}
  autoExpandPreview={false}
/>`,
  `// Custom height and custom max height
<EuiMarkdownEditor
  value={value}
  onChange={setValue}
  height={200}
  maxHeight={300}
/>`,
];

export const MarkdownEditorExample = {
  title: 'Markdown editor',
  beta: true,
  intro: (
    <Fragment>
      <EuiText>
        <p>
          <strong>EuiMarkdownEditor</strong> provides a markdown authoring
          experience for the user. The component consists of a toolbar, text
          area, and a drag-and-drop zone to accept files (if configured to do
          so). There are two modes: a textarea that keeps track of cursor
          position, and a rendered preview mode that is powered by{' '}
          <strong>
            <Link to="/editors-syntax/markdown-format/">EuiMarkdownFormat</Link>
          </strong>
          . State is maintained between the two and it is possible to pass
          changes from the preview area to the textarea and vice versa.
        </p>
      </EuiText>
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
      snippet: markdownEditorSnippet,
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
          errors if syntax is malformed. The below example starts with an
          incomplete tooltip tag, showing this error message by default. These
          errors are meant to be ephemeral and part of the editing experience.
          They should not be a substitute for{' '}
          <Link to="/forms/form-validation">form validation</Link>.
        </p>
      ),
      props: {
        EuiMarkdownEditor,
      },
      snippet: markdownEditorErrorsSnippet,
      demo: <MarkdownEditorErrors />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownEditorHeightSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownEditorHeightHtml,
        },
      ],
      title: 'Controlling the height',
      text: (
        <>
          <p>
            The <EuiCode>height</EuiCode> prop allows you to control the height
            of the <strong>EuiMarkdownEditor</strong>. You can set the{' '}
            <EuiCode>height</EuiCode> in pixels or pass{' '}
            <EuiCode>&quot;full&quot;</EuiCode> to allow the{' '}
            <strong>EuiMarkdownEditor</strong> to fill the height of its
            container. By default, the <EuiCode>autoExpandPreview</EuiCode> prop
            is set to <EuiCode>true</EuiCode>. This means that the preview{' '}
            <EuiCode>height</EuiCode> is automatically adjusted to fit all the
            content and avoid a scrollbar.
          </p>
          <p>
            You can also control the <EuiCode>maxHeight</EuiCode> of the{' '}
            editor/preview area. This prop only works when the{' '}
            <EuiCode>height</EuiCode> is not set to{' '}
            <EuiCode>&quot;full&quot;</EuiCode>.
          </p>
        </>
      ),
      props: {
        EuiMarkdownEditor,
      },
      snippet: markdownEditorHeightSnippet,
      demo: <MarkdownEditorHeight />,
    },
  ],
};
