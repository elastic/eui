/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, type TSESLint } from '@typescript-eslint/utils';
import { flatMap } from './flat_map';
import { isFragment } from './is_fragment';

// A variable is only safely resolvable if it is never reassigned. A second
// write means the value at the point of use can't be determined statically.
function isReassigned(variable: TSESLint.Scope.Variable): boolean {
  return variable.references.filter((ref) => ref.isWrite()).length > 1;
}

/**
 * Resolves an expression-context Identifier to the node its variable was
 * initialized with (e.g. the `<EuiButton />` in `const btn = <EuiButton />`).
 * Returns null for anything that can't be resolved safely: imports, function
 * parameters, reassigned variables, or missing initializers.
 */
function resolveIdentifierValue(
  sourceCode: TSESLint.SourceCode,
  node: TSESTree.Identifier
): TSESTree.Node | null {
  let scope: TSESLint.Scope.Scope | null = sourceCode.getScope(node);
  while (scope) {
    const ref = scope.references.find((r) => r.identifier === node);
    if (ref) {
      const variable = ref.resolved;
      if (!variable || isReassigned(variable)) return null;
      const def = variable.defs[0];
      if (!def || def.type !== 'Variable' || !def.node.init) return null;
      return def.node.init;
    }
    scope = scope.upper;
  }
  return null;
}

/**
 * Collects all return-statement arguments within a block body, recursing into
 * `if`/`else` branches and `switch` cases. Does not recurse into nested
 * functions - those have their own return scope. Used to validate block-body
 * arrow functions.
 */
function collectReturnValues(node: TSESTree.Node): TSESTree.Expression[] {
  switch (node.type) {
    case 'BlockStatement':
      return flatMap(node.body, collectReturnValues);
    case 'ReturnStatement':
      return node.argument ? [node.argument] : [];
    case 'IfStatement':
      return [
        ...collectReturnValues(node.consequent),
        ...(node.alternate ? collectReturnValues(node.alternate) : []),
      ];
    case 'SwitchStatement':
      return flatMap(node.cases, (c) =>
        flatMap(c.consequent, collectReturnValues)
      );
    default:
      return [];
  }
}

/**
 * Resolves a JSX component name (e.g. `Buttons` in `<Buttons />`) to the
 * nodes returned by its local arrow-function definition, if one exists.
 *
 * Handles both expression-body (`() => <expr>`) and block-body
 * (`() => { return <expr>; }`) arrow functions. Imports, class components,
 * and reassigned variables return null — those stay opaque.
 */
function resolveLocalComponent(
  sourceCode: TSESLint.SourceCode,
  name: string,
  refNode: TSESTree.Node
): TSESTree.Node[] | null {
  let scope: TSESLint.Scope.Scope | null = sourceCode.getScope(refNode);
  while (scope) {
    const variable = scope.variables.find((v) => v.name === name);
    if (variable) {
      if (isReassigned(variable)) return null;
      const def = variable.defs[0];
      if (!def || def.type !== 'Variable' || !def.node.init) return null;
      const init = def.node.init;
      if (init.type !== 'ArrowFunctionExpression') return null;
      if (init.body.type !== 'BlockStatement') return [init.body];
      const returns = collectReturnValues(init.body);
      return returns.length > 0 ? returns : null;
    }
    scope = scope.upper;
  }
  return null;
}

function walkJsxChild(
  node: TSESTree.Node,
  visit: (node: TSESTree.Node) => void,
  sourceCode: TSESLint.SourceCode | undefined,
  visited: Set<string>,
  shouldSkip: ((el: TSESTree.JSXElement) => boolean) | undefined
): void {
  const walk = (n: TSESTree.Node) =>
    walkJsxChild(n, visit, sourceCode, visited, shouldSkip);

  switch (node.type) {
    case 'JSXElement': {
      if (isFragment(node.openingElement)) {
        node.children.forEach(walk);
        return;
      }
      if (sourceCode) {
        const { name } = node.openingElement;
        if (name.type === 'JSXIdentifier' && !visited.has(name.name)) {
          const resolved = resolveLocalComponent(
            sourceCode,
            name.name,
            node.openingElement
          );
          if (resolved !== null) {
            visited.add(name.name);
            resolved.forEach(walk);
            visited.delete(name.name);
            return;
          }
        }
      }
      if (shouldSkip?.(node)) {
        node.children.forEach(walk);
        return;
      }
      visit(node);
      return;
    }
    case 'JSXFragment':
      node.children.forEach(walk);
      return;
    case 'JSXExpressionContainer':
      if (node.expression.type !== 'JSXEmptyExpression') walk(node.expression);
      return;
    case 'LogicalExpression':
      walk(node.left);
      walk(node.right);
      return;
    case 'ConditionalExpression':
      walk(node.consequent);
      walk(node.alternate);
      return;
    case 'ArrayExpression':
      node.elements.forEach((el) => {
        if (el && el.type !== 'SpreadElement') walk(el);
      });
      return;
    case 'Identifier':
      if (sourceCode) {
        const resolved = resolveIdentifierValue(sourceCode, node);
        if (resolved) {
          walk(resolved);
          return;
        }
      }
      return;
    case 'ArrowFunctionExpression':
      if (node.body.type !== 'BlockStatement') {
        walk(node.body);
      } else {
        collectReturnValues(node.body).forEach(walk);
      }
      return;
    case 'CallExpression': {
      const { callee, arguments: args } = node;
      if (
        callee.type === 'MemberExpression' &&
        callee.property.type === 'Identifier' &&
        callee.property.name === 'map' &&
        args.length >= 1 &&
        args[0].type === 'ArrowFunctionExpression'
      ) {
        const fn = args[0];
        if (fn.body.type !== 'BlockStatement') {
          walk(fn.body);
        } else {
          collectReturnValues(fn.body).forEach(walk);
        }
      }
      return;
    }
    case 'JSXText':
    case 'Literal':
    case 'TemplateLiteral':
    case 'MemberExpression':
      visit(node);
      return;
    default:
      return;
  }
}

/**
 * Recursively walks JSX children, expanding structural nodes transparently
 * and calling `visit` for each content node.
 *
 * Always expanded (structural nodes):
 *  - `<>...</>`, `<Fragment>`, `<React.Fragment>` (transparent grouping)
 *  - `{expr}`                              (JSXExpressionContainer)
 *  - `{a && b}`, `{a || b}`, `{a ?? b}`   (LogicalExpression → both sides)
 *  - `{c ? a : b}`                         (ConditionalExpression → both branches)
 *  - `{[a, b]}`                            (ArrayExpression → each element)
 *  - `{(arg) => <El />}`                   (ArrowFunctionExpression)
 *  - `{arr.map(fn)}`                       (CallExpression `.map()` with arrow-fn callback)
 *
 * With `options.sourceCode`: Identifiers and local arrow-fn components are
 * also expanded via scope lookup when resolvable.
 *
 * `options.shouldSkip` - when provided, called for each JSXElement reached
 * (after fragment and local-component checks). Returning true skips the
 * element itself and recurses into its children instead. Use this to make
 * layout wrappers or non-interactive shells transparent to the visitor.
 *
 * `visit` is called for leaf nodes: JSXElement, JSXText, Literal,
 * TemplateLiteral, MemberExpression.
 */
export function walkJsxChildren(
  node: TSESTree.Node,
  visit: (node: TSESTree.Node) => void,
  options: {
    sourceCode?: TSESLint.SourceCode;
    shouldSkip?: (el: TSESTree.JSXElement) => boolean;
  } = {}
): void {
  walkJsxChild(
    node,
    visit,
    options.sourceCode,
    new Set<string>(),
    options.shouldSkip
  );
}
