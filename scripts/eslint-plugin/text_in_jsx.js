// const {
//   TSESTree,
//   AST_NODE_TYPES,
// } = require('@typescript-eslint/experimental-utils');
// const {
//   isObjectType,
//   isObjectFlagSet,
//   isStrictCompilerOptionEnabled,
//   isTypeFlagSet,
//   isVariableDeclaration,
// } = require('tsutils');
const ts = require('typescript');
const { ESLintUtils, getConstrainedTypeAtLocation, ...rest } = require('@typescript-eslint/experimental-utils');

const { getParserServices } = ESLintUtils;

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent hard-coded copy in JSX tag children content',
    },
  },
  create: function(context) {
    return {
      /**
       * Props of any component is defined in ArrowFunctions
       * Example: const EuiButton = ({ foo, bar }) => {};
       */
      JSXElement(node) {
        const childrenAttribute = node.openingElement.attributes.find(({ name, type }) => type === 'JSXAttribute' && name.name === 'children');

        let children = node.children.length > 0 ? node.children : childrenAttribute?.value;
        if (children == null) return; // nothing to validate

        if (Array.isArray(children)) {
          children.forEach(child => validateChild(context, child))
        } else {
          validateChild(context, children);
        }
      },
    };
  },
};

const allowedTypes = new Set(['ReactNode']);
function isStringType(parserServices, checker, node) {
  const stringType = checker.getStringType();

  const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
  const tsType = checker.getTypeAtLocation(tsNode);

  const typeAsString = checker.typeToString(tsType);
  if (allowedTypes.has(typeAsString)) return false;

  // can't validate if TS doesn't know what's up
  if (tsType.intrinsicName === 'error') return;

  // resolve constant string values to the wider `string` type
  const tsLiteralType = checker.getBaseTypeOfLiteralType(tsType);

  const hasStringType = !!tsLiteralType?.types?.find(type => checker.getBaseTypeOfLiteralType(type) === stringType);
  if (tsLiteralType === stringType || hasStringType) {
    return true;
  }

  return false;
}

function validateChild(context, child) {
  switch (child.type) {
    case 'ArrayExpression':
      // validate each item in the array
      child.elements.forEach(element => validateChild(context, element));
      break;

    case 'ArrowFunctionExpression':
      // render props are fine
      break;

    case 'CallExpression': {
      // useEuiI18n is the singular exception to functions returning strings
      if (child.callee.name === 'useEuiI18n') return;

      const parserServices = getParserServices(context);
      const checker = parserServices.program.getTypeChecker();

      if (isStringType(parserServices, checker, child)) {
        context.report({
          node: child,
          message: 'Functions with a string return type cannot be used within JSX',
        });
      }
      break;
    }

    case 'ConditionalExpression':
      // test both results of the condition
      validateChild(context, child.consequent);
      validateChild(context, child.alternate);
      break;

    case 'BinaryExpression':
      // @TODO: the usual case encountered here is testing a condition, e.g.
      // {myValue === something}
      // but these can also appear as
      // {myValue + 'someString'}
      // which is an invariant
      // leaving these edge cases as out of scope for at least the PoC
      break;

    case 'ChainExpression':
      // Wraps a MemberExpression, indicating that the property access is chained with ?.
      if (child.expression.type !== 'MemberExpression') {
        context.report({
          node: child,
          message: `Unable to process a chained expression of type "${child.expression.type}"`,
        });
      } else {
        validateChild(context, child.expression);
      }
      break;

    case 'Identifier': {
      // if this variable comes from a function parameter, we have no control and won't prevent usage
      if (isIdentifierSourceSafe(context, child)) return;

      const parserServices = getParserServices(context);
      const checker = parserServices.program.getTypeChecker();

      if (isStringType(parserServices, checker, child)) {
        context.report({
          node: child,
          message: 'String-type variables are not allowed as children within JSX',
        });
      }
      break;
    }

    // always okay as a child
    case 'JSXElement':
      break;

    // can't resolve to anything, always okay (usually these are JSX comments)
    case 'JSXEmptyExpression':
      break;

    // text as a child node is the primary case we want to prevent
    case 'JSXText':
      // whitespace characters are acceptable (likely exists for code formatting reasons e.g. prettier)
      // also allow escaped entities of the pattern &[a-z];
      if (child.value.match(/^(&[a-z]+;|\s)*$/)) return;

      context.report({
        node: child,
        message: 'Text is not allowed as children within JSX, use i18n instead (https://elastic.github.io/eui/#/utilities/i18n)',
      });
      break;

    // validate its expression
    case 'JSXExpressionContainer':
      validateChild(context, child.expression);
      break;

    case 'JSXFragment':
      // as safe as can be
      break;

    // literals are prevented
    case 'Literal':
      if (typeof child.value === 'string') {
        context.report({
          node: child,
          message: 'String literals are not allowed within JSX',
        });
      }
      break;

    case 'LogicalExpression':
      // @TODO: it would be trivial to also check for a numeric condition here, e.g.:
      // <div>{pages.length && <Pagination />}</div>
      // if pages.length is 0, React will render the 0 which is not the desired outcome
      // we've hit this a few times before, usually caught in a pull review but not always
      validateChild(context, child.left);
      validateChild(context, child.right);
      break;

    case 'MemberExpression':
      // if the top-level object of this expression is a safe identifier, treat this as okay
      let objectIdentifier = child.object;
      while (objectIdentifier.type === 'MemberExpression') objectIdentifier = objectIdentifier.object;
      if (isIdentifierSourceSafe(context, objectIdentifier)) return;

      const parserServices = getParserServices(context);
      const checker = parserServices.program.getTypeChecker();

      if (isStringType(parserServices, checker, child)) {
        context.report({
          node: child,
          message: 'String-type variables are not allowed as children within JSX',
        });
      }
      break;

    case 'SpreadElement':
      // treat spreading as safe
      break;

    case 'TemplateLiteral':
      context.report({
        node: child,
        message: 'String-type variables are not allowed as children within JSX',
      });
      break;

    case 'UnaryExpression':
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#unary_operators
      // the only unary operator that returns a string is `typeof`, and if that's used in JSX well then why not
      break;

    // fail on unknown types
    default:
      context.report({
        node: child,
        message: `Unable to process JSX child of type "${child.type}"`,
      });
      break;
  }
}

function isIdentifierSourceSafe(context, identifierNode) {
  const scope = context.getScope();
  const scopeVariables = scope.set;
  const variableScope = scopeVariables.get(identifierNode.name);

  // if we know where this variable comes from, we can't check it
  // (this exists mostly for this rule's test cases)
  if (variableScope == null) {
    return true;
  }

  const variableDef = variableScope.defs[0]; // @TODO: consider re-defs?

  // this comes from a function argument, allow
  if (variableDef.type === 'Parameter') {
    return true;
  }

  // allow if this variable came from a call to useEuiI18n
  if (variableDef.node.type === 'VariableDeclarator' && variableDef.node.init?.type === 'CallExpression' && variableDef.node.init?.callee.name === 'useEuiI18n') {
    return true;
  }

  // allow variables that destructure from `this.props`
  if (variableDef.node.type === 'VariableDeclarator') {
    const { init } = variableDef.node;
    if (init?.type === 'MemberExpression') {
      const { object, property } = init;
      if (object.type === 'ThisExpression' && property.type === 'Identifier' && property.name === 'props') {
        return true;
      }
    }
  }

  // KEEP THIS AS THE FINAL CHECK
  // we kinda shrug here and say *maybe*, depends on the source of this variable
  // must be last, otherwise it interferes with the other checks
  if (variableDef.type === 'Variable') {
    // can we trace this back to a function argument?
    const init = variableDef.node?.init;
    return init?.type === 'Identifier' ? isIdentifierSourceSafe(context, init) : false;
  }
}
