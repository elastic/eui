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

import { Rule } from 'eslint';

const componentNames = ['EuiButton', 'EuiButtonEmpty', 'EuiLink', 'EuiBadge'];

export const HrefOnClick: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Discourage supplying both `href` and `onClick` to certain EUI components.',
      recommended: false,
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (
          node.name.type !== 'JSXIdentifier' ||
          !componentNames.includes(node.name.name)
        ) {
          return;
        }

        const hasHref = node.attributes.some(
          (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'href'
        );
        const hasOnClick = node.attributes.some(
          (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'onClick'
        );

        if (hasHref && hasOnClick) {
          context.report({
            node,
            message: `<${node.name.name}> supplied with both \`href\` and \`onClick\`; is this intentional? (Valid use cases include programmatic navigation via \`onClick\` while preserving "Open in new tab" style functionality via \`href\`.)`,
          });
        }
      },
    };
  },
};
