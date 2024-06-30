import type { ClassicConfig } from '@typescript-eslint/utils/ts-eslint';

export = {
  rules: {
    'proper-tests/no-useless-matcher-to-be-defined': 'error',
    'proper-tests/no-useless-matcher-to-be-null': 'error',
  },
} satisfies ClassicConfig.Config;
