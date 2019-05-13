import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiCodeEditor } from '../../../../src/components';

import CodeEditor from './code_editor';
const codeEditorSource = require('!!raw-loader!./code_editor');
const codeEditorHtml = renderToHtml(CodeEditor);

import ReadOnly from './read_only';
const readOnlySource = require('!!raw-loader!./read_only');
const readOnlyrHtml = renderToHtml(ReadOnly);

import CustomMode from './custom_mode';
const customModeSource = require('!!raw-loader!./custom_mode');
const customModeHtml = renderToHtml(CustomMode);

export const CodeEditorExample = {
  title: 'Code Editor',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeEditorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: codeEditorHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <EuiCode>EuiCodeEditor</EuiCode> component is a wrapper around{' '}
            <EuiCode>react-ace</EuiCode> (which itself wraps the ACE code
            editor), that adds an accessible keyboard mode to it. You should
            always use this component instead of <EuiCode>AceEditor</EuiCode>.
          </p>
          <p>
            All parameters, that you specify are passed down to the underlying{' '}
            <EuiCode>AceEditor</EuiCode> component.
          </p>
        </div>
      ),
      props: { EuiCodeEditor },
      demo: <CodeEditor />,
    },
    {
      title: 'Read-only',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: readOnlySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: readOnlyrHtml,
        },
      ],
      demo: <ReadOnly />,
    },
    {
      title: 'Custom mode',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customModeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customModeHtml,
        },
      ],
      demo: <CustomMode />,
    },
  ],
};
