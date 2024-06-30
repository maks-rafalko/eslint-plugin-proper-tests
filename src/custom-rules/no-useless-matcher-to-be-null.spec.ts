import { RuleTester } from '@typescript-eslint/rule-tester';

import { noUselessMatcherToBeNull } from './no-useless-matcher-to-be-null';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname + '/../../',
  },
});

ruleTester.run('no-useless-matcher-to-be-null', noUselessMatcherToBeNull, {
  valid: [
    {
      name: 'when variable can be null and is actually string',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const stringOrNullActualString: string | null = 'a';
                  expect(stringOrNullActualString).toBeNull();
                });
                `,
    },
    {
      name: 'when variable can be null and is actually null',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const stringOrNullActualNull: string | null = null;
                  expect(stringOrNullActualNull).toBeNull();
                });
                `,
    },
    {
      name: 'when other matcher is used',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const yes = true;
                  expect(yes).toBe(true);
                });
                `,
    },
    {
      name: 'when variable can be null and is actually string, with not',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const stringOrNullActualString: string | null = 'a';
                  expect(stringOrNullActualString).not.toBeNull();
                });
                `,
    },
    {
      name: 'when not expect function is used as a callee',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const yes = true;
                  call(yes).toBeNull();
                });
                `,
    },
    {
      name: 'when variable can be null, with not',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const stringOrNullActualString: string | null;
                  expect(stringOrNullActualString).not.toBeNull();
                });
                `,
    },
  ],
  invalid: [
    {
      name: 'when variable is string only',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should fail', function () {
                  const stringOnlyWithType: string = 'a'
                  expect(stringOnlyWithType).toBeNull();
                });
                `,
      output: null,
      errors: [{ messageId: 'noUselessMatchers' }],
    },
    {
      name: 'when variable is string only without type declaration',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should fail', function () {
                  const stringOnlyWithoutType = 'a';
                  expect(stringOnlyWithoutType).toBeNull();
                });
                `,
      output: null,
      errors: [{ messageId: 'noUselessMatchers' }],
    },
    {
      name: 'when variable is string only, with not',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should fail', function () {
                  const stringOnlyWithType: string = 'a'
                  expect(stringOnlyWithType).not.toBeNull();
                });
                `,
      output: null,
      errors: [{ messageId: 'noUselessMatchers' }],
    },
    {
      name: 'when variable is string only without type declaration',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should fail', function () {
                  const stringOrNullActualString = 'a';
                  expect(stringOrNullActualString).not.toBeNull();
                });
                `,
      output: null,
      errors: [{ messageId: 'noUselessMatchers' }],
    },
  ],
});
