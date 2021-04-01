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

import visit from 'unist-util-visit';

interface LinkOrTextNode {
  type: string;
  url?: string;
  title?: string | null;
  value?: string;
  children?: Array<{ value: string }>;
}

export function markdownLinkValidator() {
  return (ast: any) => {
    visit(ast, 'link', (_node: unknown) => {
      const node = _node as LinkOrTextNode;

      if (!validateUrl(node.url!)) {
        mutateLinkToText(node);
      }
    });
  };
}

export function mutateLinkToText(node: LinkOrTextNode) {
  node.type = 'text';
  node.value = `[${node.children![0]?.value || ''}](${node.url})`;
  delete node.children;
  delete node.title;
  delete node.url;
  return node;
}

export function validateUrl(url: string) {
  // A link is valid if it starts with http:, https:, or /
  return /^(https?:|\/)/.test(url);
}
