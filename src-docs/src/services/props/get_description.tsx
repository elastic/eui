import React from 'react';
import markdown from 'remark-parse';
import {
  EuiMarkdownFormat,
  EuiMarkdownFormatProps,
  getDefaultEuiMarkdownProcessingPlugins,
} from '../../../../src';

import {
  PropsLinkMarkdownParser,
  PropsLinkAsBoldRenderer,
  // @ts-ignore Importing from JS
} from '../playground/markdown_format/props_link_plugin';

import highlight from '../../../../src/components/markdown_editor/plugins/remark/remark_prismjs';

const parsingPluginList: EuiMarkdownFormatProps['parsingPluginList'] = [
  [markdown, {}],
  [highlight, {}],
  // Excludes the emoji, checkbox, & tooltip plugins that come with the
  // EUI default - we almost certainly don't need those for props tables
  [PropsLinkMarkdownParser, {}],
];

const processingPluginList = getDefaultEuiMarkdownProcessingPlugins();
processingPluginList[1][1].components.propsLinkPlugin = PropsLinkAsBoldRenderer;

export function getDescriptionSmall(
  type: any,
  markdownProps?: Partial<EuiMarkdownFormatProps>
) {
  if (type?.description) {
    return (
      <EuiMarkdownFormat
        textSize="xs"
        color="subdued"
        parsingPluginList={parsingPluginList}
        processingPluginList={processingPluginList}
        {...markdownProps}
      >
        {type.description}
      </EuiMarkdownFormat>
    );
  }
}

export function getDescription(
  type: any,
  markdownProps?: Partial<EuiMarkdownFormatProps>
) {
  if (type?.description) {
    return (
      <EuiMarkdownFormat
        textSize="s"
        parsingPluginList={parsingPluginList}
        processingPluginList={processingPluginList}
        {...markdownProps}
      >
        {type.description}
      </EuiMarkdownFormat>
    );
  }
}
