import React, { useCallback, useState } from 'react';

import {
  EuiMarkdownEditor,
  EuiSpacer,
  EuiCodeBlock,
  EuiButton,
  getDefaultEuiMarkdownPlugins,
} from '../../../../src/components';

const initialContent = `## This is how we do it :smile:

In this example, we unregistered the built in tooltip plugin. So you can't see the button in the toolbar and the help syntax when you click the markdown button in the footer.

And the following syntax no longer works :sad

!{tooltip[anchor text](Tooltip content)}
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

const {
  parsingPlugins,
  processingPlugins,
  uiPlugins,
} = getDefaultEuiMarkdownPlugins({ exclude: ['tooltip'] });

export default () => {
  const [value, setValue] = useState(initialContent);
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
        aria-label="EUI markdown editor with no default plugins demo"
        value={value}
        onChange={setValue}
        height={400}
        onParse={onParse}
        errors={messages}
        dropHandlers={dropHandlers}
        parsingPluginList={parsingPlugins}
        processingPluginList={processingPlugins}
        uiPlugins={uiPlugins}
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
