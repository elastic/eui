import React from 'react';
import { EuiMarkdownFormat, EuiMarkdownFormatProps } from '../../../../src';
// @ts-ignore Importing from JS
import { PropsLinkAsBoldRenderer } from '../playground/markdown_format/props_link_plugin';
import {
  parsingPluginList,
  processingPluginList,
  // @ts-ignore Importing from JS
} from '../playground/markdown_format/plugin_list';

export function getDescriptionSmall(
  type: any,
  markdownProps?: Partial<EuiMarkdownFormatProps>
) {
  processingPluginList[1][1].components.propsLinkPlugin = PropsLinkAsBoldRenderer;

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
  processingPluginList[1][1].components.propsLinkPlugin = PropsLinkAsBoldRenderer;

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
