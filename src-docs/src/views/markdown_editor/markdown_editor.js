import React, { useCallback, useState } from 'react';

import {
  defaultParsingPlugins,
  defaultProcessingPlugins,
  EuiMarkdownEditor,
  EuiSpacer,
  EuiCodeBlock,
  EuiButtonToggle,
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
  const [isAstShowing, setIsAstShowing] = useState(false);
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
