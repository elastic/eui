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

const tooltipComponent = 'EuiToolTip';
const disabledTooltipComponentProp = 'disableScreenReaderOutput';
const buttonComponents = ['EuiButtonIcon'];

export const ScreenReaderOutputDisabledTooltip =
  ESLintUtils.RuleCreator.withoutDocs({
    create(context) {
      return {
        JSXElement(node) {
          const openingElement = node.openingElement;

          if (
            openingElement?.name.type !== 'JSXIdentifier' ||
            openingElement.name.name !== tooltipComponent
          ) {
            return;
          }

          const tooltipContent = findAttrValue(
            context,
            openingElement.attributes,
            'content'
          );

          const hasDisableScreenReader = openingElement.attributes.some(
            (attr): attr is TSESTree.JSXAttribute =>
              attr.type === 'JSXAttribute' &&
              attr.name.type === 'JSXIdentifier' &&
              attr.name.name === disabledTooltipComponentProp
          );

          if (hasDisableScreenReader) {
            return;
          }

          const buttonElement = node.children.find(
            (child): child is TSESTree.JSXElement =>
              child.type === 'JSXElement' &&
              child.openingElement?.name.type === 'JSXIdentifier' &&
              buttonComponents.includes(child.openingElement.name.name)
          );

          if (!buttonElement) {
            return;
          }

          const ariaLabel = findAttrValue(
            context,
            buttonElement.openingElement.attributes,
            'aria-label'
          );

          if (
            tooltipContent &&
            ariaLabel &&
            areAttrsEqual(tooltipContent, ariaLabel)
          ) {
            const buttonElementName = (
              buttonElement.openingElement.name as TSESTree.JSXIdentifier
            ).name;

            context.report({
              node: openingElement,
              messageId: 'requireDisableScreenReader',
              fix: (fixer) => {
                const lastAttr = openingElement.attributes[openingElement.attributes.length - 1];
                const insertPosition = lastAttr ? lastAttr.range[1] : openingElement.name.range[1];

                return fixer.insertTextAfterRange(
                  [insertPosition, insertPosition],
                  ` ${disabledTooltipComponentProp}`
                );
              },
              data: {
                tooltipComponent,
                disabledTooltipComponentProp,
                buttonElementName,
              },
            });
          }
        },
      };
    },
    meta: {
      type: 'problem',
      docs: {
        description:
          'Ensure "{{disabledTooltipComponentProp}}" attribute is set when {{tooltipComponent}} content matches {{buttonElementName}} "aria-label"',
      },
      fixable: 'code',
      schema: [],
      messages: {
        requireDisableScreenReader:
          '{{tooltipComponent}} should include "{{disabledTooltipComponentProp}}" attribute when its content matches the "aria-label" of {{buttonElementName}} to avoid redundant announcements.',
      },
    },
    defaultOptions: [],
  });
