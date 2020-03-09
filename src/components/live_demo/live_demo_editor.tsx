import React, { useState, useCallback, useMemo } from 'react';
import { withLive } from 'react-live';
import { EuiCodeEditor } from '../code_editor';

import 'brace/theme/github';
import 'brace/mode/jsx';
import 'brace/snippets/javascript';
import 'brace/ext/language_tools';

const CodeEditor = ({ ...props }: any) => {
  const { code, onChange, style } = props;
  const getCode = useMemo(() => code, [code]);
  const [editorCode, setEditorCode] = useState(getCode);
  const updateContent = useCallback(
    ({ code }) => {
      setEditorCode(code);
      onChange(code);
    },
    [editorCode]
  );

  return (
    <EuiCodeEditor
      width={'100%'}
      value={editorCode}
      onChange={updateContent}
      style={style}
      name="blah"
      theme="github"
      height="100%"
      className="euiLiveDemoEditor"
      mode="jsx"
      showGutter={true}
      setOptions={{
        fontSize: '18px',
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
      }}
    />
  );
};

export const LiveEditor = withLive(({ live }: any) => {
  const { code, language, onChange, theme } = live;
  return (
    <CodeEditor
      code={code}
      language={language}
      onChange={onChange}
      theme={theme}
    />
  );
});
