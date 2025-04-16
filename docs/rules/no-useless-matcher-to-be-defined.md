# Disallow using `.toBeDefined()` matcher when it is known that variable is always defined (`proper-tests/no-useless-matcher-to-be-defined`)

💼 This rule is enabled in the following configs: ☑️ `flat/recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

## Rule details

This rule disallows using `toBeDefined()` matcher when it is known that variable is always defined.

The following patterns are considered errors:

```js
const fooWithType: string = 'foo';
expect(foo).toBeDefined();

const foo = 'foo';
expect(foo).toBeDefined();

const user = repository.findByIdOrThrow(123); // return type is `User`
expect(user).toBeDefined();
```

You should remove these expectations because they are redundant.
