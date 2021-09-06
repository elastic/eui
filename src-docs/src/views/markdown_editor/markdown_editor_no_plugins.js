import React, { useCallback, useState } from 'react';

import {
  EuiMarkdownEditor,
  EuiSpacer,
  EuiCodeBlock,
  EuiButton,
  getDefaultEuiMarkdownUiPlugins,
} from '../../../../src/components';

const initialContent = `## This is how we do it :smile:

In this example, we unregistered the built in tooltip plugin. So you can't see the button in the toolbar and the help syntax when you click the markdown button in the footer. 
`;

const dropHandlers = [
  {
    supportedFiles: ['.jpg', '.jpeg'],
    accepts: (itemType) => itemType === 'image/jpeg',
    getFormattingForItem: (item) => {
      // fake an upload
      return new Promise((resolve) => {
        setTimeout(() => {
          const url = URL.createObjectURL(item);
          resolve({
            text: `![${item.name}](${url})`,
            config: { block: true },
          });
        }, 1000);
      });
    },
  },
];

export default () => {
  const [value, setValue] = useState(initialContent);
  const [messages, setMessages] = useState([]);
  const [ast, setAst] = useState(null);
  const [isAstShowing, setIsAstShowing] = useState(false);
  const onParse = useCallback((err, { messages, ast }) => {
    setMessages(err ? [err] : messages);
    setAst(JSON.stringify(ast, null, 2));
  }, []);

  const plugins = getDefaultEuiMarkdownUiPlugins();
  plugins.splice(0, plugins.length);

  return (
    <>
      <EuiMarkdownEditor
        aria-label="EUI markdown editor with no default plugins demo"
        value={value}
        onChange={setValue}
        height={400}
        onParse={onParse}
        errors={messages}
        dropHandlers={dropHandlers}
        uiPlugins={plugins}
      />
      <EuiSpacer size="s" />
      <div className="eui-textRight">
        <EuiButton
          size="s"
          iconType={isAstShowing ? 'eyeClosed' : 'eye'}
          onClick={() => setIsAstShowing(!isAstShowing)}
          fill={isAstShowing}
        >
          {isAstShowing ? 'Hide editor AST' : 'Show editor AST'}
        </EuiButton>
      </div>
      {isAstShowing && <EuiCodeBlock language="json">{ast}</EuiCodeBlock>}
    </>
  );
};
