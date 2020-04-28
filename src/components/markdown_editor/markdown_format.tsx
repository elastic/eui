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

import React, { createElement, FunctionComponent } from 'react';
// @ts-ignore
import emoji from 'remark-emoji';
import unified from 'unified';
import markdown from 'remark-parse';
// @ts-ignore
import remark2rehype from 'remark-rehype';
// @ts-ignore
import highlight from 'remark-highlight.js';
// @ts-ignore
import rehype2react from 'rehype-react';

import { EuiCodeBlock } from '../code/code_block';
import { EuiLink } from '../link/link';

const processor = unified()
  .use(markdown)
  .use(highlight)
  .use(emoji, { emoticon: true })
  .use(remark2rehype, { allowDangerousHTML: true })
  // .use(row)
  .use(rehype2react, {
    createElement: createElement,
    components: {
      a: EuiLink,
      code: (props: any) =>
        // if has classNames is a codeBlock using highlight js
        props.className ? (
          <EuiCodeBlock {...props} />
        ) : (
          <code className="euiMarkdownFormat__code" {...props} />
        ),
    },
  });

interface EuiMarkdownFormatProps {
  children: string;
}

export const EuiMarkdownFormat: FunctionComponent<EuiMarkdownFormatProps> = ({
  children,
}) => (
  <div className="euiMarkdownFormat">
    {processor.processSync(children).contents}
  </div>
);
