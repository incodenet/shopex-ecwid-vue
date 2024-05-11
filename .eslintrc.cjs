/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  env: {
    'vue/setup-compiler-macros': true
  },
  overrides: [
    {
      files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:playwright/recommended'],
      rules: {
        'prettier/prettier': 'warn',
        'vue/no-unused-vars': 'error',
        'vue/no-multiple-template-root': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
