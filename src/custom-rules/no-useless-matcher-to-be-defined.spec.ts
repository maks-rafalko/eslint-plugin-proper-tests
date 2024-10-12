import typescriptEslintParser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { noUselessMatcherToBeDefined } from './no-useless-matcher-to-be-defined';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptEslintParser,
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname + '/../../',
    },
  },
});

ruleTester.run('no-useless-matcher-to-be-defined', noUselessMatcherToBeDefined, {
  valid: [
    {
      name: 'when variable can be undefined and is actually string',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const stringOrUndefinedActualString: string | undefined = 'a';
                  expect(stringOrUndefinedActualString).toBeDefined();
                });
                `,
    },
    {
      name: 'when variable can be undefined and is actually undefined',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const stringOrUndefinedActualUndefined: string | undefined;
                  expect(stringOrUndefinedActualUndefined).toBeDefined();
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
      name: 'when expect argument is object',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const yes = true;
                  expect({}).toBeDefined();
                });
                `,
    },
    {
      name: 'when variable can be undefined and is actually string, with not',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const stringOrUndefinedActualString: string | undefined = 'a';
                  expect(stringOrUndefinedActualString).not.toBeDefined();
                });
                `,
    },
    {
      name: 'when not expect function is used as a callee',
      filename: 'app.e2e-spec.ts',
      code: `
                test('should pass', function () {
                  const yes = true;
                  call(yes).toBeDefined();
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
                  expect(stringOnlyWithType).toBeDefined();
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
                  expect(stringOnlyWithoutType).toBeDefined();
                });
                `,
      output: null,
      errors: [{ messageId: 'noUselessMatchers' }],
    },
  ],
});
