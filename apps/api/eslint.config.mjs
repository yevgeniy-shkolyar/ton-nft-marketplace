import tgmbot from '@ton-nft-marketplace/eslint-config';

export default [
    ...tgmbot,
    { files: ['**/*.{ts,tsx}'] },
    {
        ignores: [
            'jest.config.ts',
            'dist/*',
            '*.mjs',
            '*.json',
            '*/prisma/client/*',
        ],
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                project: true,
                tsconfigRootDir: import.meta.dirname,
                warnOnUnsupportedTypeScriptVersion: false,
            },
        },
        rules: {
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-extraneous-class': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unsafe-declaration-merging': 'off',
            '@typescript-eslint/require-await': 'off',
            'sonarjs/new-cap': 'off',
            'unicorn/no-null': 'off',
            'unicorn/prefer-top-level-await': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-array-reduce': 'off',
            'no-useless-constructor': 'off',
        },
    },
];
