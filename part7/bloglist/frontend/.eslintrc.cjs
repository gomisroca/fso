module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "vitest-globals/env": true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:vitest-globals/recommended',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier', 'tailwindcss'],
  rules: {
    "prettier/prettier": "error",
    "eqeqeq": "error",
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "no-console": "warn",
    "no-undef": "off",
    "no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off", 
  },
}
