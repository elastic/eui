import { TSESTree } from '@typescript-eslint/typescript-estree';

export const resolveMemberExpressionRoot = (
  node: TSESTree.MemberExpression
): TSESTree.Identifier => {
  if (node.object.type === 'MemberExpression') {
    return resolveMemberExpressionRoot(node.object);
  }

  return node.object as TSESTree.Identifier;
};
