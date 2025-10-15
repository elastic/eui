/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import { findAttrValue } from '../../utils/get_attr_value';
import { areAttrsEqual } from '../../utils/are_attrs_equal';

const formControlComponent = 'EuiFormRow';

const formControlChildComponents = [
  'EuiFieldNumber',
  'EuiFilePicker',
  'EuiFieldText',
  'EuiComboBox',
  'EuiTextArea',
  'EuiFormControlLayoutDelimited',
  'SingleFieldSelect',
  'EuiSelect',
];

export const ConsistentIsInvalidProps = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXElement(node) {
        const openingElement = node.openingElement;

        if (
          openingElement?.name.type !== 'JSXIdentifier' ||
          openingElement.name.name !== formControlComponent ||
          openingElement.attributes.length === 0
        ) {
          return;
        }

        const formRowIsInvalid = findAttrValue(
          context,
          openingElement.attributes,
          'isInvalid'
        );

        if (formRowIsInvalid === undefined) {
          return;
        }

        const childElement = node.children.find(
          (child): child is TSESTree.JSXElement =>
            child.type === 'JSXElement' &&
            child.openingElement?.name.type === 'JSXIdentifier' &&
            formControlChildComponents.includes(child.openingElement.name.name)
        );

        if (!childElement) {
          return;
        }

        const childIsInvalid = findAttrValue(
          context,
          childElement.openingElement.attributes,
          'isInvalid'
        );

        if (!areAttrsEqual(childIsInvalid, formRowIsInvalid)) {
          const componentName = (
            childElement.openingElement.name as TSESTree.JSXIdentifier
          ).name;

          context.report({
            node: childElement,
            messageId: 'inconsistentIsInvalid',
            fix: (fixer) => {
              const childIsInvalidAttr =
                childElement.openingElement.attributes.find(
                  (attr): attr is TSESTree.JSXAttribute =>
                    attr.type === 'JSXAttribute' &&
                    attr.name.type === 'JSXIdentifier' &&
                    attr.name.name === 'isInvalid'
                );

              if (childIsInvalidAttr) {
                return fixer.replaceText(
                  childIsInvalidAttr,
                  `isInvalid={${formRowIsInvalid}}`
                );
              }

              const insertPosition = childElement.openingElement.name.range[1];

              return fixer.insertTextAfterRange(
                [insertPosition, insertPosition],
                ` isInvalid={${formRowIsInvalid}}`
              );
            },
            data: {
              formControlComponent: formControlComponent,
              component: componentName,
            },
          });
        }
      },
    };
  },
  meta: {
    type: 'problem',
    docs: {
      description: `Ensure {{component}} inherit "isInvalid" prop from parent {{formControlComponent}}`,
    },
    fixable: 'code',
    schema: [],
    messages: {
      inconsistentIsInvalid: `{{component}} should have the same "isInvalid" prop value as its parent {{formControlComponent}}.`,
    },
  },
  defaultOptions: [],
});
