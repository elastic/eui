import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import {
  EuiMarkdownEditor,
  EuiText,
  EuiCode,
} from '../../../../src/components';
import { Link } from 'react-router-dom';

import MarkdownEditor from './markdown_editor';
const markdownEditorSource = require('!!raw-loader!./markdown_editor');
const markdownEditorSnippet = `<EuiMarkdownEditor
  value={value}
  onChange={setValue}
/>`;

import MarkdownEditorErrors from './markdown_editor_errors';
const markdownEditorErrorsSource = require('!!raw-loader!./markdown_editor_errors');
const markdownEditorErrorsSnippet = `<EuiMarkdownEditor
  value={value}
  onChange={setValue}
  onParse={onParse}
  errors={messages}
/>`;

import MarkdownEditorHeight from './markdown_editor_height';
const markdownEditorHeightSource = require('!!raw-loader!./markdown_editor_height');
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

import MarkdownEditorNoPlugins from './markdown_editor_no_plugins';
const markdownEditorNoPluginsSource = require('!!raw-loader!./markdown_editor_no_plugins');
const markdownEditorNoPluginsSnippet = `const {
  parsingPlugins,
  processingPlugins,
  uiPlugins,
} = getDefaultEuiMarkdownPlugins({ exclude: ['tooltip'] });

  <EuiMarkdownEditor
    value={value}
    onChange={setValue}
    parsingPluginList={parsingPlugins}
    processingPluginList={processingPlugins}
    uiPlugins={uiPlugins}
  />
`;

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
      ],
      title: 'Base editor',
      text: (
        <>
          <p>
            Use the base editor to produce technical content in markdown which
            can contain text, code, and images. Besides this default markdown
            content, the base editor comes with built-in plugins that let you
            add emojis, to-do lists, and tooltips.
          </p>
          <p>
            Consider applying the <EuiCode>readOnly</EuiCode> prop to restrict
            editing during asynchronous submit events, like when submitting a{' '}
            <Link to="/display/comment-list">comment</Link>. This will ensure
            users understand that the content cannot be changed while the
            comment is being submitted.
          </p>
        </>
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
          code: markdownEditorNoPluginsSource,
        },
      ],
      title: 'Unregistering plugins',
      text: (
        <p>
          The <strong>EuiMarkdownEditor</strong> comes with a default plugin for{' '}
          <EuiCode>tooltip</EuiCode> support. However, this may be unfamiliar or
          unnecessary in some contexts, and you can unregister this plugin by
          excluding it from the
          <EuiCode>parsingPlugins</EuiCode>,{' '}
          <EuiCode>processingPlugins</EuiCode> and <EuiCode>uiPlugins</EuiCode>{' '}
          options with a single <EuiCode>exclude</EuiCode> parameter passed to{' '}
          <EuiCode>getDefaultEuiMarkdownPlugins()</EuiCode>. This will ensure
          the syntax won&apos;t be identified or rendered and no additional UI,
          like the button and help syntax, will be displayed.
        </p>
      ),
      props: {
        EuiMarkdownEditor,
      },
      snippet: markdownEditorNoPluginsSnippet,
      demo: <MarkdownEditorNoPlugins />,
    },

    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownEditorErrorsSource,
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
