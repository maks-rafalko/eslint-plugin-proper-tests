import type { Linter } from '@typescript-eslint/utils/ts-eslint';

import recommended from './configs/recommended';
import { noMixedExpectationGroups } from './custom-rules/no-mixed-expectation-groups';
import { noUselessMatcherToBeDefined } from './custom-rules/no-useless-matcher-to-be-defined';
import { noUselessMatcherToBeNull } from './custom-rules/no-useless-matcher-to-be-null';

export = {
  configs: {
    recommended: recommended,
  },
  rules: {
    'no-useless-matcher-to-be-defined': noUselessMatcherToBeDefined,
    'no-useless-matcher-to-be-null': noUselessMatcherToBeNull,
    'no-mixed-expectation-groups': noMixedExpectationGroups,
  },
} satisfies Linter.Plugin;
