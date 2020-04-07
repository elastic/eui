import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiCodeEditor } from '../../../../src/components';

import CodeEditor from './code_editor';
const codeEditorSource = require('!!raw-loader!./code_editor');
const codeEditorHtml = renderToHtml(CodeEditor);
const codeEditorSnippet = `<EuiCodeEditor
    mode="typescript"
    theme="github"
    width="100%"
    height="500px"
    value={value}
    onChange={onChange}
    isReadOnly={false}
    aria-label="Code Editor"
    setOptions={{
      fontSize: '25px',
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
    }}
    onBlur={() => {
      console.log('blur');
    }}
  />`;

import ReadOnly from './read_only';
const readOnlySource = require('!!raw-loader!./read_only');
const readOnlyrHtml = renderToHtml(ReadOnly);
const readOnlySnippet = `<EuiCodeEditor
      mode="less"
      theme="github"
      width="100%"
      height="500px"
      value={value}
      setOptions={{ fontSize: '23px' }}
      isReadOnly={true}
      aria-label="Read only code editor"
  />`;

import CustomMode from './custom_mode';
const customModeSource = require('!!raw-loader!./custom_mode');
const customModeHtml = renderToHtml(CustomMode);
const customModeSnippet = `<EuiCodeEditor
      mode={new MyCustomAceMode()}
      aria-label="Custom mode code editor"
      theme="github"
      width="100%"
      height="500px"
      value={value}
      setOptions={{ fontSize: '20px' }}
  />`;

export const CodeEditorExample = {
  title: 'Code editor',
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
            The <strong>EuiCodeEditor</strong> component is a wrapper around{' '}
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
      snippet: codeEditorSnippet,
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
      snippet: readOnlySnippet,
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
      snippet: customModeSnippet,
      demo: <CustomMode />,
    },
  ],
};
