import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

import { getExpectCallExpression } from './utils/get-expect-call-expression';
import { isParentATestFunction } from './utils/is-parent-a-test-function';

type MessageIds = 'noMixedExpectationGroups';
type Options = [];

type FunctionExpression = TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression;

export const noMixedExpectationGroups = ESLintUtils.RuleCreator.withoutDocs<Options, MessageIds>({
  create(context) {
    let variableIndex = 1;
    let variableIndexInExpectations: Record<string, number> = {};

    const resetMatchersIfIsTestFunction = (node: FunctionExpression): void => {
      if (isParentATestFunction(node)) {
        variableIndexInExpectations = {};
      }
    };

    return {
      FunctionExpression: resetMatchersIfIsTestFunction,
      'FunctionExpression:exit': resetMatchersIfIsTestFunction,
      ArrowFunctionExpression: resetMatchersIfIsTestFunction,
      'ArrowFunctionExpression:exit': resetMatchersIfIsTestFunction,
      CallExpression(node) {
        const expectCallIdentifier = getExpectCallExpression(node);

        if (expectCallIdentifier === null) {
          return;
        }

        const expectFirstArgument = expectCallIdentifier.arguments[0];

        let variableName = '';

        if (expectFirstArgument.type === AST_NODE_TYPES.Identifier) {
          variableName = expectFirstArgument.name;
        } else if (
          expectFirstArgument.type === AST_NODE_TYPES.MemberExpression &&
          expectFirstArgument.object.type === AST_NODE_TYPES.Identifier
        ) {
          variableName = expectFirstArgument.object.name;
        }

        if (
          variableIndexInExpectations.hasOwnProperty(variableName) &&
          variableIndexInExpectations[variableName] !== variableIndex - 1
        ) {
          context.report({
            node,
            messageId: 'noMixedExpectationGroups',
            data: {
              variable: variableName,
            },
          });
        } else {
          variableIndexInExpectations[variableName] = variableIndex;
        }

        variableIndex += 1;
      },
    };
  },
  meta: {
    docs: {
      description: 'Disallow mixing expectations for different variables between each other.',
    },
    messages: {
      noMixedExpectationGroups:
        'Expectation for variable "{{ variable }}" should be moved above to the same place where it is checked for the first time. Do not mix expectations of different variables.',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
