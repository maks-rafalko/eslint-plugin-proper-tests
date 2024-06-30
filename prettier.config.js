/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  overrides: [
    {
      files: ['*.json'],
      options: {
        printWidth: 40,
      },
    },
  ],
};

module.exports = config;
