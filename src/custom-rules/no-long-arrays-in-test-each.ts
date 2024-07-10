import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

type MessageIds = 'noLongArrays';
type Options = [{ limit?: number }];

const DEFAULT_LIMIT = 5;

export const noLongArraysInTestEach = ESLintUtils.RuleCreator.withoutDocs<Options, MessageIds>({
  create(context, options) {
    return {
      CallExpression(node) {
        if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
          return;
        }

        if (
          node.callee.object.type !== AST_NODE_TYPES.Identifier ||
          !['test', 'it'].includes(node.callee.object.name)
        ) {
          return;
        }

        if (node.callee.property.type !== AST_NODE_TYPES.Identifier || node.callee.property.name !== 'each') {
          return;
        }

        const firstArgument = node.arguments[0];

        if (firstArgument.type !== AST_NODE_TYPES.ArrayExpression) {
          return;
        }

        const limit = options[0].limit || DEFAULT_LIMIT;
        const elements = firstArgument.elements;

        if (elements.length <= limit) {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/typedef
        const allElementsAreObjects = elements.every(element => element?.type === AST_NODE_TYPES.ObjectExpression);

        if (!allElementsAreObjects) {
          return;
        }

        context.report({
          node,
          messageId: 'noLongArrays',
          data: {
            testFunctionName: node.callee.object.name,
            actualLength: elements.length,
            limit: limit,
          },
        });
      },
    };
  },
  meta: {
    docs: {
      description:
        'Disallow using long arrays with objects inside `test.each()` or `it.each()`. Force moving them out of the file.',
    },
    messages: {
      noLongArrays:
        'Move the array with objects out of the test file in `{{ testFunctionName }}.each()`. Array length is {{ actualLength }}, but the limit is {{ limit }} items.',
    },
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          limit: {
            type: 'integer',
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ limit: DEFAULT_LIMIT }],
});
