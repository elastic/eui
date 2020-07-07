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
import { IconType } from '../icon';

export interface RemarkParser {
  Parser: any;
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
export interface AstNodePosition {
  start: { line: number; column: number; offset: number };
  end: { line: number; column: number; offset: number };
}

export interface EuiMarkdownEditorUiPluginEditorProps {
  node?: object | null;
  onCancel: () => void;
  onSave: (markdown: string) => void;
}

export const isPluginWithImmediateFormatting = (
  x: PluginWithImmediateFormatting | PluginWithDelayedFormatting
): x is PluginWithImmediateFormatting => {
  return x.hasOwnProperty('formatting');
};

export interface PluginWithImmediateFormatting {
  formatting: EuiMarkdownFormatting;
  editor?: never;
}

export interface PluginWithDelayedFormatting {
  formatting?: never;
  editor: ComponentType<EuiMarkdownEditorUiPluginEditorProps>;
}

export type EuiMarkdownEditorUiPlugin = {
  name: string;
  button: {
    label: string;
    iconType: IconType;
  };
  helpText?: ReactNode;
} & (PluginWithImmediateFormatting | PluginWithDelayedFormatting);

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
