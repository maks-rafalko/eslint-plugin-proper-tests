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
> For `@typescript-eslint` v7 use version ^1.0.0 of this plugin.
> For `@typescript-eslint` v8 use version ^2.0.0 of this plugin.
> For `@typescript-eslint` v9 use version ^2.1.0 of this plugin.

## Usage

Flat configuration format:

With flat configuration, use the `flat/recommended` shared config in your `eslint.config.mjs` configuration file:

```js
import pluginProperTests from 'eslint-plugin-proper-tests';

export default [
    {
        ...pluginProperTests.configs['flat/recommended']
    },
]
```

Run ESLint and enjoy the results.

Or, alternatively, add `proper-tests` to the plugins section of your `eslint.config.mjs` configuration file and configure the rules one by one:

```js
import pluginProperTests from 'eslint-plugin-proper-tests';

export default [
    {
        plugins: {
            'proper-tests': pluginProperTests,
        },
        rules: {
            "proper-tests/no-useless-matcher-to-be-defined": "error"
            // other rules...
        }
    },
]
```

Old configuration format:

With old configuration, use the `recommended` shared config in your `.eslintrc` configuration file:

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

## Power of Types

This plugin uses TypeScript to provide more accurate results. To enable this, you need to [configure ESLint to work with TypeScript](https://typescript-eslint.io/getting-started/typed-linting):

Flat configuration format:

```js
import pluginProperTests from 'eslint-plugin-proper-tests';

export default [
    {
        languageOptions: {
            parserOptions: { project: true },
        },
    },
    // ...
]
```

Old configuration format:

```js
module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true,
    "tsconfigRootDir": __dirname,
  }
}
```

If `parserOptions` is not configured, you will get an error:

```shell
Error while loading rule 'proper-tests/no-useless-matcher-to-be-defined': You have used a rule which requires type information, 
but don't have parserOptions set to generate type information for this file
```

## Running rules only on test-related files

The rules provided by this plugin assume that the files they are checking are
test-related. This means it's generally not suitable to include them in your
top-level configuration as that applies to all files being linted which can
include source files.

Flat configuration format:

For `eslint.config.mjs` configs you can use the following syntax:

```js
import pluginProperTests from 'eslint-plugin-proper-tests';

export default [
    {
        files: ['**/*.test.ts'], // limit rules to test files only
        ...pluginProperTests.configs['flat/recommended']
    },
]
```

Old configuration format:

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

Flat configuration format:

To enable this configuration with `eslint.config.mjs`, use the `flat/recommended` shared config:

```js
import pluginProperTests from 'eslint-plugin-proper-tests';

export default [
    {
        ...pluginProperTests.configs['flat/recommended']
    },
]
```

Old configuration format:

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
☑️ Set in the `flat/recommended` configuration.\
✅ Set in the `recommended` configuration.

| Name                                                                               | Description                                                                                                     | 💼   |
| :--------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :--- |
| [no-long-arrays-in-test-each](docs/rules/no-long-arrays-in-test-each.md)           | Disallow using long arrays with objects inside `test.each()` or `it.each()`. Force moving them out of the file. | ☑️ ✅ |
| [no-mixed-expectation-groups](docs/rules/no-mixed-expectation-groups.md)           | Disallow mixing expectations for different variables between each other.                                        | ☑️ ✅ |
| [no-useless-matcher-to-be-defined](docs/rules/no-useless-matcher-to-be-defined.md) | Disallow using `.toBeDefined()` matcher when it is known that variable is always defined.                       | ☑️ ✅ |
| [no-useless-matcher-to-be-null](docs/rules/no-useless-matcher-to-be-null.md)       | Disallow using `.toBeNull()` when TypeScript types conflict with it.                                            | ☑️ ✅ |

<!-- end auto-generated rules list -->

In order to use the rules powered by TypeScript type-checking, you must be using
`@typescript-eslint/parser` & adjust your eslint config as outlined
[here](https://typescript-eslint.io/getting-started/typed-linting/).

## Related Projects

### eslint-plugin-jest

The main plugin to be installed when Jest is used.

<https://github.com/jest-community/eslint-plugin-jest>

### eslint-plugin-jest-formatting

This project aims to provide formatting rules (auto-fixable where possible) to
ensure consistency and readability in jest test suites.

<https://github.com/dangreenisrael/eslint-plugin-jest-formatting>
