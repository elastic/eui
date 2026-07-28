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
export function resolveIdentifierValue(
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
 * functions — those have their own return scope. Used to validate block-body
 * arrow functions.
 */
export function collectReturnValues(
  node: TSESTree.Node
): TSESTree.Expression[] {
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
export function resolveLocalComponent(
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

/**
 * Recursively collects concrete JSXElement nodes to validate, expanding:
 *  - `<>...</>`, `<Fragment>`, `<React.Fragment>` (transparent grouping)
 *  - `{expr}`                                  (JSXExpressionContainer)
 *  - `{a && <El />}`                           (LogicalExpression `&&` → right side only)
 *  - `{a || <El />}`, `{a ?? <El />}`          (LogicalExpression `||`/`??` → both sides)
 *  - `{c ? <A /> : <B />}`                     (ConditionalExpression → both branches)
 *  - `{[<A />, <B />]}`                        (ArrayExpression → each element)
 *  - `{variable}`                              (Identifier → resolved via scope)
 *  - `<LocalComponent />`                      (local arrow-fn component, expression or block body)
 *  - `{(arg) => <El />}`                       (ArrowFunctionExpression, expression or block body)
 *  - `{arr.map(fn)}`                           (CallExpression `.map()` with arrow-fn callback)
 *
 * Patterns that can't be resolved statically (arbitrary function calls, imported
 * variables, non-arrow `.map()` callbacks) produce an empty list and are silently
 * skipped.
 */
export function collectJsxChildren(
  node: TSESTree.Node,
  sourceCode: TSESLint.SourceCode
): TSESTree.JSXElement[] {
  return collectChildren(node, sourceCode, new Set<string>());
}

function collectChildren(
  node: TSESTree.Node,
  sourceCode: TSESLint.SourceCode,
  visited: Set<string>
): TSESTree.JSXElement[] {
  const collect = (n: TSESTree.Node) => collectChildren(n, sourceCode, visited);

  switch (node.type) {
    case 'JSXElement': {
      if (isFragment(node.openingElement)) {
        return flatMap(node.children, collect);
      }
      const { name } = node.openingElement;
      if (name.type === 'JSXIdentifier') {
        if (visited.has(name.name)) return [];

        const resolved = resolveLocalComponent(
          sourceCode,
          name.name,
          node.openingElement
        );
        if (resolved !== null) {
          visited.add(name.name);

          const result = flatMap(resolved, collect);

          visited.delete(name.name);
          return result;
        }
      }
      return [node];
    }
    case 'JSXFragment':
      return flatMap(node.children, collect);
    case 'JSXExpressionContainer':
      if (node.expression.type === 'JSXEmptyExpression') return [];
      return collect(node.expression);
    case 'LogicalExpression':
      if (node.operator === '&&') return collect(node.right);
      return [...collect(node.left), ...collect(node.right)];
    case 'ConditionalExpression':
      return [...collect(node.consequent), ...collect(node.alternate)];
    case 'ArrayExpression':
      return flatMap(node.elements, (el) =>
        el && el.type !== 'SpreadElement' ? collect(el) : []
      );
    case 'Identifier': {
      const resolved = resolveIdentifierValue(sourceCode, node);
      return resolved ? collect(resolved) : [];
    }
    case 'ArrowFunctionExpression':
      if (node.body.type !== 'BlockStatement') return collect(node.body);
      return flatMap(collectReturnValues(node.body), collect);
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
        if (fn.body.type !== 'BlockStatement') return collect(fn.body);
        return flatMap(collectReturnValues(fn.body), collect);
      }
      return [];
    }
    default:
      return [];
  }
}
