import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // 1. Aplica as regras do ESLint padrão
  eslint.configs.recommended,
  
  // 2. Configuração unificada para TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'], // Aplica apenas a arquivos TypeScript
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Garante que o parser saiba onde está o tsconfig
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    // Combina as regras recomendadas do plugin com suas customizações
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // Você pode adicionar ou customizar regras específicas aqui:
      // "@typescript-eslint/no-explicit-any": "warn"
    },
  },
  
  // 3. Desativa as regras que conflitam com o Prettier (sempre por último)
  eslintConfigPrettier,
];
