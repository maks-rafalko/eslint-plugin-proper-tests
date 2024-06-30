import type { ParserServicesWithTypeInformation } from '@typescript-eslint/typescript-estree';
import { AST_NODE_TYPES, ESLintUtils, TSESLint, TSESTree } from '@typescript-eslint/utils';
import * as ts from 'typescript';

import { isTypeFlagSet } from './utils/isTypeFlagSet';

type MessageIds = 'noUselessMatchers';
type Options = [];

const reportForToBeNull = (
  node: TSESTree.CallExpression,
  context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
  services: ParserServicesWithTypeInformation,
  typeChecker: ts.TypeChecker
): void => {
  if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
    return;
  }

  if (node.callee.property.type !== AST_NODE_TYPES.Identifier || node.callee.property.name !== 'toBeNull') {
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
  const isVariableCanBeNull = isTypeFlagSet(
    typeChecker.getTypeOfSymbolAtLocation(symbol!, symbol!.valueDeclaration!),
    ts.TypeFlags.Null
  );

  if (!isVariableCanBeNull) {
    context.report({
      node,
      messageId: 'noUselessMatchers',
      data: {
        variable: node.callee.object.arguments[0].name,
        type: argumentType,
      },
    });
  }
};

const reportForNotToBeNull = (
  node: TSESTree.CallExpression,
  context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
  services: ParserServicesWithTypeInformation,
  typeChecker: ts.TypeChecker
): void => {
  if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
    return;
  }

  if (node.callee.object.type !== AST_NODE_TYPES.MemberExpression) {
    return;
  }

  if (
    node.callee.object.object.type !== AST_NODE_TYPES.CallExpression ||
    node.callee.object.object.callee.type !== AST_NODE_TYPES.Identifier ||
    node.callee.object.object.callee.name !== 'expect'
  ) {
    return;
  }

  if (node.callee.object.property.type !== AST_NODE_TYPES.Identifier || node.callee.object.property.name !== 'not') {
    return;
  }

  if (node.callee.property.type !== AST_NODE_TYPES.Identifier || node.callee.property.name !== 'toBeNull') {
    return;
  }

  if (
    !node.callee.object.object.arguments[0] ||
    node.callee.object.object.arguments[0].type !== AST_NODE_TYPES.Identifier
  ) {
    return;
  }

  const argumentNode = node.callee.object.object.arguments[0];

  const firstArgumentType = services.getTypeAtLocation(argumentNode);
  const symbol = services.getSymbolAtLocation(argumentNode);

  if (!symbol) {
    return;
  }

  const argumentType = typeChecker.typeToString(firstArgumentType);

  const isVariableCanBeNull = isTypeFlagSet(
    typeChecker.getTypeOfSymbolAtLocation(symbol!, symbol!.valueDeclaration!),
    ts.TypeFlags.Null
  );

  if (!isVariableCanBeNull) {
    context.report({
      node,
      messageId: 'noUselessMatchers',
      data: {
        variable: node.callee.object.object.arguments[0].name,
        type: argumentType,
      },
    });
  }
};

export const noUselessMatcherToBeNull = ESLintUtils.RuleCreator.withoutDocs<Options, MessageIds>({
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    const typeChecker = services.program.getTypeChecker();

    return {
      CallExpression(node): void {
        // expect(..).toBeNull()
        reportForToBeNull(node, context, services, typeChecker);

        // expect(..).not.toBeNull()
        reportForNotToBeNull(node, context, services, typeChecker);
      },
    };
  },
  meta: {
    docs: {
      description: 'Disallow using `.toBeNull()` when TypeScript types conflict with it.',
    },
    messages: {
      noUselessMatchers:
        'Type of "{{ variable }}" variable is "{{ type }}", it\'s not nullable. It is useless to check it with `.toBeNull()` matcher.',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
