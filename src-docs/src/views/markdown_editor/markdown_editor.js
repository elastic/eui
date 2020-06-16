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
import * as MarkdownTooltip from './plugins/markdown_tooltip';
import * as MarkdownCheckbox from './plugins/markdown_checkbox';

const markdownExample = require('!!raw-loader!./markdown-example.md');

const exampleParsingList = [
  ...defaultParsingPlugins,
  MarkdownChart.parser,
  MarkdownTooltip.parser,
  MarkdownCheckbox.parser,
];

const exampleProcessingList = [...defaultProcessingPlugins]; // pretend mutation doesn't happen immediately next 😅
exampleProcessingList[0][1].handlers.chartDemoPlugin = MarkdownChart.handler;
exampleProcessingList[1][1].components.chartDemoPlugin = MarkdownChart.renderer;

exampleProcessingList[0][1].handlers.tooltipPlugin = MarkdownTooltip.handler;
exampleProcessingList[1][1].components.tooltipPlugin = MarkdownTooltip.renderer;

exampleProcessingList[0][1].handlers.checkboxPlugin = MarkdownCheckbox.handler;
exampleProcessingList[1][1].components.checkboxPlugin =
  MarkdownCheckbox.renderer;

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
        uiPlugins={[MarkdownChart.plugin, MarkdownTooltip.plugin]}
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
