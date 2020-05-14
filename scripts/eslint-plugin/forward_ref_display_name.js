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

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce display name to forwardRef components',
    },
  },
  create: function(context) {
    const forwardRefUsages = [];
    const displayNameUsages = [];
    return {
      VariableDeclarator(node) {
        if (node.init && node.init.type === 'CallExpression') {
          if (
            node.init.callee &&
            node.init.callee.type === 'MemberExpression'
          ) {
            if (
              node.init.callee.property &&
              node.init.callee.property.name === 'forwardRef'
            ) {
              forwardRefUsages.push(node.id);
            }
          }
          if (node.init.callee && node.init.callee.name === 'forwardRef') {
            forwardRefUsages.push(node.id);
          }
        }
      },
      MemberExpression(node) {
        const { property } = node;
        if (
          property &&
          property.type === 'Identifier' &&
          property.name === 'displayName'
        ) {
          displayNameUsages.push(node.object);
        }
      },
      'Program:exit'() {
        forwardRefUsages.forEach(identifier => {
          if (!isDisplayNameUsed(identifier)) {
            context.report({
              node: identifier,
              message: 'Forward ref components must use a display name',
            });
          }
        });
      },
    };
    function isDisplayNameUsed(identifier) {
      const node = displayNameUsages.find(
        displayName => displayName.name === identifier.name
      );
      return !!node;
    }
  },
};
