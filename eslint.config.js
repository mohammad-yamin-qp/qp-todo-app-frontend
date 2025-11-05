import wickUiEslintConfig from '@npm-questionpro/wick-ui-eslint-config-frontend'
import tsEslint from 'typescript-eslint'

export default tsEslint.config(
  ...wickUiEslintConfig,
  {
    files: ['eslint.config.js'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  {
    files: ['vite.config.ts'],
    rules: {
      '@typescript-eslint/naming-convention': ['off'],
    },
  },
)
