module.exports = {
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-var': [0, 'never'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { varsIgnorePattern: 'React' }
    ],
    '@typescript-eslint/no-non-null-assertion': [0, 'never'],
    '@typescript-eslint/no-explicit-any': [0, 'never']
  }
}
