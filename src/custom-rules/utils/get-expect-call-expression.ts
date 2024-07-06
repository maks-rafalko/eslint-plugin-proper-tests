import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

export const getExpectCallExpression = (node: TSESTree.CallExpression): TSESTree.CallExpression | null => {
  if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
    return null;
  }

  if (node.callee.property.type !== AST_NODE_TYPES.Identifier) {
    return null;
  }

  // case like expect(x).toBe(Y);
  if (
    node.callee.object.type === AST_NODE_TYPES.CallExpression &&
    node.callee.object.callee.type === AST_NODE_TYPES.Identifier &&
    node.callee.object.callee.name === 'expect'
  ) {
    return node.callee.object;
  }

  // case like expect(x).not.toBe(Y);
  if (
    node.callee.object.type === AST_NODE_TYPES.MemberExpression &&
    node.callee.object.object.type === AST_NODE_TYPES.CallExpression &&
    node.callee.object.object.callee.type === AST_NODE_TYPES.Identifier &&
    node.callee.object.object.callee.name === 'expect'
  ) {
    return node.callee.object.object;
  }

  return null;
};
