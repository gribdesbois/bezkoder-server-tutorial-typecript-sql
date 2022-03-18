module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: [
    'node_modules/**',
    '.storybook/**',
    'src/stories/**',
    '*.scss',
    '*.js',
  ],
  rules: {
    semi: 'off',
    'import/prefer-default-export': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    /* 'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', 'tsx'] },
    ], */
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    /* 'plugin:react/recommended', */
    'prettier',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
  ],
}
