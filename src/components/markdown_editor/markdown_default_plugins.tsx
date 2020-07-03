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

import { PluggableList } from 'unified';
// @ts-ignore TODO
import remark2rehype from 'remark-rehype';
import rehype2react from 'rehype-react';
import * as MarkdownTooltip from './plugins/markdown_tooltip';
import * as MarkdownCheckbox from './plugins/markdown_checkbox';
import React, { createElement } from 'react';
import { EuiLink } from '../link';
import { EuiCodeBlock, EuiCode } from '../code';
import markdown from 'remark-parse';
// @ts-ignore TODO
import highlight from 'remark-highlight.js';
// @ts-ignore TODO
import emoji from 'remark-emoji';

export const EuiMarkdownDefaultParsingPlugins: PluggableList = [
  [markdown, {}],
  [highlight, {}],
  [emoji, { emoticon: true }],
  [MarkdownTooltip.parser, {}],
  [MarkdownCheckbox.parser, {}],
];

export const EuiMarkdownDefaultProcessingPlugins: PluggableList = [
  [
    remark2rehype,
    {
      allowDangerousHtml: true,
      handlers: {
        tooltipPlugin: MarkdownTooltip.handler,
        checkboxPlugin: MarkdownCheckbox.handler,
      },
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
