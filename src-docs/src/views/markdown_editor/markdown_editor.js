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
import {
  getDefaultEuiMarkdownParsingPlugins,
  getDefaultEuiMarkdownProcessingPlugins,
  getDefaultEuiMarkdownUiPlugins,
} from '../../../..//src/components/markdown_editor';
import * as MarkdownMentions from '../../../../src/components/markdown_editor/plugins/markdown_mentions';

const initialContent = `## 👋 Hello @miukimiu

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

CC @chandlerprall , @cchaos

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

const parsingPlugins = getDefaultEuiMarkdownParsingPlugins();
const processingPlugins = getDefaultEuiMarkdownProcessingPlugins();
const uiPlugins = getDefaultEuiMarkdownUiPlugins();

const mentionsConfig = {
  options: [
    {
      label: 'miukimiu',
      data: { firstName: 'Elizabet', lastName: 'Oliveira' },
    },
    {
      label: 'chandlerprall',
      data: { firstName: 'Chandler', lastName: 'Prall' },
    },
    { label: 'thompsongl', data: { firstName: 'Greg', lastName: 'Thompson' } },
    { label: 'cchaos', data: { firstName: 'Caroline', lastName: 'Horn' } },
    { label: '1copenut', data: { firstName: 'Trevor', lastName: 'Pierce' } },
    {
      label: 'constancecchen',
      data: { firstName: 'Constance', lastName: 'Chen' },
    },
    { label: 'breehall', data: { firstName: 'Bree', lastName: 'Hall' } },
    { label: 'snide', data: { firstName: 'Dave', lastName: 'Snider' } },
  ],
};

parsingPlugins.push([MarkdownMentions.parser, mentionsConfig]);
processingPlugins[1][1].components.mentionsPlugin = MarkdownMentions.renderer;
uiPlugins.push(MarkdownMentions.plugin);

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
        parsingPluginList={parsingPlugins}
        processingPluginList={processingPlugins}
        uiPlugins={uiPlugins}
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
