import type { ClassicConfig } from '@typescript-eslint/utils/ts-eslint';

export = {
  plugins: ['proper-tests'],
  rules: {
    'proper-tests/no-useless-matcher-to-be-defined': 'error',
    'proper-tests/no-useless-matcher-to-be-null': 'error',
    'proper-tests/no-mixed-expectation-groups': 'error',
    'proper-tests/no-long-arrays-in-test-each': 'error',
  },
} satisfies ClassicConfig.Config;
