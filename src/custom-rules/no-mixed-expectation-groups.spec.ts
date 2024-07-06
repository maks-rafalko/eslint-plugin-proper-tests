import { RuleTester } from '@typescript-eslint/rule-tester';

import { noMixedExpectationGroups } from './no-mixed-expectation-groups';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-mixed-expectation-groups', noMixedExpectationGroups, {
  valid: [
    {
      name: 'with no expectations using "test"',
      code: `test('should pass')`,
    },
    {
      name: 'with no expectations and using "it"',
      code: `it('should pass')`,
    },
    {
      name: 'with no expectations and empty body using "test"',
      code: `test('should pass', () => {})`,
    },
    {
      name: 'with "test.skip"',
      code: `test.skip('should pass', () => {})`,
    },
    {
      name: 'with "it.skip"',
      code: `it.skip('should pass', () => {})`,
    },
    {
      name: 'with method call from variable',
      code: `expect(someObject)[key[test]]('test');`,
    },
    {
      name: 'when the first expect is variable1 with "test"',
      code: `
                test('should pass', function () {
                  expect(variable1).toBeDefined();
                });
                `,
    },
    {
      name: 'when the first expect is variable1 with property property1 with "test"',
      code: `
                test('should pass', function () {
                  expect(variable1.property1).toBeDefined();
                });
                `,
    },
    {
      name: 'when variable is used in multiple tests with "test"',
      code: `
                test.each('should pass', function () {
                  expect(variable1).toBeDefined();
                });
                test.each('should pass', function () {
                  expect(variable1).toMatchObject({});
                });
                `,
    },
    {
      name: 'when variable is used in multiple tests with "test" and "it", with several expectations',
      code: `
                it('should pass1', function () {
                  expect(someObject).toBeDefined();
                  expect(someObject).toMatchObject({});
                });
                test('should pass2', function () {
                  expect(someObject).toBeDefined();
                  expect(someObject).toMatchObject({});
                });
                `,
    },
  ],
  invalid: [
    {
      name: 'when expectations for variable1 are mixed with variable2 in one "test"',
      code: `
                test('should fail1', function () {
                  expect(variable1).toBeDefined();
                  expect(variable2).toEqual({});
                  expect(variable1).toEqual({});
                });
                `,
      output: null,
      errors: [
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable1',
          },
        },
      ],
    },
    {
      name: 'when expectations for variable1 are mixed with variable2 in one "test", with "not"',
      code: `
                test('should fail1', function () {
                  expect(variable1).toBeDefined();
                  expect(variable2).toEqual({});
                  expect(variable1).not.toEqual({});
                });
                `,
      output: null,
      errors: [
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable1',
          },
        },
      ],
    },
    {
      name: 'when expectations for objects variable1.property1 are mixed with variable2 in one "test"',
      code: `
                test('should fail1', function () {
                  expect(variable1.property1).toBeDefined();
                  expect(variable2).toEqual({});
                  expect(variable1.property1).toEqual({});
                });
                `,
      output: null,
      errors: [
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable1',
          },
        },
      ],
    },
    {
      name: 'when expectations for variable1 object\'s properties are mixed with variable2 in one "test"',
      code: `
                test('should fail1', function () {
                  expect(variable1.property1).toBeDefined();
                  expect(variable2).toEqual({});
                  expect(variable1.property2).toEqual({});
                });
                `,
      output: null,
      errors: [
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable1',
          },
        },
      ],
    },
    {
      name: 'when expectations for variable1 are mixed with variable2 object\'s properties in one "test"',
      code: `
                test('should fail1', function () {
                  expect(variable1).toBeDefined();
                  expect(variable2.status).toEqual({});
                  expect(variable1).toEqual({});
                });
                `,
      output: null,
      errors: [
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable1',
          },
        },
      ],
    },
    {
      name: 'when expectations for variable1 are mixed with variable2 in one "it"',
      code: `
                it('should fail1', function () {
                  expect(variable1).toBeDefined();
                  expect(variable2).toEqual({});
                  expect(variable1).toEqual({});
                });
                `,
      output: null,
      errors: [
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable1',
          },
        },
      ],
    },
    {
      name: 'when expectations for variables are mixed in both "it"',
      code: `
                it('should fail1', function () {
                  expect(variable1).toBeDefined();
                  expect(variable2).toEqual({});
                  expect(variable1).toEqual({});
                });
                it('should fail2', function () {
                  expect(variable3).toBeDefined();
                  expect(variable4).toEqual({});
                  expect(variable3).toEqual({});
                });
                `,
      output: null,
      errors: [
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable1',
          },
        },
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable3',
          },
        },
      ],
    },
    {
      name: 'when expectations for variables are mixed in the first "it"',
      code: `
                it('should fail1', function () {
                  expect(variable1).toBeDefined();
                  expect(variable2).toEqual({});
                  expect(variable1).toEqual({});
                });
                it('should fail2', function () {
                  expect(variable3).toBeDefined();
                  expect(variable4).toEqual({});
                });
                `,
      output: null,
      errors: [
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable1',
          },
        },
      ],
    },
    {
      name: 'when expectations for variables are mixed in the second "it"',
      code: `
                it('should fail1', function () {
                  expect(variable1).toBeDefined();
                  expect(variable2).toEqual({});
                });
                it('should fail2', function () {
                  expect(variable3).toBeDefined();
                  expect(variable4).toEqual({});
                  expect(variable3).toEqual({});
                });
                `,
      output: null,
      errors: [
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable3',
          },
        },
      ],
    },
    {
      name: 'when expectations for variables are mixed in both "test.each"',
      code: `
                test.each(['should fail1'], function () {
                  expect(variable1).toBeDefined();
                  expect(variable2).toEqual({});
                  expect(variable1).toEqual({});
                });
                test.each(['should fail2'], function () {
                  expect(variable3).toBeDefined();
                  expect(variable4).toEqual({});
                  expect(variable3).toEqual({});
                });
                `,
      output: null,
      errors: [
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable1',
          },
        },
        {
          messageId: 'noMixedExpectationGroups',
          data: {
            variable: 'variable3',
          },
        },
      ],
    },
  ],
});
