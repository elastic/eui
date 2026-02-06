import { type TSESTree, type TSESLint} from '@typescript-eslint/utils';

/**
 * Computes the removal range for a JSX attribute, including a preceding space
 * when present, to keep formatting intact after autofix.
 *
 * This helper is useful in ESLint rule fixers when calling `fixer.removeRange(...)`,
 * ensuring that the attribute and its leading space are removed cleanly.
 *
 * @typeParam TContext - An ESLint rule context type extending `TSESLint.RuleContext`.
 * @param context - The current ESLint rule context providing access to `SourceCode`.
 * @param attr - The JSX attribute node to remove.
 * @returns A readonly tuple `[start, end]` representing the inclusive start and exclusive end indexes for removal.
 *
 * @example
 * ```ts
 * context.report({
 *   node: openingElement,
 *   messageId: 'removeAttr',
 *   fix: fixer => {
 *     const [start, end] = removeAttribute(context, ariaHiddenAttr);
 *     return fixer.removeRange([start, end]);
 *   },
 * });
 **/

export function removeAttribute<
  TContext extends TSESLint.RuleContext<string, unknown[]>
>(
  context: TContext,
  attr: TSESTree.JSXAttribute) {
  const { sourceCode } = context;
  const start = attr.range[0];
  const before = sourceCode.text[start - 1];
  const rangeStart = before === ' ' ? start - 1 : start;

  return [rangeStart, attr.range[1]] as const;
}
