<div align="center">
  <a href="https://eslint.org/">
    <img alt="eslint" height="150" src="https://eslint.org/assets/images/logo/eslint-logo-color.svg">
  </a>
  <h1>eslint-plugin-proper-tests</h1>
  <p>ESLint plugin for writing proper tests</p>
</div>

## Installation

```bash
npm install -D eslint-plugin-proper-tests
```

> [!NOTE]  
> For `@typescript-eslint` v7 use version ^1.0.0 of this plugin. For `@typescript-eslint` v8 use version ^2.0.0 of this plugin.

## Usage

Use the `recommended` shared config in your `.eslintrc` configuration file:

```js
module.exports = {
  "extends": ["plugin:proper-tests/recommended"]
}
```

and you are good to go. Run ESLint and enjoy the results.

Or, alternatively, add `proper-tests` to the plugins section of your `.eslintrc` configuration file:

```js
module.exports = {
  "plugins": ["proper-tests"],
  // ...  
}
```

and configure the rules one by one:

```js
module.exports = {
  "plugins": ["proper-tests"],
  "rules": {
    "proper-tests/no-useless-matcher-to-be-defined": "error"
  }
}
```

This plugin uses TypeScript to provide more accurate results. To enable this, you need to [configure ESLint to work with TypeScript](https://typescript-eslint.io/getting-started/typed-linting):

```js
module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true,
    "tsconfigRootDir": __dirname,
  }
}
```

### Running rules only on test-related files

The rules provided by this plugin assume that the files they are checking are
test-related. This means it's generally not suitable to include them in your
top-level configuration as that applies to all files being linted which can
include source files.

For `.eslintrc` configs you can use
[overrides](https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work)
to have ESLint apply additional rules to specific files:

```js
module.exports = {
  "extends": ["eslint:recommended"],
  "overrides": [
    {
      "files": ["test/**"],
      "plugins": ["proper-tests"],
      "extends": ["plugin:proper-tests/recommended"],
      "rules": { "proper-tests/no-useless-matcher-to-be-defined": "off" }
    }
  ],
  "rules": {
    "indent": ["error", 2]
  }
}
```

## Shareable configurations

### Recommended

This plugin exports a recommended configuration that enforces good testing
practices.

To enable this configuration with `.eslintrc`, use the `extends` property:

```json
{
  "extends": ["plugin:proper-tests/recommended"]
}
```

and you are done, no other configuration is needed.

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.

| Name                                                                               | Description                                                                                                     | 💼 |
| :--------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :- |
| [no-long-arrays-in-test-each](docs/rules/no-long-arrays-in-test-each.md)           | Disallow using long arrays with objects inside `test.each()` or `it.each()`. Force moving them out of the file. | ✅  |
| [no-mixed-expectation-groups](docs/rules/no-mixed-expectation-groups.md)           | Disallow mixing expectations for different variables between each other.                                        | ✅  |
| [no-useless-matcher-to-be-defined](docs/rules/no-useless-matcher-to-be-defined.md) | Disallow using `.toBeDefined()` matcher when it is known that variable is always defined.                       | ✅  |
| [no-useless-matcher-to-be-null](docs/rules/no-useless-matcher-to-be-null.md)       | Disallow using `.toBeNull()` when TypeScript types conflict with it.                                            | ✅  |

<!-- end auto-generated rules list -->

In order to use the rules powered by TypeScript type-checking, you must be using
`@typescript-eslint/parser` & adjust your eslint config as outlined
[here](https://typescript-eslint.io/getting-started/typed-linting/).

## Related Projects

### eslint-plugin-jest

The main plugin to be installed when Jest is used.

<https://github.com/jest-community/eslint-plugin-jest>
