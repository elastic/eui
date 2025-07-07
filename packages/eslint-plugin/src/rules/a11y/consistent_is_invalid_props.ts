import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';

const formControlComponent = 'EuiFormRow';

const formControlChildComponents = [
  'EuiFieldNumber',
  'EuiFilePicker',
  'EuiFieldText',
  'EuiComboBox',
  'EuiTextArea',
  'EuiFormControlLayoutDelimited',
  'SingleFieldSelect',
  'EuiSelect'
];

export const ConsistentIsInvalidProps = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    function getIsInvalidValue(attributes: TSESTree.JSXOpeningElement["attributes"], attrName: string): string | undefined {
      const attr = attributes.find(
        (attr): attr is TSESTree.JSXAttribute =>
          attr.type === 'JSXAttribute' &&
          attr.name.type === 'JSXIdentifier' &&
          attr.name.name === attrName
      );

      if (!attr?.value) return undefined;

      if (attr.value.type === 'Literal') {
        return String(attr.value.value);
      }

      if (attr.value.type === 'JSXExpressionContainer') {
        const expression = attr.value.expression;

        if (expression.type === 'Literal') {
          return String(expression.value);
        }

        return context.sourceCode.getText(expression);
      }

      return undefined;
    }

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

        const formRowIsInvalid = getIsInvalidValue(openingElement.attributes, 'isInvalid');
        if (formRowIsInvalid === undefined) return;

        const childElement = node.children.find(
          (child): child is TSESTree.JSXElement =>
            child.type === 'JSXElement' &&
            child.openingElement?.name.type === 'JSXIdentifier' &&
            formControlChildComponents.includes(child.openingElement.name.name)
        );

        if (!childElement) {
          return;
        }

        const childIsInvalid = getIsInvalidValue(childElement.openingElement.attributes, 'isInvalid');

        if (childIsInvalid !== formRowIsInvalid) {
          const componentName =   (childElement.openingElement.name as TSESTree.JSXIdentifier).name;

          context.report({
            node: childElement,
            messageId: 'inconsistentIsInvalid',
            fix: (fixer) => {
              const childIsInvalidAttr = childElement.openingElement.attributes.find(
                (attr): attr is TSESTree.JSXAttribute =>
                  attr.type === 'JSXAttribute' &&
                  attr.name.type === 'JSXIdentifier' &&
                  attr.name.name === 'isInvalid'
              );

              if (childIsInvalidAttr) {
                return fixer.replaceText(childIsInvalidAttr, `isInvalid={${formRowIsInvalid}}`);
              }

              const insertPosition = childElement.openingElement.name.range[1];

              return fixer.insertTextAfterRange(
                [insertPosition, insertPosition],
                ` isInvalid={${formRowIsInvalid}}`
              );
            },
            data: { formControlComponent: formControlComponent, component: componentName},
          });
        }
      }
    };
  },
  meta: {
    type: 'problem',
    docs: {
      description: `Ensure {{component}} inherit "isInvalid" prop from parent {{formControlComponent}}`
    },
    fixable: 'code',
    schema: [],
    messages: {
      inconsistentIsInvalid:
        `{{component}} should have the same "isInvalid" prop value as its parent {{formControlComponent}}.`
    }
  },
  defaultOptions: []
});
