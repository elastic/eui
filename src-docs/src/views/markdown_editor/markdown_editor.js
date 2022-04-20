import React, { useCallback, useState } from 'react';

import {
  EuiMarkdownEditor,
  EuiSpacer,
  EuiCodeBlock,
  EuiButton,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const initialContent = `@someone`;

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

  const [isReadOnly, setIsReadOnly] = useState(false);

  const onChange = (e) => {
    setIsReadOnly(e.target.checked);
  };

  return (
    <>
      <EuiMarkdownEditor
        aria-label="EUI markdown editor demo"
        placeholder="Your markdown here..."
        value={value}
        onChange={setValue}
        height={400}
        onParse={onParse}
        errors={messages}
        dropHandlers={dropHandlers}
        readOnly={isReadOnly}
        // initialViewMode="viewing"
      />
      <EuiSpacer size="s" />
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={true}>
          <EuiSwitch
            label="Read-only"
            checked={isReadOnly}
            onChange={onChange}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            size="s"
            iconType={isAstShowing ? 'eyeClosed' : 'eye'}
            onClick={() => setIsAstShowing(!isAstShowing)}
            fill={isAstShowing}
          >
            {isAstShowing ? 'Hide editor AST' : 'Show editor AST'}
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="s" />

      {isAstShowing && <EuiCodeBlock language="json">{ast}</EuiCodeBlock>}
    </>
  );
};
