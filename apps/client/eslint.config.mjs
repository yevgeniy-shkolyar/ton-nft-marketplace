import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import tgmbot from '@ton-nft-marketplace/eslint-config';
import tailwind from 'eslint-plugin-tailwindcss';
import nextPlugin from '@next/eslint-plugin-next'


const shadcnFiles = ['components/ui/*.tsx'];

export default [
    ...tgmbot,
    { files: ['**/*.{ts,tsx}'] },
    {
        ignores: ['out/*', 'graphql/generated/*', 'postcss.config.js', '.next/*', '*.mjs', '*.d.ts', '*.json'],
    },
    {
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                project: true,
                tsconfigRootDir: import.meta.dirname,
                warnOnUnsupportedTypeScriptVersion: false,
            },
        },
    },
    ...tailwind.configs['flat/recommended'],
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            '@next/next': nextPlugin,
        },
        rules: {
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-misused-promises": "off",
            "@typescript-eslint/no-non-null-assertion": "off",  
            'sonarjs/prefer-read-only-props': 'off',
            'no-duplicate-imports': 'off',        
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,
        },
    },
    {
        files: shadcnFiles,
        rules: {
            'sonarjs/concise-regex': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            'sonarjs/cognitive-complexity': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            'unicorn/prefer-number-properties': 'off',
            'unicorn/no-null': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            'no-use-before-define': 'off',
            'react/prop-types': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'tailwindcss/no-custom-classname': 'off',
            'react/react-in-jsx-scope': 'off',
        },
      },
];
