// @ts-check

const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const prettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    }
  }
)
