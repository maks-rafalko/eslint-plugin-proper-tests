import type { ClassicConfig } from '@typescript-eslint/utils/ts-eslint';

export = {
  rules: {
    'proper-tests/no-useless-matcher-to-be-defined': 'error',
    'proper-tests/no-useless-matcher-to-be-null': 'error',
    'proper-tests/no-mixed-expectation-groups': 'error',
    'proper-tests/no-long-arrays-in-test-each': 'error',
  },
} satisfies ClassicConfig.Config;
