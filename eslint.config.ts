import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import esLintConfigPrettier from "eslint-config-prettier/flat";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const reactConfig = {
  ...reactHooks.configs["recommended-latest"],
};

const baseConfig = defineConfig({
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },

    parser: tsParser,
    ecmaVersion: 2020,
    sourceType: "module",

    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
});

const baseGlobalIgnores = globalIgnores([
  "**/docs/",
  "**/public/",
  "**/dist/",
  "**/node_modules/",
]);

export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  baseConfig,
  reactConfig,
  baseGlobalIgnores,
  esLintConfigPrettier,
]);
