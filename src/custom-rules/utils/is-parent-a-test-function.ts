import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

type FunctionExpression = TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression;

const TEST_FUNCTIONS = ['test', 'it'];

export const isParentATestFunction = (node: FunctionExpression): boolean => {
  if (node.parent.type !== AST_NODE_TYPES.CallExpression) {
    return false;
  }

  const parentCallee = node.parent.callee;

  const isParentTestFunction =
    parentCallee.type === AST_NODE_TYPES.Identifier && TEST_FUNCTIONS.includes(parentCallee.name);

  const isParentTestEachFunction =
    parentCallee.type === AST_NODE_TYPES.MemberExpression &&
    parentCallee.object.type === AST_NODE_TYPES.Identifier &&
    TEST_FUNCTIONS.includes(parentCallee.object.name) &&
    parentCallee.property.type === AST_NODE_TYPES.Identifier &&
    parentCallee.property.name === 'each';

  return isParentTestFunction || isParentTestEachFunction;
};
