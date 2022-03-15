import React from 'react';
import { EuiMarkdownFormat, EuiMarkdownFormatProps } from '../../../../src';

import {
  parsingPluginList,
  processingPluginListWithBoldProps,
  // @ts-ignore Importing from JS
} from './markdown_format';

export function getDescriptionSmall(
  type: any,
  markdownProps?: Partial<EuiMarkdownFormatProps>
) {
  return getDescription(type, {
    textSize: 'xs',
    color: 'subdued',
    ...markdownProps,
  });
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
        processingPluginList={processingPluginListWithBoldProps}
        {...markdownProps}
      >
        {type.description}
      </EuiMarkdownFormat>
    );
  }
}
