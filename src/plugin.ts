import type { TSESLint } from '@typescript-eslint/utils';

import { noLongArraysInTestEach } from './custom-rules/no-long-arrays-in-test-each';
import { noMixedExpectationGroups } from './custom-rules/no-mixed-expectation-groups';
import { noUselessMatcherToBeDefined } from './custom-rules/no-useless-matcher-to-be-defined';
import { noUselessMatcherToBeNull } from './custom-rules/no-useless-matcher-to-be-null';

const plugin = {
  configs: {} as Record<'recommended' | 'flat/recommended', TSESLint.Linter.ConfigType>,
  rules: {
    'no-useless-matcher-to-be-defined': noUselessMatcherToBeDefined,
    'no-useless-matcher-to-be-null': noUselessMatcherToBeNull,
    'no-mixed-expectation-groups': noMixedExpectationGroups,
    'no-long-arrays-in-test-each': noLongArraysInTestEach,
  },
};

const recommendedRules = {
  'proper-tests/no-useless-matcher-to-be-defined': 'error',
  'proper-tests/no-useless-matcher-to-be-null': 'error',
  'proper-tests/no-mixed-expectation-groups': 'error',
  'proper-tests/no-long-arrays-in-test-each': 'error',
} satisfies Record<string, TSESLint.Linter.RuleLevel>;

const createRCConfig = (rules: Record<string, TSESLint.Linter.RuleLevel>): TSESLint.Linter.ConfigType => ({
  plugins: ['proper-tests'],
  rules,
});

const createFlatConfig = (rules: Record<string, TSESLint.Linter.RuleLevel>): TSESLint.Linter.ConfigType => ({
  plugins: { 'proper-tests': plugin },
  rules,
});

plugin.configs = {
  recommended: createRCConfig(recommendedRules),
  'flat/recommended': createFlatConfig(recommendedRules),
};

export = plugin;
