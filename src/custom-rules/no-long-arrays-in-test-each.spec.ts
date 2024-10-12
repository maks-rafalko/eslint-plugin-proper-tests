import typescriptEslintParser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { noLongArraysInTestEach } from './no-long-arrays-in-test-each';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptEslintParser,
  },
});

ruleTester.run('no-long-arrays-in-test-each', noLongArraysInTestEach, {
  valid: [
    {
      name: 'less than default limit using "test"',
      filename: 'app.e2e-spec.ts',
      code: `test.each([{}])`,
    },
    {
      name: 'less than default limit using "it"',
      filename: 'app.e2e-spec.ts',
      code: `it.each([{}])`,
    },
    {
      name: 'with integers using "test"',
      filename: 'app.e2e-spec.ts',
      code: 'test.each([1, 2, 3, 4, 5, 6]);',
    },
    {
      name: 'with integers using "it"',
      filename: 'app.e2e-spec.ts',
      code: 'it.each([1, 2, 3, 4, 5, 6]);',
    },
    {
      name: 'with mixed integers and objects using "it"',
      filename: 'app.e2e-spec.ts',
      code: 'it.each([{}, {}, {}, {}, {}, 1, 2, 3, 4, 5]);',
    },
    {
      name: 'with 6 objects when option is overridden using "it"',
      filename: 'app.e2e-spec.ts',
      options: [{ limit: 7 }],
      code: 'it.each([{}, {}, {}, {}, {}, {}]);',
    },
    {
      name: 'with 2 objects when option is overridden using "it"',
      filename: 'app.e2e-spec.ts',
      options: [{ limit: 4 }],
      code: 'it.each([{}, {}]);',
    },
    {
      name: 'string contains it.each',
      filename: 'app.e2e-spec.ts',
      code: '"it.each([{}, {}])";',
    },
    {
      name: 'simple function call is executed',
      filename: 'app.e2e-spec.ts',
      code: 'each([{}, {}]);',
    },
    {
      name: 'neither test nor it object is used',
      filename: 'app.e2e-spec.ts',
      code: 'array.each([{}, {}]);',
    },
    {
      name: 'called function is not "each"',
      filename: 'app.e2e-spec.ts',
      code: 'test.every([{}, {}]);',
    },
    {
      name: 'function argument is not an array but string',
      filename: 'app.e2e-spec.ts',
      code: 'test.each("string");',
    },
    {
      name: 'not in e2e test file',
      filename: 'non-e2e-test.ts',
      code: 'it.each([{}, {}, {}, {}, {}]);',
    },
  ],
  invalid: [
    {
      name: 'when 6 objects are passed while 5 are allowed by default using "test.each"',
      filename: 'app.e2e-spec.ts',
      code: 'test.each([{}, {}, {}, {}, {}, {}])',
      output: null,
      errors: [
        {
          messageId: 'noLongArrays',
          data: {
            testFunctionName: 'test',
            actualLength: 6,
            limit: 5,
          },
        },
      ],
    },
    {
      name: 'when 6 objects are passed while 5 are allowed by default using "it.each"',
      filename: 'app.e2e-spec.ts',
      code: 'it.each([{}, {}, {}, {}, {}, {}])',
      output: null,
      errors: [
        {
          messageId: 'noLongArrays',
          data: {
            testFunctionName: 'it',
            actualLength: 6,
            limit: 5,
          },
        },
      ],
    },
    {
      name: 'when 2 objects are passed while 1 is allowed by passed option using "it.each"',
      filename: 'app.e2e-spec.ts',
      options: [{ limit: 1 }],
      code: 'it.each([{}, {}])',
      output: null,
      errors: [
        {
          messageId: 'noLongArrays',
          data: {
            testFunctionName: 'it',
            actualLength: 2,
            limit: 1,
          },
        },
      ],
    },
  ],
});
