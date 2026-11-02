/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TSESTree } from '@typescript-eslint/utils';
import type { RuleFix, RuleFixer } from '@typescript-eslint/utils/ts-eslint';
import { getPropertyName } from './get_property_name';

export type IconStringNode = TSESTree.Literal | TSESTree.TemplateLiteral;

const COMPONENT_ICON_ATTRIBUTES: Readonly<Record<string, ReadonlySet<string>>> =
  {
    EuiCommentTimeline: new Set(['timelineAvatar']),
    EuiFormAppend: new Set(['iconLeft', 'iconRight']),
    EuiFormAppendPrepend: new Set(['iconLeft', 'iconRight']),
    EuiFormPrepend: new Set(['iconLeft', 'iconRight']),
    EuiLoadingLogo: new Set(['logo']),
    EuiTimelineItem: new Set(['icon']),
  };

// `*iconType` props are checked on any component, so wrappers that forward
// them to EUI are covered. Other icon props are only checked on EUI imports.
const isIconAttribute = (
  attributeName: string,
  importedComponentName: string | undefined
): boolean => {
  const normalizedName = attributeName.toLowerCase();

  if (normalizedName.endsWith('icontype')) {
    return true;
  }

  if (!importedComponentName) {
    return false;
  }

  return (
    COMPONENT_ICON_ATTRIBUTES[importedComponentName]?.has(attributeName) ===
      true ||
    (normalizedName === 'type' &&
      (importedComponentName === 'EuiIcon' ||
        importedComponentName === 'EuiIconTip'))
  );
};

const getIconStringNodes = (node: TSESTree.Node): IconStringNode[] => {
  switch (node.type) {
    case 'Literal':
      return typeof node.value === 'string' ? [node] : [];
    case 'TemplateLiteral':
      return node.expressions.length === 0 ? [node] : [];
    case 'JSXExpressionContainer':
    case 'TSAsExpression':
    case 'TSSatisfiesExpression':
    case 'TSNonNullExpression':
      return getIconStringNodes(node.expression);
    case 'ConditionalExpression':
      return [
        ...getIconStringNodes(node.consequent),
        ...getIconStringNodes(node.alternate),
      ];
    case 'LogicalExpression':
      return [
        ...getIconStringNodes(node.left),
        ...getIconStringNodes(node.right),
      ];
    default:
      return [];
  }
};

const getStaticStringValue = (node: IconStringNode): string | undefined => {
  if (node.type === 'Literal') {
    return typeof node.value === 'string' ? node.value : undefined;
  }

  return node.quasis[0]?.value.cooked ?? undefined;
};

export const createIconPropVisitors = (
  check: (node: IconStringNode, iconType: string) => void
) => {
  const euiComponentImports = new Map<string, string>();

  const checkValue = (value: TSESTree.Node) => {
    for (const node of getIconStringNodes(value)) {
      const iconType = getStaticStringValue(node);
      if (iconType) {
        check(node, iconType);
      }
    }
  };

  return {
    ImportDeclaration(node: TSESTree.ImportDeclaration) {
      if (
        typeof node.source.value !== 'string' ||
        (node.source.value !== '@elastic/eui' &&
          !node.source.value.startsWith('@elastic/eui/'))
      ) {
        return;
      }

      for (const specifier of node.specifiers) {
        if (specifier.type !== 'ImportSpecifier') {
          continue;
        }

        const importedName =
          specifier.imported.type === 'Identifier'
            ? specifier.imported.name
            : specifier.imported.value;

        if (importedName.startsWith('Eui')) {
          euiComponentImports.set(specifier.local.name, importedName);
        }
      }
    },
    JSXAttribute(node: TSESTree.JSXAttribute) {
      if (node.name.type !== 'JSXIdentifier' || !node.value) {
        return;
      }

      const openingElement = node.parent;
      const importedComponentName =
        openingElement.type === 'JSXOpeningElement' &&
        openingElement.name.type === 'JSXIdentifier'
          ? euiComponentImports.get(openingElement.name.name)
          : undefined;

      if (isIconAttribute(node.name.name, importedComponentName)) {
        checkValue(node.value);
      }
    },
    // Exact key match: suffixed keys like Lens's `triggerIconType` hold
    // non-EUI values, and bare `icon` keys are too often unrelated.
    Property(node: TSESTree.Property) {
      if (
        node.parent.type === 'ObjectExpression' &&
        !node.computed &&
        getPropertyName(node) === 'iconType'
      ) {
        checkValue(node.value);
      }
    },
  };
};

export const replaceIconString = (
  fixer: RuleFixer,
  node: IconStringNode,
  replacement: string
): RuleFix => {
  const quote = node.type === 'Literal' ? node.raw[0] : '`';

  return fixer.replaceText(node, `${quote}${replacement}${quote}`);
};
