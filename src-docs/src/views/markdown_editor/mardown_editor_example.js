import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiMarkdownEditor } from '../../../../src/components';

import MarkdownEditor from './markdown_editor';
const markdownEditorSource = require('!!raw-loader!./markdown_editor');
const markdownEditorHtml = renderToHtml(MarkdownEditor);

export const MarkdownEditorExample = {
  title: 'Markdown Editor',
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
      text: (
        <p>
          This component renders a markdown editor, including buttons for
          quickly inserting common markdown elements and a preview mode.
        </p>
      ),
      props: {
        EuiMarkdownEditor,
      },
      demo: <MarkdownEditor />,
    },
  ],
};
