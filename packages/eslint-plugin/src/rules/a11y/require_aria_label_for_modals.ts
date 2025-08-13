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

import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';

const modalComponents = ['EuiModal', 'EuiFlyout', 'EuiFlyoutResizable'];
const confirmModalComponents = ['EuiConfirmModal'];

export const RequireAriaLabelForModals = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    function checkAttributes(node: TSESTree.JSXOpeningElement, componentName: string, messageId: 'modalAriaMissing' | 'confirmModalAriaMissing') {
      const hasAriaLabel = node.attributes.some(
        (attr) =>
          attr.type === 'JSXAttribute' &&
          typeof attr.name.name === 'string' &&
          ['aria-label', 'aria-labelledby'].includes(attr.name.name)
      );

      if (!hasAriaLabel) {
        context.report({
          node,
          messageId: messageId,
          data: { component: componentName },
        });
      }
    }

    return {
      JSXOpeningElement(node) {
        if (
          node.name.type === 'JSXIdentifier'
        ) {
          if (modalComponents.includes(node.name.name)) {
            checkAttributes(node, node.name.name, 'modalAriaMissing')
          }

          if (confirmModalComponents.includes(node.name.name)) {
            checkAttributes(node, node.name.name, 'confirmModalAriaMissing')
          }
        }
        return
      },
    };
  },
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure modals have \'aria-label\' or \'aria-labelledby\'',
    },
    schema: [],
    messages: {
      modalAriaMissing: [
        '{{ component }} must have either \'aria-label\' or \'aria-labelledby\' prop for accessibility.',
        '\n',
        'Option 1: Using \'aria-labelledby\' (preferred):',
        '1. Import \'useGeneratedHtmlId\':',
        '   import { useGeneratedHtmlId } from \'@elastic/eui\';',
        '2. Update your component:',
        '   const modalTitleId = useGeneratedHtmlId();',
        '   ...',
        '   <{{ component }}',
        '    aria-labelledby={modalTitleId}',
        '    {...props} ',
        '   />',
        '     <{{ component }}Header>',
        '       <EuiTitle id={modalTitleId}>',
        '         {\'Descriptive title for the {{ component }}\'}',
        '       </EuiTitle>',
        '     </{ component }}Header>',
        '     ...',
        '   </{{ component }}>',
        '\n',
        'Option 2: Using \'aria-label\':',
        '   <{{ component }} aria-label="Descriptive title for the {{ component }}" {...props} />',
      ].join('\n'),

      confirmModalAriaMissing: [
        '{{ component }} must have either \'aria-label\' or \'aria-labelledby\' prop for accessibility.',
        '\n',
        'Option 1: Using \'aria-labelledby\' (preferred):',
        '1. Import \'useGeneratedHtmlId\':',
        '   import { useGeneratedHtmlId } from \'@elastic/eui\';',
        '2. Update your component:',
        '   const modalTitleId = useGeneratedHtmlId();',
        '   ...',
        '   <{{ component }}',
        '     title="Descriptive title for the {{ component }}"',
        '     aria-labelledby={modalTitleId}',
        '     titleProps={({id: modalTitleId })}',
        '     {...props} ',
        '   />',
        '\n',
        'Option 2: Using \'aria-label\':',
        '   <{{ component }} aria-label="Descriptive title for the {{ component }}" {...props} />',
    ].join('\n')
    },
  },
  defaultOptions: [],
});


