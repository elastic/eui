/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import { defaultParsingPlugins, defaultProcessingPlugins, EuiMarkdownEditor } from '../../../../src/components/markdown_editor';
import * as MarkdownChart from './plugins/markdown_chart';
import * as MarkdownTooltip from './plugins/markdown_tooltip';

const markdownExample = require('!!raw-loader!./markdown-example.md');

const exampleParsingList = [
  ...defaultParsingPlugins,
  MarkdownChart.parser,
  MarkdownTooltip.parser,
];

const exampleProcessingList = [...defaultProcessingPlugins]; // pretend mutation doesn't happen immediately next 😅
exampleProcessingList[0][1].handlers.chartDemoPlugin = MarkdownChart.handler;
exampleProcessingList[1][1].components.chartDemoPlugin = MarkdownChart.renderer;

exampleProcessingList[0][1].handlers.tooltipPlugin = MarkdownTooltip.handler;
exampleProcessingList[1][1].components.tooltipPlugin = MarkdownTooltip.renderer;

export default () => {
  const [value, setValue] = useState(markdownExample);
  return <EuiMarkdownEditor value={value} onChange={setValue} height={400} uiPlugins={[MarkdownChart.plugin, MarkdownTooltip.plugin]} parsingPluginList={exampleParsingList} processingPluginList={exampleProcessingList} />;
};
