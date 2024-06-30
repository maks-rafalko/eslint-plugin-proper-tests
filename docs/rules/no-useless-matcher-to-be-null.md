# Disallow using `.toBeNull()` when TypeScript types conflict with it (`proper-tests/no-useless-matcher-to-be-null`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule details

This rule disallows using `not.toBeNull()` matcher when it is known that variable is always not null.

The following patterns are considered errors:

```js
const fooWithType: string = 'foo';
expect(foo).not.toBeNull();

const foo = 'foo';
expect(foo).not.toBeNull();

const user = repository.findByIdOrThrow(123); // return type is `User`
expect(user).not.toBeNull();
```

You should remove these expectations because they are redundant.
