# Disallow mixing expectations for different variables between each other (`proper-tests/no-long-arrays-in-test-each`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule details

This rule disallows mixing expectations for different variables between each other.

The following code is considered errors:

```ts
test.each([
  {
    description: 'test case name #1',
    inputValue: 'a',
    expectedOutput: 'aa',
  },
  {
    description: 'test case name #2',
    inputValue: 'b',
    expectedOutput: 'bb',
  },
  {
    description: 'test case name #3',
    inputValue: 'c',
    expectedOutput: 'cc',
  },
  {
    description: 'test case name #4',
    inputValue: 'd',
    expectedOutput: 'dd',
  },
  {
    description: 'test case name #5',
    inputValue: 'e',
    expectedOutput: 'ee',
  },
  {
    description: 'test case name #6',
    inputValue: 'f',
    expectedOutput: 'ff',
  },
])('$description', ({ clientCountry, expectedPaymentMethod, processorName }) => {
  // ...
});
```

Consider extracting such long arrays to a separate files with for example `.data.ts` postfix.

The following code is considered correct:

```ts
// some-service.data.ts
export type TestCase = Readonly<{
  description: string;
  inputValue: string;
  expectedOutput: string;
}>;

export const testCases: TestCase[] = [
  {
    description: 'test case name #1',
    inputValue: 'a',
    expectedOutput: 'aa',
  },
  {
    description: 'test case name #2',
    inputValue: 'b',
    expectedOutput: 'bb',
  },
  {
    description: 'test case name #3',
    inputValue: 'c',
    expectedOutput: 'cc',
  },
  {
    description: 'test case name #4',
    inputValue: 'd',
    expectedOutput: 'dd',
  },
  {
    description: 'test case name #5',
    inputValue: 'e',
    expectedOutput: 'ee',
  },
  {
    description: 'test case name #6',
    inputValue: 'f',
    expectedOutput: 'ff',
  },
];
```

and now test is more readable:

```ts
test.each(testCases)('$description', ({ inputValue, expectedOutput }) => {
  // ...
});
```
