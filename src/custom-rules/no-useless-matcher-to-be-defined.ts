import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import * as ts from 'typescript';

import { isTypeFlagSet } from './utils/is-type-flag-set';

type MessageIds = 'noUselessMatchers';
type Options = [];

export const noUselessMatcherToBeDefined = ESLintUtils.RuleCreator.withoutDocs<Options, MessageIds>({
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    const typeChecker = services.program.getTypeChecker();

    return {
      CallExpression(node) {
        if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
          return;
        }

        if (node.callee.property.type !== AST_NODE_TYPES.Identifier || node.callee.property.name !== 'toBeDefined') {
          return;
        }

        if (
          node.callee.object.type !== AST_NODE_TYPES.CallExpression ||
          node.callee.object.callee.type !== AST_NODE_TYPES.Identifier ||
          node.callee.object.callee.name !== 'expect'
        ) {
          return;
        }

        if (!node.callee.object.arguments[0] || node.callee.object.arguments[0].type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const argumentNode = node.callee.object.arguments[0];

        const firstArgumentType = services.getTypeAtLocation(argumentNode);
        const symbol = services.getSymbolAtLocation(argumentNode);

        if (!symbol) {
          return;
        }

        const argumentType = typeChecker.typeToString(firstArgumentType);
        const isVariableCanBeUndefined = isTypeFlagSet(
          typeChecker.getTypeOfSymbolAtLocation(symbol!, symbol!.valueDeclaration!),
          ts.TypeFlags.Undefined
        );

        if (!isVariableCanBeUndefined) {
          context.report({
            node,
            messageId: 'noUselessMatchers',
            data: {
              variable: node.callee.object.arguments[0].name,
              type: argumentType,
            },
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Disallow using `.toBeDefined()` matcher when it is known that variable is always defined.',
    },
    messages: {
      noUselessMatchers:
        'Type of "{{ variable }}" variable is "{{ type }}", it can not be undefined. It is useless to check it with `.toBeDefined()` matcher.',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
