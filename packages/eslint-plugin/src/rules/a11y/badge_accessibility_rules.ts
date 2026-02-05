import { ESLintUtils } from '@typescript-eslint/utils';

const BADGE_COMPONENT = 'EuiBadge';

export const EuiBadgeAccessibilityRules = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXElement(node) {
        const { openingElement } = node;
        if (
          openingElement.name.type !== 'JSXIdentifier' ||
          openingElement.name.name !== BADGE_COMPONENT
        ) {
          return;
        }

        let iconOnClick, onClick, iconOnClickAriaLabel, onClickAriaLabel;

        for (const attr of openingElement.attributes) {
          if (attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier') {
            switch (attr.name.name) {
              case 'iconOnClick':
                iconOnClick = attr;
                break;
              case 'onClick':
                onClick = attr;
                break;
              case 'iconOnClickAriaLabel':
                iconOnClickAriaLabel = attr;
                break;
              case 'onClickAriaLabel':
                onClickAriaLabel = attr;
                break;
            }
          }
        }

        // 1. iconOnClick and onClick cannot refer to the same callback
        if (
          iconOnClick &&
          onClick &&
          iconOnClick.value &&
          onClick.value &&
          iconOnClick.value.type === 'JSXExpressionContainer' &&
          onClick.value.type === 'JSXExpressionContainer' &&
          iconOnClick.value.expression.type === 'Identifier' &&
          onClick.value.expression.type === 'Identifier' &&
          iconOnClick.value.expression.name === onClick.value.expression.name
        ) {
          context.report({
            node: iconOnClick,
            messageId: 'sameCallback',
            fix: fixer => fixer.removeRange([iconOnClick.range[0], iconOnClick.range[1]]),
          });
        }

        // 2. iconOnClickAriaLabel should be set only if iconOnClick is set
        if (iconOnClickAriaLabel && !iconOnClick) {
          context.report({
            node: iconOnClickAriaLabel,
            messageId: 'iconOnClickAriaLabelWithoutIconOnClick',
            fix: fixer => fixer.removeRange([iconOnClickAriaLabel.range[0], iconOnClickAriaLabel.range[1]]),
          });
        }

        // 3. onClickAriaLabel should be set only if onClick is set
        if (onClickAriaLabel && !onClick) {
          context.report({
            node: onClickAriaLabel,
            messageId: 'onClickAriaLabelWithoutOnClick',
            fix: fixer => fixer.removeRange([onClickAriaLabel.range[0], onClickAriaLabel.range[1]]),
          });
        }
      },
    };
  },
  meta: {
    type: 'problem',
    docs: {
      description: `Ensure the ${BADGE_COMPONENT} includes appropriate accessibility attributes`,
    },
    fixable: 'code',
    schema: [],
    messages: {
      sameCallback:
        '`iconOnClick` and `onClick` should not refer to the same callback. Remove `iconOnClick` and keep only `onClick`.',
      iconOnClickAriaLabelWithoutIconOnClick:
        '`iconOnClickAriaLabel` should only be set if `iconOnClick` is present. Remove this prop.',
      onClickAriaLabelWithoutOnClick:
        '`onClickAriaLabel` should only be set if `onClick` is present. Remove this prop.',
    },
  },
  defaultOptions: [],
});
