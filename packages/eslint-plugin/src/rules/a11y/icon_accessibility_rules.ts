import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { removeAttribute } from '../../utils/remove_attr';
import { hasSpread } from '../../utils/has_spread';

const COMPONENT = 'EuiIcon';

export const EuiIconAccessibilityRules = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {

    return {
      JSXElement(node: TSESTree.JSXElement) {
        const { openingElement } = node;
        if (
          openingElement.name.type !== 'JSXIdentifier' ||
          openingElement.name.name !== COMPONENT
        ) {
          return;
        }

        // Skip fixing when spread props are present (e.g., <EuiIcon {...props} />)
        // because we cannot safely determine or modify aria-related attributes.
        if (hasSpread(openingElement.attributes)) {
          return;
        }

        let ariaHiddenAttr: TSESTree.JSXAttribute | undefined;
        let tabIndexAttr: TSESTree.JSXAttribute | undefined;
        let isIconNamed = false;

        for (const attr of openingElement.attributes) {
          if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') continue;
          const name = attr.name.name;
          if (name === 'aria-hidden') ariaHiddenAttr = attr;
          if (name === 'tabIndex') tabIndexAttr = attr;
          if (['title', 'aria-labelledby', 'aria-label'].includes(name)) {
            isIconNamed = true;
          }
        }

        // Case: `tabIndex` and `aria-hidden` cannot be used together
        if (tabIndexAttr && ariaHiddenAttr) {
          context.report({
            node: openingElement,
            messageId: 'tabIndexWithAriaHidden',
            fix: fixer => {
              if (!ariaHiddenAttr?.range) return null;
              const [start, end] = removeAttribute(context, ariaHiddenAttr);
              return [fixer.removeRange([start, end])];
            }
          });
          return;
        }

        // Require accessible name or `aria-hidden`; if `aria-hidden` exists, do not insert a value
        if (!isIconNamed && !ariaHiddenAttr) {
          context.report({
            node: openingElement,
            messageId: 'missingTitleOrAriaHidden',
            fix: fixer => {
              if (tabIndexAttr) return null;

              const end = openingElement.range[1];
              const insertPos = openingElement.selfClosing ? end - 2 : end - 1; // before '/>' or '>'
              const insertRange = [insertPos, insertPos] as const;

              return [fixer.insertTextBeforeRange(insertRange, ' aria-hidden={true}')];
            }
          });
        }
      }
    };
  },
  meta: {
    type: 'suggestion',
    docs: {
      description: `Ensure the EuiIcon includes appropriate accessibility attributes`
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingTitleOrAriaHidden:
        'Add a `title`, `aria-label`, or `aria-labelledby` to EuiIcon, or set `aria-hidden={true}` if it is decorative.',
      tabIndexWithAriaHidden:
        'Do not use `tabIndex` together with `aria-hidden`. Remove `aria-hidden` or provide an accessible name.'
    }
  },
  defaultOptions: []
});
