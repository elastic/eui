/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { ComponentType, ReactNode } from 'react';
import { VFile } from 'vfile';
// eslint-disable-next-line import/no-unresolved
import { Node as UnistNode, Position as UnistPosition } from 'unist';
import { Parser } from 'remark-parse';
import { VFileMessage } from 'vfile-message';
import { IconType } from '../icon';

export interface RemarkParser {
  Parser: typeof Parser;
  tokenizeInline: Function;
  file: VFile;
}
export interface RemarkTokenizer {
  (
    this: RemarkParser,
    eat: Function & { now: Function },
    value: string,
    silent: boolean
  ): boolean | void;

  locator?: (value: string, fromIndex: number) => number;

  notInLink?: boolean;
}
interface RehypeNode {}
interface RemarkRehypeHandlerCallback {
  (
    node: UnistPosition,
    tagName: string,
    props: Object,
    children: RehypeNode[]
  ): RehypeNode;
}
export interface RemarkRehypeHandler {
  (h: RemarkRehypeHandlerCallback, node: UnistNode): RehypeNode;
}

export interface EuiMarkdownEditorUiPluginEditorProps<NodeShape> {
  node: NodeShape | null;
  onCancel: () => void;
  onSave: (markdown: string, config: EuiMarkdownStringTagConfig) => void;
}

export const isPluginWithImmediateFormatting = (
  x: PluginWithImmediateFormatting | PluginWithDelayedFormatting<any>
): x is PluginWithImmediateFormatting => {
  return x.hasOwnProperty('formatting');
};

export interface PluginWithImmediateFormatting {
  formatting: EuiMarkdownFormatting;
  editor?: never;
}

export interface PluginWithDelayedFormatting<NodeShape> {
  formatting?: never;
  editor: ComponentType<EuiMarkdownEditorUiPluginEditorProps<NodeShape>>;
}

export type EuiMarkdownEditorUiPlugin<NodeShape = any> = {
  name: string;
  button: {
    label: string;
    iconType: IconType;
  };
  helpText?: ReactNode;
} & (PluginWithImmediateFormatting | PluginWithDelayedFormatting<NodeShape>);

export interface EuiMarkdownFormatting {
  prefix?: string;
  suffix?: string;
  blockPrefix?: string;
  blockSuffix?: string;
  multiline?: boolean;
  replaceNext?: string;
  prefixSpace?: boolean;
  scanFor?: string;
  surroundWithNewlines?: boolean;
  orderedList?: boolean;
  trimFirst?: boolean;
}

export interface EuiMarkdownAstNode {
  type: string;
  children?: EuiMarkdownAstNode[];
  position: EuiMarkdownAstNodePosition;
}
export interface EuiMarkdownAstNodePosition {
  start: { line: number; column: number; offset: number };
  end: { line: number; column: number; offset: number };
}

export type EuiMarkdownParseError = string | VFileMessage | Error;

export interface EuiMarkdownDropHandler {
  supportedFiles: string[];
  accepts: (itemType: string) => boolean;
  getFormattingForItem: (
    file: File
  ) => EuiMarkdownDragAndDropResult | Promise<EuiMarkdownDragAndDropResult>;
}

export interface EuiMarkdownStringTagConfig {
  block: boolean;
}

export interface EuiMarkdownDragAndDropResult {
  text: string;
  config: EuiMarkdownStringTagConfig;
}
