import React, { useCallback, useState } from 'react';

import {
  EuiMarkdownEditor,
  EuiSpacer,
  EuiCodeBlock,
  EuiButtonToggle,
} from '../../../../src';

const markdownExample = require('!!raw-loader!./markdown-example.md');

export default () => {
  const [value, setValue] = useState(markdownExample);
  const [messages, setMessages] = useState([]);
  const [ast, setAst] = useState(null);
  const [isAstShowing, setIsAstShowing] = useState(false);
  const onParse = useCallback((err, { messages, ast }) => {
    setMessages(err ? [err] : messages);
    setAst(JSON.stringify(ast, null, 2));
  }, []);
  return (
    <>
      <EuiMarkdownEditor
        aria-label="EUI markdown editor demo"
        value={value}
        onChange={setValue}
        height={400}
        onParse={onParse}
        errors={messages}
      />
      <EuiSpacer size="s" />
      <div className="eui-textRight">
        <EuiButtonToggle
          label={isAstShowing ? 'Hide editor AST' : 'Show editor AST'}
          size="s"
          isEmpty
          iconType={isAstShowing ? 'eyeClosed' : 'eye'}
          onChange={() => setIsAstShowing(!isAstShowing)}
          isSelected={isAstShowing}
        />
      </div>
      {isAstShowing && <EuiCodeBlock language="json">{ast}</EuiCodeBlock>}
    </>
  );
};
