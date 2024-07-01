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

## Usage

Add `proper-tests` to the plugins section of your `.eslintrc` configuration file. You
can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["proper-tests"]
}
```

And then use the `recommended` shared configuration:

```json
{
  "extends": ["plugin:proper-tests/recommended"]
}
```

Or configure the rules one by one (not recommended):

```json
{
  "rules": {
    "proper-tests/no-useless-matcher-to-be-defined": "error"
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

```json
{
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

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.

| Name                                                                               | Description                                                                               | 💼 |
| :--------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :- |
| [no-mixed-expectation-groups](docs/rules/no-mixed-expectation-groups.md)           | Disallow mixing expectations for different variables between each other.                  |    |
| [no-useless-matcher-to-be-defined](docs/rules/no-useless-matcher-to-be-defined.md) | Disallow using `.toBeDefined()` matcher when it is known that variable is always defined. | ✅  |
| [no-useless-matcher-to-be-null](docs/rules/no-useless-matcher-to-be-null.md)       | Disallow using `.toBeNull()` when TypeScript types conflict with it.                      | ✅  |

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
