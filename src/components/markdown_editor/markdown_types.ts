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

import { IconType } from '../icon';
import { ComponentType } from 'react';

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

interface PluginWithImmediateFormatting {
  formatting: EuiMarkdownFormatting;
  editor?: never;
}

interface PluginWithDelayedFormatting {
  formatting?: never;
  editor: ComponentType<EuiMarkdownEditorUiPluginEditorProps>;
}

export type EuiMarkdownEditorUiPlugin = {
  name: string;
  button: {
    label: string;
    iconType: IconType;
  };
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
