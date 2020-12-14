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

// Importing seemingly unused types from `unified` because the definitions
// are exported for two versions of TypeScript (3.4, 4.0) and implicit
// imports during eui.d.ts generation default to the incorrect version (3.4).
// Explicit imports here resolve the version mismatch.
import {
  Plugin,
  PluggableList,
  // @ts-ignore See above comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Attacher,
  // @ts-ignore See above comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Pluggable,
  // @ts-ignore See above comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Settings,
} from 'unified';
import remark2rehype from 'remark-rehype';
import rehype2react from 'rehype-react';
import * as MarkdownTooltip from './markdown_tooltip';
import * as MarkdownCheckbox from './markdown_checkbox';
import { markdownLinkValidator } from './markdown_link_validator';
import React, { createElement } from 'react';
import { EuiLink } from '../../link';
import { EuiCodeBlock, EuiCode } from '../../code';
import markdown from 'remark-parse';
import highlight from 'remark-highlight.js';
import emoji from 'remark-emoji';
import all from 'mdast-util-to-hast/lib/all';
import { Options as Remark2RehypeOptions, Handler } from 'mdast-util-to-hast';

export const getDefaultEuiMarkdownParsingPlugins = (): PluggableList => [
  [markdown, {}],
  [highlight, {}],
  [emoji, { emoticon: true }],
  [MarkdownTooltip.parser, {}],
  [MarkdownCheckbox.parser, {}],
  [markdownLinkValidator, {}],
];

export const defaultParsingPlugins = getDefaultEuiMarkdownParsingPlugins();

const unknownHandler: Handler = (h, node) => {
  return h(node, node.type, node, all(h, node));
};

interface Rehype2ReactOptions {
  components: { [key: string]: React.ComponentType<any> };
  [key: string]: any;
}

export const getDefaultEuiMarkdownProcessingPlugins = (): [
  [Plugin, Remark2RehypeOptions], // first is well known
  [typeof rehype2react, Rehype2ReactOptions], // second is well known
  ...PluggableList // any additional are generic
] => [
  [
    remark2rehype,
    {
      allowDangerousHtml: true,
      unknownHandler,
      handlers: {}, // intentionally empty, allows plugins to extend if they need to
    },
  ],
  [
    rehype2react,
    {
      createElement: createElement,
      components: {
        a: EuiLink,
        code: (props: any) =>
          // If there are linebreaks use codeblock, otherwise code
          /\r|\n/.exec(props.children) ? (
            <EuiCodeBlock fontSize="m" paddingSize="s" {...props} />
          ) : (
            <EuiCode {...props} />
          ),
        tooltipPlugin: MarkdownTooltip.renderer,
        checkboxPlugin: MarkdownCheckbox.renderer,
      },
    },
  ],
];

export const defaultProcessingPlugins = getDefaultEuiMarkdownProcessingPlugins();
