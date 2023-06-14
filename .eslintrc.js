module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  overrides: [],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'slint@typescript-eslint/ban-types': 'off',
    'nt@typescript-eslint/no-explicit-any': 'off',
    't@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
