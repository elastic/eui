import React, { useCallback, useState } from 'react';

import {
  defaultParsingPlugins,
  defaultProcessingPlugins,
  EuiMarkdownEditor,
  EuiSpacer,
  EuiText,
  EuiCodeBlock,
} from '../../../../src';
import * as MarkdownChart from './plugins/markdown_chart';

const markdownExample = require('!!raw-loader!./markdown-example.md');

const exampleParsingList = [...defaultParsingPlugins, MarkdownChart.parser];

const exampleProcessingList = [...defaultProcessingPlugins]; // pretend mutation doesn't happen immediately next 😅
exampleProcessingList[0][1].handlers.chartDemoPlugin = MarkdownChart.handler;
exampleProcessingList[1][1].components.chartDemoPlugin = MarkdownChart.renderer;

export default () => {
  const [value, setValue] = useState(markdownExample);
  const [messages, setMessages] = useState([]);
  const [ast, setAst] = useState(null);
  const onParse = useCallback((err, { messages, ast }) => {
    setMessages(err ? [err] : messages);
    setAst(JSON.stringify(ast, null, 2));
  }, []);
  return (
    <>
      <EuiMarkdownEditor
        value={value}
        onChange={setValue}
        height={400}
        uiPlugins={[MarkdownChart.plugin]}
        parsingPluginList={exampleParsingList}
        processingPluginList={exampleProcessingList}
        onParse={onParse}
      />
      <EuiSpacer />
      {messages.map((message, idx) => (
        <EuiText key={idx}>{message.toString()}</EuiText>
      ))}
      <EuiCodeBlock language="json">{ast}</EuiCodeBlock>
    </>
  );
};
