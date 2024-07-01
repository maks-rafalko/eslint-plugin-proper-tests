# Disallow mixing expectations for different variables between each other (`proper-tests/no-mixed-expectation-groups`)

<!-- end auto-generated rule header -->

## Rule details

This rule disallows mixing expectations for different variables between each other.

The following patterns are considered errors:

```ts
// example 1
expect(foo).toBeDefined();
expect(bar).toBeNull();
expect(foo).toHaveLength(3); // should be placed before "bar"

// example 1
expect(foo).toBeDefined();
expect(bar).toBeNull();
expect(foo.bars).toHaveLength(3); // should be placed before "bar"
```

The following patterns are considered correct:

```ts
// example 1
expect(foo).toBeDefined();
expect(foo).toHaveLength(3);

expect(bar).toBeNull();

// example 2
expect(foo).toBeDefined();
expect(foo.bars).toHaveLength(3);

expect(bar).toBeNull();
```
